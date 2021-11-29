import useSWR from "swr";
import env from "./env";

export type Company = { name: string; city: string; services: string[] };
export const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((r) => r.json());

export function useCompanies({ search, minLength }: { search: string; minLength: number }) {
  const apiUrl = new URL("/companies", env.API_URL);
  apiUrl.searchParams.set("search", search);

  return useSWR<Company[]>(search.length < minLength ? null : apiUrl.toString(), fetcher);
}
