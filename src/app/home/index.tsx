import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NotesList from "@/components/NotesList";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";

export default function Page() {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      className="flex flex-1 bg-[#E5D9F2]"
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
      <Header />
      <Content />
    </View>
  );
}

function Content() {
  return (
    <View className="flex-1 px-6">
      <NotesList />
      <Pressable
        className="absolute bottom-8 right-8 bg-lavender-dark rounded-full p-4 shadow-lg"
        onPress={() => {
          console.log("FAB pressed!");
          router.push("/notes/create");
        }}
      >
        <Feather name="plus" size={24} color="white" />
      </Pressable>
    </View>
  );
}

function Header() {
  return (
    <View>
      <View className="px-4 lg:px-6 h-14 flex items-center flex-row justify-between">
        <Text className="font-extrabold text-indigo-bold text-4xl flex-1 items-center justify-center">
          Notitapp
        </Text>
      </View>
    </View>
  );
}
