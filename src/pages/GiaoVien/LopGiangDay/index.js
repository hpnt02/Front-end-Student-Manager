import classNames from 'classnames/bind';
import styles from './LopGiangDay.module.scss';
import { useSelector } from 'react-redux';
import DataGridDemo from '~/components/Table';
import { AccountBoxOutlined } from '@mui/icons-material';
import SelectLabels from '~/components/Select';
import { useState } from 'react';
import config from '~/config';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function LopGiangDay() {
    const columns = [
        {
            field: 'id',
            headerName: 'STT',
            width: 50,
        },
        {
            field: 'MaLop',
            headerName: 'Mã lớp',
            width: 150,
        },
        {
            field: 'TenLop',
            headerName: 'Tên lớp',
            width: 400,
        },
        {
            field: 'TenMonHoc',
            headerName: 'Tên môn học',
            width: 400,
        },
        {
            field: 'SoTinChi',
            headerName: 'Số TC',
            width: 134,
        },
        {
            field: 'ThongTin',
            headerName: 'Thông tin chi tiết',
            width: 200,
            renderCell: (params) => (
                <div
                    style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => handleIconClick(params.row)}
                >
                    <AccountBoxOutlined style={{ color: 'blue' }} />
                    <span title="Xem chương trình" style={{ marginLeft: '8px' }}>
                        Xem chi tiết
                    </span>
                </div>
            ),
        },
        {
            field: 'LVP',
            headerName: 'Lỗi vi phạm',
            width: 200,
            renderCell: (params) => (
                <div
                    style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => handleLVPClick(params.row)}
                >
                    <AccountBoxOutlined style={{ color: 'blue' }} />
                    <span title="Xem chương trình" style={{ marginLeft: '8px' }}>
                        Lỗi vi phạm
                    </span>
                </div>
            ),
        },
    ];

    const user = useSelector((state) => state.auth.login.currentUser.GiaoVien._id);
    const ChucVu = useSelector((state) => state.auth.login.currentUser.ChucVu.MaChucVu);
    const lichhoc = useSelector((state) => state.lichhoc.lichhoc.lichhoc);
    const namhoc = useSelector((state) => state.namhoc?.namhoc?.namhoc) || '';
    const hocky = useSelector((state) => state.hocky?.hocky?.hocky) || '';
    const monhoc = useSelector((state) => state.monhoc?.monhoc?.monhoc) || '';
    const lophoc = useSelector((state) => state.dslh?.dslh?.dslh) || '';

    const lopgiangday = lichhoc.filter((state) => state.GiaoVien === user);

    const navigate = useNavigate();

    const handleIconClick = (row) => {
        const id = row._id;
        const namHoc = row.NamHoc;
        const hocKy = row.HocKy;
        navigate(config.routesAdmin.dshstm, { state: { id, namHoc, hocKy } });
    };

    const handleLVPClick = (row) => {
        const id = row._id;
        const namHoc = row.NamHoc;
        const hocKy = row.HocKy;
        const lophoc = row.IDLopHoc;
        const monhoc = row.IDMonHoc;
        navigate(config.routesAdmin.lvp, { state: { id, namHoc, hocKy, lophoc, monhoc } });
    };

    //Kiểm tra học kỳ hiện tại
    const currentHocKy = [];
    let foundMatch = false;
    // Lặp qua mảng hocky từ cuối đến đầu
    for (let i = hocky.length - 1; i >= 0 && !foundMatch; i--) {
        const HocKy = hocky[i];
        // Kiểm tra xem id có nằm trong lichHoc không
        const isMatched = lopgiangday.some((lich) => lich.HocKy === HocKy._id);
        if (isMatched) {
            currentHocKy.push(HocKy);
            foundMatch = true;
        }
    }
    //------------------------------------------------------------------------------

    //Kiểm tra học kỳ hiện tại
    const currentNamHoc = [];
    let foundMatch1 = false;
    // Lặp qua mảng hocky từ trên xuống dưới
    for (let i = 0; i < namhoc.length && !foundMatch1; i++) {
        const NamHoc = namhoc[i];
        // Kiểm tra xem id có nằm trong lichHoc không
        const isMatched = lopgiangday.some((lich) => lich.NamHoc === NamHoc._id);
        if (isMatched) {
            currentNamHoc.push(NamHoc);
            foundMatch1 = true;
        }
    }

    //-----------------------------------------------------------------------------------

    const [selectedHocKy, setSelectedHocKy] = useState(currentHocKy[0]._id || []);
    const [selectedNamHoc, setSelectedNamHoc] = useState(currentNamHoc[0]._id || '');

    const handleHocKyChange = (value) => {
        setSelectedHocKy(value);
    };

    const handleNamHocChange = (value) => {
        setSelectedNamHoc(value);
    };

    const resultArray = [];

    lopgiangday.forEach((LichHoc, index) => {
        if (LichHoc.NamHoc === selectedNamHoc && LichHoc.HocKy === selectedHocKy) {
            const mhoc = monhoc?.find((monHoc) => monHoc._id === LichHoc.MonHoc);
            const lop = lophoc?.find((lop) => lop._id === LichHoc.LopHoc);
            const data = {
                id: index + 1,
                _id: LichHoc._id,
                IDLopHoc: lop._id,
                IDMonHoc: mhoc._id,
                MaLop: lop.MaLopHoc,
                TenLop: lop.TenLopHoc,
                TenMonHoc: mhoc?.TenMonHoc,
                SoTinChi: mhoc?.SoTC,
                NamHoc: LichHoc.NamHoc,
                HocKy: LichHoc.HocKy,
            };
            resultArray.push(data);
        }
        // Tạo đối tượng mới với dữ liệu đã lọc

        // Thêm vào mảng kết quả
    });

    return (
        <div className={cx('wrapperr')}>
            <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>Danh sách lớp giảng dạy</h2>
                    <div className={cx('option')}>
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

                    <DataGridDemo
                        columns={columns}
                        rows={resultArray}
                        data={[]}
                        check={ChucVu === '2' ? true : false}
                    />
                </div>
            </div>
        </div>
    );
}

export default LopGiangDay;
