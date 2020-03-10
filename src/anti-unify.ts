import fs from "fs";
import path from "path";
import RefinedJSONFile from "./model/refined-json-file"
import createSetUnion from "./utils/create-set-union"
import createJSONSymbolSet from "./utils/create-json-symbol-set"

function refineJSONFiles(inputFilePaths: Array<string>, JSONSymbol: string) {
  const parsedFiles: Array<RefinedJSONFile> = inputFilePaths.map(inputFilePath => {
    const rawFileData: Buffer = fs.readFileSync(inputFilePath);
    const fileDataAsJSON: JSON = JSON.parse(rawFileData.toString());
    const fileName: string = path.basename(inputFilePath);

    return new RefinedJSONFile(
      fileName,
      createJSONSymbolSet(fileDataAsJSON, JSONSymbol),
      createJSONSymbolSet(fileDataAsJSON, JSONSymbol)
    );
  });

  return parsedFiles;
}

function createAntiUnificationPoints(refinedJSONFiles: Array<RefinedJSONFile>, JSONSymbol: string) {
  let unionSetLines: Array<Array<string>> = [];

  refinedJSONFiles.forEach((_, outerIndex) => {
    refinedJSONFiles.forEach((_, innerIndex) => {
      if (outerIndex !== innerIndex) {
        const unionList = createSetUnion(
          refinedJSONFiles[outerIndex][`${JSONSymbol}s`],
          refinedJSONFiles[innerIndex][`${JSONSymbol}s`]
        );

        const unionSetLine: Array<string> = unionList.map(value => {
          return `${refinedJSONFiles[outerIndex]["name"]}, ${value}, ${refinedJSONFiles[innerIndex]["name"]}`;
        });

        unionSetLines.push(unionSetLine);
      }
    });
  });

  return unionSetLines.flat();
}

function extractAntiUnificationPoints(inputFilePathList: Array<string>, JSONSymbol: string) {
  const refinedJSONFiles: Array<RefinedJSONFile> = refineJSONFiles(inputFilePathList, JSONSymbol);
  const antiUnificationPoints: Array<String> = createAntiUnificationPoints(
    refinedJSONFiles,
    JSONSymbol
  );

  return antiUnificationPoints;
}

export default extractAntiUnificationPoints