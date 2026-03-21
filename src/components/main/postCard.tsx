import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

export type postCardProps = {
  title: string;
  publishedAt: string;
  lastUpdatedAt: string;
};

export function PostCard({ title, publishedAt, lastUpdatedAt }: postCardProps) {
  return (
    <Card>
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
