import { parseFiles } from "../src/main.js";
import mock from "mock-fs";
import test from "ava";

// Create some mock json files in memory.
mock({
  "data/": {
    "file1.json":
      '{ "fruit": "apple", "size": "large", "color": { "foo": "red", "bar": { "bang": "baz", "zang": ["one", "two", "three"] } }}',
    "file2.json": '{ "fruit": "apple", "size": "large", "color": "red"}',
    "file3.json": '{ "fruit": "apple", "size": "large", "color": "green"}'
  }
});

test("Test if we correctly generate a list of parsed file objects from files", t => {
  const fileList = ["data/file1.json", "data/file2.json", "data/file3.json"];
  const expectedValues = [
    {
      name: "data/file1.json",
      keys: new Set(["fruit", "size", "color", "foo", "bar", "bang"]),
      values: new Set(["apple", "large", "red", "baz"])
    },
    {
      name: "data/file2.json",
      keys: new Set(["fruit", "size", "color"]),
      values: new Set(["apple", "large", "red"])
    },
    {
      name: "data/file3.json",
      keys: new Set(["fruit", "size", "color"]),
      values: new Set(["apple", "large", "green"])
    }
  ];

  t.deepEqual(parseFiles(fileList), expectedValues);
});
