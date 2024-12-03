// フォルダごとのブックマークを表示する画面
// ブックマークIDをパラメータで受け取る

import Breadcrumb from "@/components/Bookmark/Breadcrumb";
import BookmarkList from "@/components/Bookmark/List";
import Pagenation from "@/components/Bookmark/Pagenation";
import { Folder } from "@/DummtData/types/folderType";
import { getBreadcrumbPath } from "@/utils/common/breadcrumbs";
import { countBookmarks, getFolderData } from "@/utils/db/fetchData";
import { notFound } from "next/navigation";

export default async function BookmarksByFolderPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { page: string; query: string };
}) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const query = searchParams.query ? searchParams.query : undefined;
  const bookmarkCount = await countBookmarks(params.id, query);

  const folderData = await getFolderData();
  const folderIds = folderData.map((item: Folder) => item.id);

  // パンくずデータを用意
  let breadcrumbData = null;

  if (!folderIds.includes(params.id)) {
    // 無効なURLの場合not-foundページを表示させる
    notFound();
  } else {
    // 有効なURLの場合パンくずデータを取得する
    breadcrumbData = getBreadcrumbPath(folderData, params.id);
  }

  return (
    <>
      <Breadcrumb breadcrumbData={breadcrumbData} />
      <BookmarkList folderId={params.id} page={page} query={query} />
      <Pagenation bookmarkCount={bookmarkCount} currentPage={page} />
    </>
  );
}
