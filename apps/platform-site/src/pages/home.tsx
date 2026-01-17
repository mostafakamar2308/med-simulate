import Loading from "@/components/common/loading";
import { useFindCases } from "@med-simulate/api/hooks";
import { useState } from "react";

const Home: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const cases = useFindCases({});

  if (cases.isPending) return <Loading text="Loading Cases..." />;
  console.log(cases.data);

  return <div>Home</div>;
};

export default Home;
