import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const scanAreaSize = width * 0.7; 
const overlayHeight = (height - scanAreaSize) / 2; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  camera: {
    flex: 1,
    width: '100%',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scanArea: {
    width: scanAreaSize,
    height: scanAreaSize,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },

  topOverlay: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: overlayHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: overlayHeight,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  leftOverlay: {
    position: 'absolute',
    left: 0,
    width: (width - scanAreaSize) / 2,
    height: scanAreaSize,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  rightOverlay: {
    position: 'absolute',
    right: 0,
    width: (width - scanAreaSize) / 2,
    height: scanAreaSize,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },

  instructions: {
    position: 'absolute',
    bottom: overlayHeight * 0.5, 
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;
