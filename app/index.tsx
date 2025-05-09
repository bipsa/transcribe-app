import { useTranscribeApplicationContext } from "@/components/contexts/application-context";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";

const Index = () => {
  const router = useRouter();
  const { setIsRecording, isRecording, addTranscription } =
    useTranscribeApplicationContext();

  useEffect(() => {
    console.log(isRecording);
  }, [isRecording]);

  return (
    <View style={styles.wrapper}>
      <Button
        title="Add transcription"
        onPress={() => {
          addTranscription?.({
            id: "4",
            name: "Another transcription",
            createdAt: new Date().getTime(),
            audio: "",
            viewed: false,
            transcription: "Hola, soy una transcripción",
          });
        }}
      />
      <Button
        title="Record audio"
        onPress={() => {
          setIsRecording?.(isRecording ? false : true);
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
