
import classNames from 'classnames/bind';
import styles from './NhapLoiViPham.module.scss';
import {useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { DSHS, getDiem, getHocKy, getNamHoc ,TMLVP} from '~/redux/apiAdmin/apiAdmin';
import moment from 'moment';
const cx = classNames.bind(styles);                              
function NhapLoiViPham({LichHocId, MonHocID, onCancel,NamHocID, HocKyID }) {
    console.log("LichHocId",LichHocId )
  const lichhochs = useSelector((state) => state.hslh?.hstlh?.hstlh)

      const hslh = lichhochs.filter((item) => item.LichHoc === LichHocId)
      const hocSinh = useSelector((state) => state.dshs?.dshs?.dshs)
      const hocsinhtuongung = hocSinh.filter(objA => hslh.some(objB => objA._id === objB.HocSinh));
      const user = useSelector((state) => state.auth.login?.currentUser?.GiaoVien?._id);

      console.log("hocSinh",hocSinh)
      console.log("hocsinhtuongung",hocsinhtuongung)

      const Ngay = new Date()
      const NgayHienTai = moment(Ngay).utc().format('DD/MM/YYYY')

      console.log("NgayHienTai",NgayHienTai)
    
      const [hocsinh, sethocsinh] = useState("")
      const [loivipham, setloivipham] = useState("")
   
    

      const handleCreate= async(e) =>{
        e.preventDefault();
        const newLoiVP = {
          HocSinh:hocsinh,
          GiaoVien:user,
          MonHoc:MonHocID,
          TenLoi:loivipham,
          NgayViPham:NgayHienTai,
          NamHoc:NamHocID,
          HocKy:HocKyID,
        }
        
       TMLVP(newLoiVP, dispatch);       
        }

      const dispatch = useDispatch()

      useEffect(() =>{
        DSHS(dispatch)
        getDiem(dispatch)
        getNamHoc(dispatch)
        getHocKy(dispatch)
      },[dispatch])

      const [isHidden, setIsHidden] = useState(false);

      const handleCancel = () => {
        setIsHidden(true);
        onCancel(); // Invoke the onCancel callback from props
      };
      
      if (isHidden) {
        return null;
      }
    return ( 
        <div className={cx('wrapperrr')}>
            <div className={cx('innerrr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>Nhập lỗi vi phạm</h2>
                   
                                         
 <form className={cx('form-create')} onSubmit={handleCreate}>
 <label className={cx('label-title')}>Chọn học sinh</label>
<select className={cx('chon-lop')} value={hocsinh} onChange={(e) => sethocsinh(e.target.value)}>
  <option>--------- Chọn học sinh ----------</option>
  {hocsinhtuongung.map((hs, index) => (
    <option key={index} value={hs._id|| index}>{hs.MaHS} - {hs.HoHS} {hs.TenHS} </option>
  ))}
  </select>  
                    <label className={cx('label-title')}>Nhập lỗi vi phạm</label>
                    <textarea className={cx("input-username")} type="" placeholder="Nhập lỗi vi phạm" onChange={(e) =>setloivipham(e.target.value)}/>              
    
                    <div className={cx('format-button')}>
                     <button type='submit' className={cx('button-submit')}>Thêm mới</button>
                    <button className={cx('button-submit')} onClick={handleCancel}>Hủy</button>
            </div>
                    </form> 
                </div>
                </div>
                </div>
     );
}

export default NhapLoiViPham;