import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// INCLUSION DU STYLE
import styles from '../styles/card_styles';

// Définition du type des props du composant Card
interface CardProps {
  data: string; // Définir `data` comme une chaîne de caractères
}

/////   FONCTION   /////
const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{data}</Text>
    </View>
  );
};

export default Card;
