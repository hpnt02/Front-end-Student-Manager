import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateLH } from '~/redux/apiAdmin/apiAdmin';
import { getNGANH } from '~/redux/apiAdmin/apiAdmin';
import classNames from 'classnames/bind';
import styles from './UpdateLopHoc.module.scss';
import Input from '~/components/Input';
import SelectLabels from '~/components/Select';

const cx = classNames.bind(styles);
function UpdateLopHoc() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const id = location.state?.id;
    const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien) || '';
    const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh) || '';

    useEffect(() => {
        getNGANH(dispatch);
    }, [dispatch]);

    const a = useSelector((state) => {
        const b = state.dslh?.dslh?.dslh.find((x) => x._id === id);
        return b;
    });
    const [inputValue, setInputValue] = useState(a.MaLopHoc);
    const [inputTenLH, setInputTenLH] = useState(a.TenLopHoc);
    const [inputGV, setInputGV] = useState(a.GiaoVien);
    const [inputNganh, setInputNganh] = useState(a.Nganh);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleInputChange1 = (e) => {
        setInputTenLH(e.target.value);
    };

    const handleInputGiaoVien = (value) => {
        setInputGV(value);
    };

    const handleInputNganh = (value) => {
        setInputNganh(value);
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedData = {
            MaLopHoc: inputValue,
            TenLopHoc: inputTenLH,
            GiaoVien: inputGV,
            Nganh: inputNganh,
        };
        UpdateLH(updatedData, dispatch, navigate, a._id);
    };

    const nganhtuongung = Allnganh?.filter((ng) => ng._id === inputNganh)[0]?.Khoa || '';
    const giaovientuongung = giaovien?.filter((gv) => gv.Khoa === nganhtuongung);

    return (
        <div>
            <div className={cx('wrapperr')}>
                <div className={cx('innerr')}>
                    <div className={cx('bgr-content')}>
                        <h2 className={cx('title')}>Chỉnh sửa thông tin lớp học</h2>
                        <form className={cx('form-create')} onSubmit={handleUpdate}>
                            <div className={cx('infor-new')}>
                                <Input
                                    label="Mã lớp học"
                                    type="text"
                                    placeholder="Chỉnh sửa mã lớp học"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                                <Input
                                    label="Tên lớp học"
                                    type="text"
                                    placeholder="Chỉnh sửa tên lớp học"
                                    value={inputTenLH}
                                    onChange={handleInputChange1}
                                />
                                <SelectLabels
                                    title="Ngành"
                                    select={Allnganh}
                                    onChange={handleInputNganh}
                                    other="Nganh"
                                    Current={inputNganh}
                                />

                                <SelectLabels
                                    title="Giáo viên"
                                    select={giaovientuongung}
                                    onChange={handleInputGiaoVien}
                                    other="GiaoVien"
                                    Current={inputGV}
                                />
                            </div>

                            <div className={cx('button-center')}>
                                <button type="submit" className={cx('button-submit')}>
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateLopHoc;
