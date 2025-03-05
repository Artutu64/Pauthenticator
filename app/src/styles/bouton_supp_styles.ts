// FICHIER STYLE DU BOUTON DE SUPPRESSION L'APP

import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
      marginTop: 10,
      alignItems: 'center',
      paddingBottom: 20, // Pour éviter que le bouton soit collé au bord
    },
    button: {
      backgroundColor: '#1e3a8a',
      paddingVertical: 12,
      paddingHorizontal: 90,
      borderRadius: 15,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default style;
