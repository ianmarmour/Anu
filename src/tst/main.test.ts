import { refineJSONFiles } from "../anti-unify";
import mock from "mock-fs";
import RefinedJSONFile from "../model/refined-json-file"
import test from "ava";

// Create some mock json files in memory.
mock({
  "data/": {
    "file1.json":
      '{ "fruit": "apple", "size": "large", "color": { "foo": "red", "bar": { "bang": "baz", "zang": [ { "zoo": ["shang", "bang"] } ] }, "bang": ["one", "two", "three"] } }',
    "file2.json": '{ "fruit": "apple", "size": "large", "color": "red"}',
    "file3.json": '{ "fruit": "apple", "size": "large", "color": "green"}'
  }
});

test("Test if we correctly generate a list of parsed file objects from files", t => {
  const fileList = ["data/file1.json", "data/file2.json", "data/file3.json"];
  const expectedValues = [
    
    new RefinedJSONFile (
      "file1.json",
      new Set(["fruit", "size", "color", "foo", "bar", "bang", "zang", "zoo"]),
      new Set(["apple", "large", "red", "baz"])
    ),
    new RefinedJSONFile (
      "file2.json",
      new Set(["fruit", "size", "color"]),
      new Set(["apple", "large", "red"])
    ),
    new RefinedJSONFile(
      "file3.json",
      new Set(["fruit", "size", "color"]),
      new Set(["apple", "large", "green"])
    )
  ];

  console.dir(expectedValues)

  t.deepEqual(refineJSONFiles(fileList, ['key', 'value']), expectedValues);
});
