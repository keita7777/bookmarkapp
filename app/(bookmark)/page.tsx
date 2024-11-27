// 全てのブックマークを表示する画面

import CreateButton from "@/components/Bookmark/CreateButton";
import BookmarkList from "@/components/Bookmark/List";
import Pagenation from "@/components/Bookmark/Pagenation";

export default function Home() {
  return (
    <>
      <CreateButton />
      <BookmarkList />
      <Pagenation />
    </>
  );
}
