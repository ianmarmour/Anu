function createSetUnion(inputSetOne: Set<string>, inputSetTwo: Set<string>): Array<String> {
    let unionList: Array<string> = [];
    let firstSet: Array<string> = [...inputSetOne.values()];
    let secondSet: Array<string> = [...inputSetTwo.values()];
  
    firstSet.forEach(function(e) {
      if (secondSet.includes(e)) {
        unionList.push(e);
      }
    });
  
    return unionList;
  }

  export default createSetUnion