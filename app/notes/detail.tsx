import { useTranscribeApplicationContext } from "@/components/contexts/application-context";
import Header from "@/components/ui/header";
import { Stack, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <ScrollView>
          <View style={styles.content}>
            <Text style={styles.transcription}>
              {transcription?.transcription}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 60,
    paddingHorizontal: 20,
    width: "100%",
  },
  transcription: {
    fontSize: 18,
    lineHeight: 24,
    color: "#000",
    textAlign: "left",
    width: "100%",
  },
});

export default NoteDetail;
