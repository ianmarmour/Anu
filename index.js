const fs = require("fs");

function iterate(obj, propertyType, propertySet) {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] == "object") {
        iterate(obj[property]);
      } else {
        if (propertyType == "key") {
          propertySet.add(property);
        }
        if (propertyType == "value") {
          propertySet.add(obj[property]);
        }
      }
    }
  }
}

function generateUnionList(inputSetOne, inputSetTwo) {
  var unionList = [];
  var firstSet = [...inputSetOne.values()];
  var secondSet = [...inputSetTwo.values()];

  firstSet.forEach(function(e) {
    if (secondSet.includes(e)) {
      unionList.push(e);
    }
  });

  return unionList;
}

function generateValueSet(file) {
  let rawdata = fs.readFileSync(file);
  let originalFileJSON = JSON.parse(rawdata);
  let originalFilePropertySet = new Set();

  iterate(originalFileJSON, "value", originalFilePropertySet);

  return originalFilePropertySet;
}

function generateKeySet(file) {
  let rawdata = fs.readFileSync(file);
  let originalFileJSON = JSON.parse(rawdata);
  let originalFilePropertySet = new Set();

  iterate(originalFileJSON, "key", originalFilePropertySet);

  return originalFilePropertySet;
}

function generateAntiUnificationList(listOfInputFileSets, propertyType) {
  let unionSetLines = [];

  listOfInputFileSets.forEach((_, outerIndex) => {
    listOfInputFileSets.forEach((_, innerIndex) => {
      if (outerIndex !== innerIndex) {
        const unionList = generateUnionList(
          listOfInputFileSets[outerIndex][`${propertyType}s`],
          listOfInputFileSets[innerIndex][`${propertyType}s`]
        );

        const unionSetLine = unionList.map(value => {
          return `${listOfInputFileSets[outerIndex]["name"]}, ${value}, ${listOfInputFileSets[innerIndex]["name"]}`;
        });

        unionSetLines.push(unionSetLine);
      }
    });
  });

  return unionSetLines.flat();
}

function parseFiles(fileList) {
  const parsedFiles = fileList.map(file => {
    return {
      name: file,
      keys: generateKeySet(file),
      values: generateValueSet(file)
    };
  });

  return parsedFiles;
}

function main(fileList, propertyType) {
  const parsedFileList = parseFiles(fileList);
  const listOfAntiUnifications = generateAntiUnificationList(
    parsedFileList,
    propertyType
  );

  return listOfAntiUnifications;
}

exports.execute = main;
