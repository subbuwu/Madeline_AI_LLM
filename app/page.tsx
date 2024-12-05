"use client"

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'


export default function Home() {
  const queryClient = new QueryClient();
  return (
    <>
    <QueryClientProvider client={queryClient}>
      Hello Chat AI LLM
    </QueryClientProvider>
    </>
  );
}
