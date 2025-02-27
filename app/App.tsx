import React, { useState, useEffect } from 'react';
import { View, Modal, FlatList, Text, Button } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';

// INCLUSION DU STYLE DU BACKGROUND
import styles from './src/styles/body_styles';

// INCLUSION DES COMPONENTS
import Header from './src/components/Header';
import Card from './src/components/Card';
import FloatingButton from './src/components/Bouton_scan';


// FONCTION PRINCIPALE
const App = () => {

  const [scannedData, setScannedData] = useState<string[]>([]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const { hasPermission, requestPermission } = useCameraPermission()
  const device = useCameraDevice("back", {
    physicalDevices: [
      "ultra-wide-angle-camera",
      "wide-angle-camera",
      "telephoto-camera",
    ],
  });

  //
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      console.log(`canned ${codes.length} codes!`)
    }
  })

  // CONTENUE AFFICHÉ
  return (
    <View style={styles.container}>
      
      {/* Component Header avec titre et timer */}
      <Header />

      {/* Scanner en modal */}
      <Modal visible={isScannerOpen} animationType="slide">
        {device ? (
            <Camera style={{
              marginTop: 50,
              width: "80%", // Réduit la largeur à 80% de l'écran
              height: "60%", // Réduit la hauteur à 60% de l'écran
              alignSelf: "center", // Centre horizontalement
              borderRadius: 20, // Coins arrondis
              overflow: "hidden", // Empêche la caméra de dépasser
              backgroundColor: "white", // Fond blanc si la caméra ne remplit pas tout
            }} device={device} codeScanner={codeScanner} isActive={true}/>
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
