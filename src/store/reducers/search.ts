import { Suggestion, SuggestionResult } from "./../../types/data.d"
import { SearchAction } from "@/types/store"
type SearchState = {
  suggestion: Suggestion["options"]
  suggestionResult: SuggestionResult
}
const initialState: SearchState = {
  suggestion: [],
  suggestionResult: {
    page: 1,
    per_page: 10,
    total_count: 0,
    results: [],
  },
}
const Search = (state = initialState, action: SearchAction): SearchState => {
  switch (action.type) {
    case "search/suggestion":
      return {
        ...state,
        suggestion: action.payload,
      }

    case "search/clearSuggestion":
      return {
        ...state,
        suggestion: [],
      }
    case "search/getSuggestionResult":
      return {
        ...state,
        suggestionResult: action.payload,
      }
    default:
      return state
  }
}

export default Search
