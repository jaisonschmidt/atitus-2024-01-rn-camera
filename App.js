import { useState } from 'react';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facyng, setFacyng] = useState('back');

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
      <CameraView style={styles.camera} facyng={facyng}>
        <View style={styles.buttonContainer}></View>
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
    backgroundColor: 'transparent',
    flex: 1,
  }
});
