import { Router } from "express";
import { getSearches, deleteSearch, deleteAllSearches, updateSearch, createSearch, getASearch } from "../../controllers/search.controller";

const router = Router();

router.post("/searches", createSearch);
router.get("/searches", getSearches);
router.get("/searches/:type/:searchTerm", getASearch);
router.put("/searches/:searchterm", updateSearch);
router.delete("/searches/:searchterm", deleteSearch);
router.delete("/allsearches", deleteAllSearches);

export default router;
