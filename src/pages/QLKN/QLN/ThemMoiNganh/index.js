import classNames from 'classnames/bind';
import styles from './ThemMoiNganh.module.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {  getNGANH,TMN } from '~/redux/apiAdmin/apiAdmin';
import Input from '~/components/Input';
import SelectLabels from '~/components/Select';
import Button from '~/components/Button';
import config from '~/config';
const cx = classNames.bind(styles);
function ThemMoiNganh() {
 

    const [manganh, setMaNganh] = useState('')
    const [tennganh, setTenNganh] = useState('')
    const [khoa, setKhoa] = useState('')
 
    const handleChangeKhoa = (value) => {
      setKhoa(value);
    };

    const dispatch = useDispatch();
  const navigate = useDispatch()
   const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa)
    const handleCreate= async(e) =>{
        e.preventDefault();
        const newNganh = {
            MaNganh: manganh,
            TenNganh:tennganh,
            Khoa:khoa,
        }
    
     const response = await TMN(newNganh, dispatch, navigate);

     // Kiểm tra nếu response payload chứa giá trị LopHoc
     if (response && response.data && response.data.Nganh) {
       // Cập nhật lớp học hiển thị trên màn hình
       setKhoa(response.data.Nganh);
     }
    
    }
   

    useEffect(()=>{
        //Danh sách ngành
        getNGANH (dispatch)
    },[dispatch])
    return ( 
    
        <div className={cx('bgr-content')}>
        <h2 className={cx('title')}>Thêm mới ngành</h2>
                <form className={cx('form-create')} onSubmit={handleCreate}>
            <div className={cx('infor-newstudent')}>
                <div>
                  
                  <Input type="text" placeholder="Nhập mã ngành" label="Mã ngành" onChange={(e) =>setMaNganh(e.target.value)}/>
                    
                 <br/>
                   <Input type="text" placeholder="Nhập tên ngành" label="Tên ngành" onChange={(e) =>setTenNganh(e.target.value)}/>
                    <br/>

                <SelectLabels 
                    title="Khoa"    
                    select={Allkhoa}     
                    onChange={handleChangeKhoa}
                     other="Khoa"
            />              
            
<div className={cx('button-class')}>
<div className={cx('button-class')}>
    <Button primary type='submit' >Thêm mới</Button> 
    <Button primary type='text' to={config.routesAdmin.qln}>Quay lại</Button> 
</div>
</div>
            </div>
            </div>
                </form>
                
  
        </div>
      
     );
}

export default ThemMoiNganh;