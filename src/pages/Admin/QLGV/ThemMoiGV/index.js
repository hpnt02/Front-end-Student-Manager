import classNames from 'classnames/bind';
import styles from './ThemMoiGV.module.scss';

import { useDispatch, useSelector} from 'react-redux';
import {  getKhoa,GiaoVien,TMGVien} from '~/redux/apiAdmin/apiAdmin';
import { useEffect, useState } from 'react';
import config from '~/config';
import { Link } from 'react-router-dom';

import Option from '~/components/Option';
import Input from '~/components/Input';
import SelectLabels from '~/components/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TMGVStart } from '~/redux/GiaoVien';
const cx = classNames.bind(styles);
function ThemMoiGV() {

    const dispatch = useDispatch();


    const [magv, setMagv] = useState('')
    const [hogv, setHoGV] = useState('')
    const [tengv, setTenGV] = useState('')
    const [gioitinh, setGioiTinh] = useState(true)
    const [ngaysinh, setNgaySinh] = useState('')
    const [diachi, setDiaChi] = useState('')
    const [cccd, setCCCD] = useState('')
    const [sdt, setSDT] = useState('')
    const [khoa, setKhoa] = useState('')

    const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa)||""
 
    const {success, error} = useSelector((state) => state.gv.tmgv)
    
    useEffect(() => {
      if (success) {
        toast.success('Thêm thành công!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",     
          });
          dispatch(TMGVStart()); // Khởi động lại cho lần nhập tiếp theo
      } else if(error) {
        toast.error('Vui lòng thử lại sau', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
        dispatch(TMGVStart()); // Khởi động lại cho lần nhập tiếp theo
      }
  }, [success, error,dispatch]); // Theo dõi sự thay đổi của success và error


    const handleCreate= async(e) =>{
        e.preventDefault();
        const newGV = {
            MaGV: magv,
            HoGV:hogv,
            TenGV: tengv,
            NgaySinh:ngaysinh,
            GioiTinh:gioitinh,
            DiaChi: diachi,
            CCCD:cccd,
            SDT:sdt,
            Khoa:khoa
        }
       await TMGVien(newGV, dispatch);
       GiaoVien(dispatch)
        }


        const handleChangeKhoa = (value) => {
          setKhoa(value);
        };
        const handleChangeGT = (value) => {
          setGioiTinh(value);
        };


    useEffect(()=>{
       getKhoa(dispatch)
    },[dispatch])
    return ( 
        <div className={cx('wrapperr')}>
        <div className={cx('innerr')}>
        <div className={cx('bgr-content')}>
        <h2 className={cx('title')}>Thêm mới giáo viên</h2>
                <form className={cx('form-create')} onSubmit={handleCreate}>
            <div className={cx('infor-newstudent')}>
                <div>
                <Input label='Mã giáo viên' placeholder='Vui lòng nhập mã giáo viên' onChange={(e) =>setMagv(e.target.value)}/>
                    <br/>
                    <Input label='Họ giáo viên' placeholder='Vui lòng nhập họ giáo viên' onChange={(e) =>setHoGV(e.target.value)}/>
                    <br/>
                    <Input label='Tên giáo viên' placeholder='Vui lòng nhập tên giáo viên' onChange={(e) =>setTenGV(e.target.value)}/>
                    <br/>
                    <Option title="Giới tính" onChange={handleChangeGT}/>
                    <br/>
                   
                </div>
               
                <div>
                <Input label='Địa chỉ' placeholder='Vui lòng nhập địa chỉ' onChange={(e) =>setDiaChi(e.target.value)}/>
                    <br/>
                    <Input label='Ngày sinh' placeholder='Vui lòng nhập ngày sinh VD: 18/04/1975' onChange={(e) =>setNgaySinh(e.target.value)}/>
    
                    <br/>
                    <Input label='CCCD' placeholder='Vui lòng nhập căn cước công dân' onChange={(e) =>setCCCD(e.target.value)}/>
                    <br/>
                    <Input label='Số điện thoại' placeholder='Vui lòng nhập số điện thoại' onChange={(e) =>setSDT(e.target.value)}/>
                    <br/>
                
                    <SelectLabels 
                    title="Khoa"    
                    select={Allkhoa}     
                    onChange={handleChangeKhoa}
                     other="Khoa"
                     width={true}
            />
                  
                 
                </div>
            
            </div>
            <div className={cx('format-button')}>
            <button type='submit' className={cx('button-submit')}>Thêm mới</button>
            <Link to={config.routesAdmin.qlgv}>
                          <button type="text" className={cx('come-back')}>Quay lại</button>
            </Link>
            </div>
                </form>
                
                <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        
        />
  
        </div>
                
        </div>
        </div>
     );
}

export default ThemMoiGV;