# Description

This tool is meant to serve as a JSON anti-unification library. It takes a list of JSON files and finds any time that either a key or a value is repeated
across files, you will be returned a csv list of filename, linking data, filename. This tool can be used to find for instance infrastructure as code that
shares certain infrastructure and doesn't have a clear isolation boundry. There's plenty of other use cases as well.

# Usage

Windows
```
npm run install
npm run build
node .\dist\bin\cli.js --files ./data/json1.json,./data/json2.json,./data/json3.json -s value,key
node .\dist\bin\cli.js --files ./data/json1.json,./data/json2.json,./data/json3.json -s value
node .\dist\bin\cli.js --files ./data/json1.json,./data/json2.json,./data/json3.json -s key
```
Linux/Mac
```
npm run install
npm run build
node ./dist/bin/cli.js --files ./data/json1.json,./data/json2.json,./data/json3.json -s value,key
node ./dist/bin/cli.js --files ./data/json1.json,./data/json2.json,./data/json3.json -s value
node ./dist/bin/cli.js --files ./data/json1.json,./data/json2.json,./data/json3.json -s key
```
