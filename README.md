# Description

This tool is meant to serve as a JSON anti-unification library. It takes a list of JSON files and finds any time that either a key or a value is repeated
across files, you will be returned a csv list of filename, linking data, filename. This tool can be used to find for instance infrastructure as code that
shares certain infrastructure and doesn't have a clear isolation boundry. There's plenty of other use cases as well.

# Usage

```
node bin/cli.js -f test1.json,test2.json,test3.json -t value
```
