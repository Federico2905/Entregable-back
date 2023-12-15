import { ISearch, ISearchWD } from "../models/search.interface";
import Search from "../schemas/search.schema";
import { getCurrentDate } from "../utils/";

export const createSearchService = async (search: ISearchWD) => {
  const { searchTerm, type, searchResult } = search;
  const newsearch = new Search({ searchTerm, type, searchResult, searchDate: getCurrentDate() });
  await newsearch.save();
  return newsearch;
};

export const getSearchesService = async () => {
  const searches: ISearch[] = await Search.find();
  return searches;
};

export const getASearchService = async (searchTerm: string, type: string) => {
  const search = await Search.findOne({ searchTerm, type });
  return search;
};

export const updateSearchService = async (searchTerm: string, updatedData: ISearchWD) => {
  const { searchResult, type } = updatedData;
  const updatedSearch = await Search.findOneAndUpdate({ searchTerm, type }, { searchTerm, type, searchResult, searchDate: getCurrentDate() });
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
