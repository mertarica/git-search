import React from "react";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setLanguage } from "../redux/slices/repositorySlice";
import styles from "../styles/LanguageSelector.module.scss";

const RadioButtons: React.FC = () => {
  const dispatch = useDispatch();
  const language = useSelector((state: RootState) => state.repository.language);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLanguage(event.target.value));
  };
  return (
    <RadioGroup
      row
      value={language}
      onChange={handleChange}
      className={styles["radio-group"]}
    >
      <FormControlLabel
        value="javascript"
        control={<Radio />}
        label="JavaScript"
      />
      <FormControlLabel value="scala" control={<Radio />} label="Scala" />
      <FormControlLabel value="python" control={<Radio />} label="Python" />
    </RadioGroup>
  );
};

export default RadioButtons;
