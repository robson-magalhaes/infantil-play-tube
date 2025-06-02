import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

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
            <Animated.Image style={[styles.nuvem, animatedStyle, { width:100, height:60,top: 10, right: 140, shadowOffset: { width: -2, height: 2 } }]}
                source={require('../assets/image/nuvem.png')} />

            <Animated.Image style={[styles.nuvem, animatedStyle, { top: 10, right: 0,shadowOffset: { width: 2, height: 2 } }]}
                source={require('../assets/image/nuvem.png')} />

            <Animated.Image style={[styles.nuvem, animatedStyle, { top: 160, left: 70, shadowOffset: { width: -2, height: -1 } }]}
                source={require('../assets/image/nuvem.png')} />

            <Animated.Image style={[styles.nuvem, animatedStyle, { bottom: 140, left: 250, shadowOffset: { width: -2, height: 2 } }]}
                source={require('../assets/image/nuvem.png')} />
                
            <Animated.Image style={[styles.nuvem, animatedStyle, { width:80, height:50,top: 10, left: 150, shadowOffset: { width: -2, height: 2 } }]}
                source={require('../assets/image/nuvem.png')} />
            <Animated.Image style={[styles.nuvem, animatedStyle, { width:80, height:50,bottom: 30, right: 60, shadowOffset: { width: -2, height: 2 } }]}
                source={require('../assets/image/nuvem.png')} />


            <Animated.Image style={[styles.balao, animatedStyleBaloon,
            { bottom: -50, right: 0 }]} source={require('../assets/image/balao1.png')} />
            <Animated.Image style={[styles.balao, animatedStyleBaloon,
            { bottom: -250, left: 150 }]} source={require('../assets/image/balao1.png')} />
            <Animated.Image style={[styles.balao, animatedStyleBaloon,
            { bottom: -550, left: 100 }]} source={require('../assets/image/balao4.png')} />
            <Animated.Image style={[styles.balao, animatedStyleBaloon,
            { bottom: -450, right: 250 }]} source={require('../assets/image/balao2.png')} />
            <Animated.Image style={[styles.balao, animatedStyleBaloon,
            { bottom: -150, right: 100 }]} source={require('../assets/image/balao4.png')} />
            <Animated.Image style={[styles.balao, animatedStyleBaloon,
            { bottom: -850, left: 300 }]} source={require('../assets/image/balao3.png')} />
            <Animated.Image style={[styles.balao, animatedStyleBaloon,
            { bottom: -1050, left: 250 }]} source={require('../assets/image/balao2.png')} />
            <Animated.Image style={[styles.balao, animatedStyleBaloon,
            { bottom: -1550, left: 50 }]} source={require('../assets/image/balao2.png')} />
            <Animated.Image style={[styles.balao, animatedStyleBaloon,
            { bottom: -1870, left: 360 }]} source={require('../assets/image/balao3.png')} />

            <LinearGradient
                start={[0.4, 0.1]}
                end={[0.8, 0.9]}
                locations={[0, 0.60, 0.60, 0.70, 0.80, 0.90, 0.95, 1]}
                colors={['#4fc4d6', '#4fc4d6', '#df3131', '#ffff5e', '#4dc549', '#4f6ed6','#8c69c4', '#4fc4d6']}
                style={styles.background}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width: '100%',
        height: "100%",
        position: "absolute",
        top:0,
        right:0,
        zIndex: -2,
        backgroundColor:'white'
    },
    nuvem: {
        width: 150,
        height: 90,
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