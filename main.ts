type Primitive = string | number | boolean;
type NestedData = Primitive | NestedObject | NestedArray;

interface NestedObject {
  [key: string]: NestedData;
}
type AnyData = Record<string, NestedData>;

interface NestedArray extends Array<NestedData> {}

// ==========================
// 問題 1: すべての値を "hello" に書き換える関数
// ==========================
function replaceValuesWithHello(data: NestedData): NestedData {
  if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
    return "hello";
  }
  if (Array.isArray(data)) {
    return data.map(replaceValuesWithHello);
  }
  if (typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, replaceValuesWithHello(value)])
    );
  }
  return data;
}

// ==========================
// 問題 2: データ比較関数
// ==========================
function deepEqual(data1: NestedData, data2: NestedData): boolean {
  if (typeof data1 !== typeof data2) {
    return false;
  }
  if (typeof data1 === "object" && data1 !== null && data2 !== null) {
    if (Array.isArray(data1) && Array.isArray(data2)) {
      if (data1.length !== data2.length) return false;
      return data1.every((item, index) => deepEqual(item, data2[index]));
    } else if (!Array.isArray(data1) && !Array.isArray(data2)) {
      const keys1 = Object.keys(data1);
      const keys2 = Object.keys(data2);
      if (keys1.length !== keys2.length) return false;
      return keys1.every((key) => key in data2 && deepEqual(data1[key], data2[key]));
    }
    return false;
  }
  return data1 === data2;
}

// ==========================
// 問題 3: データマージ関数
// ==========================
function deepMerge(data1: NestedData, data2: NestedData): NestedData {
  if (typeof data1 !== typeof data2) {
    return [data1, data2];
  }
  if (typeof data1 === "object" && data1 !== null && data2 !== null) {
    if (Array.isArray(data1) && Array.isArray(data2)) {
      return [...data1, ...data2];
    } else if (!Array.isArray(data1) && !Array.isArray(data2)) {
      const result: NestedObject = { ...data1 };
      for (const key in data2) {
        if (key in data1) {
          result[key] = deepMerge(data1[key], data2[key]);
        } else {
          result[key] = data2[key];
        }
      }
      return result;
    }
  }
  return data2;
}

// ==========================
// 問題 4: 差分取得関数
// ==========================
function deepDiff(data1: NestedData, data2: NestedData): NestedData {
  if (typeof data1 !== typeof data2) {
    return { left: data1, right: data2 };
  }
  if (typeof data1 === "object" && data1 !== null && data2 !== null) {
    if (Array.isArray(data1) && Array.isArray(data2)) {
      return {
        left: data1.filter((item) => !data2.includes(item)),
        right: data2.filter((item) => !data1.includes(item)),
      };
    } else if (!Array.isArray(data1) && !Array.isArray(data2)) {
      const result: NestedObject = {};
      const keys1 = Object.keys(data1);
      const keys2 = Object.keys(data2);
      for (const key of new Set([...keys1, ...keys2])) {
        if (key in data1 && key in data2) {
          const diff = deepDiff(data1[key], data2[key]);
          if (diff !== undefined) {
            result[key] = diff;
          }
        } else {
          result[key] = key in data1 ? data1[key] : data2[key];
        }
      }
      return result;
    }
  }
  return undefined;
}

// ==========================
// 問題 5: 複数データ対応関数
// ==========================
function deepEqualMultiple(...datas: NestedData[]): boolean {
  return datas.every((data, index, array) => index === 0 || deepEqual(array[0], data));
}

function deepMergeMultiple(...datas: NestedData[]): NestedData {
  return datas.reduce((acc, data) => deepMerge(acc, data));
}

// ==========================
// 実行例
// ==========================
const a: AnyData = { key: 1, nested: { value: "hello" } };
const b: AnyData = { key: 1, nested: { value: "hello" } };
const c: AnyData = { key: 2, nested: { value: "world" } };
const d: AnyData = { extra: true, nested: { value: "test" } };

console.log("問題1: 値を 'hello' に書き換え");
console.log(replaceValuesWithHello(a));

console.log("\n問題2: 比較 (a, b)");
console.log(deepEqual(a, b)); // true

console.log("\n問題3: マージ (a, c)");
console.log(deepMerge(a, c));

console.log("\n問題4: 差分 (a, c)");
console.log(deepDiff(a, c));

console.log("\n問題5: 複数比較 (a, b, c)");
console.log(deepEqualMultiple(a, b, c)); // false

console.log("\n問題5: 複数マージ (a, b, c, d)");
console.log(deepMergeMultiple(a, b, c, d));
