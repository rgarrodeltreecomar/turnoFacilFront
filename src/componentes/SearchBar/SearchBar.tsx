import { styled } from '@mui/material/styles';
import { InputAdornment, TextField } from "@mui/material";

export interface SearchInputProps {
  value: string;
  placeholder: string;
  handleInputChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  placeholder,
  handleInputChange,
}) => {

    const StyledTextField = styled(TextField)({
        '& .MuiOutlinedInput-root': {
          borderRadius: '30px 0 0 30px',
        },
      });

  return (
    <StyledTextField
      id="outlined-search"
      type="search"
      variant="outlined"
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange} 
      InputProps={{
        startAdornment: <InputAdornment position="start" />,
      }}
      fullWidth
    />
  );
};