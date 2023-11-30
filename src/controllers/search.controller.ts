import { Request, Response, NextFunction, response } from "express";
import { ISearch } from "../models/search.interface";
import {
  createSearchService,
  deleteSearchService,
  deleteAllSearchesService,
  updateSearchService,
  getSearchesService,
} from "../services/search.service";
import { responseHandler } from "../handlers/response.handler";
import { errorHandler } from "../handlers/error.handler";
import { getCurrentDate } from "../utils";

export const createSearch = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body;
  const newSearch = await createSearchService(body);
  next(new responseHandler(201, newSearch, `The following searchterm and its results have been saved: ${newSearch.searchTerm}`));
};

export const getSearches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searches: ISearch[] = await getSearchesService();
    if (searches.length === 0) {
      throw new errorHandler(404, "There are no storaged searches");
    }
    next(new responseHandler(200, searches));
  } catch (error) {
    next(error);
  }
};

export const updateSearch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { searchterm } = req.params;
    const body = req.body;
    const updatedSearch = await updateSearchService(searchterm, body);
    if (!updatedSearch) {
      throw new errorHandler(404, "The searchterm that you are trying to update does not exist in the database");
    }
    const { searchTerm, searchResult, searchDate } = updatedSearch;
    const parsedUpdatedSearch = { searchTerm, searchResult, searchDate };
    next(
      new responseHandler(
        200,
        { previusData: parsedUpdatedSearch, newData: { searchTerm: body.searchTerm, searchResult: body.searchResult, searchDate: getCurrentDate() } },
        `The content linked to the following searchterm has been updated: ${searchTerm}`
      )
    );
  } catch (error) {
    next(error);
  }
};

export const deleteSearch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { searchterm } = req.params;
    const deletedSearch = await deleteSearchService(searchterm);
    if (!deletedSearch) {
      throw new errorHandler(404, "The searchterm that you are trying to delete does not have content saved");
    }
    const { searchTerm, searchResult, searchDate } = deletedSearch;
    const parsedDeletedSearch = { searchTerm, searchResult, searchDate };
    next(
      new responseHandler(
        200,
        parsedDeletedSearch,
        `Succesfully deleted the following searchterm and its linked results: ${deletedSearch.searchTerm}`
      )
    );
  } catch (error) {
    next(error);
  }
};

export const deleteAllSearches = async (req: Request, res: Response, next: NextFunction) => {
  const deletedSearchesCount = await deleteAllSearchesService();
  next(new responseHandler(200, deletedSearchesCount, `${deletedSearchesCount} searches have been deleted from the database`));
};
