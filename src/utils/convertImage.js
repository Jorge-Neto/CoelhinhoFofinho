import { Image } from "react-native";
import * as FileSystem from "expo-file-system";
import ImageBase64 from "react-native-image-base64";

export const getBase64Image = async (imagePath) => {
  try {
    const assetSource = Image.resolveAssetSource(imagePath);
    const fileUri = assetSource.uri;

    // Converte a URI da imagem para Base64
    const base64String = await ImageBase64.getBase64String(fileUri);
    return `data:image/png;base64,${base64String}`;
  } catch (error) {
    // console.error("Erro ao converter imagem em Base64:", error);
    return null;
  }
};