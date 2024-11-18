// フォルダを階層構造で表示させるコンポーネント

import { FoldersDummyData } from "@/DummtData/types/folderType";
import FolderItem from "./FolderItem";

const FolderTree = ({ folders, parentId = null }: { folders: FoldersDummyData; parentId?: string | null }) => {
  return (
    folders
      // フォルダデータの親フォルダ（parent_folder）が受け取ったparentIdと一致するフォルダをフィルター
      // parentIdがない場合は親フォルダが存在しないフォルダ（第1階層のフォルダ）を取得する
      .filter((folder) => folder.parent_relation.parent_folder === parentId)
      .map((folder) => (
        <li key={folder.id} className="flex flex-col gap-5">
          <FolderItem folder={folder} />
          {/* フォルダに子フォルダがある場合、再帰的にFolderTreeを呼び出す */}
          {folder.parent_relation.hasChild && (
            <ul className="ml-6 flex flex-col gap-5">
              <FolderTree folders={folders} parentId={folder.id} />
            </ul>
          )}
        </li>
      ))
  );
};

export default FolderTree;
