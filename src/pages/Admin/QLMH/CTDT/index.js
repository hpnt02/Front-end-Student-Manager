import { useLocation } from "react-router-dom";
import classNames from 'classnames/bind';
import styles from './CTDT.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {getMonHoc, getKhoa,getNGANH } from "~/redux/apiAdmin/apiAdmin";
import DataGridDemo from "~/components/Test";
import ToTal from "~/components/MonHocChung/TongSoKT";

const cx = classNames.bind(styles)

const columns = [
    { field: 'id', headerName: 'STT', width: 90 },
    {
      field: 'MaMonHoc',
      headerName: 'Mã môn học',
      width: 150,
    
    },
    {
      field: 'TenMonHoc',
      headerName: 'Tên môn học',
      width: 400,
    
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
        field: 'LoaiMonHoc',
        headerName: 'Loại môn học',
        width: 294,
      },
  ]

function CTDT() {
    const location = useLocation();
    const id = location.state?.id; // Lấy id từ state
   
    const dispatch = useDispatch()
    
    //Lấy ra danh sách môn học
    const monhoc = useSelector((state) => state.monhoc?.monhoc?.monhoc)||[]
    //Lấy ra danh sách các môn học chung
    const monhocchung = monhoc.filter((item) => item.LoaiMonHoc === true)
      //Lấy ra danh sách các môn học chuyên ngành
      const monhocrieng = monhoc.filter((item) => item.Nganh === id)
     
  //Lấy ra danh sách các ngành
    const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh)||""
    //Lấy ra thông tin cơ bản của ngành dựa vào id 
    const nganh = Allnganh.filter((item) => item._id === id)[0]||""
  //Lấy ra danh sách các khoa
   const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa)||""
  //Lấy ra thông tin cơ bản của ngành dựa vào id 
  const khoa = Allkhoa.filter((item) => item._id === nganh.Khoa)[0]||""
 const ChucVu = useSelector((state) => state.auth?.login?.currentUser?.ChucVu?.MaChucVu)||""
    const MonHoc = [...monhocchung, ...monhocrieng]
    
  const resultArray = [];
  MonHoc.forEach((mh,index) => {
   
        // Tạo đối tượng mới với dữ liệu đã lọc
        const data = {
          id: index + 1,
          MaMonHoc: mh.MaMonHoc,
          TenMonHoc: mh.TenMonHoc,
          TinChi: mh.SoTC,
          LyThuyet: mh?.LyThuyet, // hoặc thuộc tính bạn cần
          KiemTra: mh?.ThucHanh, // hoặc thuộc tính bạn cần
          Thi: mh?.Thi, // hoặc thuộc tính bạn cần
          Nganh: nganh?.TenNganh, // hoặc thuộc tính bạn cần
          LoaiMonHoc: mh?.LoaiMonHoc === false ? "Môn học chuyên ngành" :"Môn học chung",  // hoặc thuộc tính bạn cần
    
        };

        resultArray.push(data);
  
  
});
    useEffect(()=>{
        getKhoa(dispatch)
        getMonHoc(dispatch)
        getNGANH(dispatch)
    },[dispatch])
    return (            
     
        <div className={cx('wrapperr')}>
            <div className={cx('innerr')}>
               <div className={cx('bgr-content')}>
                   <h2 className={cx('title')}>CHƯƠNG TRÌNH ĐÀO TẠO</h2>                        
                            <div className={cx('infor')}>
                                <p>
                                    <strong>Tên ngành: </strong>{nganh.TenNganh}<br/>
                                    <strong>Tổng số tín chỉ: </strong> <ToTal children={MonHoc} title={"SoTC"}/> <br/>
                                    <strong>Tổng số thực hành: </strong> <ToTal children={MonHoc} title={"ThucHanh"}/>
                                </p>
                                <p>
                                    <strong>Khoa: </strong> {khoa.TenKhoa}<br/>
                                    <strong>Tổng số lý thuyết: </strong> <ToTal children={MonHoc} title={"LyThuyet"}/> <br/>
                                    <strong>Tổng số thi: </strong> <ToTal children={MonHoc} title={"Thi"}/>

                                </p>
                            </div>
                    
                <DataGridDemo columns={columns} rows={resultArray} data={[]} check={ChucVu ==='2' ? true : false}/>
                </div>
            </div>
        </div>
    

     );
}

export default CTDT;