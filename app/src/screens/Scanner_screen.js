import React, { useEffect } from 'react';
import { View, Text, Alert, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

// INCLUSION DU STYLE
import styles from '../styles/scanner_screen_styles';



/////   FONCTION PRINCIPALE   /////
const ScannerScreen = () => {

  // Navigation pour permettre le retour à l'accueil après un scan
  const navigation = useNavigation();

  // Gestion du bouton retour Android pour revenir à l'accueil
  useEffect(() => {
    const backAction = () => {
      if (navigation.canGoBack()) {
        navigation.goBack(); // Retourne uniquement si c'est possible
      } else {
        navigation.navigate('Home'); // Sinon, navigue vers l'accueil
      }
      return true; // Empêche le comportement par défaut (fermeture de l'app)
    };

    // Ajoute un écouteur sur le bouton retour Android
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      // Retire l'écouteur quand l'écran est démonté pour éviter les conflits
      backHandler.remove();
    };
  }, [navigation]);

  // Vérifie si l'application a la permission d'utiliser la caméra
  const { hasPermission, requestPermission } = useCameraPermission();

  // Sélectionne l'appareil photo arrière du téléphone (back camera)
  const device = useCameraDevice("back", {
    physicalDevices: ["ultra-wide-angle-camera", "wide-angle-camera", "telephoto-camera"],
  });

  // Configuration du scanner de codes QR
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'aztec', 'data-matrix', 'code-128', 'code-39', 'code-93'], // Types de codes scannables
    onCodeScanned: (codes) => {
      if (codes.length === 0 || !codes[0].value) {
        // Alerte si le scan ne contient pas de données valides
        Alert.alert("Erreur", "Aucune donnée valide scannée");
      } else {
        // Affiche une alerte avec le contenu du QR Code et retourne à l'accueil
        Alert.alert("QR Code Scanné", codes[0].value);
        if (navigation.canGoBack()) {
          navigation.goBack(); // Retourne uniquement si c'est possible
        } else {
          navigation.navigate('Home'); // Sinon, navigue vers l'accueil
        }
      }
    }
  });

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
        {/* Zones sombres autour de la zone de scan */}
        <View style={styles.topOverlay} />
        <View style={styles.bottomOverlay} />
        <View style={styles.leftOverlay} />
        <View style={styles.rightOverlay} />

        {/* Zone transparente où le QR Code doit être scanné */}
        <View style={styles.scanArea} />

        {/* Texte explicatif en bas de l'écran */}
        <Text style={styles.instructions}>Pointez votre appareil sur un QRCode 2FA</Text>
      </View>
    </View>
  );
};

export default ScannerScreen;
