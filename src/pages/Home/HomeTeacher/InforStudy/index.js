import classNames from 'classnames/bind';
import styles from './InforStudy.module.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect,useState } from 'react';
import { useMemo } from 'react';

import { getLichHoc,getNamHoc,getHocKy} from '~/redux/apiAdmin/apiAdmin';
import { KHHTIcon, TimeTableIcon } from '~/components/Icons/icons';

const cx = classNames.bind(styles);

function InforStudy() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const lichhoc = useSelector((state) => state.lichhoc?.lichhoc?.lichhoc)||""  
    const GiaoVienLichDay = lichhoc.filter((item) => item.GiaoVien === user.GiaoVien._id)
  
    const namhoc = useSelector((state) => state.namhoc?.namhoc?.namhoc)
    const hocky = useSelector((state) => state.hocky?.hocky?.hocky)
    
     const lop = useSelector((state) => state.dslh?.dslh?.dslh)
     const GiaoVienLop = lop.filter((item) => item.GiaoVien === user.GiaoVien._id)
        const count = GiaoVienLop.length
    
    const dispatch = useDispatch();

    const [idNH, setNH]= useState([])
    const [idHK, setHK]= useState([])

    const namhocTrung = useMemo(() => {
        let found = false;
        const result = [];
      
        for (let i = 0; i < namhoc.length; i++) {
          const nam = namhoc[i];
      
          for (let j = 0; j < GiaoVienLichDay.length; j++) {
            const item = GiaoVienLichDay[j];
            const namhocHSLH = item.NamHoc;
      
            if (namhocHSLH === nam._id) {
              result.push(nam);
              found = true;
              break;
            }
          }
      
          if (found) {
            break;
          }
        }
        return result;
    }, [namhoc, GiaoVienLichDay]);

    const hockyTrung = useMemo(() => {
        let found = false;
        const result = [];
      
        for (let i = hocky.length - 1; i >= 0; i--) {
          const hk = hocky[i];
      
          for (let j = 0; j < GiaoVienLichDay.length; j++) {
            const item = GiaoVienLichDay[j];
            const hockyHSLH = item.HocKy;
      
            if (hockyHSLH === hk._id) {
              result.push(hk);
              found = true;
              break;
            }
          }
      
          if (found) {
            break;
          }
        }
      
        return result;
      }, [hocky, GiaoVienLichDay]);
       
      useEffect(() => {
        if (namhocTrung.length > 0) {
       
          setNH(namhocTrung[0]._id)
        }
      }, [namhocTrung]);
   
      useEffect(() => {
        if (hockyTrung.length > 0) {
       
          setHK(hockyTrung[0]._id)
        }
      }, [hockyTrung]);
  

    useEffect(() =>{
        
        getHocKy(dispatch)
        getNamHoc(dispatch)
        getLichHoc(dispatch)
    },[dispatch]) 

    return (
        <main className={cx('wrapper')}>
            <div className={cx('total-study')}>
                <div className={cx('title-total')}>
                <h2 className={cx('title-home')}>Số lịch giảng dạy</h2>
                </div>
                <div className={cx('total-student')}> 
                <div className={cx('count')}>
                {GiaoVienLichDay.reduce((total, tkb) => {
  if (idNH.includes(tkb.NamHoc) && idHK.includes(tkb.HocKy)) {
    return total + 1;
  }
  return total;
}, 0)}
                </div>
                        <div className={cx('totel-icon')}>
                            <TimeTableIcon/>
                        </div>               
                </div>           
            </div>
            <div className={cx('infor-exam')}>
                <div className={cx('title-total')}>
                <h2 className={cx('title-home')}>Số lớp cố vấn</h2>
                </div>
                <div className={cx('total-student')}>           
                        <div className={cx('count')}>
                    {count}
                        </div>
                        <div className={cx('totel-icon')}>
                            <KHHTIcon/>
                        </div>
                    

                </div>
            
            </div>
                
        </main>
    );
}

export default InforStudy;
