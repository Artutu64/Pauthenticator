// FICHIER STYLE DU BACKGROUND DE LA HOMEPAGE DE L'APP

import { StyleSheet } from 'react-native';
import { Tooltip } from 'react-native-paper';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 102, // Décalage sous le Header pour éviter la superposition
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    paddingTop : 10,
  },
  emptyMessageContainer: {
    flex: 1, // Prend toute la hauteur disponible
    justifyContent: 'center', // Centre verticalement
    alignItems: 'center', // Centre horizontalement
    paddingTop : 250,
  },
  emptyMessageText: {
    color: '#FFFFFF', // Texte en blanc
    fontSize: 22, // Taille du texte
    fontWeight: 'bold', // Texte en gras
    textAlign: 'center', // Centre le texte s'il y a plusieurs lignes
  },
});

export default style;
