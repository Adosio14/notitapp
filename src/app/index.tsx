import { Link, router } from "expo-router";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import NoteCard from "../app/Card";

export default function Page() {
  return (
    <View className="flex flex-1 bg-[#E5D9F2]">
      <Header />
      <Content />
    </View>
  );
}

function Content() {
  return (
    <View className="flex-1">
      <View className="p-5 md:py-24 lg:py-32 xl:py-48">
        <TextInput
          className="bg-light-lavender p-2 mb-8 rounded-lg"
          onChangeText={() => {}}
          value="5"
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
        <NoteCard
          id="3"
          content="When the world keeps trying to drag me down, I raise my hand, gonna stand my ground, and I say, Have a nice day ;) When the world keeps trying to drag me down, I raise my hand, gonna stand my ground, and I say, Have a nice day ;) When the world keeps trying to drag me down, I raise my hand, gonna stand my ground, and I say, Have a nice day ;) When the world keeps trying to drag me down, I raise my hand, gonna stand my ground, and I say, Have a nice day ;)"
          title="Título de ejemplo"
          timestamp="2023-09-15 14:30"
          onDelete={() => {
            router.push(`/notes/edit/${3}`);
          }}
          onEdit={() => {}}
        ></NoteCard>
      </View>
    </View>
  );
}

function Header() {
  const { top } = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: top }}>
      <View className="px-4 lg:px-6 h-14 flex items-center flex-row justify-between">
        <Text className="font-extrabold text-indigo-bold text-4xl flex-1 items-center justify-center">
          Notitapp
        </Text>
      </View>
    </View>
  );
}
