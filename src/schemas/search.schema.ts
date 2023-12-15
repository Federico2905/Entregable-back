import { Document, Schema, model } from "mongoose";

export interface ISearchSchema extends Document {
  searchTerm: string;
  type: string;
  searchResult: [];
  searchDate: string;
}

const searchSchema = new Schema<ISearchSchema>({
  searchTerm: String,
  type: String,
  searchResult: Array,
  searchDate: String,
});

const Search = model("search", searchSchema);

export default Search;
