import React from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';

export default function ProgresiveImage(props) {
  const {defaultImageSource, source, style, ...and} = props;
  let defaultImageAnimated = new Animated.Value(0);
  let ImageAnimated = new Animated.Value(0);

  const handleDefaultImageLoad = () => {
    Animated.timing(defaultImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleImageLoad = () => {
    Animated.timing(ImageAnimated, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        {...and}
        source={defaultImageSource}
        style={[style, {opacity: defaultImageAnimated}]}
        onLoad={handleDefaultImageLoad}
        blurRadius={1}
      />
      <Animated.Image
        {...and}
        source={source}
        style={[style, {opacity: ImageAnimated}, styles.imageOverlay]}
        onLoad={handleImageLoad}
        blurRadius={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e4e8',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
