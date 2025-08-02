import Box from "@mui/material/Box";
import Stepper from "./components/stepperForm/Stepper";

function App() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
        p: 2,
      }}>
      <Stepper />
    </Box>
  );
}

export default App;
