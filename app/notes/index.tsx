import { useTranscribeApplicationContext } from "@/components/contexts/application-context";
import Header from "@/components/ui/header";
import { Stack, useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TranscriptionData } from "@/components/contexts/types";

const Item: React.FC<{
  data: TranscriptionData;
  onPress: (d: TranscriptionData) => void;
}> = ({ data, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={() => onPress(data)}>
    <Text style={styles.name}>{data.name}</Text>
    <Text style={styles.title} numberOfLines={2}>
      {data.transcription || ""}
    </Text>
  </TouchableOpacity>
);

const NotesIndex = () => {
  const router = useRouter();
  const { transcriptions, setTranscription } =
    useTranscribeApplicationContext();

  return (
    <View style={styles.wrapper}>
      <Stack.Screen options={{ title: "Notes", headerShown: false }} />
      <Header />
      <FlatList
        style={styles.list}
        contentContainerStyle={{ paddingTop: 100 }}
        data={transcriptions}
        renderItem={({ item }) => (
          <Item
            data={item}
            onPress={(data) => {
              setTranscription?.(data);
              router.push("/notes/detail");
            }}
          />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
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
  item: {
    backgroundColor: "#DFDFDF",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    gap: 5,
  },
  title: {
    fontSize: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  list: {
    width: "100%",
    flex: 1,
  },
  cell: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: 200,
    height: 50,
    backgroundColor: "blue",
  },
});

export default NotesIndex;
