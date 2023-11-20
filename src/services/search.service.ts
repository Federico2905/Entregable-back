import { ISearch } from "../models/search.interface";
import Search from "../schemas/search.schema";

export const createSearchService = async (search: ISearch) => {
  const newsearch = new Search(search);
  await newsearch.save();
  return newsearch;
};

export const getSearchesService = async () => {
  const searches: ISearch[] = await Search.find();
  return searches;
};

export const updateSearchService = async (searchTerm: string, updatedData: ISearch) => {
  const updatedSearch = await Search.findOneAndUpdate({ searchTerm }, updatedData);
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
