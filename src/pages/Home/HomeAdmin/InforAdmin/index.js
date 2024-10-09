import classNames from 'classnames/bind';
import styles from './InforAdmin.module.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { TotalStudentIcon, TeacherIcon } from '~/components/Icons/icons';
import { GiaoVien, DSHS } from '~/redux/apiAdmin/apiAdmin';
const cx = classNames.bind(styles);

function InforStudy() {
    const hocsinh = useSelector((state) => state.dshs?.dshs?.dshs) || '';
    const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien) || [];

    const count = hocsinh.length;
    const countgv = giaovien.length;

    const dispatch = useDispatch();

    useEffect(() => {
        DSHS(dispatch);
        GiaoVien(dispatch);
    }, [dispatch]);

    return (
        <main className={cx('wrapper')}>
            <div className={cx('total-study')}>
                <div className={cx('title-total')}>
                    <h2 className={cx('title-home')}>Số lượng học sinh</h2>
                </div>
                <div className={cx('total-student')}>
                    <div className={cx('count')}>{count}</div>
                    <div className={cx('totel-icon')}>
                        <TotalStudentIcon />
                    </div>
                </div>
            </div>
            <div className={cx('infor-exam')}>
                <div className={cx('title-total')}>
                    <h2 className={cx('title-home')}>Số lượng giáo viên</h2>
                </div>
                <div className={cx('total-student')}>
                    <div className={cx('count')}>{countgv}</div>
                    <div className={cx('totel-icon')}>
                        <TeacherIcon />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default InforStudy;
