import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sub from "date-fns/sub";
import { height } from "@mui/system";

const FormLayout = () => {
  const navigate = useNavigate();
  const initialValues = {
    inputValue: "",
    inputType: "string",
    inputNeed: "required",
    options: [""],
  };
  // const initialOptionValue = {
  //   optionValue: "",
  // };
  const [isDisable, setIsDisable] = useState(false);
  const [formArray, setFormArray] = useState([{ ...initialValues }]);
  const [err, setErr] = useState({});

  // const [formOptionArray, setFormOptionArray] = useState([
  //   { ...initialOptionValue },
  // ]);

  // Form Submit Handler
  const formQuestionareSubmitHandler = () => {
    localStorage.setItem("forms", JSON.stringify(formArray));
    localStorage.setItem("formLayout", JSON.stringify({ layout: "form" }));
    console.log("Form",formArray);
    navigate("/formPreview");
  };

  //Input Change Handler
  const inputChangeHandler = (e, idx) => {
    const { name, value } = e.target;
    const newValues = [...formArray];
    newValues[idx][name] = value;
    setFormArray([...newValues]);
    // }
  };

  //Add button Click Handler
  const addInputHandler = () => {
    console.log(formArray);
    setFormArray((prev) => [...prev, initialValues]);
    // setFormOptionArray([{...initialOptionValue}])
    setIsDisable(false);
  };

  //Sub Input Change Handler
  const subInputChangeHandler = (e, idx, subId) => {
    const { name, value } = e.target;
    console.log(name, value, subId, "id", idx);
    const newValues = [...formArray];
    newValues[idx].options[subId] = value;
    setFormArray([...newValues]);
  };

  //Sub Add button Click Handler
  const subAddButtonClickHandler = (idx) => {
    let tempFormArray = [...formArray];
    tempFormArray[idx].options.push("");
    console.log("TEMP DATA", tempFormArray[idx].options);
    setFormArray([...tempFormArray]);
    // setFormOptionArray((prev) => [...prev, { ...initialOptionValue }]);
    // console.log([...formOptionArray]);
  };
  const inputOnBlurHandler = (e, idx) => {
    console.log(e.target.value, idx);
    if (!e.target.value) {
      const objId = idx.toString();
      console.log(objId, typeof objId);
      const tempObj = { ...err };
      tempObj[idx] = "Invalid";
      setErr({ ...tempObj });
    }
  };
  const inputOnFocusHandler = (idx) => {
    const objId = idx.toString();
    console.log(objId, typeof objId);
    const tempObj = { ...err };
    delete tempObj[idx];
    setErr({ ...tempObj });
    // setErr({objId : ""})
  };
  useEffect(() => {
    // console.log("formArraaaaay", formArray);
    const temp = formArray.filter(
      (formData) =>
        formData.inputValue === "" ||
        ((formData.inputType === "radio" ||
          formData.inputType === "dropdown") &&
          formData.options.indexOf("") !== -1)
    );
    temp.length !== 0 ? setIsDisable(true) : setIsDisable(false);
    console.log(formArray);
    // console.log('input change',temp);
    // console.log("err",err);
  }, [err, formArray]);
  return (
    <Box>
      <Grid container justifyContent="center">
        <Grid item sm={8}>
          {/* rendering form array */}
          {formArray.length > 0 &&
            formArray.map((formData, idx) => {
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    margin: "auto",
                    marginBottom: "15px",
                  }}
                >
                  {/* {console.log(err[idx])} */}
                  <TextField
                    // hiddenLabel
                    name="inputValue"
                    label="Field Label"
                    size="small"
                    value={formData.inputValue}
                    onChange={(e) => inputChangeHandler(e, idx)}
                    onBlur={(e) => inputOnBlurHandler(e, idx)}
                    onFocus={() => inputOnFocusHandler(idx)}
                    error={err[idx] === "Invalid" && true}
                    helperText={err[idx] === "Invalid" && "Required Field"}
                    // InputLabelProps = {{style : {height : '30px',  fontSize: "15px",}}}
                    // inputProps={{ style: { height: "15px" } }}
                    // sx={{maxHeight:'30px',fontSize:'15px'}}
                    required
                  />

                  <Grid container>
                    <Grid item sm={6}>
                      <TextField
                        select
                        fullWidth
                        //  defaultValue="string"
                        value={formData.inputType}
                        // placeholder="Text"
                        name="inputType"
                        size="small"
                        onChange={(e) => inputChangeHandler(e, idx)}
                        // sx={{ marginTop: "22px" }}
                      >
                        <MenuItem value="string">Text</MenuItem>
                        <MenuItem value="dropdown">DropDown</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                        <MenuItem value="radio">Radio</MenuItem>
                        <MenuItem value="checkbox">CheckBox</MenuItem>
                        <MenuItem value="file">FileUpload</MenuItem>
                      </TextField>
                    </Grid>
                    <Grid item sm={6}>
                      {(formData.inputType === "text" ||
                        formData.inputType === "string" ||
                        formData.inputType === "number" ||
                        formData.inputType === "textArea" ||
                        formData.inputType === "email") && (
                        <>
                          {/* {console.log("inside Text")} */}
                          {/* <Typography sx={{ fontSize: "15px", color: "blue" }}>
                            Select Text Type
                          </Typography> */}
                          <TextField
                            fullWidth
                            value={formData.inputType}
                            name="inputType"
                            select
                            size="small"
                            onChange={(e) => inputChangeHandler(e, idx)}
                          >
                            <MenuItem value="string">String</MenuItem>
                            <MenuItem value="number">Number</MenuItem>
                            <MenuItem value="textArea">TextArea</MenuItem>
                            <MenuItem value="email">Email</MenuItem>
                          </TextField>
                        </>
                      )}
                      {(formData.inputType === "dropdown" ||
                        formData.inputType === "radio" ||
                        formData.inputType === "checkbox") && (
                        <>
                          {/* <Typography sx={{ color: "blue", fontSize: "15px" }}>
                            Add Options for {formData.inputType}
                          </Typography> */}
                          {formArray[idx].options.map((formSubData, subId) => {
                            return (
                              <TextField
                                key={subId}
                                fullWidth
                                m={2}
                                size="small"
                                name="optionValue"
                                placeholder="Option Name"
                                value={formSubData}
                                onChange={(e) =>
                                  subInputChangeHandler(e, idx, subId)
                                }
                                required
                              />
                            );
                          })}
                          <AddIcon
                            onClick={() => subAddButtonClickHandler(idx)}
                            sx={{
                              marginTop:'5px',
                              position:"absolute",
                              cursor: "pointer",
                            }}
                          />
                        </>
                      )}
                    </Grid>
                  </Grid>
                  <TextField
                    select
                    size="small"
                    value={formData.inputNeed}
                    name="inputNeed"
                    onChange={(e) => inputChangeHandler(e, idx)}
                  >
                    <MenuItem value="required">Required</MenuItem>
                    <MenuItem value="optional">Optional</MenuItem>
                  </TextField>
                </div>
              );
            })}
        </Grid>
        <Grid item sm={10}>
          <AddIcon
            sm={10}
            onClick={addInputHandler}
            sx={{
              display: "block",
              margin: "auto",
              cursor: "pointer",
            }}
          />
          <Button
            variant="contained"
            size="small"
            onClick={formQuestionareSubmitHandler}
            disabled={(Object.keys(err).length !== 0 || isDisable) && true}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormLayout;
