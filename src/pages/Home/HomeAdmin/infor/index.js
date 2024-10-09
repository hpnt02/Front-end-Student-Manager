import classNames from 'classnames/bind';
import styles from './Infor.module.scss';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllUsers } from '~/redux/apiStudent/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
const cx = classNames.bind(styles);

function Infor() {
    const user = useSelector((state) => state.auth.login?.currentUser) || '';
    const admin = useSelector((state) => state.auth.login?.currentUser?.VienChuc?._id) || '';

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        if (user?.accessToken) {
            getAllUsers(user.accessToken, dispatch, admin);
        }
    }, [navigate, user, user?.accessToken, dispatch, admin]);
    let NgaySinh = moment(user?.VienChuc?.NgaySinh).utc().format('DD/MM/YYYY');
    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Thông tin viên chức</h2>
            <div className={cx('infor-student')}>
                <div>
                    <p>
                        <strong>Mã viên chức:</strong> {user?.VienChuc?.MaVC}
                    </p>
                    <p>
                        <strong>Họ và tên:</strong> {user?.VienChuc?.HoVC} {user?.VienChuc?.TenVC}
                    </p>
                    <p>
                        <strong>Ngày Sinh:</strong> {NgaySinh}
                    </p>
                </div>
                <div>
                    <p>
                        <strong>Địa chỉ:</strong> {user?.VienChuc?.DiaChi}
                    </p>
                    <p>
                        <strong>Số điện thoại :</strong> {user?.VienChuc?.SDT}
                    </p>
                </div>
                <div></div>
            </div>
        </div>
    );
}

export default Infor;
