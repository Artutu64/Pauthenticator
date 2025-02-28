import React, { useState, useEffect } from 'react';
import { View, Modal, Alert, StyleSheet, Text } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

// INCLUSION DU STYLE DU BACKGROUND
import styles from './src/styles/body_styles';

// INCLUSION DES COMPONENTS
import Header from './src/components/Header';
//import Card from './src/components/Card';
import FloatingButton from './src/components/Bouton_scan';

// FONCTION PRINCIPALE
const App = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back", {
    physicalDevices: [
      "ultra-wide-angle-camera",
      "wide-angle-camera",
      "telephoto-camera",
    ],
  });

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'aztec', 'data-matrix', 'code-128', 'code-39', 'code-93'],
    onCodeScanned: (codes) => {
      if (codes.length === 0 || !codes[0].value) {
        Alert.alert("Erreur", "Aucune donnée valide scannée");
      } else {
        Alert.alert("QR Code Scanné", codes[0].value);
      }
    }
  });

  return (
    <View style={styles.container}>
      
      {/* Component Header avec titre et timer */}
      <Header />

      {/* Scanner en modal */}
      <Modal visible={isScannerOpen} animationType="slide">
        {device ? (
          <View style={styles.cameraContainer}>
            <Camera 
              style={styles.camera} 
              device={device} 
              codeScanner={codeScanner} 
              isActive={true}
            />
          </View>
        ) : (
          <Text>Aucun appareil photo disponible</Text>
        )}
      </Modal>

      {/* Component Bouton flottant pour ouvrir le scanner */}
      <FloatingButton onPress={() => setIsScannerOpen(true)} />
    </View>
  );
};

export default App;
