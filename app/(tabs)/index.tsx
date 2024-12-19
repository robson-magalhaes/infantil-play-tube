import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image, Dimensions, Text, Pressable } from 'react-native';
import { WebView } from 'react-native-webview';
import { getVideosForCategory } from '../../services/category';
import * as Font from 'expo-font';
import { RubikVinyl_400Regular } from '@expo-google-fonts/rubik-vinyl';
import { LinearGradient } from 'expo-linear-gradient';
import { ButterflyKids_400Regular } from '@expo-google-fonts/butterfly-kids';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import BannerCollapsible from '../../components/BannerCollapsible';

export default () => {
    const [videosForCategory, setVideosForCategory] = useState<CategoryType[] | any>([]);
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

    Font.useFonts({
        RubikVinyl_400Regular,
        ButterflyKids_400Regular
    });

    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
    useEffect(() => {
        scale.value = withRepeat(
            withTiming(scale.value + 0.1, { duration: 700 }), -1, true)
    }, [])


    useEffect(() => {
        getVideosForCategory().then(x => {
            setVideosForCategory(x);
        });
    }, [])

    const handleVideoSelect = (videoId: string) => {
        setSelectedVideoId(videoId);
    };

    return (
        <View style={styles.container}>

            <Animated.Image style={[styles.nuvem, animatedStyle, { top: 0, left: 0 }]}
                source={require('../../assets/image/nuvem.png')} />

            <Animated.Image style={[styles.nuvem, animatedStyle, { top: 160, left: 170 }]}
                source={require('../../assets/image/nuvem.png')} />

            <Animated.Image style={[styles.nuvem, animatedStyle, { bottom: 100, left: -50 }]}
                source={require('../../assets/image/nuvem.png')} />

            <LinearGradient
                start={[0, 0]}
                end={[1, 1]}
                locations={[0.2, 0.65, 0.8, 0.90, 0.95]}
                colors={['transparent', '#4fc4d6', '#f259bc', '#ffff5e', 'green', 'transparent']}
                style={styles.background}
            />

            <FlatList
                data={videosForCategory}
                keyExtractor={(item) => item.nameCategory}
                renderItem={({ item }) => (
                    <View style={styles.bodyVideoContainer}>
                        <Text style={[styles.textVideo, {
                            fontFamily: 'RubikVinyl_400Regular'
                        }]}
                        >
                            {item.nameCategory}
                        </Text>
                        <FlatList
                            data={item.data}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View style={styles.videoItem}>
                                    {selectedVideoId === item.id ? (
                                        <View style={styles.embeddedVideoContainer}>
                                            <WebView
                                                source={{
                                                    uri: `https://www.youtube.com/embed/${item.id}?autoplay=1&controls=1&modestbranding=1`,
                                                }}
                                                style={styles.embeddedVideoPlayer}
                                                javaScriptEnabled={true}
                                                allowsFullscreenVideo={true}
                                                domStorageEnabled={true}
                                                mediaPlaybackRequiresUserAction={false}
                                            />
                                        </View>
                                    ) :
                                        <Pressable onPress={() => handleVideoSelect(item.id)}>
                                            <Image
                                                source={{ uri: item.thumbnailUrl }}
                                                style={{
                                                    width: "100%",
                                                    height: 200,
                                                    borderTopLeftRadius: 10, borderTopRightRadius: 10
                                                }} />
                                            <Text
                                                style={styles.videoText}>{item.title}</Text>
                                        </Pressable>
                                    }
                                </View>
                            )}
                        />
                    </View>
                )
                }
            />
            <View style={styles.boxBanner}>
                <BannerCollapsible bannerId={'ca-app-pub-3940256099942544/9214589741'} />
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: "#e4f5f7"
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        zIndex: -1
    },
    bodyVideoContainer: {
        flex: 1,
        marginBottom: 30,
    },
    textVideo: {
        marginLeft: 15,
        fontSize: 40,
        color: "black",
    },
    boxBanner: {
        height: 100,
        flex: 1,
        borderColor: "transparent",
        borderTopColor: "green",
        borderWidth: 1,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    },
    videoItem: {
        boxShadow: "2 2 1 4 #ffff5e, 4 6 1 8 #f259bc, 6 8 1 12 #4fc4d6, 7 9 4 14 #000000",
        width: Dimensions.get('screen').width * 0.79,
        minHeight: 300,
        margin: 30,
        marginLeft: 15,
        padding: 5,
        borderRadius: 10,
    },
    videoText: {
        height: 110,
        fontSize: 19,
        fontWeight: "bold",
        padding: 13,
        backgroundColor: "#FFFFFF60",
        borderColor: 'black',
        borderWidth: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    embeddedVideoContainer: {
        height: Dimensions.get('window').width * 0.56,
        width: '100%',
        marginBottom: 20,
    },
    embeddedVideoPlayer: {
        width: '50%',
        height: '100%',
    },
    nuvem: {
        width: 300,
        height: 200,
        position: "absolute"
    }
});
