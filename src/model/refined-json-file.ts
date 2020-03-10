class RefinedJSONFile {
    name: string
    keys: Set<string>
    values: Set<string>
  
    constructor(name: string, keys: Set<string>, values: Set<string>) {
      this.name = name;
      this.keys = keys;
      this.values = values;
    }
  
    [key: string]: any
  }

  export default RefinedJSONFile