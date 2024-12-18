```markdown
1. **一言サービスコンセプト（サービスのキャッチコピーを一言で）**
2. **誰のどんな課題を解決するのか？**
3. **なぜそれを解決したいのか？**
4. **どうやって解決するのか？**
5. **機能要件**
6. **非機能要件**
```

# 一言サービスコンセプト

理由も一緒に残せる、整理上手なブックマーク管理アプリ

# 誰のどんな課題を解決するのか？

## 対象

ブックマークを有効に活用したい人のためのアプリ。

## 課題

ブラウザのブックマークだとサイトタイトルしか表示されない。銀行やショッピングサイトなど一目でわかるサイトであれば問題ないが、サイトによってはタイトルだけで何のサイトなのか判断しづらいものがある。

# なぜそれを解決したいのか？

プログラミング学習中に役立つサイトをブラウザのブックマークに保存しても、タイトルだけでは何のサイトか分からず、結局見返さないままブックマークが溜まってしまうことがある。
そこで、ブックマークにサイトの画像やメモを添えて保存できる仕組みを作ることで、サイトを開かずとも内容や保存理由が一目で分かるようにし、効率的にブックマークを管理できるアプリケーションを開発。

# **どうやって解決するのか**

ブラウザのブックマーク機能のようにタイトルだけではなく、サイトのプレビューやメモなども合わせて保存することで、あとで見返した際にそのサイトがどういうサイトなのか、なぜ保存したのかを理解することができる。

# **機能要件**

## 認証機能

- ユーザー登録ができる
- 登録したメールアドレスとパスワードでログインができる
- ログアウトができる
- 非ログインユーザーは新規ユーザー登録、ログイン画面以外にアクセスできない
- ログインユーザーは新規ユーザー登録、ログイン画面にアクセスできない

## ブックマーク機能

- ブックマークをタイトル、詳細テキスト、メモと共に保存できる
- 保存したいサイトの URL を入力すると、サイトのタイトル、概要テキスト、サムネイル画像を取得できる
- ブックマークをフォルダごとに保存、表示できる
- 既存ブックマークの編集、削除ができる
- ブックマークの検索ができる

## フォルダ機能

- ブックマークに紐づけるフォルダを作成できる
- フォルダは 3 階層まで入れ子にできる
- 既存フォルダの編集、削除ができる

# 非機能要件

- レスポンシブ対応
