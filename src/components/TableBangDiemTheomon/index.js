
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TableBangDiemTheoMon({row, ...prop}) {
 

  const handle = (IDHocSinh, NamHoc, HocKy, e = true) =>{
    prop.onClick(IDHocSinh, NamHoc, HocKy, e)    
  
  }

  return (
    <>
    <TableContainer component={Paper} sx={{ marginBottom: 10, borderRadius:0 }}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <TableHead>
         
          <TableRow>
          <TableCell rowSpan={2} align="center">STT</TableCell>
            <TableCell rowSpan={2} align="center">Mã học sinh</TableCell>
            <TableCell rowSpan={2}  align="center">
              Tên học sinh
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
            <TableCell rowSpan={2} align="center">
              Chức năng
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
             <TableCell  scope="row"  align="center" >{item.id}</TableCell>
              <TableCell  scope="row"  align="center" >{item.MaHocSinh}</TableCell>
              <TableCell align="center">{item.TenHocSinh}</TableCell>
              <TableCell align="center">{item.DHS1L1}</TableCell>
              <TableCell align="center">{item.DHS1L2}</TableCell>
              <TableCell align="center">{item.DHS1L3}</TableCell>
              <TableCell align="center">{isNaN(item.DQTHS1) ? "":item.DQTHS1 }</TableCell>
              <TableCell align="center">{item.DHS2L1}</TableCell>
              <TableCell align="center">{item.DHS2L2}</TableCell>
              <TableCell align="center">{item.DHS2L3}</TableCell>
              <TableCell align="center">{isNaN(item.DQTHS2) ? "" : item.DQTHS2}</TableCell>
              <TableCell align="center">{isNaN(item.DTBQT) ? "" : item.DTBQT}</TableCell>
              <TableCell align="center">{isNaN(item.DCK) ? "" : item.DCK}</TableCell>
              <TableCell align="center">{isNaN(item.DTB) ? "" : item.DTB}</TableCell>
              <TableCell align="center">{item.GhiChu}</TableCell>
              <TableCell align="center" sx={{cursor: 'pointer'}} onClick={(e) =>handle(item.idHocSinh, item.NamHoc, item.HocKy)}>Nhập điểm</TableCell>
              </TableRow>
             
           ))}
       
        </TableBody>
      </Table>
    </TableContainer>

</>

  );
}
