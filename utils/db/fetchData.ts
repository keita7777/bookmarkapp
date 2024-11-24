// フォルダデータを取得する処理

export const getFolderData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folder`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("フォルダデータの取得に失敗しました", res.statusText);
    return null;
  }

  const data = await res.json();
  return data.folders;
};

// ブックマークデータを取得する処理

export const getBookmarkData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("ブックマークデータの取得に失敗しました", res.statusText);
    return null;
  }

  const data = await res.json();
  return data.bookmarks;
};

// ブックマークを新規作成する処理

export const createBookmark = async (
  url: string,
  title: string,
  description: string,
  folder_id: string,
  image: string | null | undefined,
  memo: string | null,
) => {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookmark`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // 認証を実装次第修正
      userId: "f5a12336-c5d6-4b58-a549-b8f4be0db8b1",
      folder_id,
      url,
      title,
      description,
      image,
      memo,
    }),
  });
};
