


import { useDispatch} from "react-redux";
import { useEffect } from "react";
import { getMonHoc } from "~/redux/apiAdmin/apiAdmin";


function ToTal({children, title}) {


  const dispatch = useDispatch()
  const totalItem = children.map((item) => {
    if (title === "SoTC") {
        return item.SoTC;
    } else if (title === "ThucHanh") {
        return item.ThucHanh;
    } else if (title === "LyThuyet") {
        return item.LyThuyet;
    } else if (title === "Thi") {
        return item.Thi;
    }
    return null; // Default return value if no conditions are met
});


  const Total = totalItem.reduce((total,currentValue) => {
        return total + currentValue;
      });

    useEffect(()=>{
        getMonHoc(dispatch)
    },[dispatch])
    return(
         <span>{Total ? Total :""}</span>
    )
}

export default ToTal;