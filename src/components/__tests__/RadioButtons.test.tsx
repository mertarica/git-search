import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import RadioButtons from "../LanguageSelector";
import { setLanguage } from "../../redux/slices/repositorySlice";

const mockStore = configureStore([]);

describe("RadioButtons", () => {
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

  test("renders radio buttons with correct labels and default selection", () => {
    render(
      <Provider store={store}>
        <RadioButtons />
      </Provider>
    );

    expect(screen.getByLabelText("JavaScript")).toBeChecked();
    expect(screen.getByLabelText("Scala")).not.toBeChecked();
    expect(screen.getByLabelText("Python")).not.toBeChecked();
  });

  test("dispatches setLanguage action on radio button change", () => {
    render(
      <Provider store={store}>
        <RadioButtons />
      </Provider>
    );

    fireEvent.click(screen.getByLabelText("Scala"));
    expect(store.dispatch).toHaveBeenCalledWith(setLanguage("scala"));
  });
});
