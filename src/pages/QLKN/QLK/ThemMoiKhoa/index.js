
import classNames from 'classnames/bind';
import styles from './ThemMoiKhoa.module.scss';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import { TMK } from '~/redux/apiAdmin/apiAdmin';
import Input from '~/components/Input';
import Button from '~/components/Button';
import config from '~/config';
const cx = classNames.bind(styles);

function ThemMoiKhoa() {
   
    const [makhoa, setMaKhoa] = useState('')
    const [tenkhoa, setTenKhoa] = useState('')
 

    const dispatch = useDispatch();
  const navigate = useDispatch()

    const handleCreate= async(e) =>{
        e.preventDefault();
        const newKhoa = {
            MaKhoa: makhoa,
            TenKhoa:tenkhoa,
        }
    
     const response = await TMK(newKhoa, dispatch, navigate);

     // Kiểm tra nếu response payload chứa giá trị LopHoc
     if (response && response.data && response.data.Khoa) {
       // Cập nhật lớp học hiển thị trên màn hình
       setMaKhoa(response.data.Khoa);
     }
    
    }
   
    return ( 

        <div className={cx('bgr-content')}>
        <h2 className={cx('title')}>Thêm mới khoa</h2>
                <form className={cx('form-create')} onSubmit={handleCreate}>
           
                <div>
                   
                    <Input type="text" placeholder="Nhập mã khoa" label="Mã khoa" onChange={(e) =>setMaKhoa(e.target.value)}/>
                 
                 <br/>
                   <Input type="text" placeholder="Nhập tên khoa" label="Tên khoa" onChange={(e) =>setTenKhoa(e.target.value)}/>
                  
                   
                    <br/>
<div className={cx('button-class')}>
<Button primary type='submit' >Thêm mới</Button> 
<Button primary type='text' to={config.routesAdmin.qlk}>Quay lại</Button> 

</div>
            </div>
          
                </form>
                
                </div>
           
     );
    }

export default ThemMoiKhoa;