import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import styles from '../styles/scanner_styles';

// Définition du type des props
interface QRCodeScannerScreenProps {
    onScanSuccess: (event: { data: string }) => void;
  }
  
  const QRCodeScannerScreen: React.FC<QRCodeScannerScreenProps> = ({ onScanSuccess }) => {
    return (
      <View style={styles.container}>
        <QRCodeScanner
          onRead={onScanSuccess} // Appelé lorsqu'un QR Code est scanné
          flashMode={RNCamera.Constants.FlashMode.off} // Flash désactivé par défaut
          showMarker={true} // Affiche un marqueur visuel
          topContent={<Text style={styles.text}>Scannez un QR Code</Text>}
        />
      </View>
    );
  };
  
  export default QRCodeScannerScreen;