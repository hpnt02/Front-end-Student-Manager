import classNames from 'classnames/bind';
import styles from './InforStudy.module.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import {  getHSTLH} from '~/redux/apiAdmin/apiAdmin'
import {LVPIcon, TotalStudentIcon} from '~/components/Icons/icons'
import { getLichHoc,getNamHoc,getHocKy} from '~/redux/apiAdmin/apiAdmin';
const cx = classNames.bind(styles);

function InforStudy() {
    const user = useSelector((state) => state.auth.login?.currentUser);
     const student = useSelector((state) => state.auth.login?.currentUser?.HocSinh?._id);
    const HSLH = useSelector((state) => state.hslh.hstlh?.hstlh);
    const a = HSLH.filter((state) => state.HocSinh === student)
    const lichhoc = useSelector((state) => state.lichhoc?.lichhoc?.lichhoc)||""     
    const namhoc = useSelector((state) => state.namhoc?.namhoc?.namhoc)
    const hocky = useSelector((state) => state.hocky?.hocky?.hocky)   
    const hocsinhtuongung = lichhoc.filter(objA => a.some(objB => objA._id === objB.LichHoc));  
    const dispatch = useDispatch();
    const loihs = useSelector((state) => state.loivipham?.loivipham?.loivipham)
    const loihocsinh = loihs.filter((item) => item.HocSinh === user.HocSinh._id)
    //-------------------------------------------------------------------
    const currentHocKy = []
    let foundMatch = false; 
    // Lặp qua mảng hocky từ cuối đến đầu
    for (let i = hocky.length - 1; i >= 0 && !foundMatch; i--) {
      const HocKy = hocky[i];
      // Kiểm tra xem id có nằm trong lichHoc không
      const isMatched = hocsinhtuongung.some(lich => lich.HocKy === HocKy._id); 
      if (isMatched) {
        currentHocKy.push(HocKy);
        foundMatch = true; 
        break
      }
    }

//Kiểm tra học kỳ hiện tại
const currentNamHoc = [];
let foundMatch1 = false;  
// Lặp qua mảng hocky từ trên xuống dưới
for (let i = 0; i < namhoc.length && !foundMatch1; i++) {
  const NamHoc = namhoc[i];
  // Kiểm tra xem id có nằm trong lichHoc không
  const isMatched =hocsinhtuongung.some(lich => lich.NamHoc === NamHoc._id);
  if (isMatched) {
    currentNamHoc.push(NamHoc);
    foundMatch1 = true; 
    break
  }
}


    // const [idNH, setNH]= useState([])
    // const [idHK, setHK]= useState([])
    // console.log("idNH", idNH)
    // console.log("idHK", idHK)
    // const namhocTrung = useMemo(() => {
    //     let found = false;
    //     const result = [];
      
    //     for (let i = 0; i < namhoc.length; i++) {
    //       const nam = namhoc[i];
      
    //       for (let j = 0; j < hocsinhtuongung.length; j++) {
    //         const item = hocsinhtuongung[j];
    //         const namhocHSLH = item.NamHoc;
      
    //         if (namhocHSLH === nam._id) {
    //           result.push(nam);
    //           found = true;
    //           break;
    //         }
    //       }
      
    //       if (found) {
    //         break;
    //       }
    //     }
    //     return result;
    // }, [namhoc, hocsinhtuongung]);

    // const hockyTrung = useMemo(() => {
    //     let found = false;
    //     const result = [];
      
    //     for (let i = hocky.length - 1; i >= 0; i--) {
    //       const hk = hocky[i];
      
    //       for (let j = 0; j < hocsinhtuongung.length; j++) {
    //         const item = hocsinhtuongung[j];
    //         const hockyHSLH = item.HocKy;
      
    //         if (hockyHSLH === hk._id) {
    //           result.push(hk);
    //           found = true;
    //           break;
    //         }
    //       }
      
    //       if (found) {
    //         break;
    //       }
    //     }
      
    //     return result;
    //   }, [hocky, hocsinhtuongung]);
       
    //   useEffect(() => {
    //     if (namhocTrung.length > 0) {
    //       setNH(namhocTrung[0]._id)
    //     }
    //   }, [namhocTrung]);
   
    //   useEffect(() => {
    //     if (hockyTrung.length > 0) {
       
    //       setHK(hockyTrung[0]._id)
    //     }
    //   }, [hockyTrung]);
  
    //----------------------------------------------------------------------------


    useEffect(() =>{
        getLichHoc(dispatch)
        getHocKy(dispatch)
        getNamHoc(dispatch)
        getHSTLH( dispatch)  
    },[dispatch]) 

    return (
        <main className={cx('wrapper')}>
             <div className={cx('total-study')}>
                <div className={cx('title-total')}>
                <h2 className={cx('title-home')}>Số lượng lịch học</h2>
                </div>
            <div className={cx('total-student')}>
                <div className={cx('count')}>
            {hocsinhtuongung.reduce((total, tkb) => {
  if (currentNamHoc[0]._id.includes(tkb.NamHoc) && currentHocKy[0]._id.includes(tkb.HocKy)) {
    return total + 1;
  }
  return total;
}, 0)}
                </div>
                <div className={cx('totel-icon')}>
                            <TotalStudentIcon/>
                        </div>
            </div>
          </div>
          <div className={cx('infor-exam')}>
                <div className={cx('title-total')}>
                <h2 className={cx('title-home')}>Số lỗi vi phạm</h2>
                </div>
            <div className={cx('total-student')}>
                <div className={cx('count')}>
            {loihocsinh.reduce((total, tkb) => {
  if (currentNamHoc[0]._id.includes(tkb.NamHoc) && currentHocKy[0]._id.includes(tkb.HocKy)) {
    return total + 1;
  }
  return total;
}, 0)}
                </div>
                <div className={cx('totel-icon')}>
                            <LVPIcon/>
                        </div>
            </div>
          </div>
        </main>
    );
}

export default InforStudy;
