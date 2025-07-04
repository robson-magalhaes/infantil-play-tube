import { useContext, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { getVideosForCategory } from '../../services/fetchData';
import * as Font from 'expo-font';
import { RubikVinyl_400Regular } from '@expo-google-fonts/rubik-vinyl';
import { ButterflyKids_400Regular } from '@expo-google-fonts/butterfly-kids';
import { MainContext } from '../../context/MainContext';
import AnimatedAndHappy from '../../components/AnimatedAndHappy';
import useOpenAds from '../../utils/Anuncios/useOpenAds';
import { useNavigation } from 'expo-router';
import { RootStackParamList } from '../../types/RootStackParamList';
import { CategoryType } from '../../types/CategoryType';
import LoadComponent from '../../components/loadComponent';
import BannerFixed from '../../utils/Anuncios/BannerFixed';
import GAMBannerInlineAdaptive from '../../utils/Anuncios/GAMBannerInlineAdaptive';

export default () => {
    useOpenAds();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<RootStackParamList>();
    const [videosForCategory, setVideosForCategory] = useState<DataType[] | any>([]);
    const Ctx = useContext(MainContext);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const bannerIds = [
        'ca-app-pub-1411733442258523/9903405555',
        'ca-app-pub-1411733442258523/7704693606'
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerIndex((prev) => (prev + 1) % bannerIds.length);
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    Font.useFonts({
        RubikVinyl_400Regular,
        ButterflyKids_400Regular
    });

    useEffect(() => {
        if (Ctx?.data)
            getVideosForCategory(Ctx?.data).then(x => {
                setVideosForCategory(x);
                setLoading(true);
            });
    }, [Ctx?.videos])

    const handleNavigateToFullScreen = (videoItem: DataType) => {
        const categoryWithVideo = videosForCategory.find((category: any) =>
            category.data.some((v: CategoryType) => v.id === videoItem.id)
        );
        const videoList = categoryWithVideo?.data || [];
        const currentIndex = videoList.findIndex((v: any) => v.id === videoItem.id);

        navigation.navigate('FullScreenVideoScreen', {
            videoId: videoItem.id,
            videos: videoList,
            currentIndex: currentIndex >= 0 ? currentIndex : 0
        });

    };

    return (
        <View style={{ flex: 1 }}>
            <AnimatedAndHappy />
            <View>
                {!loading ?
                    <LoadComponent />
                    :
                    <>
                        <FlatList
                            data={videosForCategory}
                            keyExtractor={(item) => item.nameCategory}
                            decelerationRate={0}
                            renderItem={({ item, index }) => (
                                <View style={[styles.bodyVideoContainer, {}]}>
                                    <Text style={[styles.titleVideo, {
                                        fontFamily: 'RubikVinyl_400Regular'
                                    }]}
                                    >
                                        {item.nameCategory}
                                    </Text>
                                    <FlatList
                                        data={item.data}
                                        horizontal={true}
                                        decelerationRate={0}
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item) => item.id}
                                        renderItem={({ item }) => (
                                            <View style={styles.videoItem}>
                                                <View style={styles.embeddedVideoContainer}>
                                                    <TouchableOpacity
                                                        onPress={() => handleNavigateToFullScreen(item)}
                                                        style={{ width: "100%", height: "100%" }}
                                                        activeOpacity={0.7}
                                                    >
                                                        <Image
                                                            source={{ uri: item.thumbnailUrl }}
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                borderTopLeftRadius: 10, borderTopRightRadius: 10
                                                            }} />
                                                        <Text style={styles.videoText}>{item.title}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )}
                                    />
                                    {index % 2 == 0 &&
                                    <View style={{width:"100%", alignItems: 'center', marginVertical: 25 }}>
                                        <GAMBannerInlineAdaptive bannerId={bannerIds[currentBannerIndex]} />
                                    </View>
                                    }
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

                        {/* ANUNCIO AQUI*/}
                        <View style={styles.boxBanner}>
                            <BannerFixed bannerId={'ca-app-pub-1411733442258523/9903405555'} />
                        </View>
                    </>

                }

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    bodyVideoContainer: {
        flex: 1,
        marginBottom: 20,
        alignItems: "flex-start"
    },
    titleVideo: {
        alignItems: 'flex-start',
        textAlign: "left",
        fontSize: 40,
        color: '#fff',
        textShadowColor: 'blue',
        textShadowOffset: { width: 3, height: 3 },
        textShadowRadius: 5,
        marginTop: 30,
        marginLeft: 17,
        width: "100%"
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
        width: 320,
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
        height: 170,
        width: '100%'
    },
    embeddedVideoPlayer: {
        width: '100%',
        height: '100%',
    }
});
