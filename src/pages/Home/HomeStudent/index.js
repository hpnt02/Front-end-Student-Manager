import classNames from 'classnames/bind';
import styles from './HomeStudent.module.scss';
import config from '~/config';
import Infor from './infor';
import InforStudy from './InforStudy';
import Menu, { MenuItem } from '~/components/Menu';
import { InforIcon, KHHTIcon, KQHTIcon, LTIcon, LVPIcon, TimeTableIcon } from '~/components/Icons/icons';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { DSHS, DSLH, GiaoVien, getMonHoc, getNGANH } from '~/redux/apiAdmin/apiAdmin';

const cx = classNames.bind(styles);

function HomeStudent() {
    const dispatch = useDispatch();
    useEffect(() => {
        getMonHoc(dispatch);
        getNGANH(dispatch);
        DSLH(dispatch);
        GiaoVien(dispatch);
        DSHS(dispatch);
    }, [dispatch]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('infor')}>
                    <Infor />
                    <InforStudy />
                </div>
                <div className={cx('menu')}>
                    <Menu>
                        <MenuItem title="Thời khóa biểu" to={config.routesAdmin.lhhs} icon={<TimeTableIcon />} />
                        <MenuItem title="Kết quả học tập" to={config.routesAdmin.bdhs} icon={<KQHTIcon />} />
                        <MenuItem title="Thông tin học sinh" to={config.routes.tths} icon={<InforIcon />} />
                        <MenuItem title="Kế hoạch học tập" to={config.routes.khhtchs} icon={<KHHTIcon />} />
                        <MenuItem title="Điểm rèn luyện" to={config.routes.drl} icon={<LVPIcon />} />
                        <MenuItem title="Đăng ký học phần" to={config.routes.dkhp} icon={<LTIcon />} />
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default HomeStudent;
