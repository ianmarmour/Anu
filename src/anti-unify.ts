import fs from "fs";
import path from "path";
import RefinedJSONFile from "./model/refined-json-file"
import createSetUnion from "./utils/create-set-union"
import createJSONSymbolSets from "./utils/create-json-symbol-set"

function refineJSONFiles(inputFilePaths: Array<string>, JSONSymbols: Array<string>) {
  const parsedFiles: Array<RefinedJSONFile> = inputFilePaths.map(inputFilePath => {
    const rawFileData: Buffer = fs.readFileSync(inputFilePath);
    const fileDataAsJSON: JSON = JSON.parse(rawFileData.toString());
    const fileName: string = path.basename(inputFilePath);
    const JSONSymbolSetTuples: Array<[string, Set<string>]> = createJSONSymbolSets(fileDataAsJSON, JSONSymbols);
    
    let refinedJSONFile = new RefinedJSONFile(fileName);

    JSONSymbolSetTuples.forEach(JSONSymbolSet => {
      refinedJSONFile[JSONSymbolSet[0]](JSONSymbolSet[1])
    })

    return refinedJSONFile;
  });

  return parsedFiles;
}

function createAntiUnificationPoints(refinedJSONFiles: Array<RefinedJSONFile>, JSONSymbols: Array<string>) {
  let unionSetLines: Array<Array<string>> = [];

  refinedJSONFiles.forEach((_, outerIndex) => {
    refinedJSONFiles.forEach((_, innerIndex) => {
      if (outerIndex !== innerIndex) {
        JSONSymbols.forEach((JSONSymbol) => {
          const unionList = createSetUnion(
            refinedJSONFiles[outerIndex][`${JSONSymbol}s`],
            refinedJSONFiles[innerIndex][`${JSONSymbol}s`]
          );

          const unionSetLine: Array<string> = unionList.map(value => {
            return `${refinedJSONFiles[outerIndex]["name"]}, ${value}, ${refinedJSONFiles[innerIndex]["name"]}`;
          });

          unionSetLines.push(unionSetLine);
        })
      }
    });
  });

  return unionSetLines.flat();
}

function extractAntiUnificationPoints(inputFilePathList: Array<string>, JSONSymbols: Array<string>) {
  const refinedJSONFiles: Array<RefinedJSONFile> = refineJSONFiles(inputFilePathList, JSONSymbols);
  const antiUnificationPoints: Array<String> = createAntiUnificationPoints(
    refinedJSONFiles,
    JSONSymbols
  );

  return antiUnificationPoints;
}

export default extractAntiUnificationPoints