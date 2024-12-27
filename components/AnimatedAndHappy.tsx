import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

export default () => {
    const scale = useSharedValue(1);
    const translateBaloonY = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
    const animatedStyleBaloon = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateBaloonY.value }
        ],
    }));

    useEffect(() => {
        scale.value = withRepeat(
            withTiming(scale.value + 0.1, { duration: 600 }), -1, true
        );

        translateBaloonY.value = withRepeat(
            withTiming(translateBaloonY.value - 2700,
                {
                    duration: 16 * 1000,
                }
            ), -1, false)
    }, [])
    return (
        <View style={styles.container}>
            <Animated.Image style={[styles.nuvem, animatedStyle, { top: 0, left: 0, shadowOffset: { width: -2, height: -1 } }]}
                source={require('../assets/image/nuvem.png')} />

            <Animated.Image style={[styles.nuvem, animatedStyle, { top: 160, left: 170, shadowOffset: { width: -2, height: -1 } }]}
                source={require('../assets/image/nuvem.png')} />

            <Animated.Image style={[styles.nuvem, animatedStyle, { bottom: 100, left: -50, shadowOffset: { width: -2, height: 2 } }]}
                source={require('../assets/image/nuvem.png')} />

            <Animated.Image style={[styles.balao, animatedStyleBaloon,
            { bottom: -50, left: 0 }]} source={require('../assets/image/balao1.png')} />
            <Animated.Image style={[styles.balao, animatedStyleBaloon,
            { bottom: -250, left: 150 }]} source={require('../assets/image/balao1.png')} />
            <Animated.Image style={[styles.balao, animatedStyleBaloon,
            { bottom: -550, left: 100 }]} source={require('../assets/image/balao4.png')} />
            <Animated.Image style={[styles.balao, animatedStyleBaloon,
            { bottom: -850, left: 300 }]} source={require('../assets/image/balao3.png')} />
            <Animated.Image style={[styles.balao, animatedStyleBaloon,
            { bottom: -1050, left: 250 }]} source={require('../assets/image/balao2.png')} />
            <Animated.Image style={[styles.balao, animatedStyleBaloon,
            { bottom: -1550, left: 50 }]} source={require('../assets/image/balao2.png')} />
            <Animated.Image style={[styles.balao, animatedStyleBaloon,
            { bottom: -1870, left: 360 }]} source={require('../assets/image/balao3.png')} />

            <LinearGradient
                start={[0, 0]}
                end={[0.9, 0.9]}
                locations={[0.2, 0.65, 0.8, 0.90, 0.95, 1]}
                colors={['transparent', '#4fc4d6', '#f259bc', '#ffff5e', 'green', '#4fc4d6']}
                style={styles.background}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: 450,
        position: "absolute",
        zIndex: -2
    },
    nuvem: {
        width: 300,
        height: 200,
        position: "absolute",
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        shadowColor: "#000",
        ...Platform.select({
            android: {
                elevation: 10,
            },
        }),
        zIndex: -1
    },
    balao: {
        width: 100,
        height: 200,
        position: "absolute",
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        zIndex: -2
    }
})