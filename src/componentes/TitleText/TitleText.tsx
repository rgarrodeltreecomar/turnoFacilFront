import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

export const TitleText = ({
  text,
  align,
  startIcon,
  endIcon,
  children,
}: {
  text?: string;
  align: "left" | "center" | "right";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children?: ReactNode;
}) => {

  const getJustify = (align: "left" | "center" | "right") => {
    if (align === "center") return "center";
    if (align === "right") return "flex-end";
    return "flex-start";
  };

  return (
    <Typography
      variant="h4"
      gutterBottom
      sx={{
        textAlign: align, 
        display: "flex",
        alignItems: "center",
        justifyContent: getJustify(align),
        gap: 1, 
      }}
    >
      {startIcon}
      <span>{text}</span>
      {children}
      {endIcon}
    </Typography>
  );
};
