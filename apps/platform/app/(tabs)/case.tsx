import MedicalCase from "@/components/cases/MedicalCase";
import { Input } from "@/components/ui/input";
import { useFindCases } from "@med-simulate/api/hooks";
import { Search } from "lucide-react-native";
import * as React from "react";
import { FlatList, View } from "react-native";

export default function Screen() {
  const [search, setSearch] = React.useState<string>("");
  const cases = useFindCases({});

  console.log({ cases: cases.data });

  return (
    <View className="my-4 flex-1 px-3">
      <View className="relative">
        <Search className="absolute left-3 top-[34%] h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder="Search cases..."
          className="h-12 rounded-2xl border-none bg-white pl-9 shadow-sm"
        />
      </View>
      <FlatList
        data={cases.data?.list || []}
        keyExtractor={(item) => item.id}
        renderItem={(medicalCase) => <MedicalCase medicalCase={medicalCase.item} />}
      />
    </View>
  );
}
