import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import classNames from 'classnames/bind';
import styles from './TableBangDiem.module.scss'
const cx = classNames.bind(styles);
export default function AccessibleTable({row, NamHoc, hocKy, DiemTichLuy}) {

  const data= []
  const diem=[]
  row.forEach((i) => {
    if (i.DTB > 5) {
        data.push(i.SoTC);
        diem.push(i.DTB);
    }
});

// Kiểm tra chiều dài của các mảng
const length = Math.min(data.length, diem.length);

// Khởi tạo mảng kết quả
const result = [];

// Nhân các phần tử tương ứng
for (let i = 0; i < length; i++) {
  result.push(diem[i] * data[i]);
}

const res = Array.isArray(data) && data.length > 0 
  ? data.reduce((total, currentValue) => total + currentValue, 0) 
  : null; // Hoặc có thể để là 0 tùy theo nhu cầu

  const tongdiem = Array.isArray(result) && result.length > 0 
  ? result.reduce((total, currentValue) => total + currentValue, 0) 
  : null; // Hoặc có thể trả về 0 tùy theo yêu cầu
 
const DTB = (tongdiem/res).toFixed(2);


let HocLuc;
if (DTB >= 9 ) {
    HocLuc = "Xuất sắc";
} else if (DTB > 8 ) {
    HocLuc = "Giỏi";
} else if (DTB >= 7 ) {
    HocLuc = "Khá";
} else if (DTB >= 5) {
    HocLuc = "Trung bình";
} else {
    HocLuc = "Yếu";
}


  return (
    <TableContainer component={Paper} sx={{ marginBottom: 10, borderRadius:0 }}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
          <TableRow>  <TableCell className={cx('height-header')} align="center" colSpan={15}>{hocKy.TenHocKy} - {NamHoc.TenNamHoc}</TableCell></TableRow>
          <TableRow>
            <TableCell rowSpan={2} align="center">Mã MH</TableCell>
            <TableCell rowSpan={2}  align="center">
              Tên môn học
            </TableCell>
            <TableCell rowSpan={2} align="center">
              Số TC
            </TableCell>
            <TableCell colSpan={4} align="center">
             Điểm hệ số 1
            </TableCell>
            <TableCell colSpan={4}  align="center">
            Điểm hệ số 2
            </TableCell>
            <TableCell rowSpan={2} align="center">
           Điểm TB
            </TableCell>
            <TableCell rowSpan={2}  align="center">
            Điểm CK
            </TableCell>
            <TableCell rowSpan={2} align="center">
            Điểm TB
            </TableCell>
            <TableCell rowSpan={2} align="center">
            Ghi chú
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Điểm L1</TableCell>
            <TableCell align="center">Điểm L2</TableCell>
            <TableCell align="center">Điểm L3</TableCell>
            <TableCell align="center">Điểm QT</TableCell>
            <TableCell align="center">Điểm L1</TableCell>
            <TableCell align="center">Điểm L2</TableCell>
            <TableCell align="center">Điểm L3</TableCell>
            <TableCell align="center">Điểm QT</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map((item) => (
          
          <TableRow>
              <TableCell  scope="row"  align="center" >
                {item.MaMonHoc}
              </TableCell>
              <TableCell align="center">{item.TenMonHoc}</TableCell>
              <TableCell align="center">{item.SoTC}</TableCell>
              <TableCell align="center">{item.DHS1L1}</TableCell>
              <TableCell align="center">{item.DHS1L2}</TableCell>
              <TableCell align="center">{item.DHS1L3}</TableCell>
              <TableCell align="center">{ isNaN(item.DQTHS1) ? "": item.DQTHS1}</TableCell>
              <TableCell align="center">{item.DHS2L1}</TableCell>
              <TableCell align="center">{item.DHS2L2}</TableCell>
              <TableCell align="center">{item.DHS2L3}</TableCell>
              <TableCell align="center">{ isNaN(item.DQTHS2) ? "": item.DQTHS2}</TableCell>
              <TableCell align="center">{ isNaN(item.DTBQT) ? "": item.DTBQT}</TableCell>
              <TableCell align="center">{ isNaN(item.DCK) ? "": item.DCK}</TableCell>
              <TableCell align="center">{ isNaN(item.DTB) ? "": item.DTB}</TableCell>
              <TableCell align="center">{item.GhiChu}</TableCell>
              </TableRow>
             
           ))}
           <TableRow>
                    <TableCell align="center" className={cx('none-border-right','none-border-bottom','none-padding')} colSpan={7}>Số tín chỉ học kỳ: <span className={cx('none-bold')}>{res}</span>  </TableCell> 
                    <TableCell align="center" className={cx('none-border-left','none-border-bottom','none-padding')} colSpan={8}>Số tín chỉ tích lũy:  <span className={cx('none-bold')}>{DiemTichLuy[0]?.TongTinChi}</span></TableCell>
           </TableRow>
           <TableRow>
                    <TableCell align="center" className={cx('none-border-right','none-border-top','none-border-bottom','none-padding')} colSpan={7}>Điểm trung bình học kỳ: <span className={cx('none-bold')}>{isNaN(DTB) ? "":DTB}</span> </TableCell>
                    <TableCell align="center" className={cx('none-border-left','none-border-top','none-border-bottom','none-padding')} colSpan={8}>Điểm trung bình tích lũy: <span className={cx('none-bold')}>{DiemTichLuy[0]?.DiemTrungBinhTichLuy}</span></TableCell>
           </TableRow>
           <TableRow>
                    <TableCell align="center" className={cx('none-border-right','none-border-top','none-padding')} colSpan={7}>Xếp loại học lực học kỳ: <span className={cx('none-bold')}>{HocLuc ? HocLuc :""}</span> </TableCell>
                    <TableCell align="center" className={cx('none-border-left','none-border-top','none-padding')} colSpan={8}>Xếp loại học lực tích lũy: <span className={cx('none-bold')}>{DiemTichLuy[0]?.XepLoaiHocLuc}</span></TableCell>
           </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
