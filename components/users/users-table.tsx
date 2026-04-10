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
          <TableRow key={user.id}>
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
