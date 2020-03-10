import iterateObjectRecursively from "./iterate-object-recursively";

function createJSONSymbolSets(fileDataAsJSON: JSON, JSONSymbols: Array<string>): Array<[string, Set<string>]> {
    let fileJSONSymbolSets: Array<[string, Set<string>]> = JSONSymbols.map(JSONSymbol => {
        return [JSONSymbol, createJSONSymbolSet(fileDataAsJSON, JSONSymbol)]
    })

    return fileJSONSymbolSets;
}

function createJSONSymbolSet(fileDataAsJSON: JSON, JSONSymbol: string): Set<string> {
    let fileJSONSymbolSet: Set<string> = new Set();
  
    iterateObjectRecursively(fileDataAsJSON, JSONSymbol, fileJSONSymbolSet);
  
    return fileJSONSymbolSet;
}

export default createJSONSymbolSets;