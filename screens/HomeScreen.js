import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/style";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import Camera from "../components/camera";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { encode as base64 } from 'base-64';


const HomeScreen = () => {
  const navigate = useNavigation();
  const [image, setImage] = useState(null);

  const CLOUD_NAME = "dqefnr7tr";
  const API_KEY = "885932821376173";
  const API_SECRET = "Ivkpu1zNS9lfGYETGlY-Gncdkow";

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append("file", {
      uri,
      type: "image/jpeg",
      name: "upload.jpg",
    });
    formData.append("upload_preset", "KKR-Kirana");

    const apiKeySecret = `${API_KEY}:${API_SECRET}`;
    const apiKeySecretBase64 = base64(apiKeySecret); 
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Basic ${apiKeySecretBase64}`,
          },
        }
      );

      Alert.alert("Image uploaded!", response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{}}>
      <StatusBar style="black" />
      {/* Upper conatiner*/}
      <View
        style={{ height: hp(5), backgroundColor: colors.blue }}
        className="p-7 flex items-center justify-center"
      >
        <Image
          source={require("../assests/logo-no-background.png")}
          style={{ width: wp(30), height: wp(15), objectFit: "contain" }}
        ></Image>
      </View>

      {/* Bottom Container */}
      <ScrollView>
        {/* Camera conatiner */}
        <Camera></Camera>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
