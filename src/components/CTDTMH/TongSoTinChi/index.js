import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { DSLH, getMonHoc } from "~/redux/apiAdmin/apiAdmin";

function TongSoTinChi() {
    const dispatch = useDispatch()

    const student = useSelector((state) => state.auth.login?.currentUser?.HocSinh?.LopHoc);

const lophoc = useSelector((state) => state.dslh?.dslh?.dslh)||""
    const lop = lophoc.filter((item) => item._id === student)
  const monhoc = useSelector((state) => state.monhoc?.monhoc?.monhoc?.items)||[]
    const maxmonhoc = useSelector((state) => state.monhoc?.monhoc?.monhoc?.totalItems)||""
     const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh)
      const nganh = Allnganh.filter((item) => item._id === lop[0].Nganh)
     const monhocchuyennganh = monhoc.filter((item) => item.Nganh === nganh[0]._id)
     
     var SoTC = monhocchuyennganh.map(function(obj) {
        return obj.SoTC;
      });
        
      const TongSoTinChi = SoTC.reduce((total,currentValue) => {
        return total + currentValue;
      });

     useEffect(()=>{    
        DSLH(dispatch)
        getMonHoc(maxmonhoc,dispatch)
    },[dispatch,maxmonhoc])

    return ( 
        <strong>{TongSoTinChi}</strong>
     );
}

export default TongSoTinChi;