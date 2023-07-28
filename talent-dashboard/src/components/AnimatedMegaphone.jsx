import { Box } from "@mui/material";

const AnimatedMegaphone = () => {
    return (
        <Box
            sx={{
                "@keyframes rotateAnimation": {
                    "0%": {
                        transform: "rotateZ(0deg)",
                    },
                    "50%": {
                        transform: "rotateZ(5deg)",
                    },
                    "100%": {
                        transform: "rotateZ(0deg)",
                    },
                },
                animation: "rotateAnimation 1s ease-in-out infinite",
            }}
        >
            <img
                src={"/assets/images/megaphone.png"}
                width={200}
                alt="megaphone"
            />
        </Box>
    );
};

export default AnimatedMegaphone;