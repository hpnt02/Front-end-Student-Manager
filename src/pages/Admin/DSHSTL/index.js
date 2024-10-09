import classNames from 'classnames/bind';
import styles from './DSHSL.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useEffect } from 'react';
import { DSHS, getKhoa, getNGANH } from '~/redux/apiAdmin/apiAdmin';
import { AccountBoxOutlined } from '@mui/icons-material';
import DataGridDemo from '~/components/Table';
import config from '~/config';
import React from 'react';


import * as XLSX from 'xlsx';
import Button from '~/components/Button';
const cx = classNames.bind(styles);
function DSHSTL() {
    const location = useLocation();
    const id = location.state?.id; // Lấy id từ state
    const id2 = location.state?.id2; // Lấy id từ state
    const navigate = useNavigate();
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
            field: 'MaHocSinh',
            headerName: 'Mã học sinh',
            width: 100,
        },
        {
            field: 'TenHocSinh',
            headerName: 'Họ tên học sinh',
            width: 224,
        },
        {
            field: 'GioiTinh',
            headerName: 'Giới tính',
            width: 110,
        },
        {
            field: 'DiaChi',
            headerName: 'Địa chỉ',
            width: 200,
        },
        {
            field: 'NgaySinh',
            headerName: 'Ngày Sinh',
            width: 100,
        },
        {
            field: 'ChucNang',
            headerName: 'Chức năng',
            width: 150,
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
            field: 'KHHT',
            headerName: 'Kế hoạch học tập',
            width: 200,
            renderCell: (params) => (
                <div
                    style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => handleKHHTClick(params.row)}
                >
                    <AccountBoxOutlined style={{ color: 'blue' }} />
                    <span title="Xem chương trình" style={{ marginLeft: '8px' }}>
                        Xem kế hoạch học tập
                    </span>
                </div>
            ),
        },
        {
            field: 'KQHT',
            headerName: 'Kết quả học tập',
            width: 200,
            renderCell: (params) => (
                <div
                    style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => handleKQHTClick(params.row)}
                >
                    <AccountBoxOutlined style={{ color: 'blue' }} />
                    <span title="Xem chương trình" style={{ marginLeft: '8px' }}>
                        Xem kết quả học tập
                    </span>
                </div>
            ),
        },
    ];
    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth?.login?.currentUser?.ChucVu?.MaChucVu) || '';
    //Lấy ra danh sách lớp học
    const lophoc = useSelector((state) => state.dslh?.dslh?.dslh) || '';
    //Lấy ra danh sách học sinh
    const hocsinh = useSelector((state) => state.dshs?.dshs?.dshs) || [];
    //Lấy ra danh sách các ngành
    const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh) || '';
    //Lấy ra danh sách các khoa
    const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa) || '';
    //Lấy ra danh sách thông tin lớp đó theo Id
    const hocsinhlophoc = lophoc.filter((item) => item._id === id || id2)[0] || '';
    //Lấy ra danh sách học sinh theo lớp
    const HSLH = hocsinh.filter((item) => item.LopHoc === hocsinhlophoc._id) || '';
    //Lấy ra danh sách giáo viên
    const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien) || [] || '';
    //Láy ra thông tin giáo viên của lớp đó
    const giaovienlophoc = giaovien.filter((item) => item._id === hocsinhlophoc.GiaoVien)[0] || '';
    //Lấy ra thông tin về ngành của lớp đó
    const nganhhocsinh = Allnganh.filter((item) => item._id === hocsinhlophoc.Nganh)[0] || '';
    //lấy ra thông tin về khoa của lớp đó
    const khoahocsinh = Allkhoa.filter((item) => item._id === nganhhocsinh.Khoa)[0] || '';

    const count = HSLH.length;

    const handleIconClick = (row) => {
        const id = row._id;
        navigate(config.routes.tths, { state: { id } });
    };

    const handleKHHTClick = (row) => {
        const id = row._id;
        const id2 = row.MaLop;
        navigate(config.routesAdmin.lhhs, { state: { id, id2 } });
    };

    const handleKQHTClick = (row) => {
        const id = row._id;
        navigate(config.routesAdmin.bdhs, { state: { id } });
    };

    const resultArray = [];
    HSLH.forEach((hs, index) => {
        // Tạo đối tượng mới với dữ liệu đã lọc
        const data = {
            id: index + 1,
            _id: hs._id,
            MaLop: hs.LopHoc,
            MaHocSinh: hs.MaHS,
            TenHocSinh: hs.HoHS + ' ' + hs.TenHS,
            GioiTinh: hs.GioiTinh === true ? 'Nam' : 'Nữ',
            DiaChi: hs.DiaChi,
            NgaySinh: moment(hs.NgaySinh).utc().format('DD/MM/YYYY'),
        };

        // Thêm vào mảng kết quả
        resultArray.push(data);
    });

    useEffect(() => {
        getKhoa(dispatch);
        getNGANH(dispatch);
        DSHS(dispatch);
    }, [dispatch]);

    const handleExport = () => {
        // Tạo dữ liệu cho tiêu đề và tiêu đề cột
        const title = `Danh sách học sinh lớp ${hocsinhlophoc.TenLopHoc}`; // Tiêu đề gộp
        const headers = [['STT', 'Mã học sinh', 'Họ và tên học sinh', 'Giới tính', 'Ngày sinh', 'Địa chỉ']];
        const rows = resultArray.map((item) => [
            item.id,
            item.MaHocSinh,
            item.TenHocSinh,
            item.GioiTinh,
            item.NgaySinh,
            item.DiaChi,
        ]);

        // Kết hợp tiêu đề, tiêu đề cột và dữ liệu
        const worksheetData = [[title, '', ''], ...headers, ...rows];

        // Tạo worksheet từ dữ liệu
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // Thêm thông tin gộp ô
        worksheet['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }, // Gộp ô từ (0,0) đến (0,1)
        ];

        worksheet['!cols'] = [
            { wch: 5 },
            { wch: 10 }, // Chiều rộng cho cột trống
            { wch: 25 }, // Chiều rộng cho cột "Age"
            { wch: 10 }, // Chiều rộng cho cột "Email"
        ];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Xuất file
        XLSX.writeFile(workbook, 'DanhSachHocSinh.xlsx');
    };

    return (
        <div className={cx('wrapperr')}>
            <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>Danh sách học sinh theo lớp</h2>
                    <div className={cx('infor')}>
                        <div>
                            <p>
                                <strong>Mã lớp học:</strong> {hocsinhlophoc.MaLopHoc}
                            </p>
                            <p>
                                <strong>Giáo viên cố vấn:</strong> {giaovienlophoc.HoGV} {giaovienlophoc.TenGV}
                            </p>
                            <p>
                                <strong>Ngành:</strong> {nganhhocsinh.TenNganh}
                            </p>
                        </div>
                        <div>
                            <p>
                                <strong>Tên lớp học:</strong> {hocsinhlophoc.TenLopHoc}
                            </p>
                            <p>
                                <strong>Sĩ số:</strong> {count}
                            </p>
                            <p>
                                <strong>Khoa:</strong> {khoahocsinh.TenKhoa}
                            </p>
                        </div>
                    </div>
                    <div className={cx('export-data')}>
                   
                        <Button primary onClick={handleExport} className={cx('export-excel')}>
                            Xuất Excel
                        </Button>
                    </div>
                    {/* <MyDocument hs={resultArray}/> */}
                    <DataGridDemo columns={columns} rows={resultArray} data={[]} check={user === 2 ? false : true} />
                </div>
            </div>
        </div>
    );
}

export default DSHSTL;
