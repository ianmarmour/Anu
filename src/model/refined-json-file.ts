class RefinedJSONFile {
    private _name: string
    private _keys?: Set<string>
    private _values?: Set<string>
  
    constructor(name: string) {
      this._name = name;
    }

    get name(): string {
      return this._name;
    }

    get keys(): Set<string> {
      if (this._keys) {
        return this._keys
      } else {
        return new Set()
      }
    }

    get values(): Set<string> {
      if (this._values) {
        return this._values
      } else {
        return new Set()
      }
    }

    set name(newName: string) {
      this._name = newName;
    }

    set keys(newKeys: Set<string>) {
      this._keys = newKeys;
    }

    set values(newValues: Set<string>) {
      this._values = newValues;
    }

    [k: string]: any;
}

export default RefinedJSONFile