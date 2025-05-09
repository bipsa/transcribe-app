import AsyncStorage from "@react-native-async-storage/async-storage";
import { TranscriptionData } from "../contexts/types";

export const storeData = async (value: TranscriptionData[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("data", jsonValue);
  } catch (e) {
    console.log("Error storing data", e);
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("data");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Error getting data", e);
  }
};