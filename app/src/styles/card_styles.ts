// FICHIER STYLE DU BOUTON SCAN DE L'APP

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
      elevation: 3, 
    },
    text: {
      fontSize: 18,
      color: 'black',
    },
    otpCode: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 10,
    },
    progressBar: {
      height: 8,
      borderRadius: 4,
      marginVertical: 10,
    },
});

export default styles;
