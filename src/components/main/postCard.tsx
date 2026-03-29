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
      <CardContent className="h-12">
        <CardTitle>{title}</CardTitle>
      </CardContent>
      <CardFooter>
        <CardDescription>
          <p>公開日: {publishedAt}</p>
          <p>最終更新日: {lastUpdatedAt}</p>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
