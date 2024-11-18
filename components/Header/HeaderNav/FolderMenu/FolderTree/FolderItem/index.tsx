import { Folder } from "@/DummtData/types/folderType";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { GrBottomCorner } from "react-icons/gr";
import FolderOpenButton from "./FolderOpenButton";
import FolderSettingButton from "./FolderSettingButton";

const FolderItem = ({ folder }: { folder: Folder }) => {
  const path = usePathname();
  const folderPath = path.split("/")[1];
  const { id, name } = folder;

  return (
    <div className="flex items-center">
      {folder.parent_relation.parent_folder !== null && (
        <GrBottomCorner size={30} className="mb-2 text-white rotate-90" />
      )}
      <div
        className={` rounded min-h-10 flex justify-between items-center flex-1 relative hover:bg-blue-100 ${
          folderPath === id ? "bg-blue-100" : "bg-white"
        }`}
      >
        <div className="flex items-center flex-1 h-full">
          {folder.parent_relation.hasChild && <FolderOpenButton />}
          <Link
            className={`flex-1 flex items-center h-full w-full py-1 ${folder.parent_relation.hasChild || "px-4"}`}
            href={`/${folder.id}`}
          >
            {name}
          </Link>
        </div>
        <FolderSettingButton />
      </div>
    </div>
  );
};
export default FolderItem;
