import React, { useEffect } from 'react';
import { View, Alert, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

// INCLUSION DU STYLE
import style from '../styles/home_screen_styles';

// INCLUSION DES COMPONENTS
import Header from '../components/Header';
import FloatingButton from '../components/Bouton_scan';



/////   FONCTION PRINCIPALE   /////
const HomeScreen = ({ navigation }) => {

  return (
    <View style={style.container}>
      <Header />
      <FloatingButton onPress={() => navigation.navigate('Scanner')} />
    </View>
  );
};

export default HomeScreen;



