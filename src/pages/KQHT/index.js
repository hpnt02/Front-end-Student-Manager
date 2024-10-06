import classNames from 'classnames/bind';
import styles from './KQHT.module.scss';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {  getDiem} from '~/redux/apiStudent/apiRequest';

const cx = classNames.bind(styles);
function KQHT() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const student = useSelector((state) => state.auth.login?.currentUser?.HocSinh?._id);
    const diem = useSelector((state) => state.diem.diem.diem)

    const dispatch = useDispatch();

    useEffect(() =>{
        getDiem(user.accessToken, dispatch, student)  
         
    },[user.accessToken, dispatch, student]) 

    const diemGop = [];
    const monHocIdArray = [];
    const resultArray=[]
    for (let i = 0; i < diem.length; i++) {
      const monHocId = diem[i].MonHoc._id;
    
      if (monHocIdArray.indexOf(monHocId) === -1) {
        monHocIdArray.push(monHocId);
      }
    
      if (!diemGop[monHocId]) {
        diemGop[monHocId] = [];
      }
    
      diemGop[monHocId].push(diem[i]);
    }

    
// Tạo mảng điểm đã gộp để hiển thị
 const diemDaGop = [];

for (let i = 0; i < monHocIdArray.length; i++) {

   const monHocIdArra = monHocIdArray[i];
 
  
  
    const diemMonHoc = diemGop[monHocIdArra];
    const diemHs1 = diemMonHoc.filter((item) => item.LoaiDiem.MaLoaiDiem === 'HS1');
    const diemHs2 = diemMonHoc.filter((item) => item.LoaiDiem.MaLoaiDiem === 'HS2');
    const diemDgk = diemMonHoc.find((item) => item.LoaiDiem.MaLoaiDiem === 'DGK');
    const diemDck = diemMonHoc.find((item) => item.LoaiDiem.MaLoaiDiem === 'DCK');
  
  
    const namHocArray = [];
  namHocArray.push(diemMonHoc[i].NamHoc.TenNamHoc);
  
  const hocKyArray = [];
  hocKyArray.push(diemMonHoc[i].HocKy.TenHocKy);
   
    
    diemDaGop.push({
      NamHoc: namHocArray,
      HocKy: hocKyArray,
      MonHoc: diemMonHoc[0].MonHoc,
      DiemHs1: diemHs1.map((item) => item.Diem),
      DiemHs2: diemHs2.map((item) => item.Diem),
      DiemDgk: diemDgk ? diemDgk.Diem : null,
      DiemDck: diemDck ? diemDck.Diem : null,
    });



//Lấy ra từng phần tử của điểm hệ số 1
const diemHs1Array = diemDaGop.map((diem) => diem.DiemHs1);
  const newArray = [];
  diemHs1Array.forEach((value) => {
    newArray.push(value);
  });
  console.log(newArray)
  const giaTri = newArray[i];
  let dem = 0;
  const result = giaTri.reduce((total, number) => {
    if (number === null) {
      return total + 0;
    } else {
      dem += 1;
      return total + number;
    }
  }, 0);
  
  const DTBHS = result / dem;
  const roundedDTBHS = Math.round(DTBHS * 100) / 100; // Làm tròn đến 2 chữ số thập phân
  
  const formattedDTBHS = String(roundedDTBHS).replace(/\.0+$/, ''); // Bỏ các số 0 đằng sau nếu là số nguyên
  

  //--------------------------------------------------------------------------
  
  //Lấy ra từng phần tử của điểm hệ số 2
  const diemHs2Array = diemDaGop.map((diem) => diem.DiemHs2);
  const newArray2 = [];
  diemHs2Array.forEach((value) => {
    newArray2.push(value);
  });
  const giaTri2 = newArray2[i];
  
  let dem2 = 0;
  const result2 = giaTri2.reduce((total, number) => {
    if (number === null) {
      return total + 0;
    } else {
      dem2 += 1;
      return total + number;
    }
  }, 0);
  
  const DTBHS2 = result2/dem2
  
  const roundedDTBHS2 = Math.round(DTBHS2 * 100) / 100; // Làm tròn đến 2 chữ số thập phân
  
  const formattedDTBHS2 = String(roundedDTBHS2).replace(/\.0+$/, '');
  //--------------------------------------------------------------------------
  //Điểm quá trình
  const QT = (DTBHS + DTBHS2) /2
  const roundedQT = Math.round(QT * 100) / 100; // Làm tròn đến 2 chữ số thập phân
  
  const formattedQT = String(roundedQT).replace(/\.0+$/, '');
  //-------------------------------------------------------------------------------
  //Điểm trung bình
  const GiuaKy = diemDaGop.map((diem) => diem.DiemDgk);
  const newArray3 = [];
  GiuaKy.forEach((value) => {
    newArray3.push(value);
  });
  const DiemGiuaKy = newArray3[i]
  //Lấy điểm cuois kỳ
  const CuoiKy = diemDaGop.map((diem) => diem.DiemDck);
  const newArray4 = [];
  CuoiKy.forEach((value) => {
    newArray4.push(value);
  });
  const DiemCuoiKy = newArray4[i]
  
  //Tính điểm trung bình và ưu vào mảng để tính điểm tổng
  const DTB = (formattedQT*0.2 + DiemGiuaKy*0.3 +DiemCuoiKy*0.5)
  const roundedDTB = Math.round(DTB * 100) / 100; // Làm tròn đến 2 chữ số thập phân
  const formattedDTB = String(roundedDTB).replace(/\.0+$/, '');

  console.log("Diem QT",formattedQT)
  console.log("GK",DiemGiuaKy)
  console.log("CK",DiemCuoiKy)

  const DTBArray=[]

    DTBArray.push(DTB);


    const obj = {
      DTBHS:formattedDTBHS,
      DTBHS2:formattedDTBHS2,
      QT: formattedQT,
      DTB:formattedDTB
    }
      
    resultArray.push(obj)
      }
    
      console.log("Điểm", resultArray)

      const nam = diemDaGop.map(item => item.NamHoc)
      const mergedArray = nam.reduce((accumulator, current) => {
        const isDuplicate = accumulator.some((arr) => JSON.stringify(arr) === JSON.stringify(current));
      
        if (!isDuplicate) {
          accumulator.push(current);
        }
      
        return accumulator;
      }, []);
      
      const hocky= diemDaGop.map(item => item.HocKy)
      const HocKyArray = hocky.reduce((accumulator, current) => {
        const isDuplicate = accumulator.some((arr) => JSON.stringify(arr) === JSON.stringify(current));
      
        if (!isDuplicate) {
          accumulator.push(current);
        }
      
        return accumulator;
      }, []);
    

  // //-----------------------------------------------------------------------------------

  // Tính tổng số TC
  
              return (
          <div className={cx('wrapper')}>
              <div className={cx('inner')}>
                  <div className={cx('table-kqht')}>
                      <h2>KẾT QUẢ HỌC TẬP</h2>
                     
                          <Fragment>
                          {mergedArray.map((namHoc, namHocIndex) => (
                            <table className={cx('table-tkb')}>
                                   { HocKyArray.map((hocky, namHocIndex) => (
                                    <Fragment>
                                      <thead>
                                          <tr>
                                              <th rowSpan="2">STT</th>                                          
                                              <th rowSpan="2"> Mã môn học</th>
                                              <th rowSpan="2">Tên môn học</th>
                                              <th rowSpan="2">Số TC</th>
                                              <th colSpan="4">Điểm hệ số 1</th>
                                              <th colSpan="4">Điểm hệ số 2</th>
                                              <th rowSpan="2">Điểm QT</th>
                                              <th rowSpan="2">Điểm giữa kỳ</th>
                                              <th rowSpan="2">Điểm cuối kỳ</th>
                                              <th rowSpan="2">Điểm trung bình</th>
                                              <th rowSpan="2">Ghi chú</th>
                                          </tr>
                                          <tr>
                                              <th>Điểm 1</th>
                                              <th>Điểm 2</th>
                                              <th>Điểm 3</th>
                                              <th>Điểm TBKT</th>
                                              <th>Điểm 1</th>
                                              <th>Điểm 2</th>
                                              <th>Điểm 3</th>
                                              <th>Điểm TBKT</th>
                                          </tr>
                                      </thead>
                                      
                                      <tbody>
                                          <tr>
                                              {
                                                  <td colSpan="17" className={cx('time')}>
                                                     {hocky} - Năm hoc: {namHoc} 
                                                  </td>
                                              }
                                          </tr>
                                          <Fragment>
                                            
                                          {resultArray.map((diemtong, parentIndex) => (
                                            diemDaGop[parentIndex] && (
    
    <tr key={parentIndex}>
      <td>{parentIndex + 1}</td>
      <td>{diemDaGop[parentIndex].MonHoc.MaMonHoc}</td>
      <td>{diemDaGop[parentIndex].MonHoc.TenMonHoc}</td>
      <td>{diemDaGop[parentIndex].MonHoc.SoTC}</td>
      <td>{diemDaGop[parentIndex].DiemHs1[0]}</td>
      <td>{diemDaGop[parentIndex].DiemHs1[1]}</td>
      <td>{diemDaGop[parentIndex].DiemHs1[2]}</td>
      <td>{diem.Diem ? diemtong.DTBHS : ""}</td>
      <td>{diemDaGop[parentIndex].DiemHs2[0]}</td>
      <td>{diemDaGop[parentIndex].DiemHs2[1]}</td>
      <td>{diemDaGop[parentIndex].DiemHs2[2]}</td>
      <td>{diem.Diem ?diemtong.DTBHS2 :""}</td>
      <td>{diem.Diem ?diemtong.QT :""} </td>
      <td>{diemDaGop[parentIndex].DiemDgk}</td>
      <td>{diemDaGop[parentIndex].DiemDck}</td>
      <td>{diem.Diem ?diemtong.DTB:""}</td>
      <td>{diem.Diem ? diemtong.DTB >5 ? "*":"" :""}</td>
    </tr>
  )
))}         
                                          </Fragment>                                         
                                      </tbody>
                                      </Fragment>
                                    ))}   

                                                 
                                         
                                    
                              
                                  </table>
))}
                          </Fragment>
                    
                  </div>
              </div>
          </div>
      );
      
    }




export default KQHT;
