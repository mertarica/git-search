import repositoryReducer, {
  RepositoryState,
  setLanguage,
  setSearchQuery,
  setSortColumn,
  setSortOrder,
  setPage,
  setPerPage,
  fetchRepositories,
} from "../slices/repositorySlice";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { store } from "../store";

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

describe("repositorySlice", () => {
  it("should handle initial state", () => {
    expect(repositoryReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle setLanguage", () => {
    const actual = repositoryReducer(initialState, setLanguage("python"));
    expect(actual.language).toEqual("python");
  });

  it("should handle setSearchQuery", () => {
    const actual = repositoryReducer(initialState, setSearchQuery("react"));
    expect(actual.searchQuery).toEqual("react");
  });

  it("should handle setSortColumn", () => {
    const actual = repositoryReducer(initialState, setSortColumn("forks"));
    expect(actual.sortColumn).toEqual("forks");
  });

  it("should handle setSortOrder", () => {
    const actual = repositoryReducer(initialState, setSortOrder("asc"));
    expect(actual.sortOrder).toEqual("asc");
  });

  it("should handle setPage", () => {
    const actual = repositoryReducer(initialState, setPage(2));
    expect(actual.page).toEqual(2);
  });

  it("should handle setPerPage", () => {
    const actual = repositoryReducer(initialState, setPerPage(20));
    expect(actual.perPage).toEqual(20);
  });

  describe("fetchRepositories", () => {
    let mock: MockAdapter;

    beforeEach(() => {
      mock = new MockAdapter(axios);
    });

    afterEach(() => {
      mock.reset();
    });

    it("should handle fetchRepositories pending state", async () => {
      mock
        .onGet(/search\/repositories/)
        .reply(200, { items: [], total_count: 0 });
      const action = store.dispatch(fetchRepositories());
      const state = store.getState().repository;
      expect(state.status).toEqual("loading");
      await action;
    });

    it("should handle fetchRepositories fulfilled state", async () => {
      const repositories = [
        {
          id: 1,
          name: "repo1",
          owner: { login: "user1" },
          description: "Repo 1 description",
          stargazers_count: 10,
          forks_count: 5,
          updated_at: "2023-05-10T10:00:00Z",
        },
      ];
      mock
        .onGet(/search\/repositories/)
        .reply(200, { items: repositories, total_count: 1 });
      await store.dispatch(fetchRepositories());
      const state = store.getState().repository;
      expect(state.status).toEqual("succeeded");
      expect(state.repositories).toEqual(repositories);
      expect(state.totalCount).toEqual(1);
    });

    it("should handle fetchRepositories rejected state", async () => {
      mock.onGet(/search\/repositories/).reply(500);
      await store.dispatch(fetchRepositories());
      const state = store.getState().repository;
      expect(state.status).toEqual("failed");
    });

    it("should update search query and trigger fetchRepositories", async () => {
      const searchQuery = "test";
      store.dispatch(setSearchQuery(searchQuery));
      mock
        .onGet(/search\/repositories/)
        .reply(200, { items: [], total_count: 0 });
      await store.dispatch(fetchRepositories());
      const state = store.getState().repository;
      expect(state.searchQuery).toEqual(searchQuery);
    });

    it("should update selected language and trigger fetchRepositories", async () => {
      const selectedLanguage = "scala";
      store.dispatch(setLanguage(selectedLanguage));
      mock
        .onGet(/search\/repositories/)
        .reply(200, { items: [], total_count: 0 });
      await store.dispatch(fetchRepositories());
      const state = store.getState().repository;
      expect(state.language).toEqual(selectedLanguage);
    });

    it("should handle fulfilled state with empty repository list", async () => {
      mock
        .onGet(/search\/repositories/)
        .reply(200, { items: [], total_count: 0 });
      await store.dispatch(fetchRepositories());
      const state = store.getState().repository;
      expect(state.status).toEqual("succeeded");
      expect(state.repositories).toEqual([]);
      expect(state.totalCount).toEqual(0);
    });

    it("should handle fulfilled state with multiple repositories", async () => {
      const repositories = [
        {
          id: 1,
          name: "repo1",
          owner: { login: "user1" },
          description: "Repo 1 description",
          stargazers_count: 10,
          forks_count: 5,
          updated_at: "2023-05-10T10:00:00Z",
        },
        {
          id: 2,
          name: "repo2",
          owner: { login: "user2" },
          description: "Repo 2 description",
          stargazers_count: 20,
          forks_count: 10,
          updated_at: "2023-05-11T10:00:00Z",
        },
      ];
      mock
        .onGet(/search\/repositories/)
        .reply(200, { items: repositories, total_count: 2 });
      await store.dispatch(fetchRepositories());
      const state = store.getState().repository;
      expect(state.status).toEqual("succeeded");
      expect(state.repositories).toEqual(repositories);
      expect(state.totalCount).toEqual(2);
    });
  });
});
