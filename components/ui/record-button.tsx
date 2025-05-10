import React, { useEffect, useRef } from "react";
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
  TouchableOpacity,
} from "react-native";
import { MicrophoneIcon, NoMicrophoneIcon } from "../icons";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type HeaderProps = {
  style?: StyleProp<ViewStyle>;
  isRecording?: boolean;
  onPress?: () => void;
  numberOfWords?: number;
};

const RecordButton: React.FC<HeaderProps> = (props) => {
  const currentSize = useSharedValue(50);
  const prevCount = useRef<number>(0);

  const style = useAnimatedStyle(() => {
    const size = withTiming(currentSize.value, {
      duration: 500,
      easing: Easing.bezier(0.5, 0.01, 0, 1),
    });
    return {
      width: size,
      height: size,
    };
  });

  useEffect(() => {
    console.log(
      "isRecording",
      props.isRecording,
      prevCount.current,
      props.numberOfWords
    );
    if (props.isRecording) {
      currentSize.value = 60;
      if (prevCount.current !== props.numberOfWords) {
        prevCount.current = props.numberOfWords || 0;
        currentSize.value = 60 + 5;
        setTimeout(() => {
          currentSize.value = 60;
        }, 500);
      }
    } else {
      currentSize.value = 50;
    }
  }, [props.isRecording, props.numberOfWords, currentSize]);

  return (
    <Animated.View style={[styles.recordingWrapper, style]}>
      <TouchableOpacity
        style={[styles.wrapper, props.style]}
        onPress={() => {
          if (props.isRecording) {
            currentSize.value = 50;
          } else {
            currentSize.value = 60;
          }

          if (props.onPress) {
            props.onPress();
          }
        }}
      >
        <View>
          {props.isRecording ? (
            <MicrophoneIcon fill="#fff" />
          ) : (
            <NoMicrophoneIcon fill="#fff" />
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  recordingWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#2B4B9A",
  },
  wrapper: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#396CE8",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RecordButton;
