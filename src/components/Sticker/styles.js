import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 150,
    bottom: 0,
  },
  isSelected: {
    borderWidth: 2,
    borderColor: 'purple',
  },
  pinchableImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  wrapper: {
    flex: 1,
  },
});

export default styles;
