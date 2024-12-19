import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadWithExpiry, saveWithExpiry } from "./handleLocalStorage";
import { infantil } from "../data/lista_personalizada";
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
const API_KEY = 'AIzaSyDxysgSCuD6mA9KAzml40GqV705Oc4GOPk';

export const category = [
    {
        name: "Mais Populares",
        icon: ""
    },
    {
        name: "Hora do papa ",
        icon: ""
    }
]


export const getVideosForCategory = async () => {
    let data: CategoryType[] = [];
    try {
        //await AsyncStorage.removeItem('my-key');
        const value: any = await loadWithExpiry('my-key');

        if (value === null) {
            for (let item in category) {
                const response = await axios.get(YOUTUBE_API_URL, {
                    params: {
                        part: 'snippet',
                        q: 'Videos infantis ' + category[item].name,
                        type: 'video',
                        key: API_KEY,
                        maxResults: 5
                    },
                });

                const videosData = response.data.items.map((item: any) => ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    thumbnailUrl: item.snippet.thumbnails.high.url,
                }));
                //    const videosData = infantil;

                data[item] = { nameCategory: (category[item].name).toUpperCase(), data: videosData };
            }
            const jsonValue = JSON.stringify(data);
            saveWithExpiry('my-key', jsonValue, 3600 * 1000);

            // await AsyncStorage.setItem('my-key', jsonValue);
            await AsyncStorage.setItem('backup-Zz', jsonValue);

            return data;
        } else {
            return value != null ? JSON.parse(value) : null;
        }
    } catch (error) {
        console.error('1 - Erro ao buscar vídeos:', error);
        try {
            const value = await AsyncStorage.getItem('backup-Zz');
            if (value !== null) {
                return value != null ? JSON.parse(value) : null;
            } else {
                for (let item in category) {
                    const videosData = infantil;

                    data[item] = { nameCategory: (category[item].name).toUpperCase(), data: videosData };
                }
                return data
            }
        } catch (error) {
            console.error('2 - Erro:', error);
        }
    }
}