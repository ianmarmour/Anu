#!/usr/bin/env node
import { main } from "../src/main.js";
import program from "commander";

function parseCommaSeparatedList(value, dummyPrevious) {
  return value.split(",");
}

program
  .option(
    "-f, --files <files>",
    "Input list of JSON files you want to find the commonality between.",
    parseCommaSeparatedList
  )
  .option(
    "-t, --type <datatype>",
    "The type of data you want to find the commanlity between I.E. key/value"
  );

program.parse(process.argv);

if (program.files.length < 2) {
  console.log("Please suply a valid list of 2 or more files to compare.");
}

console.log(main(program.files, program.type));
