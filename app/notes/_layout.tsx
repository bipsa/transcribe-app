import { Stack } from "expo-router";

export default function NotesLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="detail" />
    </Stack>
  );
}
