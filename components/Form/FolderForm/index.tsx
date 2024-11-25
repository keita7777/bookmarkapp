// 入力内容をDBのfoldersテーブルに保存する

"use client";

import { FolderWithRelation } from "@/types/folderType";
import { createFolder } from "@/utils/db/fetchData";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

type Props = {
  folderData: FolderWithRelation[];
  folderId?: string;
};

const FolderForm = ({ folderData, folderId }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    // resetField,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      parentFolder: "",
    },
  });

  // 選択されたフォルダの階層を定義
  const [folderLevel, setFolderLevel] = useState<"ONE" | "TWO" | "THREE">("ONE");
  const currentParentFolderValues = watch("parentFolder");

  useEffect(() => {
    const defineFolderLevel = () => {
      const data = folderData.filter((folder) => folder.id === currentParentFolderValues);
      if (data[0]?.parent_relation.level === "ONE") {
        setFolderLevel("TWO");
      } else if (data[0]?.parent_relation.level === "TWO") {
        setFolderLevel("THREE");
      } else {
        // 第3階層のフォルダは親フォルダに設定できない
        setError("root", {
          message: "このフォルダ以下には作成できません",
        });
      }
    };
    if (currentParentFolderValues === "") {
      setFolderLevel("ONE");
    } else {
      defineFolderLevel();
    }
  }, [currentParentFolderValues, folderData, setError]);

  // 編集の場合ここから
  // フォルダ名と親フォルダの初期値を設定
  const [parentFolderId, setParentFolderId] = useState<string | null>(null);
  const [folderName, setFolderName] = useState<string | null>(null);

  // propsで渡されたfolderIdをもとにフォルダ名と親フォルダを設定
  const getParentFolder = useCallback(() => {
    const result = folderData.filter((item) => item.id === folderId);

    if (result.length <= 0) return null;

    setParentFolderId(result[0].parent_relation.parent_folder);
    setFolderName(result[0].name);
  }, [folderData, folderId]);

  useEffect(() => {
    // 編集の場合
    if (folderId) {
      getParentFolder();

      if (parentFolderId !== null) {
        setValue("parentFolder", parentFolderId);
      }
      if (folderName !== null) {
        setValue("name", folderName);
      }
    }
  }, [parentFolderId, folderName, setValue, folderId, getParentFolder]);

  // propsで渡されたfolderIdをもとに子フォルダを取得
  // 親フォルダを変更した際に階層が3を超えないようにする対策
  const [formattedFolderData, setFormattedFolderData] = useState<FolderWithRelation[]>([]);

  useEffect(() => {
    if (folderId) {
      // 編集の場合

      // resultを親フォルダに持つフォルダを取得
      const folderArray = folderData.filter((folder) => folder.parent_relation.parent_folder === folderId);

      // resultを親フォルダに持つフォルダを親フォルダに持つフォルダを取得
      const folderArray2 = folderArray.flatMap((folder) =>
        folderData.filter((item) => item.parent_relation.parent_folder === folder.id),
      );

      if (folderArray2.length > 0) {
        // 孫フォルダがある場合は親フォルダを選択できない
        setFormattedFolderData([]);
      } else if (folderArray.length > 0) {
        // 子フォルダがある場合は第1階層のフォルダのみ選択可能
        setFormattedFolderData(folderData.filter((item) => item.parent_relation.level === "ONE"));
      } else {
        // 子フォルダがない場合は第3階層のフォルダ以外選択可能
        setFormattedFolderData(folderData.filter((item) => item.parent_relation.level !== "THREE"));
      }
    } else {
      // 新規作成の場合、第3階層のフォルダ以外選択可能
      setFormattedFolderData(folderData.filter((item) => item.parent_relation.level !== "THREE"));
    }
  }, [folderId, folderData]);

  //     // 編集の場合
  //     // resultを親フォルダに持つフォルダを取得
  //     const folderArray = folderData.filter((folder) => folder.parent_relation.parent_folder === parentFolderId);
  //     // resultを親フォルダに持つフォルダを親フォルダに持つフォルダを取得
  //     const folderArray2 = folderArray.map((folder) => {
  //       folderData.filter((item) => item.parent_relation.parent_folder === folder.id);
  //     });
  //     console.log(folderArray2);
  //   } else {
  //     // 新規作成の場合
  //     console.log("folderArray2");
  //     item.parent_relation.level !== "THREE";
  //   }
  // });

  // 編集の場合ここまで

  // キャンセルボタンクリック時の処理
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/");
    router.refresh();
  };

  const onSubmit = (data: FieldValues) => {
    const { name, parentFolder } = data;
    const formattedParentFolder = parentFolder === "" ? null : parentFolder;
    createFolder(name, formattedParentFolder, folderLevel);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 px-4 pt-12 pb-4 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-xl font-bold">
          フォルダ名
        </label>
        <input type="text" className="border border-black rounded-md p-2" {...register("name")} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="folder" className="text-xl font-bold">
          親フォルダを選択
        </label>
        <select className="border border-black rounded-md p-2" {...register("parentFolder")}>
          <option value="">指定しない</option>
          {folderData &&
            formattedFolderData.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
        </select>
      </div>
      <div className="flex gap-6 justify-center items-center w-full xl:w-[400px] mx-auto">
        <button type="submit" className="rounded-md bg-gray-300 w-1/2 text-xl font-bold py-2">
          {folderId ? "更新" : "作成"}
        </button>
        <button type="button" onClick={handleCancel} className="rounded-md bg-gray-300 w-1/2 text-xl font-bold py-2">
          キャンセル
        </button>
      </div>
    </form>
  );
};
export default FolderForm;
