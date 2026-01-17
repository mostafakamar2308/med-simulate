import MedicalCase from "@/components/cases/medicalCase";
import Loading from "@/components/common/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFindCases } from "@med-simulate/api/hooks";
import { Search } from "lucide-react";
import { useState } from "react";

const Home: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const cases = useFindCases({});

  if (cases.isPending) return <Loading text="Loading Cases..." />;
  console.log(cases.data);

  return (
    <section className="flex-1 bg-secondary/15 h-full min-h-screen p-2 flex flex-col items-center">
      <div className="relative border rounded-2xl w-full max-w-sm md:max-w-md flex">
        <div className="absolute left-2 top-[33%] z-10">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search cases..."
          className="h-12 rounded-2xl border-none bg-transparent pl-9"
        />
      </div>
      {cases.isError ? (
        <div>
          <p>An error occured</p>
          <p>{cases.error.message}</p>
          <p>{cases.error.name}</p>
          <Button onClick={() => cases.refetch()}>
            <p>Try Again</p>
          </Button>
        </div>
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 self-stretch">
        {cases.data?.list
          .filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <MedicalCase key={item.id} medicalCase={item} />
          ))}
      </div>
    </section>
  );
};

export default Home;
