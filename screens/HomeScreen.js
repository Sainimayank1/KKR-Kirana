import { View, Text,TouchableOpacity, StyleSheet , Button} from 'react-native'
import React,{useState} from 'react'
import { Camera, CameraType , AutoFocus , FlashMode } from 'expo-camera';

const HomeScreen = () => {

  const [type, setType] = useState(CameraType.back);
  const [flash , setFlash] = useState(FlashMode.off)
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function toggleFlash() {
    setFlash(current => (current === FlashMode.off ? FlashMode.on : FlashMode.off));
  }


  return (
    <View style={styles.container}>
    <Camera style={styles.camera} type={type} flashMode={flash}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
          <Text style={styles.text}>Flip Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleFlash}>
          <Text style={styles.text}>Camera Flash</Text>
        </TouchableOpacity>
      </View>
    </Camera>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    border:2,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default HomeScreen