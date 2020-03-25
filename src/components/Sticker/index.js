import React, {createRef, useState} from 'react';
import {Image, View} from 'react-native';
import Gestures from 'react-native-easy-gestures';

import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
  State,
} from 'react-native-gesture-handler';

import styles from './styles';

const Sticker = ({item, setSelected}) => {
  const {id, isSelected, url} = item;
  /* const panRef = createRef();
  const rotationRef = createRef();
  const pinchRef = createRef();

  //Pinching
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

  return (
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
              </Animated.View>
            </PinchGestureHandler>
          </Animated.View>
        </RotationGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  ); */

  /* return (
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
  ); */

  return (
    <Gestures
      draggable={true}
      scalable={{
        min: 0.1,
        max: 7,
      }}
      rotatable={true}
      onStart={() => setSelected(id)}
      onEnd={(event, styles) => {
        console.log(styles);
      }}>
      <View style={styles.container}>
        <Image
          source={url}
          style={[styles.pinchableImage, isSelected ? styles.isSelected : {}]}
        />
      </View>
    </Gestures>
  );
};

export default Sticker;
