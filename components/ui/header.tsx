import { useRouter } from "expo-router";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from "react-native";
import { ChevronIcon, TrashIcon } from "../icons";

export type HeaderProps = {
  style?: StyleProp<ViewStyle>;
  showDeleteAction?: boolean;
  onDelete?: () => void;
};

const Header: React.FC<HeaderProps> = (props) => {
  const router = useRouter();

  return (
    <View style={[styles.wrapper, props.style]}>
      <SafeAreaView style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <ChevronIcon fill="#000" />
          <Text>Go Back</Text>
        </TouchableOpacity>
        <View style={styles.rContainer}>
          {props.showDeleteAction && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                props.onDelete?.();
              }}
            >
              <TrashIcon fill="#000" />
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    display: "flex",
    paddingHorizontal: 12,
    paddingVertical: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  content: {
    minHeight: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default Header;
