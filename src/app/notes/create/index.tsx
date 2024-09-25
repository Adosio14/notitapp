import axios from "axios";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Page() {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View
      className="flex flex-1 bg-[#E5D9F2]"
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
      <Content />
    </View>
  );
}

function Content() {
  const [loading, setLoading] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  const postNote = async () => {
    const userId = await AsyncStorage.getItem("userId");
    setLoading(true);
    const response = await axios.post("http://147.182.237.140:3000/note", {
      title: noteTitle,
      content: noteBody,
      userId: userId,
    });
    console.log(response.data);
    if (response.status == 201) {
      router.back();
    }
  };
  return (
    <View className="flex-1 px-6 mt-6">
      <Text className="font-extrabold mb-2 text-indigo-bold text-5xl">
        Nueva nota 📝
      </Text>
      <View className="flex-1 justify-center">
        <Text className="font-bold my-4 text-indigo-bold text-3xl">
          Título de la nota
        </Text>
        <TextInput
          className="bg-light-lavender p-4 w-full text-black rounded-lg"
          onChangeText={(text) => {
            setNoteTitle(text);
          }}
          value={noteTitle}
          placeholder="Reunión importantísima"
          keyboardType="default"
          placeholderTextColor="#A9A9A9"
        />
        <Text className="font-bold my-4 text-indigo-bold text-3xl">
          Cuerpo de la nota
        </Text>
        <TextInput
          className="bg-light-lavender p-4 mt-4w-full text-black rounded-lg"
          onChangeText={(text) => {
            setNoteBody(text);
          }}
          value={noteBody}
          placeholder="En el café la humedad"
          keyboardType="default"
          placeholderTextColor="#A9A9A9"
        />
        <Pressable
          disabled={noteTitle.length == 0 || noteBody.length == 0}
          className="bg-lavender p-4 items-center rounded-lg mt-8"
          onPress={async () => {
            postNote();
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text className="font-bold text-[#FFFFFF] text-lg ">
              Guardar Nota
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
