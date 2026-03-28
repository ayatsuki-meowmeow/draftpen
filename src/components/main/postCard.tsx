import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";

export type PostCardProps = {
  id: string;
  title: string;
  publishedAt: string;
  lastUpdatedAt: string;
};

export function PostCard({
  id,
  title,
  publishedAt,
  lastUpdatedAt,
}: PostCardProps) {
  return (
    <Card key={id}>
      <CardContent>
        <CardTitle>{title}</CardTitle>
      </CardContent>
      <CardFooter>
        <CardDescription>
          公開日: {publishedAt}
          最終更新日: {lastUpdatedAt}
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
