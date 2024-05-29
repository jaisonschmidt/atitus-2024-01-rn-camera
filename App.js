import { CameraView, useCameraPermissions } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();

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
      <Text>Temos permissão para acessar a camera</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
