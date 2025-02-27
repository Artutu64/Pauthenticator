import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/card_styles';

interface CardProps {
  content: string;
}

const Card: React.FC<CardProps> = ({ content }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{content}</Text>
    </View>
  );
};

export default Card;
