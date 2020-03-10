interface IndexableJSONObject {
  [k: string]: any;
}

function iterateObjectRecursively(obj: IndexableJSONObject, propertyType: string, propertySet: Set<string>) {
  const propertyProcessor = (obj: IndexableJSONObject, property: any, propertyType: string, propertySet: Set<string>) => {
    if (obj.hasOwnProperty(property)) {
      if (typeof obj[property] == "object") {
        if (propertyType === "key" && Array.isArray(obj[property]) === false) {
          propertySet.add(property);
        }
        iterateObjectRecursively(obj[property], propertyType, propertySet);
      } else {
        if (propertyType === "key") {
          propertySet.add(property);
        } else {
          propertySet.add(obj[property]);
        }
      }
    }
  };

  if (Array.isArray(obj)) {
    for (let property of obj) {
      propertyProcessor(obj, property, propertyType, propertySet);
    }
  } else {
    for (let property in obj) {
      propertyProcessor(obj, property, propertyType, propertySet);
    }
  }
}

export default iterateObjectRecursively;
