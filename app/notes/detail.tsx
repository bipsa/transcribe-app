import { useTranscribeApplicationContext } from "@/components/contexts/application-context";
import Header from "@/components/ui/header";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const NoteDetail = () => {
  const router = useRouter();
  const { transcription, removeTranscription } =
    useTranscribeApplicationContext();
  useEffect(() => {}, []);

  return (
    <View style={styles.wrapper}>
      <Stack.Screen options={{ title: "Notes", headerShown: false }} />
      <Header
        onDelete={() => {
          Alert.alert(
            "Delete transcription",
            "Are you sure you want to delete this transcription?",
            [
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
              },
              {
                text: "Delete",
                onPress: () => {
                  if (transcription) {
                    removeTranscription?.(transcription.id);
                    router.back();
                  }
                },
              },
            ]
          );
        }}
        showDeleteAction
      />
      <Text>{transcription?.transcription}</Text>
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

export default NoteDetail;
