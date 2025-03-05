// FICHIER STYLE DU BOUTON DE SUPPRESSION L'APP

import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
      marginTop: 20,
      alignItems: 'center',
      paddingBottom: 20, // Pour éviter que le bouton soit collé au bord
    },
    button: {
      backgroundColor: '#FF3B30',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default style;
