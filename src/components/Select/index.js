import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SelectLabels({title, select,  width, label,  Current, onChange, other, ...prop}) {
    const [option, setOption] = React.useState(Current||"");
  const handleChange = (event) => {
    setOption(event.target.value);
    onChange(event.target.value)
  };
 
  return (
    
      <FormControl sx={{ m: 1, minWidth:  width === true ? 450 : 200, zIndex: prop.ZIndex ? 10000 : 0, marginBottom: 1.3 }}>
        <InputLabel id="demo-simple-select-helper-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={option}
          label={other}
          disabled={prop.disable}
          onChange={handleChange}
          sx={{ textAlign: "center"}}
        >
         {
            select.map((hk, index) =>{
                 return(               
                     <MenuItem  key={index} value={hk._id || hk.value}>{hk.TenHocKy} {hk.TenNamHoc} {hk.TenLopHoc} {hk.TenKhoa} {hk.HoGV} {hk.TenGV} {hk.TenMonHoc} {hk.TenNganh} {hk.TenLoaiDiem} {hk.title}</MenuItem>
                )
            })
         }


        </Select>
        <FormHelperText>{label}</FormHelperText>
      </FormControl>
      
 
  );
}
