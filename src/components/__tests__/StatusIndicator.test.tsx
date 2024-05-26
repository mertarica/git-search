import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import StatusIndicator from "../StatusIndicator";

const mockStore = configureStore([]);

const renderWithRedux = (status: string) => {
  const store = mockStore({
    repository: { status },
  });
  return render(
    <Provider store={store}>
      <StatusIndicator />
    </Provider>
  );
};

describe("StatusIndicator", () => {
  it("should display 'Loading...' when status is loading", () => {
    renderWithRedux("loading");

    expect(screen.getByTestId("status-indicator")).toBeInTheDocument();
    expect(screen.getByTestId("status-indicator")).toHaveClass("loading");
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should display 'Data fetched successfully' when status is succeeded", () => {
    renderWithRedux("succeeded");

    expect(screen.getByTestId("status-indicator")).toBeInTheDocument();
    expect(screen.getByTestId("status-indicator")).toHaveClass("succeeded");
    expect(screen.getByText("Data fetched successfully")).toHaveClass(
      "succeeded"
    );
  });

  it("should display 'Failed to fetch data' when status is failed", () => {
    renderWithRedux("failed");

    expect(screen.getByTestId("status-indicator")).toBeInTheDocument();
    expect(screen.getByTestId("status-indicator")).toHaveClass("failed");
    expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
  });

  it("should not display any message when status is idle", () => {
    renderWithRedux("idle");

    expect(screen.getByTestId("status-indicator")).toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    expect(screen.queryByText("Failed to fetch data")).not.toBeInTheDocument();
    expect(screen.queryByText("Data fetched successfully")).not.toBeInTheDocument();
  });
});
