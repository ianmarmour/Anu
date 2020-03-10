#!/usr/bin/env node
const extractAntiUnificationPoints = require('../dist/anti-unify')
const program = require('commander');

function parseValueOrCoerceToArray(value, previousValue) {
  let parsedValue = parseCommaSeperatedList(value)

  if(!Array.isArray(parsedValue)) {
    return [value]
  }

  return parsedValue
}

function parseCommaSeparatedList(value, previousValue) {
  return value.split(",");
}


program
  .option(
    "-f, --files <files>",
    "Input list of JSON files you want to find the commonality between.",
    parseCommaSeparatedList
  )
  .option(
    "-s, --symbols <JSONSymbol>",
    "The JSON Symbols you want to anti unify with I.E. key, value.",
    parseValueOrCoerceToArray
  )
  .option(
    "-o, --output <outputFilePath>",
    "The location and name of file you want to write your anti-unification list to."
  );

program.parse(process.argv);

if (typeof program.files === 'undefined' || program.files === null) {
  console.error(
    "error: Please provide a list of 2 or more files to analyze with -f or --files"
  );

  process.exit(1);
}

if (program.files.length < 2) {
  console.error(
    "error: Please suply a list of 2 or more files to compare with -f or --files."
  );

  process.exit(1);
}

if (!program.symbols) {
  console.error(
    "error: Please provide a valid identifier to analyze your files with -s or --symbols."
  );

  process.exit(1);
}

console.log(extractAntiUnificationPoints(program.files, program.symbols, program.output));
