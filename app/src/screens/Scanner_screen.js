import React, { useEffect, useState } from 'react';
import { View, Text, Alert, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
import EncryptedStorage from 'react-native-encrypted-storage';

// INCLUSION DU STYLE
import styles from '../styles/scanner_screen_styles';
import generateTOTPFromURL from '../tools/TOTP';

/////   FONCTION PRINCIPALE   /////
const ScannerScreen = () => {

  // État pour bloquer la lecture pendant le traitement
  const [isScanning, setIsScanning] = useState(false);

  // Navigation pour permettre le retour à l'accueil après un scan
  const navigation = useNavigation();

  // Gestion du bouton retour Android pour revenir à l'accueil
  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('Home');
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      backHandler.remove();
    };
  }, [navigation]);

  // Vérifie si l'application a la permission d'utiliser la caméra
  const { hasPermission, requestPermission } = useCameraPermission();

  // Sélectionne l'appareil photo arrière du téléphone (back camera)
  const device = useCameraDevice("back", {
    physicalDevices: ["ultra-wide-angle-camera", "wide-angle-camera", "telephoto-camera"],
  });

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: async (codes) => {
      if (isScanning || codes.length === 0 || !codes[0].value) return; // 🚫 Bloquer la lecture si déjà en cours

      setIsScanning(true); // ⏳ Désactiver temporairement le scanner
      let scannedURL = codes[0].value;
      console.log("🔍 QR Code détecté :", scannedURL);

      let totpObject = await generateTOTPFromURL(scannedURL);

      if (totpObject.error) {
        Alert.alert("Erreur", "Ce QR Code ne contient pas une URL valide pour TOTP.");
        setIsScanning(false); // ✅ Réactiver le scanner après erreur
        return;
      }

      // Vérifier si l'URL est déjà enregistrée
      const isAlreadyStored = await checkIfURLExists(scannedURL);

      if (!isAlreadyStored) {
        await storeScannedURL(scannedURL, totpObject.website, totpObject.identifier);
        Alert.alert("Succès", "QR Code enregistré avec succès !");
        navigation.navigate('Home', { scannedData: scannedURL });
      } else {
        Alert.alert("Info", "Ce QR Code est déjà enregistré.");
      }

      setTimeout(() => setIsScanning(false), 2000); // ✅ Réactiver après 2s
    }
  });

  // Affichage sur le téléphone
  return (
    <View style={styles.container}>
      {/* Affichage de la caméra si l'appareil photo est détecté */}
      {device ? (
        <Camera 
          style={styles.camera} 
          device={device} 
          codeScanner={codeScanner} 
          isActive={true} 
        />
      ) : (
        // Message si aucun appareil photo disponible
        <Text>Aucun appareil photo disponible</Text>
      )}

      {/* Masque sombre avec une zone transparente pour le scan */}
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

/////   STOCKAGE SECURISE DES URLS   /////
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

// Vérifier si une URL est déjà stockée
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
