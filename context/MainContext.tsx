import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
import { CategoryType } from "../types/CategoryType";

type MainContextType = {
    data: CategoryType[];
    setData: (newData: CategoryType[]) => void;
    videos: any[],
    setVideos: (videos: any[]) => void
};

export const category: CategoryType[] = [
    {
        id: 0,
        name: "Mais Populares"
    },
    {
        id: 1,
        name: "Hora do papa"
    },
    {
        id: 2,
        name: "Videos para dormir"
    }
];

export const MainContext = createContext<MainContextType | null>(null);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<CategoryType[]>(category);
    const [videos, setVideos] = useState<any[]>([]);

    useEffect(() => {
        const loadCategoriesFromStorage = async () => {
            try {
                const storedData = await AsyncStorage.getItem('my-category');
                if (storedData !== null) {
                    const parsedData = JSON.parse(storedData);
                    setData(parsedData);
                } else {
                    setData(category);
                }
            } catch (error) {
                console.error("Erro ao carregar dados do AsyncStorage:", error);
                setData(category);
            }
        };

        loadCategoriesFromStorage();
    }, []);

    return (
        <MainContext.Provider value={{ data, setData, videos, setVideos }}>
            {children}
        </MainContext.Provider>
    );
};
