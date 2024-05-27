import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  fetchRepositories,
  setSortColumn,
  setSortOrder,
  setPage,
  setPerPage,
} from "../redux/slices/repositorySlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  CircularProgress,
  Avatar,
} from "@mui/material";
import styles from "../styles/RepositoryTable.module.scss";

const RepositoryTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    repositories,
    sortColumn,
    sortOrder,
    page,
    perPage,
    totalCount,
    status,
    language,
    searchQuery,
  } = useSelector((state: RootState) => state.repository);

  useEffect(() => {
    dispatch(fetchRepositories());
  }, [dispatch, sortColumn, sortOrder, page, perPage, language, searchQuery]);

  const handleSort = (column: string) => {
    const isAsc = sortColumn === column && sortOrder === "asc";
    dispatch(setSortOrder(isAsc ? "desc" : "asc"));
    dispatch(setSortColumn(column));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(setPerPage(parseInt(event.target.value)));
  };

  if (status === "loading") {
    return (
      <div className={styles["loading-spinner"]}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Paper elevation={3}>
      <TableContainer className={styles["table-container"]}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Repo Description</TableCell>
              <TableCell
                sortDirection={sortColumn === "stars" ? sortOrder : false}
              >
                <TableSortLabel
                  active={sortColumn === "stars"}
                  direction={sortColumn === "stars" ? sortOrder : "asc"}
                  onClick={() => handleSort("stars")}
                >
                  Stars
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={sortColumn === "forks" ? sortOrder : false}
              >
                <TableSortLabel
                  active={sortColumn === "forks"}
                  direction={sortColumn === "forks" ? sortOrder : "asc"}
                  onClick={() => handleSort("forks")}
                >
                  Forks
                </TableSortLabel>
              </TableCell>
              <TableCell
                sortDirection={sortColumn === "updated" ? sortOrder : false}
              >
                <TableSortLabel
                  active={sortColumn === "updated"}
                  direction={sortColumn === "updated" ? sortOrder : "asc"}
                  onClick={() => handleSort("updated")}
                >
                  Last Update
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repositories.map((repo) => (
              <TableRow key={repo.id}>
                <TableCell>{repo.id}</TableCell>
                <TableCell>
                  <div className={styles["table-cell-author"]}>
                    <Avatar src={repo.owner.avatar_url} />

                    {repo.owner?.login}
                  </div>
                </TableCell>
                <TableCell>{repo?.description}</TableCell>
                <TableCell>{repo?.stargazers_count}</TableCell>
                <TableCell>{repo?.forks_count}</TableCell>
                <TableCell>
                  {new Date(repo.updated_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[
          { value: 10, label: "10" },
          { value: 25, label: "25" },
          { value: 50, label: "50" },
        ]}
        component="div"
        count={totalCount}
        rowsPerPage={perPage}
        page={page}
        onPageChange={(_, p) => handlePageChange(p)}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
};

export default RepositoryTable;
