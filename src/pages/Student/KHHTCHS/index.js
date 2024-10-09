import classNames from 'classnames/bind';
import styles from './KHHTCHS.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getHSMH, getHocKy, getNamHoc } from '~/redux/apiAdmin/apiAdmin';
import { Link } from 'react-router-dom';
import config from '~/config';
import ThemMoiHocPhan from './ThemMoiHocPhan';
import Button from '~/components/Button';
import SelectLabels from '~/components/Select';
import DataGridDemo from '~/components/Table';

const cx = classNames.bind(styles);

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
        field: 'HocKy',
        headerName: 'Học kỳ',
        width: 130,
    },
    {
        field: 'NamHoc',
        headerName: 'Năm học',
        width: 130,
    },
];
function KHHTCHS() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.login?.currentUser?.HocSinh?._id);
    const monhoc = useSelector((state) => state.monhoc?.monhoc?.monhoc);
    const hsmh = useSelector((state) => state.hsmh?.hsmh?.hsmh);
    const hocsinhmonhoc = hsmh.filter((item) => item.HocSinh === user);
    const namhoc = useSelector((state) => state.namhoc?.namhoc?.namhoc);
    const hocky = useSelector((state) => state.hocky?.hocky?.hocky);

    //-----------------------------------------------------------------
    //---------------------------------------------------------------------------------
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
        }
    }

    //-----------------------------------------------------------------------------------

    const [selectedHocKy, setSelectedHocKy] = useState(currentHocKy[0]?._id || '');
    const [selectedNamHoc, setSelectedNamHoc] = useState(currentNamHoc[0]?._id || '');

    const handleHocKyChange = (value) => {
        setSelectedHocKy(value);
    };

    const handleNamHocChange = (value) => {
        setSelectedNamHoc(value);
    };

    //=============================================================================

    //-----------------------------------------------------------------
    //--------------------THÊM MỚI HỌC PHẦN -------------------------------------
    const [onCancel, setOncancel] = useState(false);

    function handleUpdateDiemCancel() {
        setOncancel(false);
    }
    const handleClickCancel = () => {
        setOncancel(true);
    };
    //--------------------THÊM MỚI HỌC PHẦN -------------------------------------
    const resultArray = [];
    hocsinhmonhoc.forEach((mh, index) => {
        if (mh.NamHoc === selectedNamHoc && mh.HocKy === selectedHocKy) {
            const mhoc = monhoc.find((item) => item._id === mh.MonHoc);
            const nh = namhoc.find((item) => item._id === mh.NamHoc);
            const hk = hocky.find((item) => item._id === mh.HocKy);
            const data = {
                id: index + 1,
                MaHocPhan: mhoc?.MaMonHoc,
                TenMonHoc: mhoc?.TenMonHoc,
                SoTinChi: mhoc?.SoTC,
                HocKy: hk.TenHocKy,
                NamHoc: nh.TenNamHoc,
            };
            resultArray.push(data);
        }
        // Tạo đối tượng mới với dữ liệu đã lọc

        // Thêm vào mảng kết quả
    });

    //=====================================================================================
    useEffect(() => {
        getNamHoc(dispatch);
        getHocKy(dispatch);
        getHSMH(dispatch);
    }, [dispatch]);

    return (
        <div>
            <div className={cx('header-kv')}>
                <div className={cx('innerrr')}>
                    <div className={cx('qlkv')}>
                        <Link to={config.routes.ctdths}>Chương trình đào tạo</Link>
                    </div>
                    <div className={cx('qln')}>
                        <Link to={config.routes.khhtchs}>Kế hoạch học tập học sinh</Link>
                    </div>
                </div>
            </div>
            {/* //============================================== */}
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('bgr-content')}>
                        <h2 className={cx('title')}>Danh sách học phần</h2>

                        <div className={cx('option')}>
                            <div>
                                <SelectLabels
                                    title="Học kỳ"
                                    select={hocky}
                                    onChange={handleHocKyChange}
                                    label="Chọn học kỳ mong muốn"
                                    Current={currentHocKy[0]?._id || ''}
                                    other="HocKy"
                                />
                                <SelectLabels
                                    title="Năm học"
                                    select={namhoc}
                                    onChange={handleNamHocChange}
                                    label="Chọn năm học mong muốn"
                                    Current={currentNamHoc[0]?._id || ''}
                                    other="NamHoc"
                                />
                            </div>

                            <div className={cx('come-back')}>
                                <Button type="test" primary onClick={handleClickCancel}>
                                    Thêm mới học phần
                                </Button>
                                :
                                <Button type="test" primary to={config.routes.home}>
                                    Quay lại
                                </Button>
                            </div>
                        </div>
                        <DataGridDemo columns={columns} rows={resultArray} data={[]} check={true} />
                        {onCancel ? (
                            <ThemMoiHocPhan
                                studentId={user}
                                NamHocID={selectedNamHoc}
                                HocKyID={selectedHocKy}
                                onCancel={handleUpdateDiemCancel}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KHHTCHS;
