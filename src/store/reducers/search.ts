import { Suggestion } from "./../../types/data.d"
import { SearchAction } from "@/types/store"
type SearchState = {
  suggestion: Suggestion["options"]
}
const initialState: SearchState = {
  suggestion: [],
}
const Search = (state = initialState, action: SearchAction): SearchState => {
  switch (action.type) {
    case "search/suggestion":
      return {
        ...state,
        suggestion: action.payload,
      }

    default:
      return state
  }
}

export default Search
