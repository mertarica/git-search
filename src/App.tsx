import React from "react";
import { Container, Typography } from "@mui/material";
import LanguageSelector from "./components/LanguageSelector";
import SearchInput from "./components/SearchInput";
import RepositoryTable from "./components/RepositoryTable";
import StatusIndicator from "./components/StatusIndicator";
import styles from "./styles/App.module.scss";

const App: React.FC = () => {
  return (
    <Container className={styles["container"]}>
      <div className={styles.header}>
        <Typography variant="h4" gutterBottom className="title">
          GitHub Repository Search
        </Typography>
        <LanguageSelector />
        <SearchInput />
        <StatusIndicator />
      </div>
      <RepositoryTable />
    </Container>
  );
};

export default App;
