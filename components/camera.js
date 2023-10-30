import { View, Text ,Button} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Camera } from "expo-camera";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
import colors from "../constants/style";
import { useNavigation } from "@react-navigation/native";

const CameraComponent = () => {
  const navigate  = useNavigation();
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();

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
      <View className="absolute bottom-5 flex items-center">
        <Button title="Open camera" color={colors.blue} onPress={()=>navigate.push("CameraScreen")}/>
      </View>
    </Camera>
    </View>
  );
};

export default CameraComponent;
