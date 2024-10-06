
import classNames from 'classnames/bind';
import styles from './ThemMoiDRL.module.scss';

import {useState } from 'react';
import { TMDRL } from '~/redux/apiAdmin/apiAdmin';
import {useDispatch} from 'react-redux';

const cx = classNames.bind(styles);

function ThemMoiDRL({studentId, onCancel,NamHocID, HocKyID }) {
    const [isHidden, setIsHidden] = useState(false);
    const [diemrenluyen, setDiemRenLuyen] = useState("")
    const dispatch = useDispatch()
    const handleCreate= async(e) =>{
         e.preventDefault();
        const newDiemRL = {
           HocSinh: studentId,
            DiemRenLuyen: diemrenluyen,
           HocKy: HocKyID,
           NamHoc: NamHocID
        }
 

      TMDRL(newDiemRL, dispatch);       
        }

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
                        <h2 className={cx('title')}>Nhập điểm rèn luyện</h2>
                        <form className={cx('form-create')} onSubmit={handleCreate}>
               
                    <label>Điểm rèn luyện</label>
                    <input className={cx("input-username")} type="text" placeholder="Nhập điểm" onChange={(e) =>setDiemRenLuyen(e.target.value)}/>

                    <div className={cx('format-button')}>
                    <button className={cx('button-submit')} onClick={handleCancel}>Hủy</button>
                     <button type='submit' className={cx('button-submit')}>Thêm mới</button>
            </div>
                    </form>
                    </div>
                    </div>
                    </div>
         );
    }
    

export default ThemMoiDRL;

