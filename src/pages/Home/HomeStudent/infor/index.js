import classNames from 'classnames/bind';
import styles from './Infor.module.scss';
import { useEffect } from 'react';
import {  useSelector } from 'react-redux';
import { getNGANH, getKhoa } from '~/redux/apiAdmin/apiAdmin';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
const cx = classNames.bind(styles);

function Infor() {
    const user = useSelector((state) => state.auth.login?.currentUser.HocSinh);
    const lophoc = useSelector((state) => state.dslh?.dslh?.dslh)||""
    const loptuongung = lophoc.filter((state) => state._id === user.LopHoc)[0]||""
    const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh)
    const nganhtuongung = Allnganh.filter((state) => state._id === loptuongung.Nganh)[0]||""
    const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa)||""
    const khoatuongung = Allkhoa.filter((state) => state._id === nganhtuongung.Khoa)[0]||""
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!user) {
          navigate("/login");
        }
        getKhoa(dispatch)
        getNGANH(dispatch)
      }, [navigate, user, user?.accessToken, dispatch])
      let NgaySinh = moment(user.NgaySinh).utc().format('DD/MM/YYYY')

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Thông tin học sinh</h2>
            <div className={cx('infor-student')}>
                 <div>
                   <p>
                        <strong>Mã học sinh:</strong> {user.MaHS}         
                    </p>
                    <p>
                        <strong>Họ và tên:</strong> {user.HoHS} {user.TenHS}
                    </p>
                    <p>
                        <strong>Ngày Sinh:</strong> {NgaySinh}
                    </p>
                    <p>
                        <strong>Địa chỉ:</strong> {user.DiaChi}
                    </p>  
                </div>
                 <div>
                     <p>
                         <strong>Tên lớp:</strong> {loptuongung.TenLopHoc}
                    </p>
                    <p>
                        <strong>Ngành:</strong> {nganhtuongung.TenNganh}
                    </p>
                    <p>
                        <strong>Khoa:</strong> {khoatuongung.TenKhoa}
                    </p>
                   
                </div>  
            </div>
        </div>
    );
}

export default Infor;
