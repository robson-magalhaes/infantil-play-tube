import { View, StyleSheet, FlatList, Text, Pressable } from 'react-native';
import AnimatedAndHappy from '../../components/AnimatedAndHappy';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Audio } from 'expo-av';
import { animaisNat } from '../../data/animais';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import ButtonSom from '../../components/ButtonSom';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import ModalComponent from '../../components/ModalComponent';
import BannerFixed from '../../utils/Anuncios/BannerFixed';


export default () => {
    const [sound, setSound] = useState<any>(null);
    const navigation = useNavigation();
    const [loadModal, setLoadModal] = useState<boolean>(false);
    const [isButtonPressed, setIsButtonPressed] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            tabBarStyle: {
                display: isButtonPressed ? 'none' : 'flex',
                height: 35,
            },
        });
    }, [isButtonPressed]);

    const handleBlockView = () => {
        isButtonPressed ? setLoadModal(!loadModal) : setIsButtonPressed(!isButtonPressed);
    }
    async function playSound(animal: any) {
        triggerAnimation();
        const { sound }: any = await Audio.Sound.createAsync(animal);
        setSound(sound);
        await sound.playAsync();
    }

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const scale = useSharedValue(1);

    const triggerAnimation = () => {
        scale.value = withTiming(0.9, { duration: 100 }, () => {
            scale.value = withTiming(1, { duration: 100 });
        });
    };

    return (
        <View style={styles.container}>
            <AnimatedAndHappy />
            {loadModal && <ModalComponent load={loadModal} setLoad={setLoadModal} setBlockView={setIsButtonPressed} />}
            <View style={styles.bodyGrid}>
                <FlatList
                    data={animaisNat}
                    keyExtractor={(_, index) => index.toString()}
                    decelerationRate={0}
                    ListHeaderComponent={

                        <Text style={[styles.titleVideo, {
                            fontFamily: 'RubikVinyl_400Regular'
                        }]}
                        >Som dos Animais.</Text>
                    }
                    renderItem={({ item }) => (
                        <ButtonSom
                            img={item.img}
                            onPress={() => playSound(item.som)}
                        />
                    )}
                    contentContainerStyle={[styles.gridContainer, { paddingBottom: 60 }]}
                    numColumns={4}
                />

            </View>

            {
                !isButtonPressed &&
                <View style={styles.boxBanner}>
                    <BannerFixed bannerId={'ca-app-pub-1411733442258523/9903405555'} />
                </View>
            }

            {isButtonPressed ?
                <Pressable style={styles.btnBlock}
                    onPress={handleBlockView}>
                    <Text><FontAwesome size={28} name="lock" /></Text>
                </Pressable>
                :
                <Pressable style={styles.btnBlock}
                    onPress={handleBlockView}>
                    {<Text><FontAwesome size={28} name="unlock" /></Text>}
                </Pressable>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"
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
        height: "100%"
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
    },
    btnBlock: {
        position: "absolute",
        top: 15,
        right: 17,
        width: 45,
        height: 45,
        backgroundColor: '#fff',
        boxShadow: "inset -1 -1 2 2 #00000080, 1 1 1 1 #00000080",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        zIndex: 999
    },
});
