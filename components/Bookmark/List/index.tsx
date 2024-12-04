import BookmarkCard from "./Card";
import { getBookmarkData } from "@/utils/db/fetchData";

type Props = {
  folderId?: string;
  page: number;
  query?: string;
};

const BookmarkList = async ({ folderId, page, query }: Props) => {
  const data = await getBookmarkData({ folderId, page, query });

  if (!data) {
    return <p>ブックマークが取得できませんでした</p>;
  }

  const { bookmarks, breadcrumbData } = data;

  return (
    <>
      {bookmarks.length > 0 ? (
        <ul className="grid 2xl:grid-cols-2 xl:grid-cols-1 gap-6">
          {bookmarks.map((bookmark) => {
            const matchedBreadcrumb = breadcrumbData.find((breadcrumb) => breadcrumb.bookmarkId === bookmark.id);
            return <BookmarkCard key={bookmark.id} bookmark={bookmark} breadcrumb={matchedBreadcrumb} />;
          })}
        </ul>
      ) : (
        <div className="flex justify-start items-center my-6">
          <p className="text-3xl">ブックマークはありません</p>
        </div>
      )}
    </>
  );
};
export default BookmarkList;
