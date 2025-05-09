import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { TranscriptionData } from "./types";
import { getData, storeData } from "../utils/storage";

export interface TranscribeApplicationContextInterface {
  theme: "light" | "dark";
  setTheme?: Dispatch<SetStateAction<"light" | "dark">>;
  isRecording: boolean;
  setIsRecording?: Dispatch<SetStateAction<boolean>>;
  transcriptions: TranscriptionData[];
  setTranscriptions?: Dispatch<SetStateAction<TranscriptionData[]>>;
  transcription: TranscriptionData | null;
  setTranscription?: Dispatch<SetStateAction<TranscriptionData | null>>;
}

export const TranscribeApplicationContext =
  createContext<TranscribeApplicationContextInterface>({
    theme: "light",
    isRecording: false,
    transcriptions: [],
    transcription: null,
  });

export const useTranscribeApplicationContext = () => {
  const {
    theme,
    setTheme,
    isRecording,
    setIsRecording,
    setTranscriptions,
    transcriptions,
    setTranscription,
    transcription,
  } = useContext(TranscribeApplicationContext);

  /**
   * Adds a new transcription
   */
  const addTranscription = useCallback(
    (newTranscription: TranscriptionData) => {
      if (setTranscriptions) {
        setTranscriptions((prevTranscriptions) => {
          const updatedTranscriptions = [
            ...prevTranscriptions,
            newTranscription,
          ];
          storeData(updatedTranscriptions);
          return updatedTranscriptions;
        });
      }
    },
    [setTranscriptions]
  );

  /**
   * Removes a transcription by id
   */
  const removeTranscription = useCallback(
    (id: string) => {
      if (setTranscriptions) {
        setTranscriptions((prevTranscriptions) => {
          const updatedTranscriptions = prevTranscriptions.filter(
            (transcription) => transcription.id !== id
          );
          storeData(updatedTranscriptions);
          return updatedTranscriptions;
        });
      }
    },
    [setTranscriptions]
  );

  return {
    theme,
    setTheme,
    isRecording,
    setIsRecording,
    addTranscription,
    removeTranscription,
    transcriptions,
    setTranscription,
    transcription,
  };
};

export const TranscribeApplication: React.FC<{ children: ReactNode }> = (
  props
) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<"light" | "dark">(colorScheme || "light");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcriptions, setTranscriptions] = useState<TranscriptionData[]>([]);
  const [transcription, setTranscription] = useState<TranscriptionData | null>(
    null
  );

  useEffect(() => {
    setTheme(colorScheme || "light");
  }, [colorScheme]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if (data) {
        setTranscriptions(data);
      }
    };
    fetchData();
  }, []);

  return (
    <TranscribeApplicationContext.Provider
      value={{
        theme,
        setTheme,
        isRecording,
        setIsRecording,
        transcriptions,
        setTranscriptions,
        transcription,
        setTranscription,
      }}
    >
      {props.children}
    </TranscribeApplicationContext.Provider>
  );
};
