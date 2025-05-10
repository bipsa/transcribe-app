import { useTranscribeApplicationContext } from "@/components/contexts/application-context";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Voice from "@react-native-voice/voice";
import { uniqueId } from "@/components/utils/strings";
import RecordButton from "@/components/ui/record-button";
import { ListIcon } from "@/components/icons";

const Index = () => {
  const router = useRouter();
  const { setIsRecording, isRecording, addTranscription } =
    useTranscribeApplicationContext();
  const currentSpeech = useRef<string | null>(null);
  const [numberOfWords, setNumberOfWords] = useState(0);

  useEffect(() => {
    Voice.onSpeechStart = (e) => {
      currentSpeech.current = null;
    };
    Voice.onSpeechEnd = () => {
      console.log("onSpeechEnd");
    };
    Voice.onSpeechError = (e) => {
      console.log("onSpeechError", e);
    };
    Voice.onSpeechResults = (e) => {
      if (e.value && e.value.length > 0) {
        currentSpeech.current = e.value[0];
        setNumberOfWords(currentSpeech.current.split(" ").length);
      }
    };
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      <RecordButton
        isRecording={isRecording}
        numberOfWords={numberOfWords}
        onPress={async () => {
          if (!isRecording) {
            try {
              setIsRecording?.(true);
              await Voice.start("en-US");
            } catch (e) {
              console.error("Voice.start error", e);
              setIsRecording?.(false);
            }
          } else {
            addTranscription?.({
              id: uniqueId(),
              name: `Transcription ${new Date().toLocaleString()}`,
              createdAt: new Date().getTime(),
              audio: "",
              viewed: false,
              transcription: currentSpeech.current || "No transcription",
            });
            setIsRecording?.(false);
            await Voice.stop();
          }
        }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/notes");
        }}
      >
        <ListIcon fill="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#396CE8",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Index;
