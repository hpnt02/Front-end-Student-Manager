import classNames from 'classnames/bind';
import styles from './ThemMoiHS.module.scss';
import config from '~/config';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DSHS, DSLH, TMHS, getPhuHuynh } from '~/redux/apiAdmin/apiAdmin';
import { useEffect, useState } from 'react';
import Input from '~/components/Input';
import Option from '~/components/Option';
import SelectLabels from '~/components/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TMHSStart } from '~/redux/DSHS';

const cx = classNames.bind(styles);
function ThemMoiHS() {
    const lophoc = useSelector((state) => state.dslh.dslh?.dslh) || '';

    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const [mahs, setMaHS] = useState('');
    const [hohs, setHoHS] = useState('');
    const [tenhs, setTenHS] = useState('');
    const [gioitinh, setGioiTinh] = useState(true);
    const [ngaysinh, setNgaySinh] = useState('');
    const [diachi, setDiaChi] = useState('');
    const [cccd, setCCCD] = useState('');
    const [malop, setMaLop] = useState('');

    const handleChangeMaLop = (value) => {
        setMaLop(value);
    };

    const handleChangeGT = (value) => {
        setGioiTinh(value);
    };

    console.log('kiểm tra', process.env.REACT_APP_BASE_URL);
    const { success, error } = useSelector((state) => state.dshs.tmhs);
    useEffect(() => {
        if (success) {
            toast.success('Thêm thành công!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            dispatch(TMHSStart()); // Khởi động lại cho lần nhập tiếp theo
        } else if (error) {
            toast.error('Vui lòng thử lại sau', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
            dispatch(TMHSStart()); // Khởi động lại cho lần nhập tiếp theo
        }
    }, [success, error, dispatch]); // Theo dõi sự thay đổi của success và error

    const handleCreate = async (e) => {
        e.preventDefault();
        const newHS = {
            MaHS: mahs,
            HoHS: hohs,
            TenHS: tenhs,
            NgaySinh: ngaysinh,
            GioiTinh: gioitinh,
            DiaChi: diachi,
            CCCD: cccd,
            LopHoc: malop,
        };
        await TMHS(newHS, dispatch);
        DSHS(dispatch);
    };

    useEffect(() => {
        DSLH(dispatch);
        getPhuHuynh(dispatch);
    }, [dispatch]);
    return (
        <div className={cx('wrapperr')}>
            <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>Thêm mới học sinh</h2>
                    <form className={cx('form-create')} onSubmit={handleCreate}>
                        <div className={cx('infor-new')}>
                            <div>
                                <Input
                                    label="Mã học sinh"
                                    placeholder="Vui lòng nhập mã học sinh"
                                    onChange={(e) => setMaHS(e.target.value)}
                                />
                                <br />
                                <Input
                                    label="Họ học sinh"
                                    placeholder="Vui lòng nhập họ học sinh"
                                    onChange={(e) => setHoHS(e.target.value)}
                                />
                                <br />
                                <Input
                                    label="Tên học sinh"
                                    placeholder="Vui lòng nhập tên học sinh"
                                    onChange={(e) => setTenHS(e.target.value)}
                                />
                                <br />
                                <Option title="Giới tính" onChange={handleChangeGT} />
                                <br />
                            </div>

                            <div>
                                <Input
                                    label="Địa chỉ"
                                    placeholder="Vui lòng nhập địa chỉ"
                                    onChange={(e) => setDiaChi(e.target.value)}
                                />
                                <br />
                                <Input
                                    label="Ngày sinh"
                                    placeholder="Vui lòng nhập ngày sinh"
                                    onChange={(e) => setNgaySinh(e.target.value)}
                                />
                                <br />
                                <Input
                                    label="CCCD"
                                    placeholder="Vui lòng nhập căn cước công dân"
                                    onChange={(e) => setCCCD(e.target.value)}
                                />
                                <br />
                                <SelectLabels
                                    title="Lớp học"
                                    select={lophoc}
                                    onChange={handleChangeMaLop}
                                    other="LopHoc"
                                />
                                <br />
                            </div>
                        </div>
                        <div className={cx('format-button')}>
                            <button type="submit" className={cx('button-submit')}>
                                Thêm mới
                            </button>
                            <Link to={config.routesAdmin.qlhs}>
                                <button type="text" className={cx('come-back')}>
                                    Quay lại
                                </button>
                            </Link>
                        </div>
                    </form>
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                </div>
            </div>
        </div>
    );
}

export default ThemMoiHS;
