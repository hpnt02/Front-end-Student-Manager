import classNames from 'classnames/bind';
import styles from './HomeAdmin.module.scss';
import Infor from './infor';
import config from '~/config';
import InforAdmin from './InforAdmin';
import { InforIcon, TeacherManagerIcon, KQHTIcon, QLMHIcon,PhuHuynhIcon ,KhoaVien} from '~/components/Icons/icons';
import Menu, { MenuItem } from '~/components/Menu'
const cx = classNames.bind(styles);
function HomeAdmin() {
    return ( 
        <div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <div className={cx('infor')}>
                <Infor />
                 <InforAdmin />
            </div>
            <div className={cx('menu')}>
                    <Menu>
                        <MenuItem title="Quản lý học sinh" to={config.routesAdmin.qlhs} icon={<InforIcon />} />
                        <MenuItem title="Quản lý giáo viên" to={config.routesAdmin.qlgv}  icon={<TeacherManagerIcon/>}/>
                        <MenuItem title="Quản lý kế hoạch học tập" to={config.routesAdmin.qlkhht} icon={<KQHTIcon/>}/>
                        <MenuItem title="Quản lý môn học" to={config.routesAdmin.ttmh} icon={<QLMHIcon/>} />
                        <MenuItem title="Quản lý khoa" to={config.routesAdmin.qlkv} icon={<KhoaVien/>}/>
                        <MenuItem title="Phụ huynh học sinh" to={config.routesAdmin.dsph} icon={<PhuHuynhIcon/>}/>
                     
                     
                       
                      
                    </Menu>
                </div>
        </div>
    </div>
     );
}

export default HomeAdmin;