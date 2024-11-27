// フォルダごとのブックマークを表示する画面
// ブックマークIDをパラメータで受け取る

import Breadcrumb from "@/components/Bookmark/Breadcrumb";
import BookmarkList from "@/components/Bookmark/List";
import Pagenation from "@/components/Bookmark/Pagenation";

export default function BookmarksByFolderPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Breadcrumb id={params.id} />
      <BookmarkList folderId={params.id} />
      <Pagenation />
    </>
  );
}
