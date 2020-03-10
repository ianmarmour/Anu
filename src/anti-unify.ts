import fs from "fs";
import path from "path";
import RefinedJSONFile from "./model/refined-json-file"
import createSetUnion from "./utils/create-set-union"
import createJSONSymbolSets from "./utils/create-json-symbol-set"
import stringify from 'csv-stringify/lib/sync'

function refineJSONFiles(inputFilePaths: Array<string>, JSONSymbols: Array<string>) {
  const parsedFiles: Array<RefinedJSONFile> = inputFilePaths.map(inputFilePath => {
    const rawFileData: Buffer = fs.readFileSync(inputFilePath);
    const fileDataAsJSON: JSON = JSON.parse(rawFileData.toString());
    const fileName: string = path.basename(inputFilePath);
    const JSONSymbolSetTuples: Array<[string, Set<string>]> = createJSONSymbolSets(fileDataAsJSON, JSONSymbols);
    let refinedJSONFile = new RefinedJSONFile();

    JSONSymbolSetTuples.forEach(JSONSymbolSet => {
      refinedJSONFile.name = fileName
      refinedJSONFile[JSONSymbolSet[0]] = JSONSymbolSet[1];
    })

    return refinedJSONFile;
  });

  return parsedFiles;
}

function createAntiUnificationPoints(refinedJSONFiles: Array<RefinedJSONFile>, JSONSymbols: Array<string>): Array<Object> {
  let unionSetLines: Array<Array<Object>> = [];

  refinedJSONFiles.forEach((_, outerIndex) => {
    refinedJSONFiles.forEach((_, innerIndex) => {
      if (outerIndex !== innerIndex) {
        JSONSymbols.forEach((JSONSymbol) => {
          const unionList = createSetUnion(
            refinedJSONFiles[outerIndex][`${JSONSymbol}s`],
            refinedJSONFiles[innerIndex][`${JSONSymbol}s`]
          );

          const unionSetLine: Array<Object> = unionList.map(value => {
            return { 
                     'Source': refinedJSONFiles[outerIndex]["name"],
                     'Relationship': value, 
                     'Destination': refinedJSONFiles[innerIndex]["name"]
                   }
          });

          unionSetLines.push(unionSetLine);
        })
      }
    });
  });

  return unionSetLines.flat()
}

function extractAntiUnificationPoints(inputFilePathList: Array<string>, JSONSymbols: Array<string>) {
  const refinedJSONFiles: Array<RefinedJSONFile> = refineJSONFiles(inputFilePathList, JSONSymbols);
  const antiUnificationPoints: Array<Object> = createAntiUnificationPoints(
    refinedJSONFiles,
    JSONSymbols
  );

  let anitUnificationPointsCSV: string = stringify(antiUnificationPoints, { header: true, columns: ['Source', 'Relationship', 'Destination'] })


  return anitUnificationPointsCSV;
}

export default extractAntiUnificationPoints