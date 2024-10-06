import { useLocation } from "react-router-dom";

import classNames from 'classnames/bind';
import { useDispatch, useSelector } from "react-redux";
import styles from './BangDiemHocSinh.module.scss'
import { getDiem, getHSTLH, getHocKy, getLichHoc, getMonHoc, getNamHoc, DSHS, GiaoVien, DSLH, getLoaiDiem } from "~/redux/apiAdmin/apiAdmin";
import TableTest from "~/components/TableBangDiemTest";
import { useEffect } from "react";
const cx = classNames.bind(styles);
function BDHS() {
  const location = useLocation();
  const id = location.state?.id; 
//    const dispatch = useDispatch()
const user = useSelector((state) => state.auth.login?.currentUser?.ChucVu?.TenChucVu);

const IDHocSinh = useSelector((state) => state.auth.login?.currentUser?.HocSinh._id);
const IdCurrent = id ? id : IDHocSinh
    //Lấ ra thông tin học sinh
    const hs = useSelector((state) => {
        const b = state.dshs?.dshs?.dshs.find((x) => x._id === IdCurrent);
         return b
      });

        //Lấy ra thông tin lớp học
        const lop = useSelector((state) => state.dslh?.dslh?.dslh)||""
        const lopHS = lop?.filter((item) => item._id === hs.LopHoc)||""
        const newLopHS = lopHS[0]
      //Lấy ra thông tin giáo viên
      const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien)

      const gv = giaovien.filter((item) => item._id === newLopHS.GiaoVien )
      const newGiaoVien = gv[0]
      
      const HSLH = useSelector((state) => state.hslh?.hstlh?.hstlh)
      const hocsinhlichhoc = HSLH.filter(item => item.HocSinh === hs._id)
    //  const LichHocHS = lichhoc.filter((item) => item.MonHoc === ._id 
   
      const lichhoc = useSelector((state) => state.lichhoc?.lichhoc?.lichhoc)
      const a = hocsinhlichhoc.map((item) =>{
        const b = lichhoc.filter((state) => state._id === item.LichHoc)
        return b
      })

      const newLichHoc = a.flat()

    

    
      //Laass ra môn hoc
      const monhoc = useSelector((state) => state.monhoc?.monhoc?.monhoc)||[]

      const dispatch = useDispatch()
      const diem = useSelector((state) => state.diem?.diemtheomon?.diemtheomon);
     const newDiem = diem.filter((item) => item.HocSinh === hs._id)

      //Lấy thoong tin loại điểm
      const loaidiem = useSelector((state) => state.loaidiem?.loaidiem?.loaidiem);
     
//Lấy ra thông tin năm học và học kỳ
const namhoc = useSelector((state) => state.namhoc?.namhoc?.namhoc)||""
const hocky = useSelector((state) => state.hocky?.hocky?.hocky)||""

const reversedArray=[]
      for(let i = namhoc.length - 1; i >= 0 ; i--){
        reversedArray.push(namhoc[i])
      }

      const namhoctuongung = reversedArray.filter((item) =>{
        const b = lichhoc.some(state=>state.NamHoc === item._id)
        return b
      })


      const hocKy=[]
      for(let i = namhoc.length - 1; i >= 0 ; i--){
        hocKy.push(namhoc[i])
      }

      const hockytuongung = hocky.filter((item) =>{
        const b = lichhoc.some(state=>state.HocKy === item._id)
        return b
      })
    
      const resultArray = [];
   newLichHoc.forEach((newLH,index) => {
                  const monHoc = monhoc?.find((mh) => mh._id === newLH.MonHoc)
                  const namHoc = namhoc?.find((nh) => nh._id === newLH.NamHoc)
                  const hocKy = hocky?.find((hk) => hk._id === newLH.HocKy)               
                         const diemtheomon= newDiem.filter((item) => item.MonHoc === newLH.MonHoc)
//------------------------------------Lấy ra điểm hệ số 1------------------------------------------
                         const maLoaiDiemHeSo1 = loaidiem?.find(item => item.MaLoaiDiem === "HS1")._id||"";
                         const diemHeSo1 = diemtheomon.filter(item => item.LoaiDiem === maLoaiDiemHeSo1);
                         var diemArr = [];
                            // Lặp qua các object và lấy giá trị diem
                                for (var i = 0; i < diemHeSo1.length; i++) {
                                    var diem = diemHeSo1[i].Diem;
                                    diemArr.push(diem);
                                }
                                const diemmoi = diemArr.filter((item) => item !== "").map((item) => parseFloat(item));      
                                const DiemTrungBinhHeSo1 = (diemmoi.reduce((diem, total) => diem + total, 0) / diemmoi.length).toFixed(2);
                                            
//------------------------------------Lấy ra điểm hệ số 1------------------------------------------
                                   
 //------------------------------------Lấy ra điểm hệ số 2------------------------------------------
 const maLoaiDiemHeSo2 = loaidiem?.find(item => item.MaLoaiDiem === "HS2")._id ;
 const diemHeSo2 = diemtheomon.filter(item => item.LoaiDiem === maLoaiDiemHeSo2);
 
 var diemArr2 = [];
 // Lặp qua các object và lấy giá trị diem
     for (var u = 0; u < diemHeSo2.length; u++) {
         var diem2 = diemHeSo2[u].Diem;
         diemArr2.push(diem2);
     }
   
     const diemmoi2 = diemArr2.filter((item) => item !== "").map((item) => parseFloat(item));

     const DiemTrungBinhHeSo2 = (diemmoi2.reduce((diem, total) => diem + total, 0) / diemmoi2.length).toFixed(2);
      //------------------------------------Lấy ra điểm hệ số 2------------------------------------------
      
  //-------------------------------------Tính điểm quá trinh -------------------------------------------
    
  const diemTrungBinhHeSo1 = parseFloat(DiemTrungBinhHeSo1); // Chuyển đổi giá trị thành số dấu phẩy động
  const diemTrungBinhHeSo2 = parseFloat(DiemTrungBinhHeSo2); // Chuyển đổi giá trị thành số dấu phẩy động
  
  const DiemQT = ((diemTrungBinhHeSo1 + diemTrungBinhHeSo2 * 2) / 3).toFixed(2);

    //-------------------------------------Tính điểm quá trinh -------------------------------------------
        //----------------------------------------Lấy điểm cuối kỳ--------------------------------------------
        const maDiemCuoiKy = loaidiem?.find(item => item.MaLoaiDiem === "DCK")._id ;
        const diemCK = diemtheomon.filter(item => item.LoaiDiem === maDiemCuoiKy);
        
        var diemArr3 = [];
        // Lặp qua các object và lấy giá trị diem
            for (let i = 0; i < diemCK.length; i++) {
                let diem2 = diemCK[i].Diem;
                diemArr3.push(diem2);
            }
            
            const DiemCK = diemArr3.filter((item) => item !== "").map((item) => parseInt(item));  
            const diemck = parseFloat(DiemCK); // Chuyển đổi giá trị thành số dấu phẩy động

           
        //------------------------------------Lấy điểm cuối kỳ----------------------------------------------             
      //------------------------------------Tính điểm tổng kết-----------------------------------------------
      const DiemTongKet = (DiemQT *0.4 + diemck*0.6).toFixed(2)
     //------------------------------------Tính điểm tổng kết-----------------------------------------------
    
    const data = {
                    id: index + 1,
                    _id: monHoc._id,
                    MaMonHoc: monHoc.MaMonHoc,
                    TenMonHoc: monHoc.TenMonHoc,
                    NamHoc: namHoc._id,
                    HocKy: hocKy._id,
                    SoTC: monHoc.SoTC ,
                    DHS1L1: diemmoi.lenght !== 1 ? diemmoi[0] :"",
                    DHS1L2: diemmoi.lenght !== 1 ? diemmoi[1] :"",
                    DHS1L3: diemmoi.lenght !==1 ? diemmoi[2] :"",
                    DQTHS1:DiemTrungBinhHeSo1,
                    DHS2L1: diemmoi2.lenght !== 1 ? diemmoi2[0] :"",
                    DHS2L2: diemmoi2.lenght !== 1 ? diemmoi2[1] :"",
                    DHS2L3: diemmoi2.lenght !== 1 ? diemmoi2[2] :"",
                    DQTHS2:DiemTrungBinhHeSo2,
                    DTBQT: DiemQT,
                    DCK: diemck,
                    DTB: DiemTongKet,
                    GhiChu: DiemTongKet > 5 ? "*" :""
                  };
                  
                  // Thêm vào mảng kết quả
                  resultArray.push(data);
                  }   
   )

   const DiemTichLuy = []; 
   namhoctuongung.forEach(nh => {
    let cumulativeSum = 0; // Biến để lưu tổng dồn
    let DiemTBTichLuy = 0
    hockytuongung.forEach(hk => {
        // Tính tổng SoTC cho từng năm học và học kỳ
        const filteredItems = resultArray.filter(item => 
            item.NamHoc === nh._id && item.HocKy === hk._id && item.DTB >= 5
        );
     
        // Tính tổng SoTC nếu có ít nhất một phần tử thỏa mãn
        if (filteredItems.length > 0) {
            const totalSoTc = filteredItems.reduce((acc, item) => acc + item.SoTC, 0);
            cumulativeSum += totalSoTc; // Cộng dồn tổng

            const DiemTB = filteredItems.reduce((acc, item) => {
              return acc + (item.DTB * item.SoTC); // Nhân DTB với SoTC
          }, 0);
          DiemTBTichLuy += DiemTB; // Cộng dồn tổng
            // Tạo đối tượng và thêm vào mảng DiemTichLuy
            const DiemTrungBinhTichLuy = (DiemTBTichLuy/cumulativeSum).toFixed(2)
            DiemTichLuy.push({
                NamHoc: nh._id,
                HocKy: hk._id,
                TongTinChi: cumulativeSum,
                DiemTrungBinhTichLuy:DiemTrungBinhTichLuy,
                XepLoaiHocLuc : (DiemTrungBinhTichLuy >= 9 ? "Xuất sắc" : DiemTrungBinhTichLuy >= 8 ?" Giỏi " :
                  DiemTrungBinhTichLuy >= 7 ? "Khá" :DiemTrungBinhTichLuy >=5 ?"Trung Bình" :"Yếu"
                )
            });
        }
    });
});

// Hiển thị kết quả trong DiemTichLuy


useEffect(() =>{
  getMonHoc(dispatch)
  DSLH(dispatch)
  getLichHoc(dispatch)
  getHocKy(dispatch)
  getNamHoc(dispatch)
  getDiem(dispatch)
  getLoaiDiem(dispatch)
  getHSTLH(dispatch)
  GiaoVien(dispatch)
  DSHS(dispatch)
 }, [dispatch])

    return (     
        
       <div className={cx('wrapperr')}>
            <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                        <h2 className={cx('title')}>Bảng điểm của học sinh</h2>
          {user === "Học sinh" ? "" : 
                <div className={cx('infor-student')}> 
                    <div>
                    <p>
                        <strong>Mã học sinh:</strong> {hs.MaHS}
                        </p>
                    <p>
                        <strong>Lớp:</strong> {newLopHS.TenLopHoc}
                    </p>  
                                 
                    </div>
                    <div>
                    <p>
                        <strong>Tên học sinh:</strong> {hs.HoHS} {hs.TenHS}
                    </p>
                    <p>
                        <strong>GVCV:</strong> {newGiaoVien.HoGV} {newGiaoVien.TenGV}
                    </p>
                   
                    </div>
                </div>
          }
            
  
{
  namhoctuongung.map((namHoc) => (
    hockytuongung.map((hk) => {
      // Filter items based on the current namHoc and hk
      const filteredItems = resultArray.filter((item) => 
        item.NamHoc === namHoc._id && item.HocKy === hk._id
      );
      const DiemTL = DiemTichLuy.filter((item) => 
        item.NamHoc === namHoc._id && item.HocKy === hk._id
      );
      return (
        <TableTest row={filteredItems}  // Pass the filtered items
        NamHoc={namHoc} 
        hocKy={hk}
        DiemTichLuy={DiemTL}
        />
      );
    })
  ))
}

    
                </div>
            </div>
       </div>

     );
}

export default BDHS;