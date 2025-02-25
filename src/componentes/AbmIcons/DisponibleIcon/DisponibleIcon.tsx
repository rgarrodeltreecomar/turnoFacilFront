import { SvgIcon, SvgIconProps } from "@mui/material";

export const DisponibilidadIcon: React.FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24">

      <path d="M19 4h-1V2h-2v2H8V2H6v2H5C3.9 4 3 4.9 3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM7 12h5v5H7z" />

      <circle cx="18" cy="16" r="3" />
      <path d="M20.3 19.7a1 1 0 0 0-1.4-1.4l-1.8 1.8a1 1 0 0 0 1.4 1.4l1.8-1.8z" />
    </SvgIcon>
  );
};
