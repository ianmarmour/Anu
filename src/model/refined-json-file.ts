class RefinedJSONFile {
    private _name?: string
    private _keys?: Set<string>
    private _values?: Set<string>

    constructor(name?: string, keys?: Set<string>, values?: Set<string>) {
      this._name = name;
      this._keys = keys;
      this._values = values;
    }
    get name(): string {
      if (this._name) {
        return this._name
      } else {
        return ""
      }
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