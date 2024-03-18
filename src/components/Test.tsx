import { useQuery } from "@tanstack/react-query";
import { getStaies } from "../util/http";

export default function Test() {
  const { data, isPending } = useQuery({
    queryKey: ["staies"],
    queryFn: getStaies,
  });
  console.log(data);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return <div>Test</div>;
}
