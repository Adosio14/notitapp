import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard(
  { id, title, content, timestamp, onEdit, onDelete }: NoteCardProps = {
    id: "1",
    title: "Sample Note",
    content:
      "This is a sample note content. It can be quite long and will wrap to multiple lines if necessary.",
    timestamp: "2023-09-15 14:30",
    onEdit: () => {},
    onDelete: () => {},
  }
) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <View className="bg-light-lavender rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
      <View className="p-5 sm:p-6">
        <Text className="text-xl sm:text-2xl font-extrabold text-lavender mb-3">
          {title}
        </Text>

        <Text
          className={`text-lavender-dark mb-4 ${
            isExpanded ? "" : "line-clamp-3"
          }`}
        >
          {content}
        </Text>

        {content.length > 150 && (
          <Pressable
            className="self-start"
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <Text className="text-sm font-medium text-indigo-light">
              {isExpanded ? "Show less" : "Show more"}
            </Text>
          </Pressable>
        )}

        <View className="flex flex-row items-center justify-between mt-4">
          <Text className="text-sm text-gray-400">{timestamp}</Text>

          <View className="flex flex-row space-x-3">
            <Pressable className="mx-2" onPress={() => console.log("Editando")}>
              <Feather name="edit" size={24} color="#A594F9" />
            </Pressable>

            <Pressable className="mx-2" onPress={() => onDelete(id)}>
              <Feather name="trash" size={24} color="red" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
