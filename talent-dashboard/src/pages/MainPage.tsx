import { Typography } from "@mui/material"
import FullLayout from "../components/FullLayout"
import Spacing from "../components/Spacing"
import AnimatedMegaphone from "../components/AnimatedMegaphone"
import RealTime from "../components/RealTime"
import MostBalance from "../components/MostBalance"
import MostPay from "../components/MostPay"

export const MainPage: React.FC = () => {
    return (
        <FullLayout alignCentered>
            <Spacing size={6} />
            <Typography
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    backgroundColor: "lavender",
                    borderRadius: "1rem",
                    paddingLeft: "1rem", paddingRight: "1rem"
                }}
                fontWeight={'bold'}
                variant="h2"
            > <AnimatedMegaphone />
                <span style={{ marginRight: "1rem" }}>정의 페이 달란트 현황</span>
            </Typography>
            <RealTime />

            <div style={{ display: "flex", justifyContent: "center", gap: "3rem" }}>
                <MostBalance />
                <MostPay />
            </div>
        </FullLayout>
    )
}
