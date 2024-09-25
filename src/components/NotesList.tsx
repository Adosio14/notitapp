import {
  SectionList,
  View,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import NoteCard from "./NoteCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
  deletedAt?: Date;
}

interface NoteMonth {
  monthName: string;
  notes: Note[];
}

interface NoteYear {
  year: string;
  months: NoteMonth[];
}

export default function NotesList() {
  const [notesData, setNotesData] = useState<NoteYear[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem("userId");
      const response = await axios.get(
        `http://147.182.237.140:3000/note/${userId}`
      );
      setNotesData(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const deleteNote = async (id: string) => {
    try {
      const response = await axios.post(
        `http://147.182.237.140:3000/note/${id}`
      );
      if (response.status === 200) {
        // Llama a fetchNotes después de eliminar la nota
        fetchNotes();
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const filteredNotes = notesData
    .map((yearSection) => ({
      year: yearSection.year,
      months: yearSection.months
        .map((monthSection) => ({
          monthName: monthSection.monthName,
          notes: monthSection.notes.filter((note) =>
            note.title.toLowerCase().includes(searchText.toLowerCase())
          ),
        }))
        .filter((monthSection) => monthSection.notes.length > 0),
    }))
    .filter((yearSection) => yearSection.months.length > 0);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <TextInput
        className="bg-light-lavender p-2 mt-8 mb-8 text-black rounded-lg"
        onChangeText={(text) => setSearchText(text)} // Actualiza el estado del filtro
        value={searchText}
        placeholder="Buscar por título"
        keyboardType="default"
        placeholderTextColor="#A9A9A9"
      />
      {filteredNotes.length != 0 ? (
        <SectionList
          sections={filteredNotes.flatMap((yearSection) =>
            yearSection.months.map((monthSection) => ({
              title: `${monthSection.monthName} - ${yearSection.year}`,
              data: monthSection.notes.map((note) => ({
                id: note.id.toString(),
                content: note.content,
                title: note.title,
                timestamp: new Date(note.updatedAt).toLocaleString(),
              })),
            }))
          )}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NoteCard
              id={item.id}
              content={item.content}
              title={item.title}
              timestamp={item.timestamp}
              onDelete={async () => {
                await deleteNote(item.id);
              }}
              onEdit={() => {
                router.push(`/notes/edit/${item.id}`);
              }}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View className="h-14 flex bg-[#E5D9F2] items-center flex-row justify-between">
              <Text className="font-bold text-indigo-bold text-3xl flex-1 items-center justify-center">
                {title}
              </Text>
            </View>
          )}
        />
      ) : (
        <View className="justify-center items-center">
          <Text className="font-extrabold mb-2 text-indigo-bold text-3xl">
            Que vacío está esto, no?
          </Text>
          <Text className="font-semibold mb-2 text-indigo-bold text-2xl">
            Creá una nota tocando el botón de abajo!✍🏼
          </Text>
        </View>
      )}
    </View>
  );
}
