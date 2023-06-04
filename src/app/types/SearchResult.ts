import { User } from "./User";

export interface SearchResult {
  total_count: number,
  incomplete_results: boolean,
  items: User[]
}
