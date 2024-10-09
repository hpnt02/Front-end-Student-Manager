import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { useRef, useEffect } from 'react';
import styles from './DSHSTM.module.scss';
import { useDispatch } from 'react-redux';
// import { EditIcon, TrashIcon } from '~/components/Icons/icons';
import { DSHS, DSLH, getDiem, getHSTLH, getLoaiDiem, getMonHoc, TMDMANY } from '~/redux/apiAdmin/apiAdmin';
import { useState } from 'react';
import Button from '~/components/Button';
import TableBangDiemTheoMon from '~/components/TableBangDiemTheomon';
import UpdateDiem from './UpdateDiem';
import * as XLSX from 'xlsx';
import config from '~/config';
import { BangDiemTheoMon } from '../../In/BangDiemTheoMon';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { read, utils } from 'xlsx';

const cx = classNames.bind(styles);

function DSHSTM() {
    const location = useLocation();
    const id = location.state?.id;
    const namHoc = location.state?.namHoc;
    const hocKy = location.state?.hocKy;

    const dispatch = useDispatch();
    const lh = useSelector((state) => {
        const b = state.lichhoc?.lichhoc?.lichhoc?.find((x) => x._id === id);
        return b;
    });
    const user = useSelector((state) => state.auth.login?.currentUser?.ChucVu?.MaChucVu) || '';

    const monhoc = useSelector((state) => state.monhoc?.monhoc?.monhoc) || [];
    const MonHoc = monhoc?.filter((item) => item._id === lh.MonHoc)[0] || '';
    const lophoc = useSelector((state) => state.dslh.dslh?.dslh);
    const lop = lophoc?.filter((item) => item._id === lh.LopHoc)[0] || '';
    const hs = useSelector((state) => state.hslh?.hstlh?.hstlh);
    const hocsinh = useSelector((state) => state.dshs?.dshs?.dshs);
    const diem = useSelector((state) => state.diem?.diemtheomon?.diemtheomon);
    const loaidiem = useSelector((state) => state.loaidiem?.loaidiem?.loaidiem);
    const newDiem = diem.filter(
        (state) => state.MonHoc === MonHoc._id && state.NamHoc === namHoc && state.HocKy === hocKy,
    );
    const namhoc = useSelector((state) => state.namhoc?.namhoc?.namhoc) || '';
    const hocky = useSelector((state) => state.hocky?.hocky?.hocky) || '';
    const namhoctuongung = namhoc.filter((state) => state._id === namHoc)[0] || '';
    const hockytuongung = hocky.filter((state) => state._id === hocKy)[0] || '';
    const hslh = hs.filter((items) => {
        return items.LichHoc === lh._id;
    });
    const [selectedHocSinh, setSelectedHocSinh] = useState('');
    const [selectedNamHoc, setSelectedNamHoc] = useState('');
    const [selectedHocKy, setSelectedHocKy] = useState('');
    const [onCancel, setOncancel] = useState(false);

    const handleIDHocSinhChange = (IDHocSinh, NamHoc, HocKy) => {
        setSelectedHocSinh(IDHocSinh);
        setSelectedNamHoc(NamHoc);
        setSelectedHocKy(HocKy);
        setOncancel(true);
    };

    function handleUpdateDiemCancel() {
        setOncancel(false);
    }
    useEffect(() => {
        DSLH(dispatch);
        getMonHoc(dispatch);
        getDiem(dispatch);
        DSHS(dispatch);
        getLoaiDiem(dispatch);
        getHSTLH(dispatch);
    }, [dispatch]);

    const handleExport = () => {
        // Tạo dữ liệu cho tiêu đề và tiêu đề cột
        const title = `Bảng điểm môn ${MonHoc.TenMonHoc} - ${lop.TenLopHoc} `; // Tiêu đề gộp
        const titleRow = [[title, '', '']];
        const title2 = [
            [
                'STT',
                'Mã học sinh',
                'Họ và tên học sinh',
                'Điểm hệ số 1',
                '',
                '',
                '',
                'Điểm hệ số 2',
                '',
                '',
                '',
                'Điểm TBKT',
                'Điểm CK',
                'Điểm TB',
                'Ghi chú',
            ],
        ];
        const headers = [
            [
                '',
                '',
                '',
                'Điểm L1',
                'Điểm L2',
                'Điểm L3',
                'Điểm QT',
                'Điểm L1',
                'Điểm L2',
                'Điểm L3',
                'Điểm QT',
                '',
                '',
                '',
                '',
            ],
        ];
        const rows = resultArray.map((item) => [
            item.id,
            item.MaHocSinh,
            item.TenHocSinh,
            item.DHS1L1 ? item.DHS1L1 : '',
            item.DHS1L2 ? item.DHS1L2 : '',
            item.DHS1L3 ? item.DHS1L3 : '',
            isNaN(item.DQTHS1) ? '' : item.DQTHS1,
            item.DHS2L1 ? item.DHS2L1 : '',
            item.DHS2L2 ? item.DHS2L2 : '',
            item.DHS2L3 ? item.DHS2L3 : '',
            isNaN(item.DQTHS2) ? '' : item.DQTHS2,
            isNaN(item.DTBQT) ? '' : item.DTBQT,
            item.CK ? item.CK : '',
            isNaN(item.DTB) ? '' : item.DTB,
            item.GhiChu ? item.GhiChu : '',
        ]);

        // Kết hợp tiêu đề, tiêu đề cột và dữ liệu
        const worksheetData = [titleRow, ...title2, ...headers, ...rows];

        // Tạo worksheet từ dữ liệu
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // Thêm thông tin gộp ô
        worksheet['!merges'] = [
            { s: { r: 0, c: 0 }, e: { r: 0, c: 14 } }, // Gộp ô từ (1,1) đến (1,13)
            { s: { r: 1, c: 3 }, e: { r: 1, c: 6 } },
            { s: { r: 1, c: 7 }, e: { r: 1, c: 10 } },
            { s: { r: 1, c: 0 }, e: { r: 2, c: 0 } },
            { s: { r: 1, c: 1 }, e: { r: 2, c: 1 } },
            { s: { r: 1, c: 2 }, e: { r: 2, c: 2 } },
            { s: { r: 1, c: 11 }, e: { r: 2, c: 11 } },
            { s: { r: 1, c: 12 }, e: { r: 2, c: 12 } },
            { s: { r: 1, c: 13 }, e: { r: 2, c: 13 } },
            { s: { r: 1, c: 14 }, e: { r: 2, c: 14 } },
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
        XLSX.writeFile(workbook, `DanhSachHocSinh - ${MonHoc.TenMonHoc} - ${lop.MaLopHoc}.xlsx`);
    };

    //----------------------------------------------------------------------------------------------

    const resultArray = [];
    hslh.forEach((hslh, index) => {
        const hocSinh = hocsinh.find((hs) => hs._id === hslh.HocSinh);
        const diemHS = newDiem.filter((diem) => diem.HocSinh === hslh.HocSinh);

        // //------------------------------------Lấy ra điểm hệ số 1------------------------------------------
        const maLoaiDiemHeSo1 = loaidiem?.find((item) => item.MaLoaiDiem === 'HS1')._id || '';

        const diemHeSo1 = diemHS?.filter((item) => item.LoaiDiem === maLoaiDiemHeSo1);

        var diemArr = [];
        // Lặp qua các object và lấy giá trị diem
        for (var i = 0; i < diemHeSo1.length; i++) {
            var diem = diemHeSo1[i].Diem;
            diemArr.push(diem);
        }
        const diemmoi = diemArr?.filter((item) => item !== '').map((item) => parseFloat(item));
        const DiemTrungBinhHeSo1 = (diemmoi.reduce((diem, total) => diem + total, 0) / diemmoi.length).toFixed(2);

        // //------------------------------------Lấy ra điểm hệ số 1------------------------------------------

        // //------------------------------------Lấy ra điểm hệ số 2------------------------------------------
        const maLoaiDiemHeSo2 = loaidiem?.find((item) => item.MaLoaiDiem === 'HS2')._id;
        const diemHeSo2 = diemHS.filter((item) => item.LoaiDiem === maLoaiDiemHeSo2);

        var diemArr2 = [];
        // Lặp qua các object và lấy giá trị diem
        for (var u = 0; u < diemHeSo2.length; u++) {
            var diem2 = diemHeSo2[u].Diem;
            diemArr2.push(diem2);
        }

        const diemmoi2 = diemArr2.filter((item) => item !== '').map((item) => parseFloat(item));

        const DiemTrungBinhHeSo2 = (diemmoi2.reduce((diem, total) => diem + total, 0) / diemmoi2.length).toFixed(2);
        //------------------------------------Lấy ra điểm hệ số 2------------------------------------------

        //-------------------------------------Tính điểm quá trinh -------------------------------------------

        const diemTrungBinhHeSo1 = parseFloat(DiemTrungBinhHeSo1); // Chuyển đổi giá trị thành số dấu phẩy động
        const diemTrungBinhHeSo2 = parseFloat(DiemTrungBinhHeSo2); // Chuyển đổi giá trị thành số dấu phẩy động

        const DiemQT = ((diemTrungBinhHeSo1 + diemTrungBinhHeSo2 * 2) / 3).toFixed(2);

        //-------------------------------------Tính điểm quá trinh -------------------------------------------
        //----------------------------------------Lấy điểm cuối kỳ--------------------------------------------
        const maDiemCuoiKy = loaidiem?.find((item) => item.MaLoaiDiem === 'DCK')._id;
        const diemCK = diemHS.filter((item) => item.LoaiDiem === maDiemCuoiKy);

        var diemArr3 = [];
        // Lặp qua các object và lấy giá trị diem
        for (let i = 0; i < diemCK.length; i++) {
            let diem2 = diemCK[i].Diem;
            diemArr3.push(diem2);
        }

        const DiemCK = diemArr3.filter((item) => item !== '').map((item) => parseInt(item));
        const diemck = parseFloat(DiemCK); // Chuyển đổi giá trị thành số dấu phẩy động

        //------------------------------------Lấy điểm cuối kỳ----------------------------------------------
        //------------------------------------Tính điểm tổng kết-----------------------------------------------
        const DiemTongKet = (DiemQT * 0.4 + diemck * 0.6).toFixed(2);
        //------------------------------------Tính điểm tổng kết-----------------------------------------------

        const data = {
            id: index + 1,
            idHocSinh: hocSinh._id,
            NamHoc: namHoc,
            HocKy: hocKy,
            MaHocSinh: hocSinh.MaHS,
            TenHocSinh: hocSinh.HoHS + ' ' + hocSinh.TenHS,
            DHS1L1: diemmoi.lenght !== 1 ? diemmoi[0] : '',
            DHS1L2: diemmoi.lenght !== 1 ? diemmoi[1] : '',
            DHS1L3: isNaN(diemmoi[2]) ? '' : diemmoi[2],
            DQTHS1: DiemTrungBinhHeSo1,
            DHS2L1: diemmoi2.lenght !== 1 ? diemmoi2[0] : '',
            DHS2L2: diemmoi2.lenght !== 1 ? diemmoi2[1] : '',
            DHS2L3: diemmoi2.lenght !== 1 ? diemmoi2[2] : '',
            DQTHS2: DiemTrungBinhHeSo2,
            DTBQT: DiemQT,
            DCK: diemck,
            DTB: DiemTongKet,
            GhiChu: DiemTongKet > 5 ? '*' : '',
        };

        // Thêm vào mảng kết quả
        resultArray.push(data);
    });

    //----------------------------------------------------------------------

    const infor = [];

    const dataInfor = {
        MonHoc: MonHoc.MaMonHoc,
        TenMonHoc: MonHoc.TenMonHoc,
        NhomHP: lh.NhomHP,
        LopHoc: lop.TenLopHoc,
        NamHoc: namhoctuongung.TenNamHoc,
        HocKy: hockytuongung.TenHocKy,
    };
    infor.push(dataInfor);

    //========================import file excel=======================================================================
    const [excelRows, setExcelRows] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const readUploadFile = (e) => {
        e.preventDefault();
        if (e.target.files) {
            const file = e.target.files[0];
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = utils.sheet_to_json(worksheet);

                // Lấy các hàng từ hàng thứ 3 (index 2) trở đi
                const rowsFromThird = json.slice(2);
                setExcelRows(rowsFromThird);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setExcelRows([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = null;
        }
    };
    //================================================================================================================

    const handleCreate = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line array-callback-return
        excelRows.map((item) => {
            const IDHocSinh = hocsinh.find((state) => state.MaHS === item.__EMPTY);
            const diemheso1 = [item.__EMPTY_2, item.__EMPTY_3, item.__EMPTY_4];
            const diemheso2 = [item.__EMPTY_6, item.__EMPTY_7, item.__EMPTY_8];
            const diemheso1Current = diemheso1.filter((score) => score !== '' && score != null);
            const diemheso2Current = diemheso2.filter((score) => score !== '' && score != null);

            // Khởi tạo một mảng để chứa điểm
            const newDiem = [];
            // Kiểm tra __EMPTY1 và __EMPTY2 để xác định loại điểm
            diemheso1Current.forEach((key) => {
                newDiem.push({
                    HocSinh: IDHocSinh ? IDHocSinh._id : null,
                    MonHoc: MonHoc._id,
                    Diem: key,
                    LoaiDiem: loaidiem.find((ld) => ld.MaLoaiDiem === 'HS1')?._id || null,
                    NamHoc: namhoctuongung._id,
                    HocKy: hockytuongung._id,
                });
            });
            diemheso2Current.forEach((key) => {
                newDiem.push({
                    HocSinh: IDHocSinh ? IDHocSinh._id : null,
                    MonHoc: MonHoc._id,
                    Diem: key ? key : '',
                    LoaiDiem: loaidiem.find((ld) => ld.MaLoaiDiem === 'HS2')?._id || null,
                    NamHoc: namhoctuongung._id,
                    HocKy: hockytuongung._id,
                });
            });

            if (item.__EMPTY_11) {
                newDiem.push({
                    HocSinh: IDHocSinh ? IDHocSinh._id : null,
                    MonHoc: MonHoc._id,
                    Diem: item.__EMPTY_11,
                    LoaiDiem: loaidiem.find((ld) => ld.MaLoaiDiem === 'DCK')?._id || null,
                    NamHoc: namhoctuongung._id,
                    HocKy: hockytuongung._id,
                });
            }

            newDiem.forEach((state) => {
                TMDMANY(state, dispatch);
            });
        });
    };

    return (
        <div className={cx('wrapperr')}>
            <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>DANH SÁCH LỚP THEO MÔN HỌC</h2>
                    <div className={cx('infor-student')}>
                        <div>
                            <p>
                                <strong>Mã môn học:</strong> {MonHoc ? MonHoc.MaMonHoc : ''}
                            </p>
                            <p>
                                <strong>Nhóm học phần:</strong> {lh ? lh.NhomHP : ''}
                            </p>
                            <p>
                                <strong>Học kỳ:</strong> {hockytuongung ? hockytuongung.TenHocKy : ''}
                            </p>
                        </div>
                        <div>
                            <p>
                                <strong>Tên lớp học:</strong> {MonHoc ? MonHoc.TenMonHoc : ''}
                            </p>
                            <p>
                                <strong>Lớp:</strong> {lop ? lop.TenLopHoc : ''}
                            </p>
                            <p>
                                <strong>Năm học:</strong> {namhoctuongung ? namhoctuongung.TenNamHoc : ''}
                            </p>
                        </div>
                        <div></div>
                    </div>
                    <div></div>
                    <div className={cx('export-data')}>
                        <div>
                            <label htmlFor="import-file" className={cx('import-excel')}>
                                Chọn file
                            </label>
                            <input
                                id="import-file"
                                ref={fileInputRef}
                                hidden
                                name="file"
                                type="file"
                                onChange={readUploadFile}
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            />

                            <span className={cx('selectedFileName')}>{selectedFile ? selectedFile.name : ''}</span>

                            {selectedFile?.name && (
                                <Button Import onClick={handleCreate}>
                                    Import File
                                </Button>
                            )}

                            {selectedFile?.name && (
                                <Button Remove onClick={removeFile}>
                                    Remove file
                                </Button>
                            )}
                        </div>
                        <div>
                            <PDFDownloadLink
                                document={<BangDiemTheoMon hs={resultArray} infor={infor} />}
                                fileName="BangDiemHocSinh"
                            >
                                <Button primary>Print PDF</Button>
                            </PDFDownloadLink>
                            {/* <BangDiemTheoMon hs={resultArray} infor={infor}/> */}
                            <Button primary onClick={handleExport} className={cx('export-excel')}>
                                Xuất Excel
                            </Button>
                            {user === '1' ? (
                                <Button primary to={config.routesAdmin.qlkhht}>
                                    Quay lại
                                </Button>
                            ) : (
                                <Button primary to={config.routesAdmin.dslgd}>
                                    Quay lại
                                </Button>
                            )}
                        </div>
                    </div>
                    <TableBangDiemTheoMon row={resultArray} onClick={handleIDHocSinhChange} />
                    {onCancel ? (
                        <UpdateDiem
                            MonHocID={MonHoc._id}
                            studentId={selectedHocSinh}
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
    );
}

export default DSHSTM;
