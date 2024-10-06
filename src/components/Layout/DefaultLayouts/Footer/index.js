import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('content')}>
                    <p>
                        <strong className={cx('school-name')}>Trường Trung cấp nghề Ninh Hòa</strong>
                        <br />
                        Điện thoại: 02583 632 494 – Fax: 02583 630 918 – Email: tcnnh.sldtbxh@khanhhoa.gov.vn
                        <br />
                        Địa chỉ: Số 02, Tân Định, Tổ dân phố 17, Phường Ninh Hiệp, Thị xã Ninh Hòa, Tỉnh Khánh Hòa
                        <br />
                        ©2024 – Trường Trung cấp nghề Ninh Hòa
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
