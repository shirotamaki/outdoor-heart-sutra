# アウトドア般若心経

![title](frontend/public/images/logo.svg)

## 概要

アウトドア般若心経というサービスは、街の看板等から集めた般若心経 278 文字の写真の管理が面倒な問題を解決することができる、
アウトドア般若心経ユーザー向けの写真管理アプリです。

ユーザーは、般若心経 278 文字を写真に収め管理することができ、文字の収集状況を経文の並び順で視覚的に確認することができます。また撮影場所の位置情報、メモを記録する機能も備えています。

Google アカウントがあれば無料でご利用いただけます。

## サービス URL

```
https://www.outdoor-heart-sutra.com
```

## 機能

### Google 認証ログイン

Google アカウントをお持ちの方はすぐに始めることができます。
![readme_demo_login](frontend/public/images/readme_demo_login.png)

### 般若心経 278 文字の一覧管理

般若心経 278 文字の写経状況を一覧で確認することができます。
![readme_demo_index](frontend/public/images/readme_demo_index.png)

### 写真の登録

HEIC,JPEG,PNG 形式の写真を登録することができます。
![readme_demo_create_photo.png](frontend/public/images/readme_demo_create_photo.png)

### メモの登録

メモは 100 文字まで登録が可能です。
![readme_demo_show.png](frontend/public/images/readme_demo_show.png)

### 全体地図の確認

写経済みの文字の位置情報を Google Maps 上で確認することができます。写真をクリックすると詳細ページに遷移できます。
![readme_demo_maps.png](frontend/public/images/readme_demo_maps.png)

### マイページ
出家日（サービスを開始した日）と写経済みの文字の総数を確認することができます。退会の手続きもこちらから行うことができます。
![readme_demo_mypage.png](frontend/public/images/readme_demo_mypage.png)

## 開発環境

### バックエンド

- Rails 7.0.4.2(API Mode)

### フロントエンド

- Next.js 13.4.6
- TypeScript 5.0.2

### インフラ

- バックエンド
  - Fly.io
- フロントエンド
  - Vercel

### テスト

- バックエンド
  - RSpec
- フロントエンド
  - Jest
  - Playwright

### 外部サービス

- Google Maps API
- Google GeoCoding API
- NextAuth.js 4.22.1
- Amazon S3

## 開発環境の構築手順

### バックエンド

```
$ git clone https://github.com/shirotamaki/outdoor-heart-sutra.git
$ cd outdoor-heart-sutra/backend
$ bin/setup
$ brew install vips
$ rails s
```

### フロントエンド

```
$ cd outdoor-heart-sutra/frontend
$ npm install
$ npm run dev
```

### 環境変数の設定

使用している環境変数になります。
|環境変数名|説明|
|---|---|
|GOOGLE_CLIENT_ID|Google 認証のクライアント ID|
|GOOGLE_CLIENT_SECRET|Google 認証のクライアントシークレット|
|RAILS_API_URL|Rails API（バックエンド）の URL をフルパスで指定する|
|NEXT_PUBLIC_RAILS_API_URL|Rails API（バックエンド）の URL をフルパスで指定する|
|NEXT_PUBLIC_GOOGLE_MAPS_API_KEY|Google Maps API キー|
|NEXT_PUBLIC_GEOCODING_API_KEY|Geocoding API キー|
|NEXT_SECRET|この値は JWT を暗号化しトークンをハッシュ化するために使用する|
|NEXTAUTH_URL|Next.js アプリケーションのベース URL を指定する|
|NEXTAUTH_URL_INTERNAL|Next.js アプリケーションのベース URL を指定する|
|USER_EMAIL|テスト用のユーザーのメールアドレス|
|USER_PASSWORD|テスト用のユーザーのパスワード|
|BASE_URL|Next.js アプリケーションのベース URL を指定する|

### 外部サービスの利用登録

Google サービスの利用にあたり、Google Cloud にて API とサービスの利用登録が必要となります。

- Geocoding API Key
- Google Maps API Key
- OAuth 2.0 クライアント ID

Amazon S3 サービスの利用登録が必要になります。

## Lint / Test

### バックエンド

Lint

```
$ bundle exec rubocop
```

Test

```
$ bundle exec rspec
```

### フロントエンド

Lint

```
$ npm run lint
$ npm run format
```

Unit Test

```
$ npm run test
```

E2E Test

```
$ npm run test:e2e
```
