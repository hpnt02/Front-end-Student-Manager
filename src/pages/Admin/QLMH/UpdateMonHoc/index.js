
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import {  useEffect,useState } from "react";
import { useDispatch} from 'react-redux';
import { UpdateMonHoc,getMonHoc } from "~/redux/apiAdmin/apiAdmin";
import classNames from 'classnames/bind';
import styles from './UpdateMonHoc.module.scss';
import Input from "~/components/Input";
import Option from "~/components/Option";
import SelectLabels from "~/components/Select";
import config from "~/config";
import Button from "~/components/Button";

const cx = classNames.bind(styles)
function UpdateMH() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
     const id = location.state?.id; 

 
 const a = useSelector((state) => {
   const b = state.monhoc?.monhoc?.monhoc.find((x) => x._id === id);
   return b;
 });

 const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh)||""

 useEffect(() => {
   getMonHoc(dispatch)
}, [dispatch])
 const [inputValue, setInputValue] = useState(a.MaMonHoc);
 const [inputTenMH, setInputTenMH] = useState(a.TenMonHoc);
 const [inputSoTC, setInputSoTC] = useState(a.SoTC);
 const [inputLyThuyet, setInputLyThuyet] = useState(a.LyThuyet);
 const [inputThucHanh, setInputThucHanh] = useState(a.ThucHanh);
 const [inputThi, setInputThi] = useState(a.Thi);
 const [inputLoaiMH, setInputLoaiMH] = useState(a.LoaiMonHoc)
 const [inputNganh, setInputNganh] = useState(a.Nganh)

 const handleInputChange = (e) => {
   setInputValue(e.target.value);
   
  };
   const handleInputChange1 = (e) => {
      setInputTenMH(e.target.value)
   };
   const handleInputChange2 = (e) => {
    setInputSoTC(e.target.value)
 };const handleInputChange3 = (e) => {
    setInputLyThuyet(e.target.value)
 };const handleInputChange4 = (e) => {
    setInputThucHanh(e.target.value)
 };const handleInputChange5 = (e) => {
    setInputThi(e.target.value)
 };
 const handleChangeLoaiMH = (value) => {
   setInputLoaiMH(value)
 };

 const handleChangeNganh = (value) => {
   setInputNganh(value)
 };

   const KhoahandleUpdate = (e) => {
     e.preventDefault();
     const updatedData = {
       MaMonHoc: inputValue,
       TenMonHoc: inputTenMH,
       SoTC:inputSoTC,
        LyThuyet:inputLyThuyet,
        ThucHanh:inputThucHanh,
        Thi:inputThi,
  
     };
     UpdateMonHoc(updatedData, dispatch, navigate,a._id);
   };

 return (
  <div className={cx('wrapperr')}>
  <div className={cx('innerr')}>
     <div className={cx('bgr-content')}>
     <h2 className={cx('title')}>Chỉnh sửa môn học</h2>
             <form className={cx('form-create')} onSubmit={KhoahandleUpdate}>
         <div className={cx('infor-new')}>
             <div>
             <Input label='Mã môn học' type="text" placeholder="Chỉnh sửa mã môn học" value={inputValue} onChange={handleInputChange}/>   
                <br/>
             <Input label='Tên môn học' type="text" placeholder="Chỉnh sửa tên môn học" value={inputTenMH} onChange={handleInputChange1}/>   
                
                 <br/>   
                 <Input label='Số tín chỉ' type="text" placeholder="Chỉnh sửa số tín chỉ" value={inputSoTC} onChange={handleInputChange2}/>         
               <br/>
               <Option title="Loại môn học" onChange={handleChangeLoaiMH} value={inputLoaiMH} label={true}/>
            </div>
            <div>
            <Input label='Lý thuyết' type="text" placeholder="Chỉnh sửa lý thuyết" value={inputLyThuyet} onChange={handleInputChange3}/>   
                
                 <br/>
                 <Input label='Thực hành' type="text" placeholder="Chỉnh sửa thực hành" value={inputThucHanh} onChange={handleInputChange4}/>                 
                 <br/>   
           
                 <Input label='Thi' type="text" placeholder="Chỉnh sửa thi" value={inputThi} onChange={handleInputChange5}/>   
                <br/>
                <SelectLabels
                    title="Ngành"    
                    select={Allnganh}     
                    onChange={handleChangeNganh}
                     other="Nganh"
                     Current={inputNganh}
            />              

                              
            </div>
         </div>
         <div className={cx('format-button')}>
            <button type='submit' className={cx('button-submit')}>Lưu</button>

                         
                <Button primary to={config.routesAdmin.qlmh} >Quay lại</Button>
           
            </div>
             </form>
             

     </div>
     </div>     
     </div>
 );
}
export default UpdateMH;