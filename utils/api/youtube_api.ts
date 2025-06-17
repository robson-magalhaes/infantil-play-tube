import axios from "axios";

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";
const API_KEY = "AIzaSyDxysgSCuD6mA9KAzml40GqV705Oc4GOPk";

export const getVideos = async () => {
  try {
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: "snippet",
        q: "Videos infantis", //searchQuery,
        type: "video",
        key: API_KEY,
        maxResults: 20,
      },
    });
    const videosData = response.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails.high.url,
    }));

    return videosData;
  } catch (error) {
    console.error("Erro ao buscar vídeos:", error);
  }
};

export const getPopular = async () => {
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/videos",
    {
      params: {
        part: "snippet",
        chart: "mostPopular",
        type: "video",
        key: API_KEY,
        maxResults: 20,
      },
    }
  );
  const videosData = response.data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    thumbnailUrl: item.snippet.thumbnails.high.url,
  }));

  return videosData;
};
export const searchVideos = async (searchQuery: string) => {
  if (!searchQuery) return;

  try {
    const response = await axios.get(YOUTUBE_API_URL, {
      params: {
        part: "snippet",
        q: searchQuery,
        type: "video",
        key: API_KEY,
        maxResults: 20,
      },
    });

    const videosData = response.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails.high.url,
    }));
    return videosData;
  } catch (error) {
    console.error("Erro ao buscar vídeos:", error);
  }
};
