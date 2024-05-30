import { useState, useRef } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState('front');
  const cameraRef = useRef(null);

  const takePicture = () => {
    if (cameraRef.current) {
      cameraRef.current.takePictureAsync({skipProcessing: true})
      .then( (photoData) => console.log(photoData) );
    }
  }

  if( !permission ) {
    // nem sei se tenho permissão de acesso a camera
    return <View />;
  }

  // não temos permissão para acessar a camera
  if(!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Necessário liberar acesso a câmera</Text>
        <Button 
          title="Permitir acesso" 
          onPress={requestPermission}
        />
      </View>
    )
  }

  // temos permissão para acessar a camera
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>

          <TouchableOpacity 
            onPress={() => facing === 'front' ? setFacing('back') : setFacing('front')}
          >
            <Text style={styles.font}>Trocar Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={takePicture}>
            <Text style={styles.font}>Tirar Foto</Text>
          </TouchableOpacity>

        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center', REMOVER ESSA INSTRUÇÃO
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'flex-end',
  },
  font: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    padding: 20,
  }
});
