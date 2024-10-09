import classNames from 'classnames/bind';
import styles from './TTHS.module.scss';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import { Edit } from '@mui/icons-material';
import config from '~/config';
const cx = classNames.bind(styles);
function InforStudent() {
    const location = useLocation();
    const id = location.state?.id;
    const hocsinh = useSelector((state) => state.dshs?.dshs?.dshs);
    const hocsinhtuongung = hocsinh.filter((state) => state._id === id)[0] || '';
    const user = useSelector((state) => state.auth.login?.currentUser?.ChucVu?.MaChucVu);
    const a = useSelector((state) => state.auth.login?.currentUser?.HocSinh);
    const student = hocsinhtuongung ? hocsinhtuongung : a;
    const lop = useSelector((state) => state.dslh?.dslh?.dslh) || '';
    const loptuongung = lop.filter((state) => state._id === student.LopHoc)[0] || '';
    const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh) || '';
    const nganhtuongung = Allnganh.filter((state) => state._id === loptuongung.Nganh)[0] || '';
    const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa) || '';
    const khoatuongung = Allkhoa.filter((state) => state._id === nganhtuongung.Khoa)[0] || '';
    const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien) || [];
    const giaovientuongung = giaovien.filter((state) => state._id === loptuongung.GiaoVien)[0] || '';
    const phuhuynh = useSelector((state) => state.phuhuynh?.phuhuynh?.phuhuynh) || '';
    const phuhuynhtuongung = phuhuynh.filter((state) => state.HocSinh === student._id)[0] || '';

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUpdate = () => {
        navigate(config.routes.updatett);
    };
    const storedValue = localStorage.getItem('switchValue');

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [navigate, user, user?.accessToken, dispatch]);
    let NgaySinh = moment(student.NgaySinh).utc().format('DD/MM/YYYY');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('tths')}>
                    <div className={cx('header-title')}>
                        <div></div>
                        <h2 className={cx('title')}>Thông tin học sinh</h2>
                        {storedValue === 'true' || user === '1' ? (
                            <div className={cx('header-icon')} onClick={handleUpdate}>
                                <Edit />
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div className={cx('infor-student')}>
                        <div>
                            <p>
                                <strong>Mã học sinh:</strong> {student.MaHS}
                            </p>
                            <p>
                                <strong>Họ và tên:</strong> {student.HoHS} {student.TenHS}
                            </p>
                            <p>
                                <strong>Ngày Sinh:</strong> {NgaySinh}
                            </p>
                            <p>
                                <strong>Địa chỉ:</strong> {student.DiaChi}
                            </p>
                        </div>
                        <div>
                            <p>
                                <strong>CCCD:</strong> {student.CCCD}
                            </p>
                            <p>
                                <strong>Lớp:</strong> {loptuongung.TenLopHoc}
                            </p>
                            <p>
                                <strong>Ngành:</strong> {nganhtuongung.TenNganh}
                            </p>
                            <p>
                                <strong>Khoa:</strong> {khoatuongung.TenKhoa}
                            </p>
                        </div>
                    </div>
                    <h2 className={cx('title')}>Thông tin cố vấn</h2>
                    <div className={cx('infor-student')}>
                        <div>
                            <p>
                                <strong>Tên cố vấn:</strong> {giaovientuongung.HoGV} {giaovientuongung.TenGV}
                            </p>
                        </div>
                        <div>
                            <p>
                                <strong>Số điện thoại cố vấn:</strong> {giaovientuongung.SDT}
                            </p>
                        </div>
                    </div>
                    <h2 className={cx('title')}>Thông tin phụ huynh</h2>
                    <div className={cx('infor-student')}>
                        <div>
                            <p>
                                <strong>Họ tên mẹ:</strong> {phuhuynhtuongung.HoTenMe}
                            </p>
                            <p>
                                <strong>Nghề nghiệp:</strong> {phuhuynhtuongung.NgheNghiepMe}
                            </p>
                            <p>
                                <strong>SDT:</strong> {phuhuynhtuongung.SDTMe}
                            </p>
                        </div>
                        <div>
                            <p>
                                <strong>Họ tên cha:</strong> {phuhuynhtuongung.HoTenCha}
                            </p>
                            <p>
                                <strong>Nghề nghiệp:</strong> {phuhuynhtuongung.NgheNghiepCha}
                            </p>
                            <p>
                                <strong>SDT:</strong> {phuhuynhtuongung.SDTCha}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InforStudent;
