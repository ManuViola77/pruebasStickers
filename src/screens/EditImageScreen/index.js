import React, {useState} from 'react';
import {
  Button,
  ImageBackground,
  FlatList,
  View,
  Text,
  Image,
} from 'react-native';
import {useNavigationParam} from 'react-navigation-hooks';
import dating from 'assets/images/dating.png';
import Sticker from 'components/Sticker';
import styles from './styles';

const EditImageScreen = () => {
  const selectedImage = useNavigationParam('selectedImage');

  const [stickers, setStickers] = useState([]);

  const addSticker = () => {
    const stickersNoSelected = stickers.map(item => {
      return {...item, isSelected: false};
    });
    setStickers([
      ...stickersNoSelected,
      {
        url: dating,
        id: stickers.length + 1,
        isSelected: true,
      },
    ]);
  };

  const setSelected = id => {
    const stickersNoSelected = stickers.map(item => {
      const {id: currentId} = item;
      return {...item, isSelected: id === currentId};
    });
    setStickers(stickersNoSelected);
  };

  const renderStickers = () => {
    const stickersToRender = [];
    stickers.map(item => {
      stickersToRender.push(<Sticker item={item} setSelected={setSelected} />);
    });

    return stickersToRender;
  };

  return (
    <>
      <ImageBackground source={selectedImage} style={styles.image}>
        {/* <FlatList
          scrollEnabled={false}
          data={stickers}
          keyExtractor={({id}) => id.toString()}
          renderItem={({item: {url}}) => <Sticker url={url} />}
        /> */}
        {renderStickers()}
      </ImageBackground>
      <Button title="Add Sticker" onPress={addSticker} />
    </>
  );
};

export default EditImageScreen;

/*import React from 'react';

import {View, Text, Image} from 'react-native';
import Gestures from 'react-native-easy-gestures';
import dating from 'assets/images/dating.png';
import styles from './styles';

const EditImageScreen = () => {
  return (
    <View style={{flex: 1, borderWidth: 2}}>
      <Gestures
        draggable={true}
        scalable={{
          min: 0.1,
          max: 7,
        }}
        rotatable={true}
        onEnd={(event, styles) => {
          console.log(styles);
        }}>
        <Image source={dating} style={styles.pinchableImage} />
      </Gestures>
    </View>
  );
};

export default EditImageScreen;*/

/*import React, {createRef, useState} from 'react';
import {Animated, Image, ImageBackground, Button, FlatList} from 'react-native';
import {useNavigationParam} from 'react-navigation-hooks';
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler';

import dating from 'assets/images/dating.png';
import styles from './styles';
import Sticker from 'components/Sticker';

const EditImageScreen = () => {
  const selectedImage = useNavigationParam('selectedImage');

  const [stickers, setStickers] = useState([]);

  const addSticker = () => {
    setStickers([
      ...stickers,
      {
        url: dating,
        id: stickers.length + 1,
      },
    ]);
  };

  ///////////////////////////////////
  const panRef = createRef();
  const rotationRef = createRef();
  const pinchRef = createRef();

  // Pinching
  const initialPinch = {
    baseScale: new Animated.Value(1),
    pinchScale: new Animated.Value(1),
    lastScale: 1,
  };

  const [pinch, setPinch] = useState({
    ...initialPinch,
    scale: Animated.multiply(initialPinch.baseScale, initialPinch.pinchScale),
  });

  const onPinchGestureEvent = () =>
    Animated.event([{nativeEvent: {scale: pinch.pinchScale}}]);

  // Rotation
  const initialRotate = {
    rotate: new Animated.Value(0),
    lastRotate: 0,
  };

  const [rotate, setRotate] = useState({
    ...initialRotate,
    rotateStr: initialRotate.rotate.interpolate({
      inputRange: [-100, 100],
      outputRange: ['-100rad', '100rad'],
    }),
  });

  const onRotateGestureEvent = () =>
    Animated.event([{nativeEvent: {rotation: rotate.rotate}}]);

  // Tilt
  const initialTilt = {
    tilt: new Animated.Value(0),
    lastTilt: 0,
  };

  const [tilt, setTilt] = useState({
    ...initialTilt,
    tiltStr: initialTilt.tilt.interpolate({
      inputRange: [-501, -500, 0, 1],
      outputRange: ['1rad', '1rad', '0rad', '0rad'],
    }),
  });

  const onTiltGestureEvent = () =>
    Animated.event([{nativeEvent: {translationY: tilt.tilt}}]);

  const onRotateHandlerStateChange = event => {
    console.log('1');
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setRotate({
        ...rotate,
        lastRotate: rotate.lastRotate + event.nativeEvent.rotation,
      });
      rotate.rotate.setOffset(rotate.lastRotate);
      rotate.rotate.setValue(0);
    }
  };
  const onPinchHandlerStateChange = event => {
    console.log('2');
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setPinch({
        ...pinch,
        lastScale: pinch.lastScale * event.nativeEvent.scale,
      });
      pinch.baseScale.setValue(pinch.lastScale);
      pinch.pinchScale.setValue(1);
    }
  };
  const onTiltGestureStateChange = event => {
    console.log('3');
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setTilt({
        ...tilt,
        lastTilt: tilt.lastTilt + event.nativeEvent.translationY,
      });
      tilt.tilt.setOffset(tilt.lastTilt);
      tilt.tilt.setValue(0);
    }
  };

  const renderItem = url => (
    <Animated.Image
      style={[
        styles.pinchableImage,
        {
          transform: [
            {perspective: 200},
            {scale: pinch.scale},
            {rotate: rotate.rotateStr},
            {rotateX: tilt.tiltStr},
          ],
        },
      ]}
      source={url}
    />
  );

  return (
    <>
      <ImageBackground source={selectedImage} style={styles.image}>
        <PanGestureHandler
          ref={panRef}
          onGestureEvent={onTiltGestureEvent}
          onHandlerStateChange={onTiltGestureStateChange}
          minDist={10}
          minPointers={2}
          maxPointers={2}
          avgTouches>
          <Animated.View style={styles.wrapper}>
            <RotationGestureHandler
              ref={rotationRef}
              simultaneousHandlers={pinchRef}
              onGestureEvent={onRotateGestureEvent}
              onHandlerStateChange={onRotateHandlerStateChange}>
              <Animated.View style={styles.wrapper}>
                <PinchGestureHandler
                  ref={pinchRef}
                  simultaneousHandlers={rotationRef}
                  onGestureEvent={onPinchGestureEvent}
                  onHandlerStateChange={onPinchHandlerStateChange}>
                  <Animated.View style={styles.container} collapsable={false}>
                    <FlatList
                      data={stickers}
                      keyExtractor={({id}) => id.toString()}
                      renderItem={({item: {url}}) => renderItem(url)}
                    />
                  </Animated.View>
                </PinchGestureHandler>
              </Animated.View>
            </RotationGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </ImageBackground>

      <Button title="Add Sticker" onPress={addSticker} />
    </>
  );

  //return <Sticker url={dating} />;
};

export default EditImageScreen;*/

/* renderItem={({item: {url}}) => (
            <Image style={styles.sticker} source={url} />
          )}


          (
                        <Sticker
                          url={url}
                          pinch={pinch}
                          rotate={rotate}
                          tilt={tilt}
                        />
                      )
          */
