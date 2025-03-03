// FICHIER STYLE DU BOUTON SCAN DE L'APP

import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    card: {
      backgroundColor: 'white',
      padding: 10,
      marginVertical: 10,
      marginHorizontal: 10,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3, // Ombre sur Android
    },
    text: {
      fontSize: 18,
      color: 'black',
    },
  });

export default style;