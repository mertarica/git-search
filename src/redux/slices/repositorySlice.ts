import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

interface Repository {
  readonly id: number;
  readonly owner: Owner;
  readonly description: string;
  readonly stargazers_count: number;
  readonly forks_count: number;
  readonly updated_at: string;
}

interface Owner {
  readonly login: string;
  readonly avatar_url: string;
}

export interface RepositoryState {
  repositories: Repository[];
  language: string;
  searchQuery: string;
  sortColumn: string;
  sortOrder: "asc" | "desc";
  page: number;
  perPage: number;
  totalCount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: RepositoryState = {
  repositories: [],
  language: "javascript",
  searchQuery: "",
  sortColumn: "stars",
  sortOrder: "desc",
  page: 0,
  perPage: 10,
  totalCount: 0,
  status: "idle",
};

export const fetchRepositories = createAsyncThunk(
  "repository/fetchRepositories",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { language, searchQuery, sortColumn, sortOrder, page, perPage } =
      state.repository;
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=${searchQuery}+language:${language}&sort=${sortColumn}&order=${sortOrder}&page=${page}&per_page=${perPage}`
    );
    return {
      repositories: response.data.items,
      totalCount: response.data.total_count,
    };
  }
);

const repositorySlice = createSlice({
  name: "repository",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSortColumn(state, action: PayloadAction<string>) {
      state.sortColumn = action.payload;
    },
    setSortOrder(state, action: PayloadAction<"asc" | "desc">) {
      state.sortOrder = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setPerPage(state, action: PayloadAction<number>) {
      state.perPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRepositories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.repositories = action.payload.repositories;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchRepositories.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  setLanguage,
  setSearchQuery,
  setSortColumn,
  setSortOrder,
  setPage,
  setPerPage,
} = repositorySlice.actions;

export default repositorySlice.reducer;
