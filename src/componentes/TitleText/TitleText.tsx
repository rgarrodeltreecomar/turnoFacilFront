
import Typography from '@mui/material/Typography';

export const TitleText = ({ text, align }: { text: string; align: 'left' | 'center' | 'right' }) => {
  return (
    <Typography variant="h4" gutterBottom align={align}>
      {text}
    </Typography>
  );
};

