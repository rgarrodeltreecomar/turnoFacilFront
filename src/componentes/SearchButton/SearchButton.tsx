import React from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { ButtonCustom } from "../ButtonCustom/ButtonCustom";

export interface SearchButtonProps {
  text: string | React.ReactNode;
  onClick: () => void;
}

export const SearchButton: React.FC<SearchButtonProps> = ({
  text,
  onClick,
}) => {
  return (
    <ButtonCustom
      variant="contained"
      color="primary"
      sx={{
        height: "98%",
        margin: "auto",
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
      }}
      onClick={() => onClick()}
      startIcon={<SearchIcon />}
    >
      {text}
    </ButtonCustom>
  );
};