import { View, StyleSheet, Image, TouchableOpacity, FlatList, Text, Platform, Pressable } from 'react-native';
import BannerCollapsible from '../../utils/Anuncios/BannerCollapsible';
import AnimatedAndHappy from '../../components/AnimatedAndHappy';
import useOpenAds from '../../utils/Anuncios/useOpenAds';
import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { animaisNat } from '../../data/animais';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import ButtonSom from '../../components/ButtonSom';

export default () => {
    useOpenAds();
    const [sound, setSound] = useState<any>(null);

    async function playSound(animal:any) {
        triggerAnimation();
        const { sound }: any = await Audio.Sound.createAsync(animal);
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const triggerAnimation = () => {
        scale.value = withTiming(0.9, { duration: 100 }, () => {
            scale.value = withTiming(1, { duration: 100 });
        });
    };

    return (
        <View style={styles.container}>
            <AnimatedAndHappy />
            <View style={styles.bodyGrid}>
                <Text style={[styles.titleVideo, {
                    fontFamily: 'RubikVinyl_400Regular'
                }]}
                >Som dos Animais</Text>
                <FlatList
                    data={animaisNat}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <ButtonSom
                            img={item.img}
                            onPress={() => playSound(item.som)}
                        />
                    )}
                    numColumns={4}
                    contentContainerStyle={styles.gridContainer}
                />

            </View>
            {/* <View style={styles.boxBanner}>
                <BannerCollapsible bannerId={'ca-app-pub-1411733442258523/9903405555'} />
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
    titleVideo: {
        alignItems: 'flex-start',
        textAlign: "center",
        fontSize: 40,
        color: '#fff',
        textShadowColor: 'blue',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 5,
        marginTop: 25,
        width: "100%"
    },
    bodyGrid: {
        width: "100%",
        flexDirection: 'column',
        marginHorizontal: 'auto',
        height: "100%",
        // paddingBottom:53
    },

    gridContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxBanner: {
        backgroundColor: "#FFFFFF",
        width: '100%',
        borderColor: "transparent",
        borderWidth: 1,
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
    }
});
