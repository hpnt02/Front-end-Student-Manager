import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function Option({title,onChange, ...prop}) {
 
  
  const [option, setOption] = React.useState(prop.value === false ? false : true);
  const handleChange = (event) => {
    setOption(event.target.value);
    onChange(event.target.value)
  };

  return (
    <FormControl sx={{'& .css-1nrlq1o-MuiFormControl-root':{
      margin:'8px'
    }  }}>
      <FormLabel id="demo-row-radio-buttons-group-label">{title}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handleChange}
        value={option}
      >
        <FormControlLabel value="true" control={<Radio />} label={prop.label ? "Môn học chung" :"Nam"} />
        <FormControlLabel value="false" control={<Radio />} label={prop.label ? "Môn học riêng" :"Nữ"} />
       
      </RadioGroup>
    </FormControl>
   
  );
}
