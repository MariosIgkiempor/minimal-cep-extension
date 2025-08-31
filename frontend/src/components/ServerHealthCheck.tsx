import { BACKEND_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import type { FC, PropsWithChildren } from "react";

export const ServerHealthCheck: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading, error } = useQuery({
    queryKey: ["health"],
    queryFn: async () => {
      const response = await fetch(`${BACKEND_URL}/health`);
      if (!response.ok) throw new Error("Server is not responding");
      return true;
    },
    retry: 15,
    retryDelay: (attemptIndex) => Math.min(100 * 1.25 ** attemptIndex, 60000),
    refetchOnWindowFocus: false,
    staleTime: Number.POSITIVE_INFINITY,
  });

  if (isLoading) {
    return (
      <div>Loading...</div>
    );
  }

  if (error) {
    console.error("Server is not responding", error);
    return (
      <>
        <div className="m-3">Server is not responding</div>
        <div className="m-3">
          If the problem persists, please try restarting/ updating Adobe Illustrator, or your
          computer.
        </div>

        <button
          type="button"
          onClick={() => {
            window.location.href = "http://localhost:12345";
          }}
        >
          Press to refresh the page
        </button>
      </>
    );
  }

  return children;
};
