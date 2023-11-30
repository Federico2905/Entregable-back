import { ISearch, ISearchWD } from "../models/search.interface";
import Search from "../schemas/search.schema";
import { getCurrentDate } from "../utils/";

export const createSearchService = async (search: ISearchWD) => {
  const { searchTerm, searchResult } = search;
  const newsearch = new Search({ searchTerm, searchResult, searchDate: getCurrentDate() });
  await newsearch.save();
  return newsearch;
};

export const getSearchesService = async () => {
  const searches: ISearch[] = await Search.find();
  return searches;
};

export const updateSearchService = async (searchTerm: string, updatedData: ISearchWD) => {
  const { searchResult } = updatedData;
  const updatedSearch = await Search.findOneAndUpdate({ searchTerm }, { searchTerm, searchResult, searchDate: getCurrentDate() });
  return updatedSearch;
};

export const deleteSearchService = async (searchTerm: string) => {
  const deleteSearch = await Search.findOneAndDelete({ searchTerm });
  return deleteSearch;
};

export const deleteAllSearchesService = async () => {
  const deletedSearches = await Search.deleteMany();
  return deletedSearches.deletedCount;
};
