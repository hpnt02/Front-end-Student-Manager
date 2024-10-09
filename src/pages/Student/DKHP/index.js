import { useDispatch, useSelector } from 'react-redux';
import { getHSMH, getHocKy, getLichHoc, getNamHoc } from '~/redux/apiAdmin/apiAdmin';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DKHP.module.scss';
import DSCHP from './DSCHP';
import { deleteHSLH } from '~/redux/apiAdmin/apiAdmin';
import { CheckCircle, CloseOutlined } from '@mui/icons-material';
import DataGridDemo from '~/components/Table';
const cx = classNames.bind(styles);
function DKHP() {
    const columns = [
        {
            field: 'MaHocPhan',
            headerName: 'Mã HP',
            width: 130,
        },
        {
            field: 'TenMonHoc',
            headerName: 'Tên môn học',
            width: 600,
        },
        {
            field: 'SoTinChi',
            headerName: 'Số TC',
            width: 151,
        },
        {
            field: 'DangKy',
            headerName: 'Thêm mới học phần',
            width: 200,
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
                    {params.row.HSLH === undefined ? <CheckCircle style={{ color: 'green' }} /> : ''}
                </div>
            ),
        },
        {
            field: 'XoaHocPhan',
            headerName: 'Hủy học phần',
            width: 200,
            renderCell: (params) => (
                <div
                    style={{
                        display: 'flex',
                        cursor: 'pointer',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}
                    onClick={() => handleHHPClick(params.row)}
                >
                    {params.row.HSLH !== undefined ? <CloseOutlined style={{ color: 'red' }} /> : ''}
                </div>
            ),
        },
    ];

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser?.HocSinh?._id);
    const hsmh = useSelector((state) => state.hsmh?.hsmh?.hsmh);
    const hocsinhmonhoc = hsmh.filter((item) => item.HocSinh === user);
    const namhoc = useSelector((state) => state.namhoc?.namhoc?.namhoc);
    const hocky = useSelector((state) => state.hocky?.hocky?.hocky);
    const monhoc = useSelector((state) => state.monhoc?.monhoc?.monhoc);
    const lichhoc = useSelector((state) => state.lichhoc?.lichhoc?.lichhoc);
    const matchingObjects = hocsinhmonhoc.filter((objA) => lichhoc.some((objB) => objA.MonHoc === objB.MonHoc));
    const hslh = useSelector((state) => state.hslh?.hstlh?.hstlh);
    const a = matchingObjects.map((item) => {
        const b = lichhoc.filter((state) => item.MonHoc === state.MonHoc);
        return b;
    });
    const flattenedArray = a.flat();

    const hocsinhlh = hslh.map((item) => {
        const c = flattenedArray.filter((state) => state._id === item.LichHoc);
        return c;
    });

    const hocsinhlichhoc = hocsinhlh.flat();
    //=======================================================================================
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [MonHoc, setMonHoc] = useState(null);

    const handleTMHPClick = (row) => {
        setSelectedStudentId(row.HocSinh);
        setMonHoc(row.MonHoc);
        setOncancel(true);
    };

    const handleHHPClick = (row) => {
        deleteHSLH(user?.accessToken, dispatch, row._id);
    };

    const [onCancel, setOncancel] = useState(false);

    function handleUpdateDiemCancel() {
        setOncancel(false);
    }

    //Kiểm tra học kỳ hiện tại
    const currentHocKy = [];
    let foundMatch = false;
    // Lặp qua mảng hocky từ cuối đến đầu
    for (let i = hocky.length - 1; i >= 0 && !foundMatch; i--) {
        const HocKy = hocky[i];
        // Kiểm tra xem id có nằm trong hocsinhmonhoc không
        const isMatched = hocsinhmonhoc.some((lich) => lich.HocKy === HocKy._id);
        if (isMatched) {
            currentHocKy.push(HocKy);
            foundMatch = true;
            break;
        }
    }
    //------------------------------------------------------------------------------

    //Kiểm tra học kỳ hiện tại
    const currentNamHoc = [];
    let foundMatch1 = false;
    // Lặp qua mảng hocky từ trên xuống dưới
    for (let i = 0; i < namhoc.length && !foundMatch1; i++) {
        const NamHoc = namhoc[i];
        // Kiểm tra xem id có nằm trong hocsinhmonhoc không
        const isMatched = hocsinhmonhoc.some((lich) => lich.NamHoc === NamHoc._id);
        if (isMatched) {
            currentNamHoc.push(NamHoc);
            foundMatch1 = true;
            break;
        }
    }

    const resultArray = [];

    hocsinhmonhoc.forEach((hsmh, index) => {
        if (hsmh.NamHoc === currentNamHoc[0]._id && hsmh.HocKy === currentHocKy[0]._id) {
            const mh = monhoc.find((item) => item._id === hsmh.MonHoc);
            const a = hocsinhlichhoc.find((item) => item.MonHoc === hsmh.MonHoc);
            const b = lichhoc.filter((item) => item.MonHoc === hsmh.MonHoc);
            const matchedItems = hslh.find((bItem) => b.some((hslhItem) => hslhItem._id === bItem.LichHoc));
            const data = {
                id: index + 1,
                _id: matchedItems?._id,
                HocSinh: hsmh.HocSinh,
                MonHoc: mh._id,
                HSLH: a,
                MaHocPhan: mh?.MaMonHoc,
                TenMonHoc: mh?.TenMonHoc,
                SoTinChi: mh?.SoTC,
            };
            resultArray.push(data);
        }
        // Tạo đối tượng mới với dữ liệu đã lọc

        // Thêm vào mảng kết quả
    });

    useEffect(() => {
        getLichHoc(dispatch);
        getNamHoc(dispatch);
        getHocKy(dispatch);
        getHSMH(dispatch);
    }, [dispatch]);

    return (
        <div className={cx('wrapperr')}>
            <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>Đăng ký học phần</h2>
                    <DataGridDemo columns={columns} rows={resultArray} data={[]} check={true} />
                    {onCancel ? (
                        <DSCHP studentId={selectedStudentId} monHoc={MonHoc} onCancel={handleUpdateDiemCancel} />
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    );
}

export default DKHP;
