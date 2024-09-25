import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Note } from "@/components/NotesList";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NoteDetails = () => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <View
      className="flex flex-1 bg-[#E5D9F2]"
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
      <Content />
    </View>
  );
};
function Content() {
  const data = useLocalSearchParams();

  let parsedData: Note | undefined;

  if (typeof data.data === "string") {
    try {
      parsedData = JSON.parse(data.data) as Note;
    } catch (error) {
      console.error("Error al parsear el JSON:", error);
    }
  }

  const [loading, setLoading] = useState(false);
  const [noteTitle, setNoteTitle] = useState(parsedData.title);
  const [noteBody, setNoteBody] = useState(parsedData.content);

  const updateNote = async () => {
    const userId = await AsyncStorage.getItem("userId");
    setLoading(true);
    const response = await axios.put(
      `http://147.182.237.140:3000/note/${parsedData.id}`,
      {
        title: noteTitle,
        content: noteBody,
        userId: userId,
      }
    );
    console.log(response.data);
    if (response.status == 200) {
      router.back();
    }
  };
  return (
    <View className="flex-1 px-6 mt-6">
      <Text className="font-extrabold mb-2 text-indigo-bold text-5xl">
        Editando nota 📝
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
            updateNote();
          }}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text className="font-bold text-[#FFFFFF] text-lg ">
              Actualizar Nota
            </Text>
          )}
        </Pressable>
        <Pressable
          disabled={noteTitle.length == 0 || noteBody.length == 0}
          className="bg-lavender-pale p-4 items-center border border-lavender-dark rounded-lg mt-8"
          onPress={() => {
            router.back();
          }}
        >
          <Text className="font-bold text-lavender-dark text-lg ">
            Cancelar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
export default NoteDetails;
