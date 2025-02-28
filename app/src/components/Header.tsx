import React from 'react';
import { View, Text } from 'react-native';

// INCLUSION DU STYLE
import styles from '../styles/header_styles'; 



/////   FONCTION PRINCIPALE   /////
const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Pauthenticator</Text>
    </View>
  );
};

export default Header;
