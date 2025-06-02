import { createContext, ReactNode, useState } from "react";

type ParentalContextType = {
    passParental: string;
    setPassParental: React.Dispatch<React.SetStateAction<string>>
}
export const ParentalContext = createContext<ParentalContextType | null>(null)

export const ParentalProvider = ({ children }: { children: ReactNode }) => {
    const [passParental, setPassParental] = useState<string>('');
    return (
        <ParentalContext.Provider value={{ passParental, setPassParental }}>
            {children}
        </ParentalContext.Provider>
    )
}