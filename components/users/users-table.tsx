"use client";

import { useRouter } from "next/navigation";
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
};

export function UsersTable({ users }: UsersTableProps) {
  const router = useRouter();

  function navigateToUserDetails(userId: number) {
    router.push(`/users/${userId}`);
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
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
