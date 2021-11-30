import useSWR from "swr";
import env from "./env";

export type Company = { name: string; city: string; services: string[] };
export const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((r) => r.json());

export function useCompanies({
  search,
  searchMinLength,
  services,
}: {
  search: string;
  searchMinLength: number;
  services: string[];
}) {
  const apiUrl = new URL("companies", env.API_URL);
  apiUrl.searchParams.set("search", search);
  services.forEach((service) => apiUrl.searchParams.append("services", service));

  return useSWR<Company[]>(search.length < searchMinLength ? null : apiUrl.toString(), fetcher);
}
