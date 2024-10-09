import QLN from '~/pages/QLKN/QLN';
import classNames from 'classnames/bind';
import styles from './KHHT.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import { useEffect } from 'react';
import { getNGANH } from '~/redux/apiAdmin/apiAdmin';
import { useDispatch } from 'react-redux';
const cx = classNames.bind(styles);

function KHHT() {
    const dispatch = useDispatch();

    useEffect(() => {
        getNGANH(dispatch);
    }, [dispatch]);

    return (
        <div>
            <div className={cx('header-kv')}>
                <div className={cx('innerrr')}>
                    <div className={cx('qln')}>
                        <Link to={config.routesAdmin.khht}>Chương trình đào tạo các ngành nghề</Link>
                    </div>
                    <div className={cx('qlk')}>
                        <Link to={config.routesAdmin.khhths}>Kế hoạch học tập học sinh</Link>
                    </div>
                </div>
            </div>
            <QLN />
        </div>
    );
}

export default KHHT;
