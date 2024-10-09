import classNames from 'classnames/bind';
import styles from './LoiViPham.module.scss';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import DataGridDemo from '~/components/Table';
import moment from 'moment';
import Button from '~/components/Button';
import NhapLoiViPham from '../NhapLoiViPham';
const cx = classNames.bind(styles);
function LoiViPham() {
    const columns = [
        { field: 'id', headerName: 'STT', width: 60 },
        {
            field: 'MaHocSinh',
            headerName: 'Mã học sinh',
            width: 100,
        },
        {
            field: 'TenHocSinh',
            headerName: 'Tên học sinh',
            width: 200,
        },
        {
            field: 'TenLopHoc',
            headerName: 'Tên lớp học',
            width: 300,
        },
        {
            field: 'LoiViPham',
            headerName: 'Lỗi vi phạm',
            width: 423,
        },
        {
            field: 'NgayViPham',
            headerName: 'Ngày vi phạm',
            width: 200,
        },
    ];
    const location = useLocation();
    const id = location.state?.id;
    const namHoc = location.state?.namHoc;
    const hocKy = location.state?.hocKy;
    // const lophoc= location.state?.lophoc;
    const monhoc = location.state?.monhoc;
    const lopHoc = useSelector((state) => state.dslh?.dslh?.dslh) || '';
    const lichhoc = useSelector((state) => state.lichhoc.lichhoc.lichhoc);
    const lichhoctuongung = lichhoc.filter((state) => state._id === id)[0].MonHoc || '';
    const loivipham = useSelector((state) => state.loivipham.loivipham.loivipham);
    const loiviphamtuongung = loivipham.filter((state) => state.MonHoc === lichhoctuongung);
    const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien) || [];
    //Lấy ra danh sách học sinh
    const hocsinh = useSelector((state) => state.dshs?.dshs?.dshs) || [];
    const [onCancel, setOncancel] = useState(false);

    function handleUpdateDiemCancel() {
        setOncancel(false);
    }
    const handleClickCancel = () => {
        setOncancel(true);
    };

    const resultArray = [];
    loiviphamtuongung.forEach((lvp, index) => {
        const giaoVien = giaovien.find((state) => state._id === lvp.GiaoVien);
        if (lvp.GiaoVien === giaoVien._id && lvp.NamHoc === namHoc && lvp.HocKy === hocKy && monhoc === lvp.MonHoc) {
            const HocSinh = hocsinh.find((state) => state._id === lvp.HocSinh);
            const lh = lopHoc.filter((state) => state._id === HocSinh.LopHoc)[0] || '';
            const data = {
                id: index + 1,
                _id: lvp._id,
                MaHocSinh: HocSinh.MaHS,
                TenHocSinh: HocSinh.HoHS + ' ' + HocSinh.TenHS,
                TenLopHoc: lh.TenLopHoc,
                LoiViPham: lvp.TenLoi,
                NgayViPham: moment(lvp.NgayViPham).utc().format('DD/MM/YYYY'),
            };

            // Thêm vào mảng kết quả
            resultArray.push(data);
        }
    });
    // Tạo đối tượng mới với dữ liệu đã lọc

    return (
        <div className={cx('wrapperr')}>
            <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>Lỗi vi phạm của học sinh</h2>
                    <div className={cx('button-create')}>
                        <Button type="text" primary onClick={handleClickCancel}>
                            Thêm lỗi vi phạm
                        </Button>
                    </div>
                    <DataGridDemo columns={columns} rows={resultArray} data={[]} />

                    {onCancel ? (
                        <NhapLoiViPham
                            onCancel={handleUpdateDiemCancel}
                            LichHocId={id}
                            MonHocID={monhoc}
                            NamHocID={namHoc}
                            HocKyID={hocKy}
                        />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
}

export default LoiViPham;
