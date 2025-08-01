import Box from "@mui/material/Box";
import Stepper from "./components/stepperForm/Stepper";

const steps = ["Step 1", "Step 2"];

function App() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        height: "100%",
      }}>
      <Stepper steps={steps} />
    </Box>
  );
}

export default App;
