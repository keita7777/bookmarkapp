// 入力内容をDBのbookmarksテーブルに保存する
// 新規作成の場合、UrlSubmitコンポーネントで取得したサイト情報が初期値として設定される
// 編集の場合、該当するブックマークの情報が初期値として設定される

import testImage from "@/DummtData/images/test-image.png";
import Image from "next/image";
import { bookmarkDummyType } from "@/DummtData/types/bookmarkType";
import { FoldersDummyData } from "@/DummtData/types/folderType";
import { useRouter } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

type Props = {
  urlData?: {
    title: string;
    image: string;
    url: string;
    description: string;
  };
  folderData: FoldersDummyData;
  bookmarkData?: bookmarkDummyType;
};

const BookmarkSubmit = ({ urlData, folderData, bookmarkData }: Props) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  // キャンセルボタンクリック時の処理
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/");
    router.refresh();
  };

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white flex flex-col gap-6">
      {errors.root && <p className="text-red-500 text-lg font-bold">{errors.root.message}</p>}
      <div className="flex justify-center items-center gap-4">
        <div className="relative w-[400px] h-[250px]">
          <Image src={urlData?.image || testImage} fill alt="画像" />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <label htmlFor="" className="text-xl font-bold">
            タイトル
          </label>
          <input
            type="text"
            className="border border-black rounded-md p-2"
            defaultValue={bookmarkData?.title || urlData?.title || ""}
            {...register("title")}
          />
          <label htmlFor="" className="text-xl font-bold">
            詳細
          </label>
          <textarea
            rows={5}
            className="border border-black rounded-md p-2"
            defaultValue={bookmarkData?.description || urlData?.description || ""}
            {...register("description")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-xl font-bold">
          メモ
        </label>
        <textarea
          rows={5}
          className="border border-black rounded-md p-2"
          defaultValue={bookmarkData?.memo || ""}
          {...register("memo")}
        />
      </div>
      <div className="flex gap-6 justify-center items-center">
        <button className="rounded-md bg-gray-300 w-48 text-xl font-bold py-1">{bookmarkData ? "更新" : "作成"}</button>
        <button onClick={handleCancel} className="rounded-md bg-gray-300 w-48 text-xl font-bold py-1">
          キャンセル
        </button>
      </div>
    </form>
  );
};
export default BookmarkSubmit;
