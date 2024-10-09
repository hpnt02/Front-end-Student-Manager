import classNames from 'classnames/bind';
import styles from './CTLVP.module.scss';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    DSHS,
    getKhoa,
    getLoiViPham,
    getMonHoc,
    getNGANH,
    GiaoVien,
    getHocKy,
    getNamHoc,
} from '~/redux/apiAdmin/apiAdmin';
import moment from 'moment';
import DataGridDemo from '~/components/Table';
import Button from '~/components/Button';
import DeleteLVP from '../DeleteLVP';
import config from '~/config';
const cx = classNames.bind(styles);

const columns = [
    { field: 'id', headerName: 'STT', width: 50 },
    {
        field: 'LoiVP',
        headerName: 'Lỗi vi phạm',
        width: 400,
    },
    {
        field: 'NgayViPham',
        headerName: 'Ngày vi phạm',
        width: 150,
    },
    {
        field: 'MonHoc',
        headerName: 'Môn học',
        width: 394,
    },
    {
        field: 'GiaoVien',
        headerName: 'Giáo viên',
        width: 290,
    },
];

function CTLVP() {
    const location = useLocation();
    const id = location.state?.id;
    const id1 = location.state?.id1;
    const id2 = location.state?.id2;

    const dispatch = useDispatch();
    const user = useSelector((state) => state?.auth?.login?.currentUser?.ChucVu?.MaChucVu) || '';

    const loihs = useSelector((state) => state.loivipham?.loivipham?.loivipham) || '';
    const monhoc = useSelector((state) => state.monhoc?.monhoc?.monhoc) || '';
    const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien) || [];
    const hocsinh = useSelector((state) => state.dshs?.dshs?.dshs);
    const lophoc = useSelector((state) => state.dslh?.dslh?.dslh) || '';
    const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh);
    const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa) || '';
    const namhoc = useSelector((state) => state.namhoc?.namhoc?.namhoc);
    const hocky = useSelector((state) => state.hocky?.hocky?.hocky);

    const loituongung = loihs.filter((loi) => {
        return loi.HocSinh === id && loi.NamHoc === id1 && loi.HocKy === id2;
    });

    const hocsinhtuongung = hocsinh?.filter((item) => item._id === id)[0] || '';
    const lophoctuongung = lophoc?.filter((item) => item._id === hocsinhtuongung.LopHoc)[0] || '';
    const nganhtuongung = Allnganh?.filter((item) => item._id === lophoctuongung.Nganh)[0] || '';
    const khoatuongung = Allkhoa?.filter((item) => item._id === nganhtuongung.Khoa)[0] || '';
    const namtuongung = namhoc?.filter((item) => item._id === id1)[0] || '';
    const hockytuongung = hocky?.filter((item) => item._id === id2)[0] || '';

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

    const resultArray = [];
    loituongung.forEach((loi, index) => {
        const mh = monhoc.find((item) => item._id === loi.MonHoc);
        const gv = giaovien.find((item) => item._id === loi.GiaoVien);
        // Tạo đối tượng mới với dữ liệu đã lọc
        const data = {
            id: index + 1,
            _id: loi._id,
            LoiVP: loi.TenLoi,
            NgayViPham: moment(loi.NgayViPham).utc().format('DD/MM/YYYY'),
            MonHoc: mh?.TenMonHoc,
            GiaoVien: gv.HoGV + ' ' + gv.TenGV,
        };
        resultArray.push(data);
    });

    useEffect(() => {
        getNamHoc(dispatch);
        getHocKy(dispatch);
        getKhoa(dispatch);
        getNGANH(dispatch);
        DSHS(dispatch);
        GiaoVien(dispatch);
        getMonHoc(dispatch);
        getLoiViPham(dispatch);
    }, [dispatch]);
    return (
        <div className={cx('wrapperr')}>
            <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>CHI TIẾT LỖI VI PHẠM</h2>
                    <div className={cx('infor-student')}>
                        <div>
                            <p>
                                <strong>Mã học sinh:</strong> {hocsinhtuongung ? hocsinhtuongung.MaHS : ''}
                            </p>
                            <p>
                                <strong>Tên học sinh:</strong> {hocsinhtuongung ? hocsinhtuongung.HoHS : ''}{' '}
                                {hocsinhtuongung ? hocsinhtuongung.TenHS : ''}
                            </p>
                            <p>
                                <strong>Tên lớp:</strong> {lophoctuongung ? lophoctuongung.TenLopHoc : ''}
                            </p>
                        </div>
                        <div>
                            <p>
                                <strong>Ngành:</strong> {nganhtuongung ? nganhtuongung.TenNganh : ''}
                            </p>
                            <p>
                                <strong>Khoa:</strong> {khoatuongung ? khoatuongung.TenKhoa : ''}
                            </p>
                            <p>
                                <strong>Học kỳ:</strong> {hockytuongung ? hockytuongung.TenHocKy : ''}
                            </p>
                            <p>
                                <strong>Năm học:</strong> {namtuongung ? namtuongung.TenNamHoc : ''}
                            </p>
                        </div>
                    </div>
                    <div className={cx('button-chucnang')}>
                        {user !== '3' ? (
                            <>
                                <Button
                                    type="text"
                                    disabled={selectedIDs.length === 0}
                                    primary
                                    onClick={handleClickCancel}
                                >
                                    Xóa lỗi vi phạm
                                </Button>
                                <Button primary to={config.routesAdmin.diemrenluyen}>
                                    Quay lại
                                </Button>
                            </>
                        ) : (
                            <Button primary to={config.routes.drl}>
                                Quay lại
                            </Button>
                        )}
                    </div>
                    {onCancel ? <DeleteLVP onCancel={handleUpdateDiemCancel} LoiViPhamId={selectedIDs} /> : ''}
                    <DataGridDemo
                        columns={columns}
                        rows={resultArray}
                        data={[]}
                        onClick={handleIDChange}
                        check={user === '3' ? true : false}
                    />
                </div>
            </div>
        </div>
    );
}

export default CTLVP;
