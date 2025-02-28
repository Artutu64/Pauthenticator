import React from 'react';
import { TouchableOpacity, View, Image, GestureResponderEvent } from 'react-native';

// INCLUSION DU STYLE
import styles from '../styles/bouton_scan_styles';

interface FloatingButtonProps {
  onPress: (event: GestureResponderEvent) => void;
}



/////   FONCTION PRINCIPALE   /////
const FloatingButton: React.FC<FloatingButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image source={require('../assets/images/logo_qrcode.png')} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

export default FloatingButton;
