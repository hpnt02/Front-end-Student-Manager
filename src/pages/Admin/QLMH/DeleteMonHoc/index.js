import classNames from 'classnames/bind';
import styles from './DeleteMonHoc.module.scss';
import { CloseIcon } from '~/components/Icons/icons';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { deleteMonHoc } from '~/redux/apiAdmin/apiAdmin';
const cx = classNames.bind(styles);
function DeleteMonHoc({ MonHocID, onCancel }) {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.login?.currentUser);
    const handleDelete = (id) => {
        setIsHidden(true);
        onCancel();
        deleteMonHoc(user?.accesstoken, dispatch, MonHocID);
        MonHocID.forEach((id) => {
            deleteMonHoc(user?.accesstoken, dispatch, id);
        });
    };

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
                        <h2 className={cx('title')}>Xóa môn học?</h2>
                        <div className={cx('icon')} onClick={handleCancel}>
                            <CloseIcon />
                        </div>
                    </div>
                    <div className={cx('content')}>
                        <p>Bạn có chắc chắn muốn xóa môn học này?</p>
                    </div>
                    <div className={cx('button')} onClick={() => handleDelete()}>
                        <button type="submit" className={cx('button-submit')}>
                            Xóa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteMonHoc;
