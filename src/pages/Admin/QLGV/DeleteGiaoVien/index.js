

import classNames from 'classnames/bind';
import styles from '../../QLHS/DeleteHS/Delete.module.scss';
import { CloseIcon } from '~/components/Icons/icons';
import {  deleteGiaoVien, GiaoVien } from '~/redux/apiAdmin/apiAdmin';
import { useDispatch,useSelector } from 'react-redux';
import {  useState } from 'react';

const cx = classNames.bind(styles);   
function DeleteGiaoVien({ giaovientId,onCancel}) {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.auth.login?.currentUser);
    const handleDelete = () =>{
         setIsHidden(true);
         onCancel()
        giaovientId.forEach((id) => {
          deleteGiaoVien(user?.accesstoken, dispatch, id)
     });
       GiaoVien(dispatch)
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
                <h2 className={cx('title')}>Xóa Giáo Viên?</h2>
                <div className={cx('icon')} onClick={handleCancel}>
                    <CloseIcon/>
                </div>
                </div>
               <div className={cx('content')}>
                    <p>Bạn có chắc chắn muốn xóa giáo viên này?</p>

               </div>
        <div className={cx('button')} onClick={() => handleDelete()}>
 <button type='submit' className={cx('button-submit')}>Xóa</button>
     </div>
               
            </div>
            </div>
            </div>
 );

      

  
}

export default DeleteGiaoVien;