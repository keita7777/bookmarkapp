import { pageSize } from "@/utils/common/pageSize";
import prisma from "@/utils/db/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const folderId = searchParams.get("folderId");
  const bookmarkId = searchParams.get("bookmarkId");
  const isCount = searchParams.get("count");
  const page = Number(searchParams.get("page"));
  const query = searchParams.get("query");

  // リクエストヘッダーからユーザーIDを取得
  const userId = req.headers.get("Authorization")?.replace("Bearer ", "");

  // folderIdの子フォルダの配列を用意
  let childFolders: Array<string> = [];
  // folderIdの孫フォルダの配列を用意
  let grandchildFolders: Array<string> = [];
  // childFoldersとgrandchildFoldersを連結させる配列を用意
  let resultArray: Array<string> = [];

  try {
    if (folderId) {
      // folderIdをparent_folderとして持つ子フォルダを取得
      const result = await prisma.folder_relation.findMany({
        where: {
          parent_folder: folderId,
        },
      });

      // 取得したフォルダデータのidを重複を削除して配列に格納
      childFolders = Array.from(new Set(result.map((item) => item.id)));

      const result2 = await prisma.folder_relation.findMany({
        where: {
          parent_folder: {
            in: childFolders,
          },
        },
      });

      grandchildFolders = Array.from(new Set(result2.map((item) => item.id)));

      resultArray = Array.from(new Set([...childFolders, ...grandchildFolders]));

      resultArray.push(folderId);
    }

    // queryの有無によってbookmarksデータの取得条件を変更
    const whereCondition: any = {
      user_id: userId,
      folder_id: folderId ? { in: resultArray } : undefined,
    };

    if (query) {
      whereCondition.OR = [
        { title: { contains: query } },
        { description: { contains: query } },
        { memo: { memo: { contains: query } } },
      ];
    }

    if (isCount) {
      // ブックマークの件数を取得する
      const bookmarkCount = await prisma.bookmarks.count({
        where: whereCondition,
      });

      return NextResponse.json({ message: "取得完了", bookmarkCount }, { status: 200 });
    } else {
      // ブックマークデータを取得する
      if (bookmarkId) {
        // bookmarkIdがある場合は特定のブックマークデータを取得
        const bookmarks = await prisma.bookmarks.findUnique({
          where: {
            id: bookmarkId,
          },
          include: {
            memo: true,
          },
        });
        return NextResponse.json({ message: "取得完了", bookmarks }, { status: 200 });
      } else {
        // bookmarkIdがない場合は指定したブックマークリストをfindManyで取得
        const bookmarks = await prisma.bookmarks.findMany({
          where: whereCondition,
          include: {
            memo: true,
          },
          take: pageSize,
          skip: page !== 1 ? (page - 1) * 6 : undefined,
        });

        // 取得したbookmarksデータをもとに親フォルダの配列を取得（BookmarkCardコンポーネントに表示するフォルダ階層表示に使用）
        const folderData = await prisma.folders.findMany({
          include: {
            parent_relation: true,
          },
        });

        const folderMap = folderData.reduce(
          (map, folder) => {
            map[folder.id] = folder;
            return map;
          },
          {} as Record<string, (typeof folderData)[0]>,
        );

        const breadcrumbData = bookmarks.map((item) => {
          const breadcrumbArray: Array<string> = [];
          let currentFolderId = item.folder_id;

          while (currentFolderId) {
            // 現在のフォルダを取得
            const parentFolder = folderMap[currentFolderId];

            // フォルダ名を追加
            if (parentFolder) {
              breadcrumbArray.unshift(parentFolder.name); // name を breadcrumbArray に追加
            }

            // 親フォルダが存在しなければループ終了
            if (!parentFolder || !parentFolder.parent_relation?.parent_folder) break;

            // 親フォルダのIDを次の検索対象に設定
            currentFolderId = parentFolder.parent_relation.parent_folder;
          }

          // オブジェクトとして返す
          return {
            bookmarkId: item.id,
            breadcrumbArray, // フォルダ名の配列
          };
        });

        return NextResponse.json({ message: "取得完了", bookmarks, breadcrumbData }, { status: 200 });
      }
    }
  } catch (error) {
    return NextResponse.json({ message: "取得失敗", error }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  // リクエストヘッダーからユーザーIDを取得
  const userId = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!userId) {
    return NextResponse.json({ message: "ユーザーが見つかりません" }, { status: 400 });
  }

  try {
    const data = await req.json();

    // bookmarksテーブルにデータ挿入
    const result = await prisma.bookmarks.create({
      data: {
        user_id: userId,
        folder_id: data.folder_id,
        url: data.url,
        title: data.title,
        description: data.description,
        image: data.image,
      },
    });

    if (data.memo) {
      // bookmark_memoテーブルにデータ挿入
      await prisma.bookmark_memo.create({
        data: {
          id: result.id,
          memo: data.memo,
        },
      });
    }

    return NextResponse.json({ message: "投稿完了" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "投稿失敗", error }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const bookmarkId = searchParams.get("bookmarkId");
  const data = await req.json();

  // リクエストヘッダーからユーザーIDを取得
  const userId = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!userId) {
    return NextResponse.json({ message: "ユーザーが見つかりません" }, { status: 400 });
  }

  try {
    const res = await prisma.bookmarks.update({
      where: {
        id: bookmarkId!,
      },
      data: {
        user_id: userId,
        folder_id: data.folder_id,
        url: data.url,
        title: data.title,
        description: data.description,
        image: data.image,
      },
      include: { memo: true },
    });

    // メモがnullで渡された場合、かつメモが登録されている場合
    // bookmark_memoテーブルからデータを削除する
    if (!data.memo && res.memo) {
      await prisma.bookmark_memo.delete({
        where: {
          id: res.id,
        },
      });
    }

    // メモが更新された場合
    if (res.memo !== data.memo) {
      if (res.memo) {
        // メモがすでに登録されていた場合は更新する
        await prisma.bookmark_memo.update({
          where: {
            id: res.id,
          },
          data: {
            memo: data.memo,
          },
        });
      } else {
        // メモが登録されていない場合は新規作成する
        await prisma.bookmark_memo.create({
          data: {
            id: res.id,
            memo: data.memo,
          },
        });
      }
    }

    return NextResponse.json({ message: "更新完了" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "更新失敗", error }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const bookmarkId = searchParams.get("bookmarkId");
  if (!bookmarkId) {
    return NextResponse.json({ message: "削除失敗" }, { status: 500 });
  }
  try {
    await prisma.bookmarks.delete({
      where: {
        id: bookmarkId,
      },
    });

    return NextResponse.json({ message: "削除完了" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "削除失敗", error }, { status: 500 });
  }
};
