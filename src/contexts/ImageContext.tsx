import { createContext, useContext, useState } from "react";

type Image = {
  image: string,
  filter: string,
}


type ImageContextType = {
    images: Image[],
    setImages: React.Dispatch<React.SetStateAction<Image[]>>
}

const imageContext = createContext<ImageContextType | undefined>(undefined);


export const ImageContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [images, setImages] = useState<Image []>([]);

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