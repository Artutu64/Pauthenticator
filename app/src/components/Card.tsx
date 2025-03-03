import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// INCLUSION DU STYLE
import styles from '../styles/card_styles';
import generateTOTPFromURL from '../tools/TOTP';

// Définition du type des props du composant Card
interface CardProps {
  data: string; // Définir `data` comme une chaîne de caractères
}

/////   FONCTION   /////
const Card: React.FC<CardProps> = ({ data }) => {

  let totp = generateTOTPFromURL(data)

  return (
    <View style={styles.card}>
      <Text style={styles.text}>{totp}</Text>
    </View>
  );
};

export default Card;
