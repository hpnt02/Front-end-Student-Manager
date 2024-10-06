import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch} from 'react-redux';
import { UpdateGiaoVien } from "~/redux/apiAdmin/apiAdmin";
import classNames from 'classnames/bind';
import styles from './UpdateGiaoVien.module.scss';
import { useLocation, useNavigate } from "react-router-dom";
import config from '~/config';
import { Link } from 'react-router-dom';
import Input from "~/components/Input";
import SelectLabels from "~/components/Select";
import Option from "~/components/Option";
import moment from "moment";

const cx = classNames.bind(styles);
function UpdateGV() {
  const location = useLocation();
  const id = location.state?.id; 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa)||""
    const a = useSelector((state) => {
        const b = state.gv?.giaovien?.giaovien.find((x) => x._id === id);
        return b;
      });
    
    const [inputValue, setInputValue] = useState(a.MaGV);
    const [inputHoGV, setInputHoGV] = useState(a.HoGV);
    const [inputTenGV, setInputTenGV] = useState(a.TenGV);
    const [inputkhoa, setInputKhoa] = useState(a.Khoa);
    const [inputGT, setInputGT] = useState(a.GioiTinh);
    const [inputNgaySinh, setInputNgaySinh] = useState(moment(a.NgaySinh).utc().format('DD/MM/YYYY'));
    const [inputDiaChi, setInputDiaChi] = useState(a.DiaChi);
    const [inputCCCD, setInputCCCD] = useState(a.CCCD);
    const [inputSDT, setInputSDT] = useState(a.SDT);
  

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
    const handleInputChange1 = (value) => {
      setInputKhoa(value)
    };
      const handleChangeGT = (value) => {
        setInputGT(value)
      };
  
      const handleInputChange4 = (e) => {
        setInputHoGV(e.target.value)
      };

      const handleInputChange5 = (e) => {
        setInputTenGV(e.target.value)
      };
      const handleInputChange8 = (e) =>{
        setInputNgaySinh(e.target.value)
      }
const handleInputChange6 = (e) =>{
  setInputDiaChi(e.target.value)
}
const handleInputChange7 = (e) =>{
  setInputCCCD(e.target.value)
}
const handleInputChange9 = (e) =>{
    setInputSDT(e.target.value)
  }


      const handleUpdate = (e) => {
        e.preventDefault();
        const updatedGiaoVien = {
          MaGV: inputValue,
          HoGV: inputHoGV,
          TenGV: inputTenGV,
          NgaySinh: inputNgaySinh,
          DiaChi: inputDiaChi,
          CCCD: inputCCCD,
          Khoa: inputkhoa,
          GioiTinh: inputGT,
          SDT: inputSDT,
            
        };
        UpdateGiaoVien(updatedGiaoVien, dispatch, navigate,a._id);
      };

    return (  
        <div className={cx('wrapperr')}>
        <div className={cx('innerr')}>
        <div className={cx('bgr-content')}>
        <h2 className={cx('title')}>Chỉnh sửa thông tin</h2>
                <form className={cx('form-create')} onSubmit={handleUpdate}>
            <div className={cx('infor-new')}>

                <div>
                <Input label='Mã giáo viên' type="text" placeholder="Chỉnh sửa mã giáo viên" value={inputValue} onChange={handleInputChange}/>   
                   
                    <br/>
                    <Input label='Họ giáo viên' type="text" placeholder="Chỉnh sửa họ giáo viên" value={inputHoGV} onChange={handleInputChange4}/>   
                    
                    <br/>
                    <Input label='Tên giáo viên' type="text" placeholder="Chỉnh sửa tên giáo viên" value={inputTenGV} onChange={handleInputChange5}/>   
                  
                    <br/>
                    <Option onChange={handleChangeGT} value={inputGT}/>
                    <br/>
                   
                </div>
               
                <div>
                <Input label='Địa chỉ' type="text" placeholder="Chỉnh sửa địa chỉ" value={inputDiaChi} onChange={handleInputChange6}/>   
                    <br/>
                    <Input label='Ngày sinh' type="text" placeholder="Chỉnh sửa ngày sinh" value={inputNgaySinh} onChange={handleInputChange8}/>   
                    <br/>
                    <Input label='CCCD' type="text" placeholder="Chỉnh sửa CCCD" value={inputCCCD} onChange={handleInputChange7}/>   
                    <br/>
                    <Input label='Số điện thoại' type="text" placeholder="Chỉnh sửa SDT" value={inputSDT} onChange={handleInputChange9}/>   
                  
                    <br/>
                    <SelectLabels 
                    title="Khoa"    
                    select={Allkhoa}     
                    onChange={handleInputChange1}
                     other="Khoa"
                     Current={inputkhoa}
            />              
                    <br/>
                </div>
            
            </div>
            <div className={cx('format-button')}>
            <button type='submit' className={cx('button-submit')}>Thêm mới</button>
            <Link to={config.routesAdmin.qlgv}>
                          <button type="text" className={cx('come-back')}>Quay lại</button>
                </Link>
            </div>
                </form>
        </div>
                
        </div>
        </div>
    );
    
}

export default UpdateGV;