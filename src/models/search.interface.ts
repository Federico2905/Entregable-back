export interface ISearch {
  searchTerm: string;
  type: string;
  searchResult: [];
  searchDate: string;
}

export type ISearchWD = Omit<ISearch, "searchDate">;
//Aclaracion: El WD es por "Without Date"
