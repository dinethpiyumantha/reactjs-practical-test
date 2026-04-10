"use client";

import { useMemo, useState } from "react";
import { UsersTable } from "@/components/users/users-table";
import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";
import type { ApiUser } from "@/lib/types/user";

type UsersSearchProps = {
  users: ApiUser[];
};

const SEARCH_DEBOUNCE_MS = 300;

export function UsersSearch({ users }: UsersSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, SEARCH_DEBOUNCE_MS);

  const filteredUsers = useMemo(() => {
    const query = debouncedSearchTerm.trim().toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((user) => {
      const name = user.name.toLowerCase();
      const email = user.email.toLowerCase();
      return name.includes(query) || email.includes(query);
    });
  }, [users, debouncedSearchTerm]);

  return (
    <section className="space-y-3">
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search by name or email"
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />

      <UsersTable users={filteredUsers} />
    </section>
  );
}
