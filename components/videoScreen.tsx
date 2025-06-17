import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useNavigation } from '@react-navigation/native';

export default({videoId, videos, currentIndex}:any) => {
    const navigation = useNavigation();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(currentIndex);

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

    const currentVideoId = '0'//videos[currentVideoIndex]?.id || videoId;

    return (
        <View style={{ flex: 1 }}>
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
                    videoId={currentVideoId ?? 'p-_9yyQZvLo'}
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
        height: "100%",
        width: "100%",
        backgroundColor: 'transparent',
        justifyContent: 'center',
        margin: 'auto',
        position: "absolute",
        top:0,
        left:0,                
        zIndex: 2
    },
});