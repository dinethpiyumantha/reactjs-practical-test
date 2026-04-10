import Link from "next/link";
import { notFound } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { fetchPostsByUserId, fetchUserById } from "@/lib/api/users";

type UserDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserDetailsPage({ params }: UserDetailsPageProps) {
  const { id } = await params;
  const userId = Number(id);

  if (!Number.isInteger(userId) || userId < 1) {
    notFound();
  }

  const [user, posts] = await Promise.all([
    fetchUserById(userId),
    fetchPostsByUserId(userId),
  ]);

  return (
    <div className="flex flex-1 justify-center p-6">
      <main className="w-full max-w-5xl space-y-6">
        <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
          Back to users page
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{user.name}</CardTitle>
            <CardDescription>{user.username}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Email</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Phone</TableCell>
                  <TableCell>{user.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Website</TableCell>
                  <TableCell>{user.website}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Company</TableCell>
                  <TableCell>{user.company.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Catchphrase</TableCell>
                  <TableCell>{user.company.catchPhrase}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">City</TableCell>
                  <TableCell>{user.address.city}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Address</TableCell>
                  <TableCell>
                    {user.address.street}, {user.address.suite}, {user.address.zipcode}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Geo</TableCell>
                  <TableCell>
                    {user.address.geo.lat}, {user.address.geo.lng}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Posts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {posts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No posts found for this user.</p>
            ) : (
              posts.map((post) => (
                <Card key={post.id}>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-base capitalize">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-sm text-muted-foreground">
                    {post.body}
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
