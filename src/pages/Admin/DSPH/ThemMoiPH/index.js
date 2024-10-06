
import classNames from 'classnames/bind';
import styles from './ThemMoiPH.module.scss';
import { useDispatch,useSelector } from 'react-redux';
import {  ThemMoiPhuHuynh} from '~/redux/apiAdmin/apiAdmin';
import {  useState } from 'react';
import { useLocation } from 'react-router-dom';
import Input from "~/components/Input";
import Button from '~/components/Button';
import config from '~/config';
const cx = classNames.bind(styles);
function ThemMoiPH() {

    const location = useLocation();
    const id = location.state?.id; 
    const dispatch = useDispatch();
    const hocsinh = useSelector((state) => state.dshs?.dshs?.dshs)||[]
    const HocSinhtuongung = hocsinh.filter((item) => item._id === id)[0]
    
    const TTHS = `${HocSinhtuongung.MaHS} - ${HocSinhtuongung.HoHS} ${HocSinhtuongung.TenHS}`;
   
   
    const [hotenme, setHoTenMe] = useState('')
    const [nghenghiepme, setNgheNghiepMe] = useState('')
    const [sdtme, setSDTMe] = useState('')
    const [hotencha, setHoTenCha] = useState('')
    const [nghenghiepcha, setNgheNghiepCha] = useState('')
    const [sdtcha, setSDTCha] = useState('')

    const handleCreate= async(e) =>{
        e.preventDefault();
        const newPH = {
            HocSinh: id,
            HoTenMe:hotenme,
            NgheNghiepMe: nghenghiepme,
            SDTMe: sdtme,
            HoTenCha:hotencha,
            NgheNghiepCha: nghenghiepcha,
            SDTCha: sdtcha,   
        }
        
      await ThemMoiPhuHuynh(newPH, dispatch); 
        }     
    return ( 
        <div className={cx('wrapper')}>
        <div className={cx('inner')}>
        <div className={cx('bgr-content')}>
        <h2 className={cx('title')}>Thêm mới phụ huynh</h2>
                <form className={cx('form-create')} onSubmit={handleCreate}>
            <div className={cx('infor-newstudent')}>
                <div>
                <Input label='Mã học sinh' type="text" placeholder="Chỉnh sửa mã học sinh" value={TTHS} disable={true}/>   
                <br/>
                <Input label='Họ tên mẹ' type="text" placeholder="Nhập họ tên mẹ"  onChange={(e) =>setHoTenMe(e.target.value)}/>            
               
                    <br/>
                    <Input label='Nghề nghiệp mẹ' type="text" placeholder="Nhập nghề nghiệp mẹ"  onChange={(e) =>setNgheNghiepMe(e.target.value)}/>                                       
                    <br/>
                    <Input label='Số điện thoại mẹ' type="text" placeholder="Nhập số điện thoại mẹ"  onChange={(e) =>setSDTMe(e.target.value)}/>                                             
                </div>
               
                <div>
                <Input label='Họ tên cha' type="text" placeholder="Nhập họ tên cha"  onChange={(e) =>setHoTenCha(e.target.value)}/>                                             
                    <br/>
             
                    <Input label='Nghề nghiệp cha' type="text" placeholder="Nhập nghề nghiệp cha" onChange={(e) =>setNgheNghiepCha(e.target.value)}/>
                    <br/>
            
                    <Input label='Số điện thoại cha' type="text" placeholder="Nhập số điện thoại cha" onChange={(e) =>setSDTCha(e.target.value)}/>
                </div>
        
            </div>
            <div className={cx('format-button')}>
            <Button type='submit' primary>Thêm mới</Button>
            <Button type='text' primary to={config.routesAdmin.dsph} >Quay lại</Button>
            </div>
                </form>
                
  
        </div>
                
        </div>
        </div>
     );
}

export default ThemMoiPH;