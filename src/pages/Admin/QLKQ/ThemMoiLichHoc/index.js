
import classNames from 'classnames/bind';
import styles from './ThemMoiLichHoc.module.scss';
import { useSelector } from 'react-redux';
import { useDispatch} from 'react-redux';
import {  TMLichHoc} from '~/redux/apiAdmin/apiAdmin';
import {useEffect, useState } from 'react';
import config from '~/config';

import SelectLabels from '~/components/Select';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  TMLichHocStart } from '~/redux/LichHoc';


const cx = classNames.bind(styles);
function ThemMoiLichHoc() {

    const lophoc = useSelector((state) => state.dslh?.dslh?.dslh)||""
    const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien)||""
    const monhoc = useSelector((state) => state.monhoc?.monhoc?.monhoc)||[]
    const namHoc = useSelector((state) => state.namhoc?.namhoc?.namhoc)||""
    const hocKy = useSelector((state) => state.hocky?.hocky?.hocky)||""
  const monhocchung = monhoc.filter((state) =>state.LoaiMonHoc === true)
 
    const dispatch = useDispatch();
    const [tenlop, setTenLop] = useState('')
    const [tengv, setTenGV] = useState('')
    const [tenmh, setTenMH] = useState('')
    const [phong, setPhong] = useState('')
    const [thu, setThu] = useState('')
    const [tiet, setTiet] = useState('')
    const [namhoc, setNamHoc] = useState('')
    const [hocky, setHocKy] = useState('')
    const [nhomhp, setNhomHP] = useState('')
    const [ngaybd, setNgayBD] = useState('')

    const handleChangeMaLop = (value) => {
      setTenLop(value);
    };

    const handleChangeGiaoVien = (value) => {
      setTenGV(value);
    };

    const handleChangeMonHoc = (value) => {
      setTenMH(value);
    };

    const handleChangeNamHoc = (value) => {
      setNamHoc(value);
    };

    const handleChangeHocKy = (value) => {
      setHocKy(value);
    };
    
    const { success, error } = useSelector(state => state.lichhoc.tmlichhoc);
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
          dispatch(TMLichHocStart()); // Khởi động lại cho lần nhập tiếp theo
      } else if (error) {
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
        dispatch(TMLichHocStart()); // Khởi động lại cho lần nhập tiếp theo
      }
  }, [success, error, dispatch]); // Theo dõi sự thay đổi của success và error

    const handleCreate = async (e) => {
        e.preventDefault();
        const newLH = {
            LopHoc: tenlop,
            GiaoVien: tengv,
            MonHoc: tenmh,
            PhongHoc: phong,
            Thu: thu,
            Tiet: tiet,
            NamHoc: namhoc,
            HocKy: hocky,
            NhomHP: nhomhp,
            NgayBD: ngaybd
        };
        await TMLichHoc(newLH, dispatch); // Gọi API
    };


    //-----------------------------------------------------------------------------------------------------------
           const lophoctuongung = lophoc.filter((l) => l._id === tenlop)[0]||""
            // const khoatuongung = Allnganh.filter((ng) => ng._id === lophoctuongung.Nganh)[0]||""
            // const GiaoVien = giaovien.filter((gv)=> gv.Khoa === khoatuongung.Khoa)
            const MonHoc = monhoc.filter((mh) => mh.Nganh === lophoctuongung.Nganh)
            const monhoctuongung = [...monhocchung, ...MonHoc]
            
    //=========================================================================================================
      
    return (      
        <div className={cx('wrapperr')}>
       
        {/* <ToastContainer
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

/> */}
        <div className={cx('innerr')}>
        <div className={cx('bgr-content')}>
        <h2 className={cx('title')}>Thêm mới lịch học</h2>
                <form className={cx('form-create')} onSubmit={handleCreate}>
                <div className={cx('infor-new')}>
                      <div className={cx('infor-LichHoc')}>
                        <SelectLabels title="Lớp học" select={lophoc} width={true} onChange={handleChangeMaLop} other="LopHoc"/>           
                         <Input label='Nhóm học phần' placeholder='Vui lòng nhập nhóm học phần' onChange={(e) =>setNhomHP(e.target.value)}/>
                      </div>
                      <div className={cx('infor-LichHoc')}>
                        <SelectLabels title="Giáo viên" select={giaovien} width={true}  onChange={handleChangeGiaoVien} other="GiaoVien"/>    
                        <Input label='Thứ' placeholder='Vui lòng nhập thứ' onChange={(e) =>setThu(e.target.value)}/>                                      
                      </div>
                      <div className={cx('infor-LichHoc')}>
                        <SelectLabels title="Môn học"select={monhoctuongung} width={true}  onChange={handleChangeMonHoc} other="MonHoc"/>
                        <Input label='Tiết' placeholder='Vui lòng nhập tiết học' onChange={(e) =>setTiet(e.target.value)}/>
                      </div>
                      <div className={cx('infor-LichHoc')}>
                      <SelectLabels title="Năm học" select={namHoc} width={true}  onChange={handleChangeNamHoc} other="NamHoc"/>
                      <Input label='Ngày bắt đầu' placeholder='Vui lòng nhập ngày bắt đầu' onChange={(e) =>setNgayBD(e.target.value)}/>
                      </div>
                      <div className={cx('infor-LichHoc')}>
                      <SelectLabels title="Học kỳ" select={hocKy} width={true}   onChange={handleChangeHocKy} other="Học kỳ"/>
                      <Input label='Phòng học' placeholder='Vui lòng nhập phòng học' onChange={(e) =>setPhong(e.target.value)}/>
                      </div>
                  </div>
            <div className={cx('format-button')}>
                         
                            <Button type="submit" primary>Thêm mới</Button>
                          <Button type="text" primary to={config.routesAdmin.qlkhht}>Quay lại</Button>        
              
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

export default ThemMoiLichHoc;