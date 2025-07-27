import { createContext, useContext, useState } from "react";


type ImageContextType = {
    images: string[],
    setImages: React.Dispatch<React.SetStateAction<string[]>>
}

const imageContext = createContext<ImageContextType | undefined>(undefined);


export const ImageContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [images, setImages] = useState<string []>([]);

    return (
        <imageContext.Provider value={{ images, setImages }}>
            { children }
        </imageContext.Provider>
    )
}


export const useImageContext = () => {
    const context = useContext(imageContext);

    if (!context) {
        throw new Error('usage of Image Context outside of it\'s provider');
    }

    return context;
}