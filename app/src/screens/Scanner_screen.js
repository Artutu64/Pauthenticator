import React, { useEffect, useState } from 'react';
import { View, Text, Alert, BackHandler, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import EncryptedStorage from 'react-native-encrypted-storage';

// INCLUSION DU STYLE
import styles from '../styles/scanner_screen_styles';
import generateTOTPFromURL from '../tools/TOTP';

const ScannerScreen = () => {
  const [isScanning, setIsScanning] = useState(false);
  const navigation = useNavigation();
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back", {
    physicalDevices: ["ultra-wide-angle-camera", "wide-angle-camera", "telephoto-camera"],
  });

  useEffect(() => {
    const checkPermission = async () => {
      if (!hasPermission) {
        const granted = await requestPermission();
        if (!granted) {
          Alert.alert(
            "Permission requise",
            "L'application a besoin de l'accès à la caméra pour scanner les QR codes.",
            [{ text: "OK", onPress: () => requestPermission() }]
          );
        }
      }
    };
    checkPermission();
  }, [hasPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: async (codes) => {
      if (isScanning || codes.length === 0 || !codes[0].value) return;
      setIsScanning(true);
      let scannedURL = codes[0].value;
      console.log("🔍 QR Code détecté :", scannedURL);
      let totpObject = await generateTOTPFromURL(scannedURL);
      if (totpObject.error) {
        Alert.alert("Erreur", "Ce QR Code ne contient pas une URL valide pour TOTP.");
        setIsScanning(false);
        return;
      }
      const isAlreadyStored = await checkIfURLExists(scannedURL);
      if (!isAlreadyStored) {
        await storeScannedURL(scannedURL, totpObject.website, totpObject.identifier);
        Alert.alert("Succès", "QR Code enregistré avec succès !");
        navigation.navigate('Home', { scannedData: scannedURL });
      } else {
        Alert.alert("Info", "Ce QR Code est déjà enregistré.");
      }
      setTimeout(() => setIsScanning(false), 2000);
    }
  });

  return (
    <View style={styles.container}>
      {!hasPermission ? (
        <View>
          <Text>La caméra n'a pas la permission.</Text>
          <Button title="Autoriser l'accès" onPress={requestPermission} />
        </View>
      ) : device ? (
        <Camera 
          style={styles.camera} 
          device={device} 
          codeScanner={codeScanner} 
          isActive={true} 
        />
      ) : (
        <Text>Aucun appareil photo disponible</Text>
      )}
      <View style={styles.overlay}>
        <View style={styles.topOverlay} />
        <View style={styles.bottomOverlay} />
        <View style={styles.leftOverlay} />
        <View style={styles.rightOverlay} />
        <View style={styles.scanArea} />
        <Text style={styles.instructions}>Pointez votre appareil sur un QRCode 2FA</Text>
      </View>
    </View>
  );
};

async function storeScannedURL(url, website, identifier) {
  try {
    const storedData = await EncryptedStorage.getItem("stored_urls");
    let urlsArray = storedData ? JSON.parse(storedData) : [];
    urlsArray.push({ url, website, identifier });
    await EncryptedStorage.setItem("stored_urls", JSON.stringify(urlsArray));
    console.log("✅ URL stockée en toute sécurité !");
  } catch (error) {
    console.error("❌ Erreur lors du stockage sécurisé :", error);
  }
}

async function checkIfURLExists(url) {
  try {
    const storedData = await EncryptedStorage.getItem("stored_urls");
    const urlsArray = storedData ? JSON.parse(storedData) : [];
    return urlsArray.some(item => item.url === url);
  } catch (error) {
    console.error("❌ Erreur lors de la vérification de l'URL :", error);
    return false;
  }
}

export default ScannerScreen;
