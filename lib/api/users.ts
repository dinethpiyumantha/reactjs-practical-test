import type { ApiUser } from "@/lib/types/user";

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

export async function fetchUsers(): Promise<ApiUser[]> {
  const response = await fetch(`${BASE_API_URL}/users`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as ApiUser[];
}
