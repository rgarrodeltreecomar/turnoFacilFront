import { SvgIcon, SvgIconProps } from "@mui/material";

export const DoctorIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <circle cx="12" cy="8" r="4" fill="#2196F3" />
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke="#1976D2" strokeWidth="2" fill="none" />
    <rect x="16" y="4" width="6" height="2" rx="1" fill="#1976D2" />
    <rect x="18" y="2" width="2" height="6" rx="1" fill="#1976D2" />
  </SvgIcon>
);