import classNames from 'classnames/bind';
import styles from './ThemMoiHocPhan.module.scss';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TMHSMH } from '~/redux/apiAdmin/apiAdmin';
import SelectLabels from '~/components/Select';
const cx = classNames.bind(styles);
function ThemMoiHocPhan({ studentId, onCancel, NamHocID, HocKyID }) {
    const dispatch = useDispatch();
    const namHoc = useSelector((state) => state.namhoc?.namhoc?.namhoc) || '';
    const hocKy = useSelector((state) => state.hocky?.hocky?.hocky) || '';
    const monhoc = useSelector((state) => state.monhoc?.monhoc?.monhoc) || '';

    //-------------------Lấy ra id ngành----------------------------------------
    const student = useSelector((state) => state.auth.login?.currentUser?.HocSinh?.LopHoc);
    const lop = useSelector((state) => state.dslh?.dslh?.dslh);
    const hslh = lop.filter((item) => item._id === student)[0].Nganh;
    const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh);
    const hsn = Allnganh.filter((item) => item._id === hslh)[0]._id;
    //-------------------Lấy ra id ngành----------------------------------------

    //-----------------Lấy ra môn học của nganh-------------------------------------
    const monhocnganh = monhoc.filter((item) => item.Nganh === hsn || item.Nganh === '');

    //-----------------Lấy ra môn học của nganh-------------------------------------

    // const [namhoc, setNamHoc] = useState('')
    //   const [hocky, setHocKy] = useState('')
    const [selectedHocKy, setSelectedHocKy] = useState(HocKyID || '');
    const [selectedNamHoc, setSelectedNamHoc] = useState(NamHocID || '');
    const [selectedMonHoc, setSelectedMonHoc] = useState('');
    const [isHidden, setIsHidden] = useState(false);
    const handleCancel = () => {
        setIsHidden(true);
        onCancel(); // Invoke the onCancel callback from props
    };

    if (isHidden) {
        return null;
    }

    const handleHocKyChange = (value) => {
        setSelectedHocKy(value);
    };

    const handleNamHocChange = (value) => {
        setSelectedNamHoc(value);
    };

    const handleMonHocChange = (value) => {
        setSelectedMonHoc(value);
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        const newHSMH = {
            HocSinh: studentId,
            MonHoc: selectedMonHoc,
            NamHoc: selectedNamHoc,
            HocKy: selectedHocKy,
        };
        await TMHSMH(newHSMH, dispatch);
    };

    return (
        <div className={cx('wrapperrr')}>
            <div className={cx('innerrr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>Thêm học phần</h2>

                    <form className={cx('form-create')} onSubmit={handleCreate}>
                        <SelectLabels
                            ZIndex={true}
                            title="Môn học"
                            select={monhocnganh}
                            onChange={handleMonHocChange}
                            label="Chọn môn học mong muốn"
                            other="MonHoc"
                        />
                        <SelectLabels
                            ZIndex={true}
                            title="Học kỳ"
                            select={hocKy}
                            onChange={handleHocKyChange}
                            label="Chọn học kỳ mong muốn"
                            Current={HocKyID}
                            other="HocKy"
                        />

                        <SelectLabels
                            title="Năm học"
                            ZIndex={true}
                            select={namHoc}
                            onChange={handleNamHocChange}
                            Current={NamHocID}
                            label="Chọn năm học mong muốn"
                            other="NamHoc"
                        />

                        <div className={cx('format-button')}>
                            <button className={cx('button-submit')} onClick={handleCancel}>
                                Hủy
                            </button>
                            <button type="submit" className={cx('button-submit')}>
                                Thêm mới
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ThemMoiHocPhan;
