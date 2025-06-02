import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveWithExpiry = async (key: string, value: any, ttl: number) => {
    const now = Date.now();
    const item = {
        value,
        expiry: now + ttl
    };
    await AsyncStorage.setItem(key, JSON.stringify(item));
};



export const loadWithExpiry = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key);

        if (jsonValue != null) {
            const item = JSON.parse(jsonValue);
            const now = Date.now();

            if (item.expiry && now > item.expiry) {
                await AsyncStorage.removeItem(key);
                console.log("Dado expirou e foi removido.");
                return null;
            }
            return item.value;
        }
        return null;

    } catch (error) {
        console.log("Erro ao buscar o dado:", error);
        return null;
    }
};

