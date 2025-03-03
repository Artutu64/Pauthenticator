// FICHIER STYLE DU HEADER

import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const style = StyleSheet.create({
  header: {
    justifyContent: 'center',
    paddingLeft: 0, 
    position: 'absolute',
    alignItems: 'center',
    flexDirection :'row',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: height / 8, 
    backgroundColor: '#1e3a8a',
  },
  logo: {
    width: 80,  
    height: 80, 
  },
  title: {
    color: '#fdf9ec', 
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily : "monospace",
  },
});

export default style;

