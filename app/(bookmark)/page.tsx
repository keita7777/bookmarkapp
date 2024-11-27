// 全てのブックマークを表示する画面

import CreateButton from "@/components/Bookmark/CreateButton";
import BookmarkList from "@/components/Bookmark/List";
import Pagenation from "@/components/Bookmark/Pagenation";
import { countBookmarks } from "@/utils/db/fetchData";

export default async function Home() {
  const bookmarkCount = await countBookmarks();

  return (
    <>
      <CreateButton />
      <BookmarkList />
      <Pagenation bookmarkCount={bookmarkCount} />
    </>
  );
}
