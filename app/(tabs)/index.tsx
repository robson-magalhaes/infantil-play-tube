import { useContext, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { getVideosForCategory } from '../../services/fetchData';
import * as Font from 'expo-font';
import { RubikVinyl_400Regular } from '@expo-google-fonts/rubik-vinyl';
import { ButterflyKids_400Regular } from '@expo-google-fonts/butterfly-kids';
import BannerCollapsible from '../../components/BannerCollapsible';
import { MainContext } from '../../context/MainContext';
import AnimatedAndHappy from '../../components/AnimatedAndHappy';
import { SafeAreaView } from 'react-native-safe-area-context';

export default () => {
    const [videosForCategory, setVideosForCategory] = useState<DataType[] | any>([]);
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
    const Ctx = useContext(MainContext);

    Font.useFonts({
        RubikVinyl_400Regular,
        ButterflyKids_400Regular
    });


    useEffect(() => {
        if (Ctx?.data)
            getVideosForCategory(Ctx?.data).then(x => {
                setVideosForCategory(x);
            });
    }, [Ctx?.videos])

    const handleVideoSelect = (videoId: string) => {
        setSelectedVideoId(videoId);
    };

    return (
        <SafeAreaView style={styles.container}>
            <AnimatedAndHappy />
            <View style={styles.container}>
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
                                        <View style={styles.embeddedVideoContainer}>
                                            {selectedVideoId === item.id ? (
                                                <WebView
                                                    source={{
                                                        uri: `https://www.youtube.com/embed/${item.id}?autoplay=1&controls=1&modestbranding=1&showinfo=0&rel=0&autohide=1&iv_load_policy=3`,
                                                    }}
                                                    style={styles.embeddedVideoPlayer}
                                                    javaScriptEnabled={true}
                                                    allowsFullscreenVideo={true}
                                                    domStorageEnabled={true}
                                                    mediaPlaybackRequiresUserAction={false}
                                                />
                                            ) :

                                                <TouchableOpacity
                                                    onPress={() => handleVideoSelect(item.id)}
                                                    activeOpacity={0.7}
                                                    style={{ width: "100%", height: "100%" }}
                                                >
                                                    <Image
                                                        source={{ uri: item.thumbnailUrl }}
                                                        style={{
                                                            width: "100%",
                                                            height: 190,
                                                            borderTopLeftRadius: 10, borderTopRightRadius: 10
                                                        }} />
                                                </TouchableOpacity>
                                            }
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => handleVideoSelect(item.id)}
                                            style={{ width: "100%", height: "100%" }}
                                            activeOpacity={0.7}
                                        >
                                            <Text style={styles.videoText}>{item.title}</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </View>
                    )
                    }
                    ListFooterComponent={
                        <Text
                            style={{
                                textAlign: "center",
                                backgroundColor: "#FFFE5E80",
                                margin: 20,
                                borderRadius: 10,
                                fontSize: 20,
                                fontWeight: "bold",
                                padding: 10,
                                marginBottom: 100
                            }}
                        >
                            Para adicionar uma nova categoria, vá para o menu de configurações
                        </Text>
                    }
                />

                <View style={styles.boxBanner}>
                    <BannerCollapsible bannerId={'ca-app-pub-3940256099942544/9214589741'} />
                </View>
            </View >
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bodyVideoContainer: {
        flex: 1,
        marginBottom: 20
    },
    textVideo: {
        textAlign: "center",
        fontSize: 35,
        color: "black",
        marginTop: 30,
    },
    boxBanner: {
        backgroundColor: "#FFFFFF",
        width: "100%",
        borderColor: "transparent",
        borderWidth: 1,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0
    },
    videoItem: {
        boxShadow: "2 2 1 4 #ffff5e, 4 6 1 8 #f259bc, 6 8 1 12 #4fc4d6, 10 15 10 5 #000000",
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
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    embeddedVideoContainer: {
        height: 200,
        width: '100%',
        marginBottom: 20
    },
    embeddedVideoPlayer: {
        width: '100%',
        height: '100%',
    }
});
