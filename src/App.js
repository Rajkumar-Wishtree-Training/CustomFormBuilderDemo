import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import FormCreator from "./components/FormCreator";
import FormPreview from "./components/FormPreview";

function App() {
  return (
    <Box>
      <Routes>
        <Route path='/' element={<FormCreator/>}/>
        <Route path="/formPreview" element={<FormPreview/>}/>
      </Routes>
      
    </Box>
  );
}

export default App;
