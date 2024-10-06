import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import config from '~/config';
import { Link, useNavigate } from 'react-router-dom';
import images from '~/asset/images';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '~/redux/apiStudent/apiRequest';
import { useEffect } from 'react';
 import { createAxios } from '~/components/createInstance';
import { logoutSuccess } from '~/redux/authSlide';

const cx = classNames.bind(styles);

function Header() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const accessToken = user?.accessToken
    const id = user?._id
   
    const dispatch = useDispatch()
    const navigate = useNavigate()
     let axiosJWT = createAxios(user, dispatch, logoutSuccess)

  const handleLogout = ()=>{
      logOut(dispatch, navigate,id,accessToken, axiosJWT)
  }
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user,  ])
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={config.routes.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="Logo" />
                    <h2 className={cx('school-name')}>TRƯỜNG TRUNG CẤP NGHỀ NINH HÒA</h2>
                </Link>
                <div className={cx('content-right')}>
                    <Link to={config.routes.home}>
                        <strong>Trang chủ</strong>
                    </Link>
                    <div className={cx('header-hello')}>
                    {user?.ChucVu?.MaChucVu === "1" && (
    <span>
      <strong>Chào:</strong>  {user.VienChuc.HoVC} {user.VienChuc.TenVC}
    </span>
  )}
  {user?.ChucVu?.MaChucVu === "2" && (
    <span>
      <strong>Chào:</strong> {user.GiaoVien.HoGV} {user.GiaoVien.TenGV}
    </span>
  )}
  {user?.ChucVu?.MaChucVu === "3" && (
    <span>
      <strong>Chào:</strong> {user.HocSinh.HoHS} {user.HocSinh.TenHS}
    </span>
  )}
               
  
                    </div>
                    <div className={cx('logout')} onClick={handleLogout}>
                        <Link>Đăng xuất</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
