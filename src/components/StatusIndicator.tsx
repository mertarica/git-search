import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import styles from "../styles/StatusIndicator.module.scss";

const StatusIndicator: React.FC = () => {
  const status = useSelector((state: RootState) => state.repository.status);

  let statusMessage: string;
  let statusClass: string;

  switch (status) {
    case "loading":
      statusMessage = "Loading...";
      statusClass = styles.loading;
      break;
    case "succeeded":
      statusMessage = "Data fetched successfully";
      statusClass = styles.succeeded;
      break;
    case "failed":
      statusMessage = "Failed to fetch data";
      statusClass = styles.failed;
      break;
    default:
      statusMessage = "";
      statusClass = "";
      break;
  }

  return (
    <div className={`${styles.statusIndicator} ${statusClass}`} data-testid="status-indicator">
      {statusMessage}
    </div>
  );
};

export default StatusIndicator;
