import { Folder } from "@/DummtData/types/folderType";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { GrBottomCorner } from "react-icons/gr";
import FolderOpenButton from "./FolderOpenButton";
import FolderSettingButton from "./FolderSettingButton";

type Props = {
  folder: Folder;
  isSubFolderVisible: boolean;
  toggleFolder: () => void;
};

const FolderItem = ({ folder, isSubFolderVisible, toggleFolder }: Props) => {
  // URLからIDを取得、folder.idと一致する場合にスタイルを変更する
  const path = usePathname();
  const folderPath = path.split("/")[1];

  return (
    <div className="flex items-center">
      {/* 親フォルダがある場合アイコンを表示 */}
      {folder.parent_relation.parent_folder !== null && (
        <GrBottomCorner size={30} className="mb-2 text-white rotate-90" />
      )}
      <div
        className={` rounded min-h-10 flex justify-between items-center flex-1 relative hover:bg-blue-100 ${
          folderPath === folder.id ? "bg-blue-100" : "bg-white"
        }`}
      >
        <div className="flex items-center flex-1 h-full">
          {/* 子フォルダがある場合は開閉ボタンを表示 */}
          {folder.parent_relation.hasChild && (
            <FolderOpenButton isSubFolderVisible={isSubFolderVisible} toggleFolder={toggleFolder} />
          )}
          <Link
            className={`flex-1 flex items-center h-full w-full py-1 ${folder.parent_relation.hasChild || "px-4"}`}
            href={`/${folder.id}`}
          >
            {folder.name}
          </Link>
        </div>
        {/* フォルダの設定ボタン（フォルダ編集/フォルダ削除メニューの表示） */}
        <FolderSettingButton />
      </div>
    </div>
  );
};
export default FolderItem;
