import { Document, Schema, model } from "mongoose";

export interface ISearchSchema extends Document {
  searchTerm: string;
  searchResult: [];
  searchDate: string;
}

const searchSchema = new Schema<ISearchSchema>({
  searchTerm: String,
  searchResult: Array,
  searchDate: String,
});

const Search = model("search", searchSchema);

export default Search;
