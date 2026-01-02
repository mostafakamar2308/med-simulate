import React, { useState, useMemo, useEffect } from "react";
import { Text, View, TouchableOpacity, Pressable, ScrollView } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { TESTS } from "@/lib/urgentManagement";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ActionListProps } from "@/components/case/simulation/urgentManangement/types";
import { IInvestigation } from "@med-simulate/types";

const ActionList: React.FC<ActionListProps> = ({ category, onBack, onActionTaken }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [item, setItem] = useState<IInvestigation.Investigation | null>(null);

  const categoryData = useMemo(() => {
    switch (category) {
      case "investigations":
        return TESTS;
      // case "treatment":
      //   return TREATMENTS;
      // case "consultation":
      //   return CONSULTATIONS;
      default:
        return [];
    }
  }, [category]);

  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return categoryData.filter((item) => item.name.toLowerCase().includes(query));
  }, [categoryData, searchQuery]);

  const getCategoryLabel = () => {
    switch (category) {
      case "investigations":
        return "Tests & Scans";
      case "treatment":
        return "Treatments";
      case "consultation":
        return "Consultations";
      default:
        return "";
    }
  };

  useEffect(() => {
    const timout = setTimeout(() => {
      setItem(null);
    }, 20_000);

    return () => {
      clearTimeout(timout);
    };
  }, [item]);

  // const getActionType = () => {
  //   switch (category) {
  //     case "investigations":
  //       return "test";
  //     case "treatment":
  //       return "treatment";
  //     case "consultation":
  //       return "consult";
  //     default:
  //       return "test";
  //   }
  // };

  const handleSelectAction = (item: IInvestigation.Investigation) => {
    if (onActionTaken) {
      const now = new Date();
      const action = {
        ...item,
        timeStamp: now.toString(),
      };
      onActionTaken(action);
    }
    setItem(item);
  };

  return (
    <View className="flex-1 flex-col justify-stretch gap-2 bg-white">
      <View className="flex-row items-center">
        <TouchableOpacity onPress={onBack} className="mr-2 rounded-sm border-2 border-[#222] p-1">
          <ChevronLeft size={24} color="#222" />
        </TouchableOpacity>

        <View className="flex-1">
          <Input
            placeholder={`Search ${getCategoryLabel()}...`}
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="border-[#222] bg-gray-50 text-gray-800"
            autoFocus
          />
        </View>
      </View>
      {item ? <ResultViewer item={item} /> : null}
      <List items={filteredItems} onClick={handleSelectAction} />
    </View>
  );
};

const ResultViewer: React.FC<{ item: IInvestigation.Investigation }> = ({ item }) => {
  return (
    <View className="justify-center gap-4 bg-secondary-foreground p-2">
      <Text className="text-xl text-white">{item.name}:</Text>

      {item.result.type === "text" ? (
        <View>
          <Text className="text-center font-bold text-white">{item.result.value}</Text>
        </View>
      ) : null}
      {item.result.type === "binary" ? (
        <View>
          <Text
            className={cn(
              "p-4 text-center font-bold text-white",
              item.result.value === "positive" ? "bg-red-700" : "bg-green-500"
            )}>
            {item.result.value}
          </Text>
        </View>
      ) : null}

      {item.result.type === "number" ? (
        <View>
          <View className="flex-row items-center justify-center gap-2">
            <Text className="text-lg font-bold text-white">{item.result.value} </Text>
            <Text className="text-sm text-white">({item.result.reference})</Text>
          </View>
          <Text className="text-center font-bold text-white">{item.result.description}</Text>
        </View>
      ) : null}

      {/* {item.guidance ? (
        <Pressable className="max-w-fit rounded-lg bg-primary p-2">
          <Text className="w-fit max-w-fit text-center text-white">Why is it important?</Text>
        </Pressable>
      ) : null} */}
    </View>
  );
};

const List: React.FC<{
  items: IInvestigation.Investigation[];
  onClick: (item: IInvestigation.Investigation) => void;
}> = ({ items, onClick }) => {
  return items.length === 0 ? (
    <View className="flex-1 items-center justify-center py-12">
      <Text className="text-base text-gray-500">No items found</Text>
    </View>
  ) : (
    <View className="flex-1 gap-2">
      <ScrollView
        showsVerticalScrollIndicator={true}
        contentContainerClassName="flex-1 min-h-full h-full"
        className="h-full min-h-full flex-1">
        {items.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => onClick(item)}
            className="mb-2 items-center justify-center rounded-lg border-2 border-primary bg-primary/5 py-2 active:bg-primary/10">
            <Text className="text-base font-semibold text-primary">{item.name || "No name"}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default ActionList;
