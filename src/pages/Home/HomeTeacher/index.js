import classNames from 'classnames/bind';
import styles from './HomeTeacher.module.scss';
import config from '~/config';
import Infor from './infor';
import InforStudy from './InforStudy';
import Menu, { MenuItem } from '~/components/Menu';
import { InforIcon, KHHTIcon, LVPIcon, TimeTableIcon } from '~/components/Icons/icons';

const cx = classNames.bind(styles);

function HomeTeacher() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('infor')}>
                    <Infor />
                    <InforStudy />
                </div>
                <div className={cx('menu')}>
                    <Menu>
                        <MenuItem title="Lich giảng dạy" to={config.routesAdmin.lgdgv} icon={<TimeTableIcon />} />
                        <MenuItem title="Danh sách lớp cố vấn" to={config.routesAdmin.dslcv} icon={<KHHTIcon />} />
                        <MenuItem title="Chương trình đào tạo" to={config.routesAdmin.dsn} icon={<InforIcon />} />
                        <MenuItem title="Thông tin lớp giảng dạy" to={config.routesAdmin.dslgd} icon={<LVPIcon />} />
                       
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default HomeTeacher;
