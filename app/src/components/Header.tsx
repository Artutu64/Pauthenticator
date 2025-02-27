import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/header_styles'; // Import du style externe

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Pauthenticator</Text>
    </View>
  );
};

export default Header;
