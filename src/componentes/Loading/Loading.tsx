import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';

export interface LoadingProps {
    loading: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ loading }) => {
    return (
        <Backdrop
            sx={{ color: '#3ab4ff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        // onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}