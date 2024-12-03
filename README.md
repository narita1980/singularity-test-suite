
# Singularity Test Suite

**Singularity Test Suite**は、Singularity Societyの入会条件を満たすための技術的課題に取り組むためのリポジトリです。  
詳細はこちら  
https://singularitysociety.org/articles/blog/2024-10-22/

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

## 環境情報

   ```bash
   $ tsc -v
   Version 5.7.2
   $ node -v
   v20.18.1
   ```

## 使用方法

各関数の使用例や詳細な説明は、`main.ts`ファイル内に記載しています。TypeScript環境を整えた上で、以下の手順で実行してください。

1. リポジトリをクローンします。

   ```bash
   git clone https://github.com/narita1980/singularity-test-suite
   cd singularity-test-suite
   ```

3. TypeScriptファイルをコンパイルします。

   ```bash
   tsc
   ```

4. コンパイルされたJavaScriptファイルを実行します。

   ```bash
   node dist/main.js
   ```

実行結果

   ```bash
   node dist/main.js
   問題1: 値を 'hello' に書き換えた結果
   元のデータ:  { key: 1, nested: { value: 'test' } }
   書き換え後:  { key: 'hello', nested: { value: 'hello' } }

   問題2: 比較結果 (a, b)
   データ a:  { key: 1, nested: { value: 'test' } }
   データ b:  { key: 1, nested: { value: 'test' } }
   結果:  true

   問題2: 比較結果 (a, c)
   データ a:  { key: 1, nested: { value: 'test' } }
   データ c:  { key: 2, nested: { value: 'world' } }
   結果:  false

   問題3: マージ結果 (a, d)
   データ a:  { key: 1, nested: { value: 'test' } }
   データ d:  { extra: true, nested: { value: 'hello' } }
   マージ後:  { key: 1, nested: { value: 'hello' }, extra: true }

   問題4: 差分 (a, c)
   データ a:  { key: 1, nested: { value: 'test' } }
   データ c:  { key: 2, nested: { value: 'world' } }
   差分:  { nested: {} }

   問題5: 複数比較 (a, b, c)
   データ a:  { key: 1, nested: { value: 'test' } }
   データ b:  { key: 1, nested: { value: 'test' } }
   データ c:  { key: 2, nested: { value: 'world' } }
   全て一致するか:  false

   問題5: 複数マージ (a, b, c, d)
   データ a:  { key: 1, nested: { value: 'test' } }
   データ b:  { key: 1, nested: { value: 'test' } }
   データ c:  { key: 2, nested: { value: 'world' } }
   データ d:  { extra: true, nested: { value: 'hello' } }
   複数マージ後:  { key: 2, nested: { value: 'hello' }, extra: true }
   ```

## ライセンス
このプロジェクトはMITライセンスの下で公開されています。
