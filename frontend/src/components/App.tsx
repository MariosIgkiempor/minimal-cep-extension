import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";

export const App: FC = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => {
      const response = await fetch("http://localhost:12345/hello");
      return response.text();
    },
  })

  return (
    <div className="flex flex-col justify-center text-white">
      <p className="text-lg">Welcome to the Adobe Illustrator Extension</p>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Data from server: {data}</p>}
    </div>
  );
};
