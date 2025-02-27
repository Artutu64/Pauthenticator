// FICHIER STYLE DU BOUTON  DE L'APP

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#b41731',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 40,  // Ajuste la taille selon ton image
    height: 40,
  },
});

export default styles;
