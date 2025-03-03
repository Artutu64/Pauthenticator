import React, { useEffect, useState } from 'react';
import { View, Alert, BackHandler, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

// INCLUSION DU STYLE
import styles from '../styles/home_screen_styles';

// INCLUSION DES COMPONENTS
import Header from '../components/Header';
import FloatingButton from '../components/Bouton_scan';
import Card from '../components/Card';


/////   FONCTION PRINCIPALE   /////
const HomeScreen = ({ route, navigation }) => {
  
  // État pour stocker les QR Codes scannés
  const [scannedData, setScannedData] = useState([]);

  // Ajoute un nouveau QR Code scanné quand `route.params?.scannedData` est mis à jour
  useEffect(() => {
    if (route.params?.scannedData) {
      setScannedData((prevData) => [...prevData, route.params.scannedData]);
    }
  }, [route.params?.scannedData]);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView>
        {/* Affichage des QR Codes scannés sous forme de cartes */}
        {scannedData.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </ScrollView>
      <FloatingButton onPress={() => navigation.navigate('Scanner')} />
    </View>
  );
};

export default HomeScreen;
