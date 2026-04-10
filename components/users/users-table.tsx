"use client";

import { Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ApiUser } from "@/lib/types/user";

type UsersTableProps = {
  users: ApiUser[];
  favoriteUserIds: number[];
  onToggleFavorite: (userId: number) => void;
};

export function UsersTable({ users, favoriteUserIds, onToggleFavorite }: UsersTableProps) {
  const router = useRouter();
  const favoriteIdsSet = new Set(favoriteUserIds);

  function navigateToUserDetails(userId: number) {
    router.push(`/users/${userId}`);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-14"></TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Company Name</TableHead>
          <TableHead>City</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow
            key={user.id}
            className="cursor-pointer"
            onClick={() => navigateToUserDetails(user.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                navigateToUserDetails(user.id);
              }
            }}
            tabIndex={0}
            aria-label={`Open details for ${user.name}`}
          >
            <TableCell>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label={
                  favoriteIdsSet.has(user.id)
                    ? `Remove ${user.name} from favorites`
                    : `Add ${user.name} to favorites`
                }
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleFavorite(user.id);
                }}
              >
                <Star
                  className={favoriteIdsSet.has(user.id) ? "fill-yellow-500 text-yellow-500" : ""}
                  size={16}
                />
              </Button>
            </TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.company.name}</TableCell>
            <TableCell>{user.address.city}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
