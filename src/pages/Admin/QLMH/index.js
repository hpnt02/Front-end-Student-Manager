import classNames from 'classnames/bind';
import styles from './QLMH.module.scss';
import config from '~/config';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getKhoa, getMonHoc, getNGANH } from '~/redux/apiAdmin/apiAdmin';
import { useEffect, useState } from 'react';
import DataGridDemo from '~/components/Table';
import { Edit } from '@mui/icons-material';
import Button from '~/components/Button';
import DeleteMonHoc from './DeleteMonHoc';

const cx = classNames.bind(styles);
function QLMH() {
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        {
            field: 'MaMonHoc',
            headerName: 'Mã môn học',
            width: 100,
        },
        {
            field: 'TenMonHoc',
            headerName: 'Tên môn học',
            width: 250,
        },
        {
            field: 'TinChi',
            headerName: 'Tín Chỉ',
            width: 100,
        },
        {
            field: 'LyThuyet',
            headerName: 'Lý thuyết',
            width: 100,
        },
        {
            field: 'KiemTra',
            headerName: 'Thực hành',
            width: 100,
        },
        {
            field: 'Thi',
            headerName: 'Thi',
            width: 100,
        },
        {
            field: 'Nganh',
            headerName: 'Ngành',
            width: 200,
        },
        {
            field: 'LoaiMonHoc',
            headerName: 'Loại môn học',
            width: 200,
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
    ];

    const navigate = useNavigate();
    const monhoc = useSelector((state) => state.monhoc?.monhoc?.monhoc) || [];
    const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh);
    const resultArray = [];
    monhoc.forEach((mh, index) => {
        const nganh = Allnganh?.find((ng) => ng._id === mh.Nganh);

        // Tạo đối tượng mới với dữ liệu đã lọc
        const data = {
            id: index + 1,
            _id: mh._id,
            MaMonHoc: mh.MaMonHoc,
            TenMonHoc: mh.TenMonHoc,
            TinChi: mh.SoTC,
            LyThuyet: mh?.LyThuyet, // hoặc thuộc tính bạn cần
            KiemTra: mh?.ThucHanh, // hoặc thuộc tính bạn cần
            Thi: mh?.Thi, // hoặc thuộc tính bạn cần
            Nganh: nganh?.TenNganh, // hoặc thuộc tính bạn cần
            LoaiMonHoc: mh?.LoaiMonHoc === false ? 'Môn học chuyên ngành' : 'Môn học chung', // hoặc thuộc tính bạn cần
        };

        // Thêm vào mảng kết quả
        resultArray.push(data);
    });

    const dispatch = useDispatch();

    const [onCancel, setOncancel] = useState(false);

    function handleUpdateDiemCancel() {
        setOncancel(false);
    }
    const handleClickCancel = () => {
        setOncancel(true);
    };

    const [records, setRecords] = useState(resultArray);
    function handleFilter(event) {
        const searchValue = event.target.value.toLowerCase();
        const newData = resultArray.filter((row) => {
            const tenmonhoc = row.TenMonHoc?.toLowerCase() || '';
            const maMonHoc = row.MaMonHoc?.toLowerCase() || '';
            return tenmonhoc.includes(searchValue) || maMonHoc.includes(searchValue);
        });

        setRecords(newData);
    }

    const handleEditClick = (row) => {
        const id = row._id;
        navigate(config.routesAdmin.editmonhoc, { state: { id } });
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

    useEffect(() => {
        getNGANH(dispatch);
        getMonHoc(dispatch);
        getKhoa(dispatch);
    }, [dispatch]);
    return (
        <div className={cx('wrapperr')}>
            <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>Danh sách môn học</h2>
                    <div className={cx('tool')}>
                        <div className={cx('search')}>
                            <input type="text" onChange={handleFilter} placeholder="Nhập mã môn học hoặc tên môn học" />
                        </div>

                        <div className={cx('button-create')}>
                            <Button type="text" primary to={config.routesAdmin.tmmh}>
                                Thêm mới môn học
                            </Button>
                            <Button type="text" disabled={selectedIDs.length === 0} primary onClick={handleClickCancel}>
                                Xóa môn học
                            </Button>
                            <Button type="text" primary to={config.routes.home}>
                                Quay lại
                            </Button>
                        </div>
                    </div>
                    {onCancel ? <DeleteMonHoc onCancel={handleUpdateDiemCancel} MonHocID={selectedIDs} /> : ''}
                    <DataGridDemo columns={columns} rows={records} data={[]} onClick={handleIDChange} />
                </div>
            </div>
        </div>
    );
}
export default QLMH;
