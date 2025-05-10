import { useTranscribeApplicationContext } from "@/components/contexts/application-context";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Button, StyleSheet, View } from "react-native";
import Voice from "@react-native-voice/voice";
import { uniqueId } from "@/components/utils/strings";

const Index = () => {
  const router = useRouter();
  const { setIsRecording, isRecording, addTranscription } =
    useTranscribeApplicationContext();
  const currentSpeech = useRef<string | null>(null);

  useEffect(() => {
    console.log(isRecording);
  }, [isRecording]);

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
      console.log("onSpeechResults", e.value);
      if (e.value && e.value.length > 0) {
        currentSpeech.current = e.value[0];
      }
    };
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      <Button
        title={isRecording ? "Stop" : "Record audio"}
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
      <Button
        title="Go to Recordings"
        onPress={() => {
          router.push("/notes");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Index;
