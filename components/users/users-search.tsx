"use client";

import { useEffect, useMemo, useState } from "react";
import { UsersTable } from "@/components/users/users-table";
import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";
import type { ApiUser } from "@/lib/types/user";

type UsersSearchProps = {
  users: ApiUser[];
};

const SEARCH_DEBOUNCE_MS = 300;
const FAVORITES_STORAGE_KEY = "favorite-user-ids";

export function UsersSearch({ users }: UsersSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteUserIds, setFavoriteUserIds] = useState<number[]>([]);
  const debouncedSearchTerm = useDebouncedValue(searchTerm, SEARCH_DEBOUNCE_MS);

  useEffect(() => {
    const savedValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!savedValue) {
      return;
    }

    try {
      const parsedValue = JSON.parse(savedValue);

      if (Array.isArray(parsedValue)) {
        const sanitizedUserIds = parsedValue.filter(
          (value): value is number => Number.isInteger(value) && value > 0,
        );
        setFavoriteUserIds(sanitizedUserIds);
      }
    } catch {
      window.localStorage.removeItem(FAVORITES_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteUserIds));
  }, [favoriteUserIds]);

  function toggleFavoriteUser(userId: number) {
    setFavoriteUserIds((previousIds) => {
      if (previousIds.includes(userId)) {
        return previousIds.filter((id) => id !== userId);
      }

      return [...previousIds, userId];
    });
  }

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

  const sortedUsers = useMemo(() => {
    const favoriteIdsSet = new Set(favoriteUserIds);
    const favoriteUsers: ApiUser[] = [];
    const nonFavoriteUsers: ApiUser[] = [];

    filteredUsers.forEach((user) => {
      if (favoriteIdsSet.has(user.id)) {
        favoriteUsers.push(user);
        return;
      }

      nonFavoriteUsers.push(user);
    });

    return [...favoriteUsers, ...nonFavoriteUsers];
  }, [filteredUsers, favoriteUserIds]);

  return (
    <section className="space-y-3">
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search by name or email"
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />

      <UsersTable
        users={sortedUsers}
        favoriteUserIds={favoriteUserIds}
        onToggleFavorite={toggleFavoriteUser}
      />
    </section>
  );
}
