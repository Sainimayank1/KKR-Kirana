import { View, Text ,Button} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Camera } from "expo-camera";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import colors from "../constants/style";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { AddImage } from "../context/actions/action";

const CameraComponent = ({}) => {
  const navigate  = useNavigation();
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const disptach = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      disptach(AddImage(result.assets[0].uri));
      navigate.push("Select delivery Type");
    }
  };


  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <View className="bg-white"><Text>Requesting permissions...</Text></View>
  } else if (!hasCameraPermission) {
    return <View className="bg-white"><Text>Permission for camera not granted. Please change this in settings.</Text></View>
  }


  return (
    <View className="" style={{height:hp(50) , width:wp(100)}}>
    <Camera className="flex-1 relative flex items-center" ref={cameraRef}>
      <View className="absolute bottom-5 flex-1 flex flex-row justify-around w-[100%]">
        <Button title="Open Camera" color={colors.blue} onPress={()=>navigate.push("CameraScreen")}/>
        <Button title="Open Gallery" color={colors.blue} onPress={pickImage} />
      </View>
    </Camera>
    </View>
  );
};

export default CameraComponent;
