import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './LichHoc.module.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getHSTLH, getLichHoc, DSLH, getMonHoc, GiaoVien } from '~/redux/apiAdmin/apiAdmin';
import { getHocKy, getNamHoc } from '~/redux/apiAdmin/apiAdmin';
import SelectLabels from '~/components/Select';
import DataGridDemo from '~/components/Table';
import moment from 'moment';
import Button from '~/components/Button';
import config from '~/config';
const cx = classNames.bind(styles);

const columns = [
    {
        field: 'MaHocPhan',
        headerName: 'Mã HP',
        width: 90,
    },
    {
        field: 'NhomHP',
        headerName: 'Nhóm HP',
        width: 100,
    },
    {
        field: 'TenMonHoc',
        headerName: 'Tên môn học',
        width: 390,
    },
    {
        field: 'SoTinChi',
        headerName: 'Số TC',
        width: 70,
    },
    {
        field: 'LopHocPhan',
        headerName: 'Lớp',
        width: 90,
    },
    {
        field: 'Thu',
        headerName: 'Thứ',
        width: 50,
    },
    {
        field: 'Tiet',
        headerName: 'Tiết',
        width: 60,
    },
    {
        field: 'GVGD',
        headerName: 'Giáo viên giảng dạy',
        width: 234,
    },
    {
        field: 'PhongHoc',
        headerName: 'Phòng học',
        width: 100,
    },
    {
        field: 'NgayBatDau',
        headerName: 'Ngày bắt đầu',
        width: 150,
    },
];

function LichHocHS() {
    const location = useLocation();
    const id = location.state?.id; // Lấy id từ state
    const id2 = location.state?.id2; // Lấy id từ state
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth?.login?.currentUser?.ChucVu?.MaChucVu) || '';
    const MaHS = useSelector((state) => state.auth?.login?.currentUser?.HocSinh._id) || '';

    //Lấy ra các id lịch học và id học sinh
    const HSLH = useSelector((state) => state.hslh.hstlh?.hstlh);
    //Lấy ra các id Lịch học của học sinh đó
    const lichhocHS = HSLH.filter((item) => item.HocSinh === id || MaHS);
    //Lấy ra thông tin lịch học
    const lichhoc = useSelector((state) => state.lichhoc.lichhoc?.lichhoc);
    const monhoc = useSelector((state) => state.monhoc?.monhoc?.monhoc) || '';
    const lophoc = useSelector((state) => state.dslh?.dslh?.dslh) || '';
    const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien) || '';
    const Thongtinlichhoc = lichhoc.filter((item) => {
        const b = lichhocHS.some((state) => state.LichHoc === item._id);
        return b;
    });

    const namhoc = useSelector((state) => state.namhoc?.namhoc?.namhoc);
    const hocky = useSelector((state) => state.hocky?.hocky?.hocky);

    const handleComeBack = () => {
        navigate(config.routesAdmin.dshstl, { state: { id2 } });
    };

    //---------------------------------------------------------------------------------
    //   //Kiểm tra học kỳ hiện tại
    const currentHocKy = [];
    let foundMatch = false;
    // Lặp qua mảng hocky từ cuối đến đầu
    for (let i = hocky.length - 1; i >= 0 && !foundMatch; i--) {
        const HocKy = hocky[i];
        // Kiểm tra xem id có nằm trong lichHoc không
        const isMatched = Thongtinlichhoc.some((lich) => lich.HocKy === HocKy._id);
        if (isMatched) {
            currentHocKy.push(HocKy);
            foundMatch = true;
        }
    }

    // //------------------------------------------------------------------------------

    // //Kiểm tra học kỳ hiện tại
    const currentNamHoc = [];
    let foundMatch1 = false;
    // Lặp qua mảng hocky từ trên xuống dưới
    for (let i = 0; i < namhoc.length && !foundMatch1; i++) {
        const NamHoc = namhoc[i];
        // Kiểm tra xem id có nằm trong lichHoc không
        const isMatched = Thongtinlichhoc.some((lich) => lich.NamHoc === NamHoc._id);
        if (isMatched) {
            currentNamHoc.push(NamHoc);
            foundMatch1 = true;
        }
    }

    //-----------------------------------------------------------------------------------
    const [selectedHocKy, setSelectedHocKy] = useState(currentHocKy[0]._id);
    const [selectedNamHoc, setSelectedNamHoc] = useState(currentNamHoc[0]._id);

    const handleHocKyChange = (value) => {
        setSelectedHocKy(value);
    };

    const handleNamHocChange = (value) => {
        setSelectedNamHoc(value);
    };
    const dispatch = useDispatch();

    const resultArray = [];
    Thongtinlichhoc.forEach((LichHoc, index) => {
        if (LichHoc.NamHoc === selectedNamHoc && LichHoc.HocKy === selectedHocKy) {
            const mhoc = monhoc?.find((monHoc) => monHoc._id === LichHoc.MonHoc);
            const lop = lophoc?.find((lop) => lop._id === LichHoc.LopHoc);
            const GiaoVien = giaovien?.find((gv) => gv._id === LichHoc.GiaoVien);
            const data = {
                id: index + 1,
                MaHocPhan: mhoc?.MaMonHoc,
                NhomHP: LichHoc.NhomHP,
                TenMonHoc: mhoc?.TenMonHoc,
                SoTinChi: mhoc?.SoTC,
                LopHocPhan: lop?.MaLopHoc,
                Thu: LichHoc.Thu,
                Tiet: LichHoc.Tiet,
                PhongHoc: LichHoc.PhongHoc,
                GVGD: GiaoVien?.HoGV + ' ' + GiaoVien?.TenGV,
                NgayBatDau: moment(LichHoc?.NgayBD).utc().format('DD/MM/YYYY'),
            };
            resultArray.push(data);
        }
        // Tạo đối tượng mới với dữ liệu đã lọc

        // Thêm vào mảng kết quả
    });

    useEffect(() => {
        DSLH(dispatch);
        GiaoVien(dispatch);
        getMonHoc(dispatch);
        getHSTLH(dispatch);
        getHocKy(dispatch);
        getNamHoc(dispatch);
        getLichHoc(dispatch);
    }, [dispatch]);
    return (
        <div className={cx('wrapperr')}>
            <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>Thời khóa biểu</h2>
                    <div className={cx('option')}>
                        <div>
                            <SelectLabels
                                title="Học kỳ"
                                select={hocky}
                                onChange={handleHocKyChange}
                                label="Chọn học kỳ mong muốn"
                                Current={currentHocKy[0]._id}
                                other="HocKy"
                            />
                            <SelectLabels
                                title="Năm học"
                                select={namhoc}
                                onChange={handleNamHocChange}
                                label="Chọn năm học mong muốn"
                                Current={currentNamHoc[0]._id}
                                other="NamHoc"
                            />
                        </div>

                        <div className={cx('come-back')}>
                            {user === '3' ? (
                                <Button type="test" primary to={config.routes.home}>
                                    Quay lại
                                </Button>
                            ) : (
                                <Button type="test" primary onClick={handleComeBack}>
                                    Quay lại
                                </Button>
                            )}
                        </div>
                        {/* <div className={cx('input-search')} onChange={handleFilter}><input type="text" /></div>  */}
                    </div>
                    <div>
                        <DataGridDemo
                            columns={columns}
                            rows={resultArray}
                            data={[]}
                            check={user === '1' ? false : true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LichHocHS;
