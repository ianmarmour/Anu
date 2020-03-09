#!/usr/bin/env node
import { main } from "../src/main.js";
import program from "commander";

function parseCommaSeparatedList(value, dummyPrevious) {
  return value.split(",");
}

function prepareOutputHandler(value, dummyPrevious) {}

program
  .option(
    "-f, --files <files>",
    "Input list of JSON files you want to find the commonality between.",
    parseCommaSeparatedList
  )
  .option(
    "-i, --identifier <unificationIdentifier>",
    "The identifier you want to find the commanlity with I.E. key or value"
  )
  .option(
    "-o, --output <outputFilePath>",
    "The location and name of file you want to write your anti-unification list to."
  );

program.parse(process.argv);

if (!program.files) {
  console.log(
    "Please provide a valid list of files to analyze with -f or --files"
  );
}

if (program.files.length < 2) {
  console.log(
    "Please suply a valid list of 2 or more files to compare with -f or --files."
  );
}

if (!program.identifier) {
  console.log(
    "Please provide a valid identifier to analyze your files with -i or --identifier."
  );
}

console.log(main(program.files, program.identifier, program.output));
