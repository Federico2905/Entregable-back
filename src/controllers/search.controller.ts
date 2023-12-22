import { Request, Response, NextFunction, response } from "express";
import { ISearch } from "../models/search.interface";
import {
  createSearchService,
  deleteSearchService,
  deleteAllSearchesService,
  updateSearchService,
  getSearchesService,
  getASearchService,
} from "../services/search.service";
import { responseHandler } from "../handlers/response.handler";
import { errorHandler } from "../handlers/error.handler";
import { getCurrentDate } from "../utils";

export const createSearch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    if (body.searchResult.length == 0) {
      throw new errorHandler(400, "You cannot save a search without results");
    }
    const newSearch = await createSearchService(body);
    next(new responseHandler(201, newSearch, `The following searchterm and its results have been saved: ${newSearch.searchTerm}`));
  } catch (error) {
    next(error);
  }
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

export const getASearch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { searchTerm, type } = req.params;
    const search = await getASearchService(searchTerm, type);
    if (!search) {
      throw new errorHandler(404, "The searchTerm that you are trying to get does not exist in the database");
    }
    next(new responseHandler(200, search));
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
    const { searchTerm, type, searchResult, searchDate } = updatedSearch;
    const parsedUpdatedSearch = { searchTerm, type, searchResult, searchDate };
    next(
      new responseHandler(
        200,
        {
          previusData: parsedUpdatedSearch,
          newData: { searchTerm: body.searchTerm, type: body.type, searchResult: body.searchResult, searchDate: getCurrentDate() },
        },
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
    next(
      new responseHandler(
        200,
        `${deletedSearch} entries deleted`,
        `Succesfully deleted the following searchterm and its linked results: ${searchterm}`
      )
    );
  } catch (error) {
    next(error);
  }
};

export const deleteAllSearches = async (req: Request, res: Response, next: NextFunction) => {
  const deletedSearchesCount = await deleteAllSearchesService();
  next(new responseHandler(200, `${deletedSearchesCount} entries deleted`, `${deletedSearchesCount} searches have been deleted from the database`));
};
