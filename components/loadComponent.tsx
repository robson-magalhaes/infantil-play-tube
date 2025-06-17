import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function LoadComponent() {
  const spinValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${spinValue.value}deg` }],
    };
  });

  useEffect(() => {
    spinValue.value = withRepeat(
      withTiming(360, {
        duration: 1500,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  return (
    <View style={styles.loadingContainer}>
      <AnimatedView style={[styles.spinner, animatedStyle]}>
        <LinearGradient
          start={[0.4, 0.1]}
          end={[0.8, 0.9]}
          locations={[0, 0.15, 0.30, 0.45, 0.60, 0.75, 0.90]}
          colors={[
            '#fd000099',
            '#ffff5e99',
            '#4dc54999',
            '#4f6ed699',
            '#8c69c499',
            '#d931df99',
          ]}
          style={styles.gradient}
        >
        </LinearGradient>
      </AnimatedView>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    zIndex: 9999,
  },
  spinner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderTopColor: '#fff',
    borderRightColor: '#00000050',
    borderBottomColor: '#00000050',
    borderLeftColor: '#fff',
  },
  gradient: {
    width: 200,
    height: 200,
    borderRadius: 100,
    position: 'absolute',
    left: -50,
    top: -50,
  },
});
