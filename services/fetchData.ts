import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadWithExpiry, saveWithExpiry } from "./handleLocalStorage";
import { listAll } from "../data/list_backup";
import { CategoryType } from "../types/CategoryType";

const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';
// const API_KEY = 'AIzaSyDxysgSCuD6mA9KAzml40GqV705Oc4GOPk';
//const API_KEY = 'AIzaSyCgR3FnoHJqd2WdJzyeLbfecwhLTBb26Gw';
//const API_KEY = "AIzaSyBQAJAlrG_gkXXTiU52TmnPafpNy09zPGs";
const API_KEY = 'AIzaSyDKjaA3r5vTrrt7TGylps2gfmiyVchlq3k';

export const getVideosBackup = () => {
    const data: DataType[] = [];
    listAll.forEach((item, index) => {
        const result = item.data.items.map((x: any) => ({
            id: x.id.videoId,
            title: x.snippet.title,
            thumbnailUrl: x.snippet.thumbnails.high.url,
        }));
        data.push({ nameCategory: item.nameCategory.toUpperCase(), data: result });
    })
    return data
}


export const getVideosForCategory = async (category: CategoryType[]) => {
    let data: DataType[] = [];
    const value: any = await loadWithExpiry('my-key');
    // await AsyncStorage.removeItem("my-key");
    // await AsyncStorage.removeItem("my-category");
    try {
        if (value === null) {
            for (const item of category) {
                const response = await axios.get(YOUTUBE_API_URL, {
                    params: {
                        part: 'snippet',
                        type: 'video',
                        q: 'Videos infantis ' + item.name,
                        key: API_KEY,
                        fields: "items(id/videoId,snippet/title,snippet/thumbnails),nextPageToken",
                        maxResults: 50
                    },
                });

                const videosData = response.data.items.map((x: any) => ({
                    id: x.id.videoId,
                    title: x.snippet.title,
                    thumbnailUrl: x.snippet.thumbnails.high.url,
                }));

                data.push({ nameCategory: item.name.toUpperCase(), data: videosData });
            }

            const jsonValue = JSON.stringify(data);
            await saveWithExpiry('my-key', jsonValue, 24 * 3600 * 1000);
            
            await AsyncStorage.setItem("my-category", JSON.stringify(category))
            await AsyncStorage.setItem('backup-Zz', jsonValue);


            console.log('Fez nova requisição');
            return data;
        } else {
           // return getVideosBackup()
            return JSON.parse(value);
        }
    } catch (error) {
        console.error('Erro ao buscar vídeos:', error);
        try {
            const backupValue = await AsyncStorage.getItem('backup-Zz');
            if (backupValue !== null) {
                return JSON.parse(backupValue);
            } else {
                return getVideosBackup()
            }
        } catch (error) {
            console.error('Erro ao recuperar backup:', error);
            return [];
        }
    }
};



export const getAllVideosInYoutube = async (category: CategoryType[]) => {
    let data: DataType[] = [];

    for (const item of category) {
        let nextPageToken = '';
        let allVideos: DataType[] = [];

        do {
            const response = await axios.get(YOUTUBE_API_URL, {
                params: {
                    part: 'snippet',
                    type: 'video',
                    q: 'Videos infantis ' + item.name,
                    key: API_KEY,
                    fields: "items(id/videoId,snippet/title,snippet/thumbnails),nextPageToken",
                    maxResults: 50, 
                    pageToken: nextPageToken,
                },
            });

            const videosData = response.data.items.map((x: any) => ({
                id: x.id.videoId,
                title: x.snippet.title,
                thumbnailUrl: x.snippet.thumbnails.high.url,
            }));

            allVideos = [...allVideos, ...videosData];
            nextPageToken = response.data.nextPageToken;

        } while (nextPageToken);

        data.push({ nameCategory: item.name.toUpperCase(), data: allVideos });
    }
};