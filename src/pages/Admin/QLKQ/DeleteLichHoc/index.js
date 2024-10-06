
import classNames from 'classnames/bind';
import styles from '../../../Admin/QLHS/DeleteHS/Delete.module.scss';
import { CloseIcon } from '~/components/Icons/icons';
import {  deleteLichHoc } from '~/redux/apiAdmin/apiAdmin';
import { useDispatch,useSelector } from 'react-redux';
import { useState } from 'react';

const cx = classNames.bind(styles);   
function DeleteLichHoc({ lichHocID,onCancel}) {
      
    const dispatch = useDispatch()
    const lichhoctuongung = lichHocID.filter((state) => state !== undefined)
    const user = useSelector((state) => state.auth.login?.currentUser);


    const handleDelete = async() =>{
        setIsHidden(true);
        onCancel()
        await lichhoctuongung.forEach((id) => {
         deleteLichHoc(user?.accessToken, dispatch, id)
      });
      
      }

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
                <div className={cx('header')}>
                <h2 className={cx('title')}>Xóa Lich Học?</h2>
                <div className={cx('icon')} onClick={handleCancel}>
                    <CloseIcon/>
                </div>
                </div>
               <div className={cx('content')}>
                    <p>Bạn có chắc chắn muốn xóa lịch học này?</p>

               </div>
        <div className={cx('button')} onClick={() => handleDelete()}>
 <button type='submit' className={cx('button-submit')}>Xóa</button>
     </div>
    
            </div>
            </div>
            </div>
 );

      

  
}

export default DeleteLichHoc;