import React, { useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";

import  { MyDocument } from "./KiemTra";
import { useDispatch, useSelector } from "react-redux";
import { DSHS } from "~/redux/apiAdmin/apiAdmin";


const Print = ()=> {
    const hs = useSelector((state) => state.dshs.dshs.dshs);
    const dispatch = useDispatch()
    useEffect(() => {
        DSHS(dispatch)
}, [dispatch])
    return (  
    //   <MyDocument hs={hs}/>

         <PDFDownloadLink document={<MyDocument hs={hs}/>} fileName="test">
             {({loading}) => (loading ? <button>Loading Document ...</button> :<button>Download</button>)}
         </PDFDownloadLink> 
 
    

    );
}

export default Print;