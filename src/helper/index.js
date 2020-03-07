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

export default iterate;
