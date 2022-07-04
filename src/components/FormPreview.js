import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  IconButton,
  Input,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";
import { FileUpload, PhotoCamera } from "@mui/icons-material";

const FormPreview = () => {
  const forms = JSON.parse(localStorage.getItem("forms"));
  console.log(forms);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "60vw" }}>Questions</TableCell>
              <TableCell sx={{ width: "40vw" }}>Answers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {forms.map((data, i) => {
              return (
                <TableRow key={i}>
                  {console.log(data)}
                  <TableCell>{data.inputValue}</TableCell>
                  <TableCell>
                    {data.inputType === "radio" && (
                      <>
                        <RadioGroup
                          sx={{ display: "flex", flexDirection: "row" }}
                          aria-labelledby="demo-radio-buttons-group-label"
                          // defaultValue="female"
                          name="radio-buttons-group"
                        >
                          {data.options.map((option, id) => {
                            return (
                              <FormControlLabel
                                key={id}
                                value={option}
                                control={<Radio />}
                                label={option}
                              />
                            );
                          })}
                        </RadioGroup>
                      </>
                    )}
                    {data.inputType === "checkbox" && (
                      <>
                        {/* <FormLabel>{data.inputValue}</FormLabel> */}
                        <FormGroup>
                          {data.options.map((option, id) => {
                            return (
                              <FormControlLabel
                                key={id}
                                control={<Checkbox />}
                                label={option}
                              />
                            );
                          })}
                        </FormGroup>
                      </>
                    )}
                    {data.inputType === "dropdown" && (
                      <TextField
                        fullWidth
                        id="outlined-select-currency"
                        select
                        // label="Select"
                        value=""
                        // onChange={handleChange}
                        // helperText="Please select your currency"
                      >
                        {data.options.map((option, id) => {
                          return (
                            <MenuItem key={id} value={option}>
                              {option}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    )}
                    {data.inputType === "date" && (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Basic example"
                          // value=
                          // onChange={(newValue) => {
                          //   setValue(newValue);
                          // }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    )}
                    {data.inputType === "file" && (
                      <label htmlFor="icon-button-file">
                        <input
                          style={{display : 'none'}}
                          accept="image/*"
                          id="icon-button-file"
                          type="file"
                        />
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <FileUpload />
                        </IconButton>
                      </label>
                    )}
                    {(data.inputType === "string" ||
                      data.inputType === "textArea" ||
                      data.inputType === "email" ||
                      data.inputType === "number") && (
                      <TextField
                        fullWidth
                        id="outlined-textarea"
                        type={data.inputType}
                        rows={data.inputType === "textArea" ? 4 : ""}
                        // label="Multiline Placeholder"
                        // placeholder="Placeholder"
                        multiline
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FormPreview;
