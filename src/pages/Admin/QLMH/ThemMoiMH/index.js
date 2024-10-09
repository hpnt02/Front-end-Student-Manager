import classNames from 'classnames/bind';
import styles from './ThemMoiMH.module.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getKhoa, TMMonHoc } from '~/redux/apiAdmin/apiAdmin';
import config from '~/config';
import Input from '~/components/Input';
import Option from '~/components/Option';
import SelectLabels from '~/components/Select';
const cx = classNames.bind(styles);
function ThemMoiMH() {
    const [mamh, setMaMH] = useState('');
    const [tenmh, setTenmh] = useState('');
    const [sotc, setSoTC] = useState('');
    const [lythuyet, setLyThuyet] = useState('');
    const [thuchanh, setThucHanh] = useState('');
    const [thi, setThi] = useState('');
    const [nganh, setNganh] = useState('');
    const [loaimonhoc, setLoaiMH] = useState(true);

    const handleChangeMonHoc = (value) => {
        setLoaiMH(value);
    };

    const handleChangeNganh = (value) => {
        setNganh(value);
    };
    const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh) || '';

    const dispatch = useDispatch();
    const navigate = useDispatch();

    const handleCreate = async (e) => {
        e.preventDefault();
        const newMH = {
            MaMonHoc: mamh,
            TenMonHoc: tenmh,
            SoTC: sotc,
            LyThuyet: lythuyet,
            ThucHanh: thuchanh,
            Thi: thi,
            Nganh: nganh,
            LoaiMonHoc: loaimonhoc,
        };
        TMMonHoc(newMH, dispatch, navigate);
    };

    useEffect(() => {
        getKhoa(dispatch);
    }, [dispatch]);
    return (
        <div className={cx('wrapperr')}>
            <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>Thêm mới môn học</h2>
                    <form className={cx('form-create')} onSubmit={handleCreate}>
                        <div className={cx('infor-new')}>
                            <div>
                                <Input
                                    label="Mã môn học"
                                    placeholder="Vui lòng nhập mã môn học"
                                    onChange={(e) => setMaMH(e.target.value)}
                                />
                                <br />
                                <Input
                                    label="Tên môn học"
                                    placeholder="Vui lòng nhập tên môn học"
                                    onChange={(e) => setTenmh(e.target.value)}
                                />
                                <br />
                                <Input
                                    label="Số tín chỉ"
                                    placeholder="Vui lòng nhập số tín chỉ"
                                    onChange={(e) => setSoTC(e.target.value)}
                                />
                                <br />
                                <Input
                                    label="Lý thuyết"
                                    placeholder="Vui lòng nhập số lý thuyết"
                                    onChange={(e) => setLyThuyet(e.target.value)}
                                />
                                <br />
                            </div>

                            <div>
                                <Input
                                    label="Thực hành"
                                    placeholder="Vui lòng nhập số thực hành"
                                    onChange={(e) => setThucHanh(e.target.value)}
                                />
                                <br />

                                <Input
                                    label="Thi"
                                    placeholder="Vui lòng nhập số thi"
                                    onChange={(e) => setThi(e.target.value)}
                                />
                                <br />

                                <Option title="Loại môn học" onChange={handleChangeMonHoc} label={true} />
                                <br />
                                <SelectLabels
                                    title="Ngành"
                                    select={Allnganh}
                                    onChange={handleChangeNganh}
                                    other="Nganh"
                                />
                            </div>
                        </div>
                        <div className={cx('footer-button')}>
                            <div className={cx('button-class')}>
                                <button type="submit" className={cx('button-submit')}>
                                    Thêm mới
                                </button>
                            </div>
                            <div className={cx('button-class', 'tl')}>
                                <Link to={config.routesAdmin.ttmh} className={cx('come-back')}>
                                    Quay lại
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ThemMoiMH;
