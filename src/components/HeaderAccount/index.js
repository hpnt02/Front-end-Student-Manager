

import classNames from 'classnames/bind';
import styles from './HeaderAccount.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';


const cx = classNames.bind(styles);
function HeaderAccount() {
    return (
      <div className={cx('header-kv')}>
            <div className={cx('innerrr')}>
                  <div className={cx('qlkv')}>
                        <Link to={config.routesAdmin.dstk}>Danh sách tài khoản</Link>
                  </div>
                  <div className={cx('qlkv')}>
                        <Link to={config.routesAdmin.qlkv}>Tài khoản học sinh</Link>
                  </div>
                  <div className={cx('qln')}>
                        <Link to={config.routesAdmin.qln}>Tài khoản giáo viên</Link>
                  </div>
                  <div className={cx('qlk')}>
                        <Link to={config.routesAdmin.qlk}>Tài khoản viên chức</Link>
                  </div>
            </div>
      </div>
      );
}

export default HeaderAccount;