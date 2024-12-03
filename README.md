
# Singularity Test Suite

**Singularity Test Suite**は、Singularity Societyの入会条件を満たすための技術的課題に取り組むためのリポジトリです。特に、再帰的なデータ処理や比較、マージ、差分計算など、複雑なデータ構造を扱う関数の実装を目的としています。

## 概要

このリポジトリでは、以下の型定義に基づき、指定された条件を満たす関数を実装しています。

```typescript
type Primitive = string | number | boolean;
type NestedData = Primitive | NestedObject | NestedArray;

interface NestedObject {
  [key: string]: NestedData;
}
type AnyData = Record<string, NestedData>;

interface NestedArray extends Array<NestedData> {}
```

## 実装内容

1. **全ての値を"hello"に書き換える関数**
   - 入れ子になったデータ構造内の全ての値を再帰的に"hello"に置き換えます。

2. **二つのデータが型まで含めて同じか比較する関数**
   - 二つのデータが型と値の両方で一致するかを再帰的に比較します。

3. **二つのデータをマージする関数**
   - 二つのデータを指定したルールに基づいてマージします。マージの定義は、同じキーが存在する場合、配列にまとめるか、再帰的にマージするか、後の値で上書きするかなど、柔軟に設定できます。

4. **二つのデータの差分を求める関数**
   - 二つのデータの差分を再帰的に計算し、どの部分が異なるかを明示します。

5. **複数のデータに対して動作する関数**
   - 上記の比較やマージの機能を、三つ以上のデータに対して適用できるよう拡張しています。

## 使用方法

各関数の使用例や詳細な説明は、`main.ts`ファイル内に記載しています。TypeScript環境を整えた上で、以下の手順で実行してください。

1. リポジトリをクローンします。

   ```bash
   git clone https://github.com/narita1980/singularity-test-suite
   cd singularity-test-suite
   ```

2. 必要な依存関係をインストールします。

   ```bash
   npm install
   ```

3. TypeScriptファイルをコンパイルします。

   ```bash
   tsc main.ts
   ```

4. コンパイルされたJavaScriptファイルを実行します。

   ```bash
   node main.js
   ```

## コントリビューション

このリポジトリは、Singularity Societyへの参加を希望する方々が自身の技術力を示すためのものです。実装したコードをGitHubにアップロードし、X（旧Twitter）でお知らせください。これらの処理をスムーズに実装し、自身のアイデアを形にできる方は、Singularity Societyに参加する条件を満たしています。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
