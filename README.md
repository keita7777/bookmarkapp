# 概要

プログラミング学習中に役立つサイトをブラウザのブックマークに保存しても、タイトルだけでは何のサイトか分からず、結局見返さないままブックマークが溜まってしまうことがよくありました。
そこで、ブックマークにサイトの画像やメモを添えて保存できる仕組みを作ることで、サイトを開かずとも内容や保存理由が一目で分かるようにし、効率的にブックマークを管理できるアプリケーションを開発しました。

# 機能

## フォルダ作成

フォルダを 3 階層まで作成でき、ブックマークをカテゴリごとに保存できます。

![create-folder](https://github.com/user-attachments/assets/a455612a-9e8d-4465-bfec-e661c2fd07c4)

## ブックマーク保存

URL を入力すると、自動的にサイト情報（タイトル、サムネイル画像、サイト概要）を取得します。関連付けるフォルダを設定し、必要に応じてメモも保存可能です。

![create-bookmark](https://github.com/user-attachments/assets/eb6f3513-eead-4a62-b3f2-a8a5980fabf7)

## フォルダことにブックマーク表示

ヘッダーメニューのフォルダをクリックすると、フォルダごとにブックマークが表示されます。

![display-bookmark](https://github.com/user-attachments/assets/8a643872-cc16-4bac-bf67-7fbd8998deaf)

## ブックマーク編集

保存したブックマークは編集できます。

![edit-bookmark](https://github.com/user-attachments/assets/ce963fec-5975-4f36-9810-94d0e5c4eca0)

## ブックマーク削除

保存したブックマークは削除できます。

![delete-bookmark](https://github.com/user-attachments/assets/4c60fbea-406f-4918-b7a5-7be2b9da7cc9)

## フォルダ編集

保存したフォルダは編集できます。

![edit-folder](https://github.com/user-attachments/assets/fd260cde-e181-418e-90b7-31b411f0bf87)

## フォルダ削除

保存したフォルダは削除できます。

![delete-folder](https://github.com/user-attachments/assets/a1af20ea-ab56-466f-9cb5-942491d29519)

## ブックマーク検索機能

全体から検索するか、表示しているフォルダ内でブックマークを検索できます。

## 認証機能

- 新規ユーザー登録
- ログイン / ログアウト機能

# 今後実装予定の機能

- 並べ替え機能
- おすすめサイト投稿機能
- パスワードリセット
- OAuth 認証

# ワイヤーフレーム

- [ワイヤーフレーム](https://www.figma.com/design/wi0Wi6SLDgZb4hL3GgyXRO/%E3%83%96%E3%83%83%E3%82%AF%E3%83%9E%E3%83%BC%E3%82%AF%E7%AE%A1%E7%90%86%E3%82%A2%E3%83%97%E3%83%AA?node-id=6-2129&m=dev&t=1WR5yw5UkRXumdgw-1)

# 画面遷移図

- [画面遷移図](https://www.figma.com/design/wi0Wi6SLDgZb4hL3GgyXRO/%E3%83%96%E3%83%83%E3%82%AF%E3%83%9E%E3%83%BC%E3%82%AF%E7%AE%A1%E7%90%86%E3%82%A2%E3%83%97%E3%83%AA?node-id=75-2832&m=dev&t=2MZC4by9B52NHHci-1)

# テーブル定義書

- [テーブル定義書](https://www.figma.com/design/wi0Wi6SLDgZb4hL3GgyXRO/%E3%83%96%E3%83%83%E3%82%AF%E3%83%9E%E3%83%BC%E3%82%AF%E7%AE%A1%E7%90%86%E3%82%A2%E3%83%97%E3%83%AA?node-id=7-2133&m=dev&t=1WR5yw5UkRXumdgw-1)

# 使用技術

## プログラミング言語

- TypeScript

## フレームワーク

- Next.js

## 認証

- Auth.js
- bcryptjs

## フォーム管理

- React Hook From

## ORM

- Prisma

## バリデーション

- Zod

## UI 全般

- Tailwind
- react-icons

## データベース

- Supabase

## インフラ

- Vercel

## バージョン管理

- Git/GitHub
