import { SectionList, View, Text, ScrollView } from "react-native";
import NoteCard from "./NoteCard";
import { router } from "expo-router";

export default function NotesList() {
  const notesData = [
    {
      title: "Julio",
      data: [
        {
          id: "1",
          content:
            "Recuerda organizar las ideas del proyecto para la reunión de la próxima semana.",
          title: "Planificación del Proyecto",
          timestamp: "2023-07-15 10:00",
        },
        {
          id: "2",
          content:
            "Investigar sobre las nuevas herramientas para mejorar la productividad.",
          title: "Mejora de Productividad",
          timestamp: "2023-07-20 16:45",
        },
        {
          id: "3",
          content:
            "No olvides completar el informe trimestral antes del viernes.",
          title: "Informe Trimestral",
          timestamp: "2023-07-25 09:30",
        },
      ],
    },
    {
      title: "Junio",
      data: [
        {
          id: "4",
          content: "Llamar a Juan para revisar los detalles de la propuesta.",
          title: "Revisión de Propuesta",
          timestamp: "2023-06-10 11:15",
        },
        {
          id: "5",
          content:
            "Revisar los documentos enviados por el equipo de diseño antes del miércoles.",
          title: "Revisión de Documentos",
          timestamp: "2023-06-15 14:00",
        },
        {
          id: "6",
          content:
            "Enviar el presupuesto actualizado al cliente antes de fin de mes.",
          title: "Actualización de Presupuesto",
          timestamp: "2023-06-28 17:00",
        },
      ],
    },
    {
      title: "Mayo",
      data: [
        {
          id: "7",
          content:
            "Tener lista la presentación de ventas para la junta del lunes.",
          title: "Presentación de Ventas",
          timestamp: "2023-05-05 08:30",
        },
        {
          id: "8",
          content:
            "Evaluar las métricas de desempeño del último trimestre y preparar un resumen.",
          title: "Métricas de Desempeño",
          timestamp: "2023-05-12 12:00",
        },
        {
          id: "9",
          content:
            "Investigar sobre el nuevo software de gestión de proyectos.",
          title: "Investigación de Software",
          timestamp: "2023-05-22 15:30",
        },
      ],
    },
    {
      title: "Abril",
      data: [
        {
          id: "10",
          content:
            "Planificar el evento de lanzamiento del nuevo producto para mayo.",
          title: "Lanzamiento de Producto",
          timestamp: "2023-04-01 09:00",
        },
        {
          id: "11",
          content: "Revisar las políticas internas de la empresa.",
          title: "Revisión de Políticas",
          timestamp: "2023-04-18 16:30",
        },
      ],
    },
  ];
  return (
    <SectionList
      sections={notesData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NoteCard
          id={item.id}
          content={item.content}
          title={item.title}
          timestamp={item.timestamp}
          onDelete={() => {}}
          onEdit={() => {
            router.push(`/notes/edit/${item.id}`);
          }}
        />
      )}
      renderSectionHeader={({ section: { title } }) => {
        return (
          <View className="h-14 flex items-center flex-row justify-between">
            <Text className="font-bold text-indigo-bold text-3xl flex-1 items-center justify-center">
              {title}
            </Text>
          </View>
        );
      }}
    />
  );
}
