import { Box, Container, Grid, Typography } from "@mui/material";
import background from "../../assests/images/background.jpg";
import { useLocation } from "react-router-dom";
const AuthModule = ({ children }) => {
    const { pathname, search, hash } = useLocation();
    console.log("pathname", pathname, search, hash);
    const imageSize = 400;
    return (
        //    <Container fixed sx={{ height: '100vh', width: "100dvw"}}>
        <Grid container justifyContent={"right"} sx={{
            overflow: "hidden",
            height: '100dvh', width: "100%",
            background: `url(${background}) no-repeat center/cover `,
        }}>
            <Grid item xs={12} md={4} className="authClass" sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                p: { xs: 6, md: 2 }
            }}>
                <Typography variant="h4" sx={{ color: "white" }} textAlign={"center"}>Money Tracker</Typography>
                {children}
            </Grid>
        </Grid>
        // </Container>
    )
}

export default AuthModule
