"use client";

import { Dialog } from "@base-ui/react/dialog";
import { Button } from "@/components/ui/button";
import { DbError } from "@/components/ui/db-error";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { USE_MOCK } from "@/lib/constants";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { mockArticles } from "@/mocks/articles";
import { toArticle } from "@/repositories/article";
import { isPublished, publishArticle } from "@/services/article/actions";
import { Article } from "@/types/article";
import { convertDateString } from "@/utils";
import { id } from "@instantdb/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AdminArticleEditPage() {
  const { id: articleId } = useParams<{ id: string }>();
  const router = useRouter();

  const { isLoading, error, data } = db.useQuery({
    articles: { $: { where: { id: articleId } } },
  });

  const rawArticle: Article | undefined = USE_MOCK
    ? mockArticles.find((obj) => obj.id === articleId)
    : (data?.articles ?? []).map(toArticle)[0];

  const [draftTitle, setDraftTitle] = useState(rawArticle?.draftTitle ?? "");
  const [draftContent, setDraftContent] = useState(
    rawArticle?.draftContent ?? "",
  );
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">(
    "idle",
  );
  const [viewMode, setViewMode] = useState<"edit" | "split" | "preview">(
    "split",
  );
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const isFirstRender = useRef(true);

  // rawArticle が取得されたタイミングで初期値をセット（記事IDが変わった時だけ同期）
  useEffect(() => {
    if (!rawArticle) return;
    setDraftTitle(rawArticle.draftTitle ?? "");
    setDraftContent(rawArticle.draftContent ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawArticle?.id]);

  // オートセーブ（初回レンダリング時はスキップ）
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (USE_MOCK) return;

    setSaveStatus("saving");
    const timer = setTimeout(async () => {
      await db.transact(
        db.tx.articles[articleId]!.update({
          draftTitle,
          draftContent,
          updatedAt: Date.now(),
        }),
      );
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 500);

    return () => clearTimeout(timer);
  }, [draftTitle, draftContent, articleId]);

  const handlePublishConfirm = async () => {
    if (USE_MOCK) return;
    setIsPublishing(true);
    await publishArticle(articleId, draftTitle, draftContent);
    setIsPublishing(false);
    setIsPublishDialogOpen(false);
  };

  const handleUpdateConfirm = async () => {
    if (USE_MOCK) return;
    setIsPublishing(true);
    await publishArticle(articleId, draftTitle, draftContent);
    setIsPublishing(false);
    setIsUpdateDialogOpen(false);
  };

  const handleCreateArticle = async () => {
    const newId = id();
    await db.transact(
      db.tx.articles[newId].create({
        slug: "",
        draftTitle: "",
        title: "",
        content: "",
        draftContent: "",
        status: "draft",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }),
    );
    router.push(`/admin/articles/${newId}`);
  };

  if (!USE_MOCK && isLoading)
    return <div className="p-4">読み込み中です...</div>;

  if (!USE_MOCK && error) return <DbError error={error} />;

  if (!rawArticle)
    return (
      <div className="flex flex-col items-center m-4">
        <Button onClick={handleCreateArticle}>
          新規記事の作成
        </Button>
      </div>
    );

  return (
    <div className="flex flex-col items-start gap-4 m-4 mx-auto px-8">
      <div className="flex items-center justify-start w-full">
        <Button variant="outline" onClick={() => {router.push(`/admin/articles`)}}>一覧に戻る</Button>
      </div>
      <div className="flex items-center justify-between w-full">
        <p className="text-sm text-muted-foreground">
          公開日:{" "}
          {!rawArticle.publishedAt
            ? "非公開"
            : convertDateString(rawArticle.publishedAt)}
        </p>
        <span className="text-xs text-muted-foreground">
          {saveStatus === "saving" && "保存中..."}
          {saveStatus === "saved" && "保存しました"}
        </span>
        {isPublished(rawArticle) ? (
          <Dialog.Root
            open={isUpdateDialogOpen}
            onOpenChange={setIsUpdateDialogOpen}
          >
            <Dialog.Trigger render={<Button variant="outline" />}>更新</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 bg-black/40" />
              <Dialog.Popup className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border rounded-lg shadow-lg p-6 w-80 flex flex-col gap-4">
                <Dialog.Title className="text-base font-semibold">
                  記事を更新しますか？
                </Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground">
                  更新すると取り消すことはできません。
                </Dialog.Description>
                <div className="flex justify-end gap-2">
                  <Dialog.Close render={<Button variant="outline" />}>
                    キャンセル
                  </Dialog.Close>
                  <Button onClick={handleUpdateConfirm} disabled={isPublishing}>
                    {isPublishing ? "更新中..." : "更新する"}
                  </Button>
                </div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        ) : (
          <Dialog.Root
            open={isPublishDialogOpen}
            onOpenChange={setIsPublishDialogOpen}
          >
            <Dialog.Trigger render={<Button />}>公開する</Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Backdrop className="fixed inset-0 bg-black/40" />
              <Dialog.Popup className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border rounded-lg shadow-lg p-6 w-80 flex flex-col gap-4">
                <Dialog.Title className="text-base font-semibold">
                  記事を公開しますか？
                </Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground">
                  公開すると取り消すことはできません。
                </Dialog.Description>
                <div className="flex justify-end gap-2">
                  <Dialog.Close render={<Button variant="outline" />}>
                    キャンセル
                  </Dialog.Close>
                  <Button onClick={handlePublishConfirm} disabled={isPublishing}>
                    {isPublishing ? "公開中..." : "公開する"}
                  </Button>
                </div>
              </Dialog.Popup>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </div>
      <div className="w-full">
        <p className="text-sm font-medium mb-1">タイトル</p>
        <input
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
          placeholder="タイトルを入力"
        />
      </div>
      <div className="w-full">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium">本文</p>
          <div className="flex gap-1">
            <Button
              variant={viewMode === "edit" ? "default" : "outline"}
              size="xs"
              onClick={() => setViewMode("edit")}
            >
              編集
            </Button>
            <Button
              variant={viewMode === "split" ? "default" : "outline"}
              size="xs"
              onClick={() => setViewMode("split")}
            >
              分割
            </Button>
            <Button
              variant={viewMode === "preview" ? "default" : "outline"}
              size="xs"
              onClick={() => setViewMode("preview")}
            >
              プレビュー
            </Button>
          </div>
        </div>
        <div
          className={cn(
            viewMode === "split" ? "grid grid-cols-2 gap-4" : "block",
          )}
        >
          {viewMode !== "preview" && (
            <textarea
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring min-h-[400px] resize-y"
              value={draftContent}
              onChange={(e) => setDraftContent(e.target.value)}
              placeholder="本文をMarkdownで入力"
            />
          )}
          {viewMode !== "edit" && (
            <div className="min-h-[400px] border rounded px-3 py-2">
              <MarkdownRenderer content={draftContent} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
