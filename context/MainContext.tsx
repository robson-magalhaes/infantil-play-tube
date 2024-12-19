import { createContext, ReactNode, useState } from "react";

type MainContextType = {
    data: any,
    setData: any
}
export const MainContext = createContext<MainContextType | null>(null);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<MainContextType>();

    return (
        <MainContext.Provider value={{ data, setData }}>
            {children}
        </MainContext.Provider>
    )
}