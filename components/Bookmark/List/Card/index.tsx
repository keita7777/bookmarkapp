import Image from "next/image";
import noImage from "@/public/images/no-image.png";
import SettingButton from "./SettingButton";
import { BookmarkWithMemo } from "@/types/bookmarkType";
import { BreadcrumbItem } from "@/types/breadcrumbType";

type Props = {
  bookmark: BookmarkWithMemo;
  breadcrumb: BreadcrumbItem | undefined;
};

const BookmarkCard = async ({ bookmark, breadcrumb }: Props) => {
  return (
    <li id={bookmark.id} className="flex flex-col border border-black rounded-md p-3 relative gap-4">
      <div className="flex justify-between items-center gap-4 relative">
        <p className="bg-blue-300 flex justify-start items-center px-2 py-1 rounded-md text-xs w-max">
          {breadcrumb &&
            breadcrumb.breadcrumbArray.map((item, index) => (
              <span
                key={index}
                className={`${index < breadcrumb.breadcrumbArray.length - 1 ? "after:content-['/'] after:mx-2" : ""}`}
              >
                {item}
              </span>
            ))}
        </p>
        <SettingButton id={bookmark.id} />
      </div>
      <div className="flex flex-col xl:flex-row">
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-full xl:w-[300px] h-[300px] xl:h-[200px]"
        >
          <Image src={bookmark.image || noImage} fill sizes="(max-width: 1280px) 100vw, 33vw" alt="画像" />
        </a>
        <div className="flex flex-col gap-2 w-full xl:ml-5 break-all">
          <h2 className="text-xl font-bold">{bookmark.title}</h2>

          <p className="text-gray-600">{bookmark.description}</p>
        </div>
      </div>
      {bookmark.memo && (
        <div className="bg-gray-600 rounded-md p-3 break-words overflow-hidden">
          <h3 className="text-white">メモ</h3>
          <p className="bg-white mt-2 p-2 rounded-md">{bookmark.memo.memo}</p>
        </div>
      )}
    </li>
  );
};
export default BookmarkCard;
