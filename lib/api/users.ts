import type { ApiUser } from "@/lib/types/user";
import type { ApiPost } from "@/lib/types/post";

const BASE_API_URL = "https://jsonplaceholder.typicode.com";

async function requestJson<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_API_URL}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function fetchUsers(): Promise<ApiUser[]> {
  return requestJson<ApiUser[]>("/users");
}

export async function fetchUserById(id: number): Promise<ApiUser> {
  return requestJson<ApiUser>(`/users/${id}`);
}

export async function fetchPostsByUserId(userId: number): Promise<ApiPost[]> {
  return requestJson<ApiPost[]>(`/posts?userId=${userId}`);
}
