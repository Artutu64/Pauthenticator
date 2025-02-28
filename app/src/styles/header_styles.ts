// FICHIER STYLE DU HEADER

import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: height / 8, 
    backgroundColor: '#17b49a',
    justifyContent: 'center',
    paddingLeft: 20, 
  },
  title: {
    color: '#fdf9ec', 
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default styles;
