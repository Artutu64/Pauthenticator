// FICHIER STYLE DU BACKGROUND DE LA HOMEPAGE DE L'APP

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf9ec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scannedDataContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
  },
  scannedDataText: {
    fontSize: 16,
    color: 'black',
    marginVertical: 5,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Fond assombri pour l'effet focus
  },
  camera: {
    width: 250, // Carré de 250x250 pixels
    height: 250,
    borderRadius: 20, // Coins arrondis
    overflow: 'hidden',
  }
});

export default styles;
