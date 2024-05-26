import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import styles from "../styles/StatusIndicator.module.scss";

const StatusIndicator: React.FC = () => {
  const status = useSelector((state: RootState) => state.repository.status);

  const statusMessage = useMemo(() => {
    switch (status) {
      case "loading":
        return "Loading...";
      case "succeeded":
        return "Data fetched successfully";
      case "failed":
        return "Failed to fetch data";
      default:
        return "";
    }
  }, [status]);

  const statusClass = useMemo(() => {
    switch (status) {
      case "loading":
        return styles.loading;
      case "succeeded":
        return styles.succeeded;
      case "failed":
        return styles.failed;
      default:
        return "";
    }
  }, [status]);

  return (
    <div
      className={`${styles.statusIndicator} ${statusClass}`}
      data-testid="status-indicator"
    >
      {statusMessage}
    </div>
  );
};

export default StatusIndicator;
