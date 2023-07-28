import { Typography } from "@mui/material"
import FullLayout from "../components/FullLayout"
import Spacing from "../components/Spacing"
import AnimatedMegaphone from "../components/AnimatedMegaphone"
import RealTime from "../components/RealTime"
import MostBalance from "../components/MostBalance"
import MostPay from "../components/MostPay"


const fontUrl = 'https://fonts.googleapis.com/css?family=Poor+Story:400';
const fontStyles = `@import url('${fontUrl}');`;

export const MainPage: React.FC = () => {
    return (
        <FullLayout alignCentered>
            <style>{fontStyles}</style> 
            <Typography
                fontWeight={'bold'}
                variant="h2"
                style={{ fontFamily: 'Poor Story, sans-serif'}} 
            > <AnimatedMegaphone />
                <span style={{ marginRight: "1rem", }}>정의 페이 달란트 현황</span>
            </Typography>
            <Spacing size={3} />

            <div style={{ display: "flex", justifyContent: "center", gap: "3rem" }}>
                <MostBalance />
                <MostPay />
            </div>
            <Spacing size={3} />
            <RealTime />
        </FullLayout>
    )
}
