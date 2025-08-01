import Box from "@mui/material/Box";
import Stepper from "./components/stepperForm/Stepper";

function App() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}>
      <Stepper />
    </Box>
  );
}

export default App;
