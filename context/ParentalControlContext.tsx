import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";

type ParentalContextType = {
    passParental: string;
    setPassParental: React.Dispatch<React.SetStateAction<string>>
}
export const ParentalContext = createContext<ParentalContextType | null>(null)

export const ParentalProvider = ({ children }: { children: ReactNode }) => {
    const [passParental, setPassParental] = useState<string>('');
    useEffect(() => {
        const loadPassParental = async () => {
            try {
                const passParental = await AsyncStorage.getItem('parentalPass');
                if (passParental !== null) {
                    setPassParental(passParental);
                } else {
                    setPassParental('');
                }
            } catch (error) {
                console.error("Erro ao carregar dados do AsyncStorage:", error);
                setPassParental('');
            }
        };

        loadPassParental();
    }, []);
    return (
        <ParentalContext.Provider value={{ passParental, setPassParental }}>
            {children}
        </ParentalContext.Provider>
    )
}