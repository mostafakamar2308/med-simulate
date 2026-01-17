import MedicalCase from "@/components/cases/MedicalCase";
import { KeyboardScreen } from "@/components/layout/keyboardScreen";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFindCases } from "@med-simulate/api/hooks";
import { Search } from "lucide-react-native";
import * as React from "react";
import { Text, View } from "react-native";

export default function Screen() {
  const [search, setSearch] = React.useState<string>("");
  const cases = useFindCases({});

  if (cases.isPending) return <Loading text="Loading Cases..." />;

  return (
    <KeyboardScreen>
      <View className="flex-1 p-2">
        <View className="relative flex-row">
          <View className="absolute left-2 top-[25%] z-10">
            <Search className="h-4 w-4 text-muted-foreground" />
          </View>
          <Input
            value={search}
            onChangeText={setSearch}
            placeholder="Search cases..."
            className="h-12 rounded-2xl border-none bg-transparent pl-9"
          />
        </View>
        {cases.isError ? (
          <View>
            <Text>An error occured</Text>
            <Text>{cases.error.message}</Text>
            <Text>{cases.error.name}</Text>
            <Button onPress={() => cases.refetch()}>
              <Text>Try Again</Text>
            </Button>
          </View>
        ) : null}

        {cases.data?.list.map((item) => (
          <MedicalCase key={item.id} medicalCase={item} />
        ))}
      </View>
    </KeyboardScreen>
  );
}
