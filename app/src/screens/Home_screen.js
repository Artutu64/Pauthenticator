import React, { useEffect } from 'react';
import { View, Alert, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

// INCLUSION DU STYLE
import styles from '../styles/home_screen_styles';

// INCLUSION DES COMPONENTS
import Header from '../components/Header';
import FloatingButton from '../components/Bouton_scan';

const HomeScreen = ({ navigation }) => {
  
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Quitter l'application ?", "Voulez-vous vraiment fermer l'application ?", [
          { text: "Annuler", style: "cancel" },
          { text: "Oui", onPress: () => BackHandler.exitApp() }
        ]);
        return true; 
      };

      const backHandler = BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => backHandler.remove(); 
    }, [])
  );

  return (
    <View style={styles.container}>
      <Header />
      <FloatingButton onPress={() => navigation.navigate('Scanner')} />
    </View>
  );
};

export default HomeScreen;



