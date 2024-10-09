import classNames from 'classnames/bind';
import styles from './DSCHP.module.scss';
import { CloseIcon } from '~/components/Icons/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getLichHoc, getNamHoc, getHocKy } from '~/redux/apiAdmin/apiAdmin';
import { TMHSLH } from '~/redux/apiAdmin/apiAdmin';
import { useEffect, useState } from 'react';
import DataGridDemo from '~/components/Table';
import { CheckCircle } from '@mui/icons-material';
const cx = classNames.bind(styles);
function DSCHP({ studentId, onCancel, monHoc }) {
    const columns = [
        {
            field: 'MaHocPhan',
            headerName: 'Mã HP',
            width: 130,
        },
        {
            field: 'NhomHocPhan',
            headerName: 'Nhóm HP',
            width: 100,
        },
        {
            field: 'TenMonHoc',
            headerName: 'Tên môn học',
            width: 547,
        },
        {
            field: 'SoTinChi',
            headerName: 'Số TC',
            width: 80,
        },
        {
            field: 'Thu',
            headerName: 'Thứ',
            width: 80,
        },
        {
            field: 'Tiet',
            headerName: 'Tiết',
            width: 60,
        },
        {
            field: 'PhongHoc',
            headerName: 'Phòng học',
            width: 90,
        },
        {
            field: 'DangKy',
            headerName: 'Thêm mới HP',
            width: 125,
            renderCell: (params) => (
                <div
                    style={{
                        display: 'flex',
                        cursor: 'pointer',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                    onClick={() => handleTMHPClick(params.row)}
                >
                    <CheckCircle style={{ color: 'green' }} />
                </div>
            ),
        },
    ];
    const dispatch = useDispatch();

    const lichhoc = useSelector((state) => state.lichhoc?.lichhoc?.lichhoc);
    const namhoc = useSelector((state) => state.namhoc?.namhoc?.namhoc);
    const hocky = useSelector((state) => state.hocky?.hocky?.hocky);
    const monhoc = useSelector((state) => state.monhoc?.monhoc?.monhoc);
    const monhoclh = lichhoc.filter((item) => item.MonHoc === monHoc);

    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        getLichHoc(dispatch);
        getNamHoc(dispatch);
        getHocKy(dispatch);
    }, [dispatch]);

    //========================================================================================
    //Kiểm tra học kỳ hiện tại
    const currentHocKy = [];
    let foundMatch = false;
    // Lặp qua mảng hocky từ cuối đến đầu
    for (let i = hocky.length - 1; i >= 0 && !foundMatch; i--) {
        const HocKy = hocky[i];
        // Kiểm tra xem id có nằm trong hocsinhmonhoc không
        const isMatched = lichhoc.some((lich) => lich.HocKy === HocKy._id);
        if (isMatched) {
            currentHocKy.push(HocKy);
            foundMatch = true;
            break;
        }
    }
    //Kiểm tra học kỳ hiện tại
    const currentNamHoc = [];
    let foundMatch1 = false;
    // Lặp qua mảng hocky từ trên xuống dưới
    for (let i = 0; i < namhoc.length && !foundMatch1; i++) {
        const NamHoc = namhoc[i];
        // Kiểm tra xem id có nằm trong hocsinhmonhoc không
        const isMatched = lichhoc.some((lich) => lich.NamHoc === NamHoc._id);
        if (isMatched) {
            currentNamHoc.push(NamHoc);
            foundMatch1 = true;
            break;
        }
    }

    const resultArray = [];

    monhoclh.forEach((tkb, index) => {
        if (currentNamHoc[0]._id === tkb.NamHoc && currentHocKy[0]._id === tkb.HocKy) {
            const mh = monhoc.find((item) => item._id === tkb.MonHoc);
            const data = {
                id: index + 1,
                _id: tkb._id,
                MaHocPhan: mh.MaMonHoc,
                NhomHocPhan: tkb.NhomHP,
                TenMonHoc: mh.TenMonHoc,
                SoTinChi: mh.SoTC,
                Thu: tkb.Thu,
                Tiet: tkb.Tiet,
                PhongHoc: tkb.PhongHoc,
            };
            resultArray.push(data);
        }
    });

    //=========================================================================================

    //-------------------------------------------------------------------------
    const handleCancel = () => {
        setIsHidden(true);
        onCancel(); // Invoke the onCancel callback from props
    };

    if (isHidden) {
        return null;
    }

    //======================================================
    const handleTMHPClick = (row) => {
        setIsHidden(true);
        const newHSLH = {
            HocSinh: studentId,
            LichHoc: row._id,
        };
        TMHSLH(newHSLH, dispatch);
    };

    //========================================================

    return (
        <div className={cx('wrapperrr')}>
            <div className={cx('innerrr')}>
                <div className={cx('bgr-content')}>
                    <div className={cx('header')} onClick={handleCancel}>
                        <CloseIcon className={cx('close-icon')} />
                    </div>
                    <h2 className={cx('title')}>Danh sách học phần</h2>

                    {/* //====================================================================== */}
                    <div className={cx('table-dshp')}>
                        <DataGridDemo columns={columns} rows={resultArray} data={[]} check={true} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DSCHP;
