import classNames from 'classnames/bind';
import styles from './Infor.module.scss';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { getKhoa } from '~/redux/apiAdmin/apiAdmin';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function Infor() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa) || '';
    const khoa = Allkhoa.filter((item) => item._id === user.GiaoVien.Khoa)[0] || '';

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    });

    useEffect(() => {
        getKhoa(dispatch);
    }, [dispatch]);
    let NgaySinh = moment(user.GiaoVien.NgaySinh).utc().format('DD/MM/YYYY');

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Thông tin giáo viên</h2>
            <div className={cx('infor-student')}>
                <div>
                    <p>
                        <strong>Mã Giáo viên:</strong> {user.GiaoVien.MaGV}
                    </p>
                    <p>
                        <strong>Họ và tên:</strong> {user.GiaoVien.HoGV} {user.GiaoVien.TenGV}
                    </p>
                    <p>
                        <strong>Ngày Sinh:</strong> {NgaySinh}
                    </p>
                </div>
                <div>
                    <p>
                        <strong>Địa chỉ:</strong> {user.GiaoVien.DiaChi}
                    </p>
                    <p>
                        <strong>Số điện thoại:</strong> {user.GiaoVien.SDT}
                    </p>
                    <p>
                        <strong>Khoa:</strong> {khoa.TenKhoa}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Infor;
