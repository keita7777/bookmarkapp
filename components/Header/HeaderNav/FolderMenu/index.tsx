import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import FolderTree from "./FolderTree";
import { FoldersDummyData } from "@/DummtData/types/folderType";

type Props = {
  folders: FoldersDummyData;
};

const FolderMenu = ({ folders }: Props) => {
  return (
    <div className="w-full p-2 sm:p-0">
      <div className="bg-white rounded-md mb-4 border-2 border-black">
        <Link href="/create-folder" className="px-4 py-2 font-bold flex justify-center items-center gap-4">
          <FaPlus />
          新規フォルダ作成
        </Link>
      </div>
      <ul className="flex flex-col gap-5">
        <FolderTree folders={folders} />
      </ul>
    </div>
  );
};
export default FolderMenu;
