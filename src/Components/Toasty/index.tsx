import React from 'react';
import { toast, ToastOptions } from 'react-toastify';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { SxProps, Theme } from '@mui/material';

interface Props {
	message: string;
	sx?: SxProps<Theme>;
}

const style = {
	error: {
		color: '#c85849',
	},
	success: {
		color: '#34a853',
	},
};

const ToastMessage: React.FC<Props> = ({ message, sx }) => {
	return (
		<Grid container alignItems="center" direction="row" wrap="nowrap" sx={sx}>
			<Box ml={1}>{message}</Box>
		</Grid>
	);
};

export default {
	error: (message: string, options?: ToastOptions): React.ReactText =>
		toast.error(<ToastMessage message={message} sx={style.error} />, options),
	info: (message: string, options?: ToastOptions): React.ReactText =>
		toast.info(<ToastMessage message={message} />, options),
	success: (message: string, options?: ToastOptions): React.ReactText =>
		toast.success(<ToastMessage message={message} sx={style.success} />, options),
};
