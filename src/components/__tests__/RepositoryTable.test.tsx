import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import RepositoryTable from "../RepositoryTable";
import {
  setSortColumn,
  setSortOrder,
} from "../../redux/slices/repositorySlice";

const mockStore = configureStore([]);

const mockRepositories = [
  {
    id: 1,
    name: "repo1",
    owner: { login: "user1" },
    description: "Repo 1 description",
    stargazers_count: 123,
    forks_count: 234,
    updated_at: "2023-05-10T10:00:00Z",
  },
  {
    id: 2,
    name: "repo2",
    owner: { login: "user2" },
    description: "Repo 2 description",
    stargazers_count: 345,
    forks_count: 456,
    updated_at: "2023-05-11T10:00:00Z",
  },
];

describe("RepositoryTable", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      repository: {
        repositories: mockRepositories,
        language: "javascript",
        searchQuery: "",
        sortColumn: "stars",
        sortOrder: "desc",
        page: 0,
        perPage: 10,
        totalCount: 2,
        status: "idle",
      },
    });
    store.dispatch = jest.fn();
  });

  test("renders repository table with correct columns", () => {
    render(
      <Provider store={store}>
        <RepositoryTable />
      </Provider>
    );

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Repo Description")).toBeInTheDocument();
    expect(screen.getByText("Stars")).toBeInTheDocument();
    expect(screen.getByText("Forks")).toBeInTheDocument();
    expect(screen.getByText("Last Update")).toBeInTheDocument();
  });

  test("renders repository data correctly", () => {
    render(
      <Provider store={store}>
        <RepositoryTable />
      </Provider>
    );

    expect(screen.getByText("user1")).toBeInTheDocument();
    expect(screen.getByText("Repo 1 description")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("234")).toBeInTheDocument();
    expect(screen.getByText("5/10/2023")).toBeInTheDocument();

    expect(screen.getByText("user2")).toBeInTheDocument();
    expect(screen.getByText("Repo 2 description")).toBeInTheDocument();
    expect(screen.getByText("345")).toBeInTheDocument();
    expect(screen.getByText("456")).toBeInTheDocument();
    expect(screen.getByText("5/11/2023")).toBeInTheDocument();
  });

  test("should call sorting actions", () => {
    render(
      <Provider store={store}>
        <RepositoryTable />
      </Provider>
    );

    fireEvent.click(screen.getByText("Stars"));
    expect(store.dispatch).toHaveBeenCalledWith(setSortOrder("asc"));
    expect(store.dispatch).toHaveBeenCalledWith(setSortColumn("stars"));

    fireEvent.click(screen.getByText("Forks"));
    expect(store.dispatch).toHaveBeenCalledWith(setSortOrder("asc"));
    expect(store.dispatch).toHaveBeenCalledWith(setSortColumn("forks"));

    fireEvent.click(screen.getByText("Last Update"));
    expect(store.dispatch).toHaveBeenCalledWith(setSortOrder("asc"));
    expect(store.dispatch).toHaveBeenCalledWith(setSortColumn("updated"));
  });
});
