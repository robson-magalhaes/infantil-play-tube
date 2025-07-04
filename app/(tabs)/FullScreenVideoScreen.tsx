import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Text } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useNavigation, useRoute } from '@react-navigation/native';
import AnimatedAndHappy from '../../components/AnimatedAndHappy';
import ModalComponent from '../../components/ModalComponent';
import { FontAwesome } from '@expo/vector-icons';
import BannerQuadrado from '../../utils/Anuncios/BannerFull';

export default function FullScreenVideoScreen() {
    const route = useRoute() as any;
    const { 
        videoId = 'p-_9yyQZvLo', 
        videos = [],
        currentIndex = 0 
    }:any = route.params || {};
    const navigation = useNavigation();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(currentIndex);
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
useEffect(() => {
    const newIndex = route.params?.currentIndex ?? 0;
    setCurrentVideoIndex(newIndex);
}, [route.params]);



    const handleNextVideo = () => {
        if (videos.length === 0) {
            navigation.goBack();
            return;
        }

        const nextIndex = currentVideoIndex + 1;
        if (nextIndex < videos.length) {
            setCurrentVideoIndex(nextIndex);
        } else {
            navigation.goBack();
        }
    };

    const currentVideoId = videos[currentVideoIndex]?.id || videoId;

    return (
        <View style={{ flex: 1}}>
            <AnimatedAndHappy />
            {loadModal && <ModalComponent load={loadModal} setLoad={setLoadModal} setBlockView={setIsButtonPressed} />}
            <View style={styles.container}>
                <YoutubePlayer
                    height={Dimensions.get('window').height}
                    width={(Dimensions.get('window').height) * (16 / 9)}
                    play={true}
                    webViewStyle={{
                        backgroundColor: '#transparent',
                    }}
                    videoId={currentVideoId}
                    initialPlayerParams={{
                        modestbranding: true,
                        rel: false,
                        controls: true
                    }}
                    onChangeState={(event) => {
                        if (event === 'ended') {
                            handleNextVideo();
                        }
                    }}
                />
            </View>
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
      {isButtonPressed &&
        <View style={styles.viewBlock}></View>
      }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    viewBlock: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        height: '100%',
        borderBlockColor: 'blue',
        borderWidth: 2
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