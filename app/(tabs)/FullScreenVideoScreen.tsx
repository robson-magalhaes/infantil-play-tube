import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useNavigation, useRoute } from '@react-navigation/native';
import AnimatedAndHappy from '../../components/AnimatedAndHappy';

export default function FullScreenVideoScreen() {
    const route = useRoute();
    const { 
        videoId = 'p-_9yyQZvLo', 
        videos = [],
        currentIndex = 0 
    } = route.params || {};
    const navigation = useNavigation();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(currentIndex);

// Atualiza o índice sempre que mudar o parâmetro da rota
useEffect(() => {
    const newIndex = route.params?.currentIndex ?? 0;
    setCurrentVideoIndex(newIndex);
}, [route.params]);



    const handleNextVideo = () => {
        if (videos.length === 0) {
            navigation.goBack(); // Se não houver vídeos, volta
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
        <View style={{ flex: 1 }}>
            <AnimatedAndHappy />
            <View style={styles.container}>
                <YoutubePlayer
                    height={Dimensions.get('window').height}
                    width={Dimensions.get('window').width - 210}
                    play={true}
                    webViewStyle={{
                        backgroundColor: '#transparent',
                        width: '100%',
                        height: '100%',
                        justifyContent: "center",
                        alignContent: "center",
                        marginTop:20
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignContent: "center",
        margin: 'auto',
                        
    },
});