import { UsersSearch } from "@/components/users/users-search";
import { fetchUsers } from "@/lib/api/users";

export default async function Home() {
  const users = await fetchUsers();

  return (
    <div className="flex flex-1 justify-center p-6">
      <main className="w-full max-w-5xl space-y-4">
        <h1 className="text-2xl font-semibold">Users</h1>

        <UsersSearch users={users} />
      </main>
    </div>
  );
}
