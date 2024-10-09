import classNames from 'classnames/bind';
import styles from './ThemMoiHocSinh.module.scss';
import { useDispatch } from 'react-redux';
import { TMHSLH } from '~/redux/apiAdmin/apiAdmin';
import { useState } from 'react';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);
function ThemMoiHocSinh({ id, onCancel }) {
    const dispatch = useDispatch();
    const lh = useSelector((state) => {
        const b = state.lichhoc?.lichhoc?.lichhoc?.find((x) => x._id === id);
        return b;
    });
    const monhoc = useSelector((state) => state.monhoc?.monhoc?.monhoc) || [];
    const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien) || '';
    const MonHoc = monhoc.filter((item) => item._id === lh.MonHoc);
    const GiaoVien = giaovien.filter((item) => item._id === lh.GiaoVien);
    const hocsinh = useSelector((state) => state.dshs?.dshs?.dshs) || '';

    const InfoMonHoc = MonHoc[0];
    const InfoGiaoVien = GiaoVien[0];

    const [mahs, setMaHS] = useState('');
    const handleCreate = async (e) => {
        e.preventDefault();
        const newHSLH = {
            HocSinh: mahs,
            LichHoc: id,
        };

        await TMHSLH(newHSLH, dispatch);
    };

    const [isHidden, setIsHidden] = useState(false);

    const handleCancel = () => {
        setIsHidden(true);
        onCancel(); // Invoke the onCancel callback from props
    };

    if (isHidden) {
        return null;
    }

    return (
        <div className={cx('wrapperrr')}>
            <div className={cx('innerrr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>Thêm học sinh - lịch học</h2>
                    <div className={cx('table-tkb')}>
                        <div className={cx('infor-lichhoc')}>
                            <div>
                                <p>
                                    <strong>Mã viên chức:</strong> {InfoMonHoc.TenMonHoc}
                                </p>
                                <p>
                                    <strong>Nhóm học phần:</strong> {lh.NhomHP}
                                </p>
                            </div>
                            <div>
                                <p>
                                    <strong>Số tín chỉ:</strong> {InfoMonHoc.SoTC}
                                </p>
                                <p>
                                    <strong>Giáo viên:</strong> {InfoGiaoVien.HoGV} {InfoGiaoVien.TenGV}
                                </p>
                            </div>
                        </div>
                        <div className={cx('select-option')}>
                            <select
                                className={cx('chon-hocsinh')}
                                value={mahs}
                                onChange={(e) => setMaHS(e.target.value)}
                            >
                                <option>-------------------------Chọn học sinh-------------------------</option>
                                {hocsinh.map((hs, index) => (
                                    <option key={index} value={hs._id || index}>
                                        {hs.MaHS} - {hs.HoHS} {hs.TenHS}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <form className={cx('form-create')} onSubmit={handleCreate}>
                            <div className={cx('format-button')}>
                                <button type="submit" className={cx('button-submit')}>
                                    Thêm mới
                                </button>

                                <button type="text" className={cx('come-back')} onClick={handleCancel}>
                                    Quay lại
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ThemMoiHocSinh;
