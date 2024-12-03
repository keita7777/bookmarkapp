// 自身のフォルダと親フォルダの「名称」「id」を取得する処理

import { FolderWithRelation } from "@/types/folderType";

export const getBreadcrumbPath = (folderData: FolderWithRelation[], id: string) => {
  const breadcrumbArray: { id: string; name: string }[] = [];

  let currentFolder: FolderWithRelation | null = folderData.find((folder) => folder.id === id) || null;

  while (currentFolder !== null) {
    // 現在のフォルダの id と name を追加
    breadcrumbArray.unshift({ id: currentFolder.id, name: currentFolder.name });

    // 親フォルダを取得
    const parentFolderId = currentFolder.parent_relation?.parent_folder;
    currentFolder = parentFolderId ? folderData.find((folder) => folder.id === parentFolderId) || null : null;
  }

  return breadcrumbArray;
};
