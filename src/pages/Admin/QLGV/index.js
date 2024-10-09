import classNames from 'classnames/bind';
import styles from './QLGV.module.scss';
import config from '~/config';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { GiaoVien, getKhoa } from '~/redux/apiAdmin/apiAdmin';
import { useEffect, useState } from 'react';
import React from 'react';
import DataGridDemo from '~/components/Table';
import Button from '~/components/Button';
import DeleteGiaoVien from './DeleteGiaoVien';
import { Edit } from '@mui/icons-material';

const cx = classNames.bind(styles);

function QLGV() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
            field: 'MaGiaoVien',
            headerName: 'Mã giáo viên',
            width: 100,
        },
        {
            field: 'TenGiaoVien',
            headerName: 'Tên giáo viên',
            width: 250,
        },
        {
            field: 'GioiTinh',
            headerName: 'Giới tính',
            width: 110,
        },
        {
            field: 'DiaChi',
            headerName: 'Địa chỉ',
            width: 294,
        },
        {
            field: 'NgaySinh',
            headerName: 'Ngày Sinh',
            width: 100,
        },
        {
            field: 'SDT',
            headerName: 'Số điện thoại',
            width: 130,
        },
        {
            field: 'TenKhoa',
            headerName: 'Tên khoa',
            width: 250,
        },

        {
            field: 'ChinhSua',
            headerName: 'Chỉnh sửa thông tin',
            width: 200,
            renderCell: (params) => (
                <div
                    style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => handleEditClick(params.row)}
                >
                    <Edit style={{ color: 'blue' }} />
                    <span title="Chỉnh sửa" style={{ marginLeft: '8px' }}>
                        Chỉnh sửa thông tin
                    </span>
                </div>
            ),
        },
        {
            field: 'LichGD',
            headerName: 'Lịch giảng dạy',
            width: 200,
            renderCell: (params) => (
                <div
                    style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => handleLGDClick(params.row)}
                >
                    <Edit style={{ color: 'blue' }} />
                    <span title="Chỉnh sửa" style={{ marginLeft: '8px' }}>
                        Xem lịch giảng dạy
                    </span>
                </div>
            ),
        },
    ];

    const navigate = useNavigate();

    const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa) || '';
    const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien) || [];

    const [onCancel, setOncancel] = useState(false);

    function handleUpdateDiemCancel() {
        setOncancel(false);
    }
    const handleClickCancel = () => {
        setOncancel(true);
    };

    const [selectedIDs, setSelectedIDs] = useState([]); // Mảng để lưu các ID đã chọn

    const handleIDChange = (value) => {
        // Kiểm tra xem ID đã có trong mảng chưa
        if (selectedIDs.includes(value)) {
            // Nếu có, xóa ID khỏi mảng
            setSelectedIDs((prevIDs) => prevIDs.filter((id) => id !== value));
        } else {
            // Nếu chưa có, thêm ID vào mảng
            setSelectedIDs((prevIDs) => [...prevIDs, value]);
        }
    };

    const handleEditClick = (row) => {
        const id = row._id;
        navigate(config.routesAdmin.editgv, { state: { id } });
    };

    const handleLGDClick = (row) => {
        const id = row._id;
        navigate(config.routesAdmin.lgdgv, { state: { id } });
    };

    const resultArray = [];
    giaovien.forEach((gv, index) => {
        const khoa = Allkhoa?.find((khoa) => khoa._id === gv?.Khoa);

        // Tạo đối tượng mới với dữ liệu đã lọc
        const data = {
            id: index + 1,
            _id: gv._id,
            MaGiaoVien: gv.MaGV,
            TenGiaoVien: gv.HoGV + ' ' + gv.TenGV,
            GioiTinh: gv.GioiTinh === true ? 'Nam' : 'Nữ',
            DiaChi: gv.DiaChi,
            SDT: gv.SDT,
            NgaySinh: moment(gv.NgaySinh).utc().format('DD/MM/YYYY'),
            TenKhoa: khoa?.TenKhoa, // hoặc thuộc tính bạn cần
        };

        // Thêm vào mảng kết quả
        resultArray.push(data);
    });

    const dispatch = useDispatch();

    const [records, setRecords] = useState(resultArray);
    function handleFilter(event) {
        const searchValue = event.target.value.toLowerCase();

        const newData = resultArray.filter((row) => {
            const tenGiaoVien = row.TenGiaoVien?.toLowerCase() || '';
            const maGV = row.MaGiaoVien?.toLowerCase() || '';

            return tenGiaoVien.includes(searchValue) || maGV.includes(searchValue);
        });

        setRecords(newData);
    }

    useEffect(() => {
        GiaoVien(dispatch);
        getKhoa(dispatch);
    }, [dispatch]);
    return (
        <div className={cx('wrapperr')}>
            <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>DANH SÁCH GIÁO VIÊN</h2>
                    <div className={cx('tool')}>
                        <div className={cx('search')}>
                            <input
                                type="text"
                                onChange={handleFilter}
                                placeholder="Nhập mã giáo viên hoặc tên giáo viên"
                            />
                        </div>
                        <div className={cx('button-create')}>
                            {window.location.pathname === '/quan-ly-giao-vien' ? (
                                <>
                                    <Button type="text" primary to={config.routesAdmin.tmgv}>
                                        Thêm mới giáo viên
                                    </Button>
                                    <Button
                                        type="text"
                                        disabled={selectedIDs.length === 0}
                                        primary
                                        onClick={handleClickCancel}
                                    >
                                        Xóa giáo viên
                                    </Button>
                                </>
                            ) : (
                                ''
                            )}
                            <Link to={config.routes.home}>
                                <button type="text" className={cx('come-back')}>
                                    Quay lại
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        {onCancel ? <DeleteGiaoVien onCancel={handleUpdateDiemCancel} giaovientId={selectedIDs} /> : ''}
                        <DataGridDemo columns={columns} rows={records} data={[]} onClick={handleIDChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QLGV;
