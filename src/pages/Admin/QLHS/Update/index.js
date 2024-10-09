import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateUser } from '~/redux/apiAdmin/apiAdmin';
import classNames from 'classnames/bind';
import styles from './Update.module.scss';
import config from '~/config';
import { Link } from 'react-router-dom';
import { DSHS } from '~/redux/apiAdmin/apiAdmin';
import Input from '~/components/Input';
import SelectLabels from '~/components/Select';
import Option from '~/components/Option';
import moment from 'moment';

const cx = classNames.bind(styles);
function Update({ HocSinhID }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const id = location.state?.id;
    const HocSinh = id ? id : HocSinhID;
    const lophoc = useSelector((state) => state.dslh.dslh?.dslh) || '';

    const a = useSelector((state) => {
        const b = state.dshs?.dshs?.dshs.find((x) => x._id === HocSinh);
        return b;
    });

    const [inputValue, setInputValue] = useState(a.MaHS);
    const [inputHoHS, setInputHoHS] = useState(a.HoHS);
    const [inputTenHS, setInputTenHS] = useState(a.TenHS);
    const [inputlop, setInputLop] = useState(a.LopHoc);
    const [inputGT, setInputGT] = useState(a.GioiTinh);
    const [inputNgaySinh, setInputNgaySinh] = useState(moment(a.NgaySinh).utc().format('DD/MM/YYYY'));
    const [inputDiaChi, setInputDiaChi] = useState(a.DiaChi);
    const [inputCCCD, setInputCCCD] = useState(a.CCCD);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleInputChange1 = (value) => {
        setInputLop(value);
    };
    const handleChangeGT = (value) => {
        setInputGT(value);
    };

    const handleInputChange4 = (e) => {
        setInputHoHS(e.target.value);
    };

    const handleInputChange5 = (e) => {
        setInputTenHS(e.target.value);
    };
    const handleInputChange8 = (e) => {
        setInputNgaySinh(e.target.value);
    };
    const handleInputChange6 = (e) => {
        setInputDiaChi(e.target.value);
    };
    const handleInputChange7 = (e) => {
        setInputCCCD(e.target.value);
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const updatedData = {
            MaHS: inputValue,
            HoHS: inputHoHS,
            TenHS: inputTenHS,
            NgaySinh: inputNgaySinh,
            DiaChi: inputDiaChi,
            CCCD: inputCCCD,
            LopHoc: inputlop,
            GioiTinh: inputGT,
        };
        UpdateUser(updatedData, dispatch, navigate, a._id);
    };
    useEffect(() => {
        DSHS(dispatch);
    }, [dispatch]);
    return (
        <div className={cx('wrapperr')}>
            <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>Chỉnh sửa thông tin</h2>
                    <form className={cx('form-create')} onSubmit={handleUpdate}>
                        <div className={cx('infor-new')}>
                            <div>
                                <Input
                                    label="Mã học sinh"
                                    type="text"
                                    placeholder="Chỉnh sửa mã học sinh"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                                <br />
                                <Input
                                    label="Họ học sinh"
                                    type="text"
                                    placeholder="Chỉnh sửa họ học sinh"
                                    value={inputHoHS}
                                    onChange={handleInputChange4}
                                />
                                <br />
                                <Input
                                    label="Tên học sinh"
                                    type="text"
                                    placeholder="Chỉnh sửa tên học sinh"
                                    value={inputTenHS}
                                    onChange={handleInputChange5}
                                />
                                <br />
                                <Option onChange={handleChangeGT} value={inputGT} />

                                <br />
                            </div>

                            <div>
                                <Input
                                    label="Địa chỉ"
                                    type="text"
                                    placeholder="Chỉnh sửa địa chỉ"
                                    value={inputDiaChi}
                                    onChange={handleInputChange6}
                                />

                                <br />
                                <Input
                                    label="Ngày sinh"
                                    type="date"
                                    placeholder="Chỉnh sửa ngày sinh"
                                    value={inputNgaySinh}
                                    onChange={handleInputChange8}
                                />
                                <br />
                                <Input
                                    label="CCCD"
                                    type="text"
                                    placeholder="Chỉnh sửa CCCD"
                                    value={inputCCCD}
                                    onChange={handleInputChange7}
                                />
                                <br />

                                <br />
                                <SelectLabels
                                    title="Lớp học"
                                    select={lophoc}
                                    onChange={handleInputChange1}
                                    other="LopHoc"
                                    Current={inputlop}
                                />
                            </div>
                        </div>
                        <div className={cx('format-button')}>
                            <button type="submit" className={cx('button-submit')}>
                                Lưu
                            </button>
                            <Link to={config.routesAdmin.qlhs}>
                                <button type="text" className={cx('come-back')}>
                                    Quay lại
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Update;
