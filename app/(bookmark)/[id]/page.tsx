// フォルダごとのブックマークを表示する画面
// ブックマークIDをパラメータで受け取る

import Breadcrumb from "@/components/Bookmark/Breadcrumb";
import BookmarkList from "@/components/Bookmark/List";
import Pagenation from "@/components/Bookmark/Pagenation";
import { countBookmarks } from "@/utils/db/fetchData";

export default async function BookmarksByFolderPage({ params }: { params: { id: string } }) {
  const bookmarkCount = await countBookmarks(params.id);

  return (
    <>
      <Breadcrumb id={params.id} />
      <BookmarkList folderId={params.id} />
      <Pagenation bookmarkCount={bookmarkCount} />
    </>
  );
}
