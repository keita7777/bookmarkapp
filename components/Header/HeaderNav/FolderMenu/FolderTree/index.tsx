import { FoldersDummyData } from "@/DummtData/types/folderType";
import FolderItem from "./FolderItem";

const FolderTree = ({ folders, parentId = null }: { folders: FoldersDummyData; parentId?: string | null }) => {
  return folders
    .filter((folder) => folder.parent_relation.parent_folder === parentId)
    .map((folder) => (
      <li key={folder.id} className="flex flex-col gap-5">
        <FolderItem folder={folder} />
        {folder.parent_relation.hasChild && (
          <ul className="ml-6 flex flex-col gap-5">
            <FolderTree folders={folders} parentId={folder.id} />
          </ul>
        )}
      </li>
    ));
};

export default FolderTree;
