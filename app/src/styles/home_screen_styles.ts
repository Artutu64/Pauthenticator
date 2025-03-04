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
});

export default style;
