import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import {EDIT_IMAGE_SCREEN} from 'constants/screens';

const MainScreen = ({navigation}) => {
  const [selectedImage, setSelectedImage] = useState({});

  useEffect(() => {
    selectedImage.uri &&
      navigation.navigate(EDIT_IMAGE_SCREEN, {
        selectedImage: selectedImage,
      });
  }, [navigation, selectedImage]);

  const openPicker = () => {
    ImagePicker.openPicker({
      cropping: true,
      //cropperCircleOverlay: true,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      height: 1000,
      width: 1000,
    })
      .then(image => {
        setSelectedImage({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
      })
      .catch(e => alert(e));
  };

  const takeNewPhoto = () => {
    ImagePicker.openCamera({
      cropping: true,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType: 'photo',
    })
      .then(image => {
        setSelectedImage({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        });
      })
      .catch(e => alert(e));
  };

  return (
    <SafeAreaView>
      <View>
        <Button title="SelectImageFromGalleryAndCrop" onPress={openPicker} />
        <Button title="TakeNewPhotoAndCrop" onPress={takeNewPhoto} />
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

/* EXAMPLE!!!!!
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  NativeModules,
} from 'react-native';

var ImagePicker = NativeModules.ImageCropPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      image: null,
      images: null,
    };
  }

  pickSingleWithCamera(cropping, mediaType = 'photo') {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
      mediaType,
    })
      .then(image => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch(e => alert(e));
  }

  pickSingleBase64(cropit) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
    })
      .then(image => {
        console.log('received base64 image');
        this.setState({
          image: {
            uri: `data:${image.mime};base64,` + image.data,
            width: image.width,
            height: image.height,
          },
          images: null,
        });
      })
      .catch(e => alert(e));
  }

  cleanupImages() {
    ImagePicker.clean()
      .then(() => {
        console.log('removed tmp images from tmp directory');
      })
      .catch(e => {
        alert(e);
      });
  }

  cleanupSingleImage() {
    let image =
      this.state.image ||
      (this.state.images && this.state.images.length
        ? this.state.images[0]
        : null);
    console.log('will cleanup image', image);

    ImagePicker.cleanSingle(image ? image.uri : null)
      .then(() => {
        console.log(`removed tmp image ${image.uri} from tmp directory`);
      })
      .catch(e => {
        alert(e);
      });
  }

  cropLast() {
    if (!this.state.image) {
      return Alert.alert(
        'No image',
        'Before open cropping only, please select image',
      );
    }

    ImagePicker.openCropper({
      path: this.state.image.uri,
      width: 200,
      height: 200,
    })
      .then(image => {
        console.log('received cropped image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  pickSingle(cropit, circular = false, mediaType) {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    })
      .then(image => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          },
          images: null,
        });
      })
      .catch(e => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
    })
      .then(images => {
        this.setState({
          image: null,
          images: images.map(i => {
            console.log('received image', i);
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
            };
          }),
        });
      })
      .catch(e => alert(e));
  }

  scaledHeight(oldW, oldH, newW) {
    return (oldH / oldW) * newW;
  }

  renderImage(image) {
    return (
      <Image
        style={{width: 300, height: 300, resizeMode: 'contain'}}
        source={image}
      />
    );
  }

  renderAsset(image) {
    return this.renderImage(image);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.image ? this.renderAsset(this.state.image) : null}
          {this.state.images
            ? this.state.images.map(i => (
                <View key={i.uri}>{this.renderAsset(i)}</View>
              ))
            : null}
        </ScrollView>

        <TouchableOpacity
          onPress={() => this.pickSingleWithCamera(false)}
          style={styles.button}>
          <Text style={styles.text}>Select Single Image With Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.pickSingleWithCamera(true)}
          style={styles.button}>
          <Text style={styles.text}>
            Select Single With Camera With Cropping
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.pickSingle(false)}
          style={styles.button}>
          <Text style={styles.text}>Select Single</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.cropLast()} style={styles.button}>
          <Text style={styles.text}>Crop Last Selected Image</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.pickSingleBase64(false)}
          style={styles.button}>
          <Text style={styles.text}>Select Single Returning Base64</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.pickSingle(true)}
          style={styles.button}>
          <Text style={styles.text}>Select Single With Cropping</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.pickSingle(true, true)}
          style={styles.button}>
          <Text style={styles.text}>Select Single With Circular Cropping</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.pickMultiple.bind(this)}
          style={styles.button}>
          <Text style={styles.text}>Select Multiple</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.cleanupImages.bind(this)}
          style={styles.button}>
          <Text style={styles.text}>Cleanup All Images</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.cleanupSingleImage.bind(this)}
          style={styles.button}>
          <Text style={styles.text}>Cleanup Single Image</Text>
        </TouchableOpacity>
      </View>
    );
  }
}*/

/*
import React from 'react';
import {Animated, StyleSheet} from 'react-native';

import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler';

import mountain from 'assets/images/mountain.jpg';

export class PinchableBox extends React.Component {
  panRef = React.createRef();
  rotationRef = React.createRef();
  pinchRef = React.createRef();
  constructor(props) {
    super(props);

    // Pinching
    this._baseScale = new Animated.Value(1);
    this._pinchScale = new Animated.Value(1);
    this._scale = Animated.multiply(this._baseScale, this._pinchScale);
    this._lastScale = 1;
    this._onPinchGestureEvent = Animated.event([
      {nativeEvent: {scale: this._pinchScale}},
    ]);

    // Rotation
    this._rotate = new Animated.Value(0);
    this._rotateStr = this._rotate.interpolate({
      inputRange: [-100, 100],
      outputRange: ['-100rad', '100rad'],
    });
    this._lastRotate = 0;
    this._onRotateGestureEvent = Animated.event([
      {nativeEvent: {rotation: this._rotate}},
    ]);

    // Tilt
    this._tilt = new Animated.Value(0);
    this._tiltStr = this._tilt.interpolate({
      inputRange: [-501, -500, 0, 1],
      outputRange: ['1rad', '1rad', '0rad', '0rad'],
    });
    this._lastTilt = 0;
    this._onTiltGestureEvent = Animated.event([
      {nativeEvent: {translationY: this._tilt}},
    ]);
  }

  _onRotateHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastRotate += event.nativeEvent.rotation;
      this._rotate.setOffset(this._lastRotate);
      this._rotate.setValue(0);
    }
  };
  _onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastScale *= event.nativeEvent.scale;
      this._baseScale.setValue(this._lastScale);
      this._pinchScale.setValue(1);
    }
  };
  _onTiltGestureStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      this._lastTilt += event.nativeEvent.translationY;
      this._tilt.setOffset(this._lastTilt);
      this._tilt.setValue(0);
    }
  };
  render() {
    return (
      <PanGestureHandler
        ref={this.panRef}
        onGestureEvent={this._onTiltGestureEvent}
        onHandlerStateChange={this._onTiltGestureStateChange}
        minDist={10}
        minPointers={2}
        maxPointers={2}
        avgTouches>
        <Animated.View style={styles.wrapper}>
          <RotationGestureHandler
            ref={this.rotationRef}
            simultaneousHandlers={this.pinchRef}
            onGestureEvent={this._onRotateGestureEvent}
            onHandlerStateChange={this._onRotateHandlerStateChange}>
            <Animated.View style={styles.wrapper}>
              <PinchGestureHandler
                ref={this.pinchRef}
                simultaneousHandlers={this.rotationRef}
                onGestureEvent={this._onPinchGestureEvent}
                onHandlerStateChange={this._onPinchHandlerStateChange}>
                <Animated.View style={styles.container} collapsable={false}>
                  <Animated.Image
                    style={[
                      styles.pinchableImage,
                      {
                        transform: [
                          {perspective: 200},
                          {scale: this._scale},
                          {rotate: this._rotateStr},
                          {rotateX: this._tiltStr},
                        ],
                      },
                    ]}
                    source={mountain}
                  />
                </Animated.View>
              </PinchGestureHandler>
            </Animated.View>
          </RotationGestureHandler>
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

export default PinchableBox;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    overflow: 'hidden',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  pinchableImage: {
    width: 250,
    height: 250,
  },
  wrapper: {
    flex: 1,
  },
});*/
