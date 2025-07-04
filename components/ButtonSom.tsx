// components/BotaoAnimal.tsx
import React from 'react';
import { TouchableOpacity, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    runOnJS,
} from 'react-native-reanimated';

type Props = {
    img: ImageSourcePropType;
    onPress: () => void;
};

export default ({ img, onPress }: Props) => {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const handlePress = () => {
        scale.value = withTiming(0.8, { duration: 150 }, () => {
            scale.value = withTiming(1, { duration: 150 });
            runOnJS(onPress)();
        });
    };

    return (
        <TouchableOpacity onPress={handlePress} activeOpacity={1}>
            <Animated.View style={[styles.buttonAnimal, animatedStyle]}>
                <Image source={img} style={styles.imgAnimal} />
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonAnimal: {
        backgroundColor: '#FFFFFF',
        marginVertical: 32,
        marginHorizontal: 32,
        width: 140,
        height: 140,
        borderRadius: 30,
        boxShadow: "2 2 1 4 #ffff5e, 3 4 1 7 #f259bc, 4 5 1 10 #4fc4d6, 10 15 10 5 #000000",
    },
    imgAnimal: {
        width: "80%",
        height: '80%',
        margin: "auto",
        resizeMode: 'contain',
    }
});
