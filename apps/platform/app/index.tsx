import MedicalCase from "@/components/cases/MedicalCase";
import Loading from "@/components/Loading";
import { Input } from "@/components/ui/input";
import { useFindCases } from "@med-simulate/api/hooks";
import { Search } from "lucide-react-native";
import * as React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const [search, setSearch] = React.useState<string>("");
  const cases = useFindCases({});

  if (cases.isPending) return <Loading text="Loading Cases..." />;

  console.log({ cases });

  return (
    <SafeAreaView className="my-4 h-screen flex-1 px-3">
      <View className="relative flex-row">
        <View className="absolute left-2 top-[25%] z-10">
          <Search className="h-4 w-4 text-muted-foreground" />
        </View>
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder="Search cases..."
          className="h-12 rounded-2xl border-none pl-9 shadow-sm"
        />
      </View>

      <FlatList
        data={cases.data?.list || []}
        keyExtractor={(item) => item.id}
        keyboardDismissMode={"on-drag"}
        renderItem={({ item }) => <MedicalCase medicalCase={item} />}
      />
    </SafeAreaView>
  );
}
