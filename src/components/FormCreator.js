import { Box, Grid } from "@mui/material";
import FormLayout from './FormLayout.js'
import TableLayout from './TableLayout.js'
import React, { useState } from "react";

const FormCreator = () => {
    const [layout, setLayout] = useState('form')
    // console.log(layout,"layout");
  return (
    <Box>
      <Grid container>
        <Grid item sm={12}>
        <select name="layout" id="layout1" onChange={(e) => {setLayout(e.target.value)}} style={{display:'block',margin:'auto',marginTop:'5px',marginBottom:'10px'}}>
          <option value='form'>Form</option>
          <option value='table'>Table</option>
        </select>
        </Grid>
      </Grid>
      {
        layout === 'form' ? <FormLayout/> : <TableLayout/>
      }
    </Box>
  );
};

export default FormCreator;
