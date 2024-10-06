

import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch} from 'react-redux';
import moment from "moment";
import classNames from 'classnames/bind';
import styles from './LichGiangDayGV.module.scss';
import {  useLocation } from "react-router-dom";
import { useEffect} from 'react';
import SelectLabels from "~/components/Select";
import { getLichHoc, getMonHoc, DSLH,getNamHoc,getHocKy, GiaoVien} from '~/redux/apiAdmin/apiAdmin';
import DataGridDemo from "~/components/Test";

const cx = classNames.bind(styles);


const columns = [
  {
    field: 'id',
    headerName: 'STT',
    width: 50,
  },
  {
    field: 'MaHocPhan',
    headerName: 'Mã HP',
    width: 100,
  },
  {
    field: 'NhomHP',
    headerName: 'Nhóm học phần',
    width: 130,
  },
  {
    field: 'TenMonHoc',
    headerName: 'Tên môn học',
    width: 300,
  },
  {
   field: 'LopHocPhan',
   headerName: 'Lớp',
   width: 90, 
 },
  {
    field: 'SoTinChi',
    headerName: 'Số TC',
    width: 80, 
  }, 
  {
    field: 'Thu',
    headerName: 'Thứ',
    width: 50,
  },
  {
    field: 'Tiet',
    headerName: 'Tiết',
    width: 100,
  },
  {
    field: 'GVGD',
    headerName: 'Giáo viên giảng dạy',
    width: 213,
  },
  {
    field: 'PhongHoc',
    headerName: 'Phòng học',
    width: 90,
  },
  {
    field: 'NgayBatDau',
    headerName: 'Ngày bắt đầu',
    width: 130,
  },
];





function LichGiangDayGV() {

  const location = useLocation();
  const id = location.state?.id; 

  const user = useSelector((state) => state.auth?.login?.currentUser?.GiaoVien)._id||""
      const ID = id? id: user
     
    const lichhoc = useSelector((state) => state.lichhoc?.lichhoc?.lichhoc)||""  
    const GiaoVienLichDay = lichhoc.filter((item) => item.GiaoVien ===ID )||""
    const lophoc = useSelector((state) => state.dslh?.dslh?.dslh)||""
    const namhoc = useSelector((state) => state.namhoc?.namhoc?.namhoc)||[]
    const hocky = useSelector((state) => state.hocky?.hocky?.hocky)||[]
    const monhoc = useSelector((state) => state.monhoc?.monhoc?.monhoc)||""
    const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien)||[]
    const dispatch = useDispatch();

   //---------------------------------------------------------------------------------
    //   //Kiểm tra học kỳ hiện tại
      const currentHocKy = []
      let foundMatch = false; 
      // Lặp qua mảng hocky từ cuối đến đầu
      for (let i = hocky.length - 1; i >= 0 && !foundMatch; i--) {
        const HocKy = hocky[i];
        // Kiểm tra xem id có nằm trong lichHoc không
        const isMatched = GiaoVienLichDay?.some(lich => lich.HocKy === HocKy._id); 
        if (isMatched) {
          currentHocKy.push(HocKy);
          foundMatch = true; 
        }
      }
    
    // //------------------------------------------------------------------------------
    
    // //Kiểm tra học kỳ hiện tại
    const currentNamHoc = [];
    let foundMatch1 = false;  
    // Lặp qua mảng hocky từ trên xuống dưới
    for (let i = 0; i < namhoc.length && !foundMatch1; i++) {
      const NamHoc = namhoc[i];
      // Kiểm tra xem id có nằm trong lichHoc không
      const isMatched = GiaoVienLichDay?.some(lich => lich.NamHoc === NamHoc._id);
      if (isMatched) {
        currentNamHoc.push(NamHoc);
        foundMatch1 = true; 
      }
    }
    
    //-----------------------------------------------------------------------------------
    const [selectedHocKy, setSelectedHocKy] = useState(currentHocKy[0]?._id||"");
    const [selectedNamHoc, setSelectedNamHoc] = useState(currentNamHoc[0]?._id||"");
    
    const handleHocKyChange = (value) => {
      setSelectedHocKy(value);
     
    };
    
    const handleNamHocChange = (value) => {
      setSelectedNamHoc(value);
     
    };
 
    const resultArray = []
    GiaoVienLichDay?.forEach((tkb, index) => { 
      if (tkb.HocKy === selectedHocKy && tkb.NamHoc === selectedNamHoc) {
            const mhoc = monhoc?.find((md) => md._id === tkb.MonHoc );
                const lop = lophoc?.find((l) => l._id === tkb.LopHoc)
                const gv = giaovien?.find((GV) => GV._id === tkb.GiaoVien)
          const data = {
            id: index + 1,
             MaHocPhan: mhoc?.MaMonHoc,
             NhomHP: tkb.NhomHP,
             TenMonHoc: mhoc?.TenMonHoc,
             SoTinChi: mhoc?.SoTC,
             LopHocPhan: lop?.MaLopHoc,
             Thu: tkb.Thu,
             Tiet: tkb.Tiet,
             PhongHoc: tkb.PhongHoc,
             GVGD: gv.HoGV +" "+ gv.TenGV,
             NgayBatDau: moment(tkb?.NgayBD).utc().format('DD/MM/YYYY'),
          };
          resultArray.push(data);
      }
      // Tạo đối tượng mới với dữ liệu đã lọc
    
      // Thêm vào mảng kết quả
    });


    useEffect(() =>{
        getHocKy(dispatch)
        getNamHoc(dispatch)
        getMonHoc(dispatch)
        getLichHoc(dispatch)
        GiaoVien(dispatch)
    DSLH(dispatch)

    },[dispatch]) 

    

    return (
        <div className={cx('wrapperr')}>
           <div className={cx('innerr')}>
         <div className={cx('bgr-content')}>
           <h2 className={cx('title')}>Lịch giảng dạy</h2>
          <div className={cx('option')}>
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
                   <DataGridDemo columns={columns} rows={resultArray} data={[]} check={true}/>
            </div>
            </div>
        </div>
    );
    
}

export default LichGiangDayGV;