// FICHIER STYLE DU HEADER

import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const style = StyleSheet.create({
  header: {
    justifyContent: 'center',
    paddingLeft: 20, 
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: height / 8, 
    backgroundColor: '#17b49a',

  },
  title: {
    color: '#fdf9ec', 
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default style;

