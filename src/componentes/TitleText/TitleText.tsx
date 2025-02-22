import Typography from "@mui/material/Typography";
import { ReactNode } from "react";

export const TitleText = ({
  text,
  align,
  startIcon,
  endIcon,
}: {
  text: string;
  align: "left" | "center" | "right";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
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
        textAlign: align, // Asegura que el texto dentro respete la alineación
        display: "flex",
        alignItems: "center",
        justifyContent: getJustify(align),
        gap: 1, // Espacio entre el ícono y el texto
      }}
    >
      {startIcon}
      <span>{text}</span>
      {endIcon}
    </Typography>
  );
};
