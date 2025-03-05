// FICHIER STYLE DU BACKGROUND DE LA HOMEPAGE DE L'APP

import { StyleSheet } from 'react-native';
import { Tooltip } from 'react-native-paper';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 102,
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    paddingTop : 10,
  },
  emptyMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop : 250,
  },
  emptyMessageText: {
    color: '#FFFFFF', 
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default style;
