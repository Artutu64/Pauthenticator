import React, { useState } from 'react';
import { View, Modal, FlatList } from 'react-native';
import Header from './src/components/Header';
import FloatingButton from './src/components/Bouton_scan';
import styles from './src/styles/body_styles';
import QRCodeScannerScreen from './src/components/QRCodeScanner';
import Card from './src/components/Card';

const App = () => {
  const [scannedData, setScannedData] = useState<string[]>([]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Fonction appelée lorsqu'un QR Code est scanné
  const handleScanSuccess = (event: { data: string }) => {
    setScannedData([...scannedData, event.data]); // Ajoute la donnée au tableau
    setIsScannerOpen(false); // Ferme le scanner après un scan
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* Liste des QR Codes scannés */}
      <FlatList
        data={scannedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Card content={item} />}
      />

      {/* Scanner en modal */}
      <Modal visible={isScannerOpen} animationType="slide">
        <QRCodeScannerScreen onScanSuccess={handleScanSuccess} />
      </Modal>

      {/* Bouton flottant pour ouvrir le scanner */}
      <FloatingButton onPress={() => setIsScannerOpen(true)} />
    </View>
  );
};

export default App;
