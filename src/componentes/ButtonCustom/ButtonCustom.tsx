import Button from '@mui/material/Button';
import { CustomButtonProps } from '../../types';


export const ButtonCustom = ({
  variant = 'contained',
  color = 'primary',
  startIcon,
  endIcon,
  onClick,
  children,
  sx,
  to,
  component,
  
}: CustomButtonProps) => {
  const Component = component || 'button';


  return (
    <Button
      variant={variant}
      color={color}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      to={to}
      component={Component}
      sx={{
        borderRadius: '30px',
        paddingLeft: '30px',
        paddingRight: '30px',
        fontWeight: 'bold',
        ...(sx || {}),
      }}
    >
      {children}
    </Button>
  );
};