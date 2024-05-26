import React, { useEffect, useRef } from "react";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSearchQuery } from "../redux/slices/repositorySlice";
import styles from "../styles/SearchInput.module.scss";

const SearchInput: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(
    (state: RootState) => state.repository.searchQuery
  );
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      dispatch(setSearchQuery(value));
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  return (
    <TextField
      label="Search"
      inputProps={{ "data-testid": "search-input" }}
      variant="outlined"
      defaultValue={searchQuery}
      onChange={handleChange}
      fullWidth
      className={styles["search-input"]}
    />
  );
};

export default SearchInput;
