function iterate(obj, propertyType, propertySet) {
  const propertyProcessor = (obj, propertyType, propertySet) => {};
  if (Array.isArray(obj)) {
    for (let property of obj) {
    }
  } else {
    for (let property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == "object") {
          if (
            propertyType === "key" &&
            Array.isArray(obj[property]) === false
          ) {
            propertySet.add(property);
          }
          iterate(obj[property], propertyType, propertySet);
        } else {
          if (propertyType === "key") {
            propertySet.add(property);
          } else {
            propertySet.add(obj[property]);
          }
        }
      }
    }
  }
}

export default iterate;
