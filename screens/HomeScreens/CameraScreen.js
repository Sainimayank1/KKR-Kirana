import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Image,
  Alert,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useDispatch } from "react-redux";
import { AddImage } from "../../context/actions/action";
import { useNavigation } from "@react-navigation/native";

const CameraScreen = () => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigation()

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
    let savePhoto = async () => {
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      dispatch(AddImage(photo.uri));
      navigate.pop();
    };

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
        <View className="absolute bottom-5 flex items-center flex-row w-full justify-around">
        <Button title="Go Back" onPress={()=>navigate.pop()} />
          <Button title="Take Pic" onPress={takePic} />
        </View>
      </Camera>
    </SafeAreaView>
  );
};

export default CameraScreen;
