import classNames from 'classnames/bind';
import styles from './DRLHS.module.scss';
import { useSelector } from 'react-redux';
import { SummarizeOutlined } from '@mui/icons-material';
import DataGridDemo from '~/components/Table';
import SelectLabels from '~/components/Select';
import Button from '~/components/Button';
import { useState } from 'react';
import config from '~/config';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function DRLHS() {
    const columns = [
        {
            field: 'id',
            headerName: 'STT',
            width: 80,
        },
        {
            field: 'NoiDung',
            headerName: 'Nội dung',
            width: 456,
        },
        {
            field: 'SoLoiVP',
            headerName: 'Số lỗi vi phạm',
            width: 130,
        },
        {
            field: 'DiemRenLuyen',
            headerName: 'Điểm rèn luyện',
            width: 130,
        },
        {
            field: 'ThongTin',
            headerName: 'Thông tin chi tiết',
            width: 300,
            renderCell: (params) => (
                <div
                    style={{ display: 'flex', cursor: 'pointer', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => handleIconClick(params.row)}
                >
                    <SummarizeOutlined style={{ color: 'blue' }} />
                    <span title="Xem chương trình" style={{ marginLeft: '8px' }}>
                        Xem chi tiết
                    </span>
                </div>
            ),
        },
    ];
    const user = useSelector((state) => state?.auth?.login?.currentUser?.HocSinh?._id) || '';
    const diemrenluyen = useSelector((state) => state.diemrenluyen?.diemrenluyen?.diemrenluyen) || [];
    const diemrenluyenhs = diemrenluyen.filter((state) => state.HocSinh === user);
    const namhoc = useSelector((state) => state.namhoc?.namhoc?.namhoc) || '';
    const hocky = useSelector((state) => state.hocky?.hocky?.hocky) || [];
    const loihs = useSelector((state) => state.loivipham?.loivipham?.loivipham) || '';

    const navigate = useNavigate();
    const handleIconClick = (row) => {
        const id = row._id;
        const id1 = row.NamHoc;
        const id2 = row.HocKy;
        navigate(config.routesAdmin.ctlvp, { state: { id, id1, id2 } });
    };

    //---------------------------------------------------------------------------------
    //Kiểm tra học kỳ hiện tại
    const currentHocKy = [];
    let foundMatch = false;
    // Lặp qua mảng hocky từ cuối đến đầu
    for (let i = hocky.length - 1; i >= 0 && !foundMatch; i--) {
        const HocKy = hocky[i];
        // Kiểm tra xem id có nằm trong lichHoc không
        const isMatched = diemrenluyenhs.some((drl) => drl.HocKy === HocKy._id);
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
        const isMatched = diemrenluyenhs.some((drl) => drl.NamHoc === NamHoc._id);
        if (isMatched) {
            currentNamHoc.push(NamHoc);
            foundMatch1 = true;
        }
    }

    const [selectedHocKy, setSelectedHocKy] = useState(currentHocKy[0]?._id || []);
    const [selectedNamHoc, setSelectedNamHoc] = useState(currentNamHoc[0]?._id);

    const handleHocKyChange = (value) => {
        setSelectedHocKy(value);
    };

    const handleNamHocChange = (value) => {
        setSelectedNamHoc(value);
    };

    const resultArray = [];
    diemrenluyenhs.forEach(
        (hs, index) => {
            let tongloi = 0;
            loihs.forEach((l) => {
                if (l.HocSinh === hs.HocSinh && l.NamHoc === selectedNamHoc && l.HocKy === selectedHocKy) {
                    tongloi += 1;
                }
                return tongloi;
            });
            const namHoc = namhoc.find((state) => state._id === selectedNamHoc);
            const hocKy = hocky.find((state) => state._id === selectedHocKy);
            const data = {
                id: index + 1,
                _id: hs.HocSinh,
                NoiDung: `Điểm rèn luyện ${hocKy.TenHocKy} - ${namHoc.TenNamHoc} `,
                SoLoiVP: tongloi,
                DiemRenLuyen: hs.DiemRenLuyen,
                NamHoc: selectedNamHoc,
                HocKy: selectedHocKy,
            };
            resultArray.push(data);
        },

        // Tạo đối tượng mới với dữ liệu đã lọc
    );
    // Thêm vào mảng kết quả

    return (
        <div className={cx('wrapperr')}>
            <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>ĐIỂM RÈN LUYỆN HỌC SINH</h2>
                    <div className={cx('option')}>
                        <div>
                            <SelectLabels
                                title="Học kỳ"
                                select={hocky}
                                onChange={handleHocKyChange}
                                label="Chọn học kỳ mong muốn"
                                Current={currentHocKy[0]?._id}
                                other="HocKy"
                            />
                            <SelectLabels
                                title="Năm học"
                                select={namhoc}
                                onChange={handleNamHocChange}
                                label="Chọn năm học mong muốn"
                                Current={currentNamHoc[0]?._id}
                                other="NamHoc"
                            />
                        </div>

                        <div className={cx('button-create')}>
                            <Button type="text" className={cx('mb')} primary to={config.routes.home}>
                                Quay lại
                            </Button>
                        </div>
                    </div>

                    <DataGridDemo columns={columns} rows={resultArray} data={[]} check={true} />
                </div>
            </div>
        </div>
    );
}

export default DRLHS;
