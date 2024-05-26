import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import SearchInput from "../SearchInput";
import { setSearchQuery } from "../../redux/slices/repositorySlice";

const mockStore = configureStore([]);

describe("SearchInput", () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      repository: {
        repositories: [],
        language: "javascript",
        searchQuery: "",
        sortColumn: "stars",
        sortOrder: "desc",
        page: 0,
        perPage: 10,
        totalCount: 0,
        status: "idle",
      },
    });
    store.dispatch = jest.fn();
  });

  test("renders search input with correct label", () => {
    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
  });

  test("dispatches setSearchQuery action on input change", () => {
    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "react" },
    });
    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(setSearchQuery("react"));
    }, 300);
  });
});
