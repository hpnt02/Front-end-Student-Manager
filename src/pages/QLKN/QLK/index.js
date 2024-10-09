import classNames from 'classnames/bind';
import styles from './QLK.module.scss';
import config from '~/config';
import { useDispatch, useSelector } from 'react-redux';
import { DSHS, DSLH, getKhoa, GiaoVien } from '~/redux/apiAdmin/apiAdmin';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataGridDemo from '~/components/Table';
import { Edit } from '@mui/icons-material';
import DeleteKhoa from './DeleteKhoa';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
function QLK() {
    const columns = [
        { field: 'id', headerName: 'STT', width: 150 },
        {
            field: 'MaKhoa',
            headerName: 'Mã khoa',
            width: 150,
        },
        {
            field: 'TenKhoa',
            headerName: 'Tên khoa',
            width: 417,
        },
        {
            field: 'SLGV',
            headerName: 'Số lượng giáo viên',
            width: 150,
        },
        {
            field: 'SLSV',
            headerName: 'Số lượng sinh viên',
            width: 150,
        },
        {
            field: 'ChinhSua',
            headerName: 'Chỉnh sửa thông tin',
            width: 266,
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

    const handleEditClick = (row) => {
        const id = row._id;
        navigate(config.routesAdmin.editkhoa, { state: { id } });
    };

    const hocsinh = useSelector((state) => state.dshs?.dshs?.dshs) || '';

    const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien) || '';
    const lophoc = useSelector((state) => state.dslh?.dslh?.dslh) || '';
    const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa) || '';

    const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh);

    const dispatch = useDispatch();

    const resultArray = [];
    Allkhoa.forEach((kh, index) => {
        let sisoGv = 0;
        giaovien.forEach((gv) => {
            if (gv.Khoa === kh._id) sisoGv += 1;
        });
        let siso = 0;
        Allnganh.forEach((ng) => {
            if (ng.Khoa === kh._id) {
                lophoc.forEach((l) => {
                    if (l.Nganh === ng._id)
                        hocsinh.forEach((hs) => {
                            if (hs.LopHoc === l._id) siso += 1;
                        });
                });
            }
        });
        // Tạo đối tượng mới với dữ liệu đã lọc
        const data = {
            id: index + 1,
            _id: kh._id,
            MaKhoa: kh?.MaKhoa,
            TenKhoa: kh?.TenKhoa,
            SLGV: sisoGv, // hoặc thuộc tính bạn cần
            SLSV: siso,
        };

        // Thêm vào mảng kết quả
        resultArray.push(data);
    });

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

    useEffect(() => {
        DSHS(dispatch);
        DSLH(dispatch);
        getKhoa(dispatch);
        GiaoVien(dispatch);
    }, [dispatch]);
    return (
        <div>
            <div className={cx('header-kv')}>
                <div className={cx('innerrr')}>
                    <div className={cx('qlkv')}>
                        <Link to={config.routesAdmin.qlkv}>Quản lý lớp học</Link>
                    </div>
                    <div className={cx('qln')}>
                        <Link to={config.routesAdmin.qln}>Quản lý ngành</Link>
                    </div>
                    <div className={cx('qlk')}>
                        <Link to={config.routesAdmin.qlk}>Quản lý khoa</Link>
                    </div>
                </div>
            </div>
            <div className={cx('wrapperr')}>
                <div className={cx('innerr')}>
                    <div className={cx('bgr-content')}>
                        <h2 className={cx('title')}>Danh sách khoa</h2>
                        <div className={cx('button-create')}>
                            <div>
                                <Button type="text" primary to={config.routesAdmin.tm}>
                                    {' '}
                                    Thêm mới khoa{' '}
                                </Button>
                                <Button
                                    type="text"
                                    disabled={selectedIDs.length === 0}
                                    primary
                                    onClick={handleClickCancel}
                                >
                                    {' '}
                                    Xóa khoa
                                </Button>
                                <Button type="text" primary to={config.routes.home}>
                                    {' '}
                                    Quay lại{' '}
                                </Button>
                            </div>
                        </div>

                        {onCancel ? <DeleteKhoa onCancel={handleUpdateDiemCancel} KhoaId={selectedIDs} /> : ''}
                        <DataGridDemo columns={columns} rows={resultArray} data={[]} onClick={handleIDChange} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default QLK;
