import { Box, useTheme } from "@mui/material";
import PropTypes from "prop-types";

const Spacing = ({ size, horizontal }) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				flex: "none",
				height: horizontal ? 0 : theme.spacing(size),
				width: horizontal ? theme.spacing(size) : 0,
			}}
		/>
	);
};

Spacing.propTypes = {
	size: PropTypes.number.isRequired,
	horizontal: PropTypes.bool,
};

export default Spacing;
