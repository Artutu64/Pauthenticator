// FICHIER STYLE DU HEADER

import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: height / 8, // 1/6 de la hauteur de l'écran
    backgroundColor: '#17b49a',
    justifyContent: 'center',
    paddingLeft: 20, // Marge à gauche
  },
  title: {
    color: '#fdf9ec', // Blanc
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default styles;
