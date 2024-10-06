import classNames from 'classnames/bind';
import styles from './TMKhoaVien.module.scss';
import ThemMoiLH from '../Admin/QLKV/ThemMoiLH';
import config from '~/config';
import { Link } from 'react-router-dom';
import ThemMoiKhoa from '../QLKN/QLK/ThemMoiKhoa';
import ThemMoiNganh from '../QLKN/QLN/ThemMoiNganh';
const cx = classNames.bind(styles)

function TMKhoaVien() {
    return ( 
        <div>
  <div className={cx('header-kv')}>
                <div className={cx('innerrr')}>
                      <div className={cx('qlkv')}>
                        <Link to={config.routesAdmin.qlkv}>
                              Quản lý lớp học
                        </Link>
                      </div>
                      <div className={cx('qln')}>
                        <Link to={config.routesAdmin.qln}>
                              Quản lý ngành
                        </Link>
                      </div>
                      <div className={cx('qlk')}>
                        <Link to={config.routesAdmin.qlkv}>
                              Quản lý khoa
                        </Link>
                      </div>
                </div>
            </div>
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                  <div className={cx('them-moi')}>

                  <div className={cx('width-themmoi')}>
                    <ThemMoiLH/>
                  </div>
                  <div className={cx('width-themmoi')}>
                    <ThemMoiNganh/>
                  </div>
                  <div className={cx('width-themmoi')}>
                    <ThemMoiKhoa/>
                  </div>
                  </div>
            </div>
        </div>
        </div>
     )
}

export default TMKhoaVien;