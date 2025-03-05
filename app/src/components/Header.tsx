import React from 'react';
import { View, Text, Image } from 'react-native';

// INCLUSION DU STYLE
import styles from '../styles/header_styles'; 



/////   FONCTION PRINCIPALE   /////
const Header = () => {
  
  return (
    <View style={styles.header}>
      <Image source={require('../../logo_blanc.png')} style={styles.logo} resizeMode="contain" />   
      <Text style={styles.title}>Pauthenticator</Text>
    </View>
  );
};

export default Header;
