import React, { useEffect } from 'react';
import { View, Text, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

//
import styles from '../styles/home_screen_styles';

const ScannerScreen = () => {
  const navigation = useNavigation();
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back", {
    physicalDevices: ["ultra-wide-angle-camera", "wide-angle-camera", "telephoto-camera"],
  });

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'aztec', 'data-matrix', 'code-128', 'code-39', 'code-93'],
    onCodeScanned: (codes) => {
      if (codes.length === 0 || !codes[0].value) {
        Alert.alert("Erreur", "Aucune donnée valide scannée");
      } else {
        Alert.alert("QR Code Scanné", codes[0].value);
        navigation.goBack(); // Retour automatique à l'accueil après un scan
      }
    }
  });

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      backHandler.remove(); // ✅ Utilisation correcte de .remove()
    };
  }, [navigation]);

  return (
    <View style={styles.container}>
      {device ? (
        <Camera style={styles.camera} device={device} codeScanner={codeScanner} isActive={true} />
      ) : (
        <Text>Aucun appareil photo disponible</Text>
      )}
    </View>
  );
};

export default ScannerScreen;
