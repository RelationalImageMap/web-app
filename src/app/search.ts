// To parse this data:
//
//   import { Convert, Search } from "./file";
//
//   const search = Convert.toSearch(json);

export interface Search {
  query:   string;
  options: Options;
}

export interface Options {
  privateSearch: boolean;
  searchLoc:     SearchLOC;
  searchTime:    SearchTime;
}

export interface SearchLOC {
  lat:    number;
  long:   number;
  radius: number;
}

export interface SearchTime {
  start: number;
  end?:  number;
}

// Converts JSON strings to/from your types
export module Convert {
  export function toSearch(json: string): Search {
    return JSON.parse(json);
  }

  export function searchToJson(value: Search): string {
    return JSON.stringify(value, null, 2);
  }
}
