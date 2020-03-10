import iterateObjectRecursively from "./iterate-object-recursively";

function createJSONSymbolSet(fileDataAsJSON: JSON, JSONSymbol: string): Set<string> {
    let fileJSONSymbolSet: Set<string> = new Set();
  
    iterateObjectRecursively(fileDataAsJSON, JSONSymbol, fileJSONSymbolSet);
  
    return fileJSONSymbolSet;
}

export default createJSONSymbolSet;