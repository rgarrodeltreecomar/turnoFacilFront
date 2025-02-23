import { SvgIcon, SvgIconProps } from "@mui/material";

interface HoraIconProps extends SvgIconProps {
  whiteBorder?: boolean; // Add a prop for white border
}

export const HoraIcon: React.FC<HoraIconProps> = (props) => {
  const { whiteBorder, ...rest } = props; 
  const borderColor = whiteBorder ? "#FFFFFF" : "#000000";
  return (
    <SvgIcon {...rest} viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="#2196F3"
        stroke={borderColor} 
        strokeWidth="2"
      />
      <path
        d="M12 6v6l3 1.5"
        stroke={borderColor} 
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </SvgIcon>
  );
};