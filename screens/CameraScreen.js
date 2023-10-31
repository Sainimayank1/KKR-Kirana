import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Alert
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import axios from "axios";
import { encode as base64 } from 'base-64';

const CameraScreen = () => {
  let cameraRef = useRef();
  const [image, setImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }
  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhoto(newPhoto);
  };

  if (photo) {
    // let savePhoto = () => {
    //   MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
    //     setPhoto(undefined);
    //   });
    // };

    let savePhoto = async () => {
      const CLOUD_NAME = "dqefnr7tr";
      const API_KEY = "885932821376173";
      const API_SECRET = "Ivkpu1zNS9lfGYETGlY-Gncdkow";

      const uploadImage = async () => {
        const formData = new FormData();
        formData.append("file", {
          uri:photo.uri,
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

      await uploadImage();
    };

    console.log(photo.uri);

    return (
      <SafeAreaView className="flex-1 relative">
        <Image
          className="flex-1"
          source={{ uri: "data:image/jpg;base64," + photo.base64 }}
        />
        <View className="flex items-center justify-around flex-row absolute w-full bottom-5">
          {hasMediaLibraryPermission ? (
            <Button title="Save" onPress={savePhoto} />
          ) : undefined}
          <Button title="Discard" onPress={() => setPhoto(undefined)} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <Camera className="flex-1 flex items-center relative" ref={cameraRef}>
        <View className="absolute bottom-5">
          <Button title="Take Pic" onPress={takePic} />
        </View>
      </Camera>
    </SafeAreaView>
  );
};

export default CameraScreen;
