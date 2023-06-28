import { Box } from "@mui/material";
import PropTypes from "prop-types";

const FullLayout = ({ children, alignCentered, justifyCentered }) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "95vh",
                p: 3,
                ...(justifyCentered ? { justifyContent: "center" } : {}),
                ...(alignCentered ? { alignItems: "center" } : {}),
            }}
        >
            {children}
        </Box>
    );
};

FullLayout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
    alignCentered: PropTypes.bool,
    justifyCentered: PropTypes.bool,
};

export default FullLayout;
