import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';

// INCLUSION DU STYLE
import styles from '../styles/home_screen_styles';

// INCLUSION DES COMPONENTS
import Header from '../components/Header';
import FloatingButton from '../components/Bouton_scan';
import Card from '../components/Card';
import BoutonSupp from '../components/Bouton_supp';




/////   FONCTION PRINCIPALE   /////
const HomeScreen = ({ route, navigation }) => {

  // État pour stocker les QR Codes scannés
  const [scannedData, setScannedData] = useState([]);

  // État pour détecter si un nouveau code a été ajouté
  const [isNewTOTPAdded, setIsNewTOTPAdded] = useState(false);

  // Fonction pour récupérer les QR Codes stockés de manière sécurisée
  const loadStoredData = async () => {
    try {
      const storedData = await EncryptedStorage.getItem("stored_urls");
      if (storedData) {
        setScannedData(JSON.parse(storedData))
      }
    } catch (error) {
      console.error("❌ Erreur lors du chargement des QR Codes stockés :", error);
    }
  };

  // Charger les données stockées à l’ouverture de l’écran
  useEffect(() => {
    loadStoredData();
  }, []);

  // Charger les données lorsque l'écran est en focus (utile pour retour après scan)
  useFocusEffect(
    useCallback(() => {
      loadStoredData();
    }, [])
  );

  // Ajouter un nouveau QR Code scanné si reçu depuis `route.params`
  useEffect(() => {
    if (route.params?.scannedData) {
      setScannedData((prevData) => [...prevData, route.params.scannedData]);
      setIsNewTOTPAdded(true); // Déclenche l'alerte après l'ajout du code
    }
  }, [route.params?.scannedData]);

  // Affiche une alerte quand un nouveau code est ajouté
  useEffect(() => {
    if (isNewTOTPAdded) {
      Alert.alert("Succès", "Code ajouté avec succès", [
        { text: "OK", onPress: () => setIsNewTOTPAdded(false) }
      ]);
    }
  }, [isNewTOTPAdded]);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.cardsContainer}>
          {scannedData.length > 0 ? (
            <View>
              {scannedData.map((data, index) => (
                <Card key={index} data={data.url} />
              ))}
              <BoutonSupp 
                onClear={async () => {
                  await EncryptedStorage.removeItem("stored_urls"); 
                  setScannedData([]);
                }} 
              />
            </View>
          ) : (
            <View style={styles.emptyMessageContainer}>
              <Text style={styles.emptyMessageText}>Aucun QR Code enregistré</Text>
            </View>
          )}
        </ScrollView>

      <FloatingButton onPress={() => navigation.navigate('Scanner')} />
    </View>
  );
};

export default HomeScreen;
