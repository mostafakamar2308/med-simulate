import MedicalCase from "@/components/cases/MedicalCase";
import Loading from "@/components/Loading";
import { Input } from "@/components/ui/input";
import { useFindCases } from "@med-simulate/api/hooks";
import { Search } from "lucide-react-native";
import * as React from "react";
import { View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  const [search, setSearch] = React.useState<string>("");
  const cases = useFindCases({});

  if (cases.isPending) return <Loading text="Loading Cases..." />;

  return (
    <SafeAreaView className="my-4 flex-1 px-3 py-10">
      <View className="relative">
        <Search className="absolute left-3 top-[34%] h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChangeText={setSearch}
          placeholder="Search cases..."
          className="h-12 rounded-2xl border-none bg-white pl-9 shadow-sm"
        />
      </View>
      <Animated.FlatList
        data={cases.data?.list || []}
        keyExtractor={(item) => item.id}
        itemLayoutAnimation={LinearTransition}
        keyboardDismissMode={"on-drag"}
        renderItem={({ item }) => <MedicalCase medicalCase={item} />}
      />
    </SafeAreaView>
  );
}
