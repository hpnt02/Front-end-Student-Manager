import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Input({label,onChange, placeholder, ...prop}) {

  return (
    <Box
      sx={{ "& .MuiTextField-root": {  width: "90%" } }}
      noValidate
      autoComplete="off"
    >
        <TextField
        disabled={prop.disable}
          id="outlined-textarea"
          label={label}
          placeholder={placeholder}
          multiline
          onChange={onChange}
          value={prop.value}      
        />
    </Box>
  );
}