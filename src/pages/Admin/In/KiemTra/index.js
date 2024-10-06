
import React from 'react';
import { Document, Page, Text, View, StyleSheet,Font } from '@react-pdf/renderer';
Font.register({
  family: 'Roboto',
  src: 'https://fonts.gstatic.com/s/roboto/v32/KFOmCnqEu92Fr1Me5Q.ttf',
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  table: {
    display: 'table',
    width: 'auto',
    margin: 12,
    // borderStyle: 'solid',
    // borderWidth: 1,
    // borderColor: 'black',
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '30%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  tableMaHS: {
    width: '14%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  tableGT: {
    width: '14%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  tableNS: {
    width: '16%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  tableCell: {
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Roboto',
  },
  pageNumber:{
    textAlign: 'center',
  }
});

export const MyDocument = ({ hs }) => {
  const itemsPerPage = 15; // Số hàng trên mỗi trang
  const pages = Math.ceil(hs.length / itemsPerPage);
  return (
    <Document>
      {Array.from({ length: pages }, (_, pageIndex) => (
        <Page style={styles.body} key={pageIndex} size='A4' orientation='portrait'>
          <Text style={styles.title}> Danh sách học sinh theo lớp</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableMaHS}><Text style={styles.tableCell}>Mã Học Sinh</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Họ Tên Học Sinh</Text></View>
              <View style={styles.tableGT}><Text style={styles.tableCell}>Giới tính</Text></View>
              <View style={styles.tableNS}><Text style={styles.tableCell}>Ngày Sinh</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>Địa chỉ</Text></View>
            </View>
            {hs.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableMaHS}><Text style={styles.tableCell}>{item.MaHocSinh}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{item.TenHocSinh}</Text></View>
                <View style={styles.tableGT}><Text style={styles.tableCell}>{item.GioiTinh}</Text></View>
                <View style={styles.tableNS}><Text style={styles.tableCell}>{item.NgaySinh}</Text></View>
                <View style={styles.tableCol}><Text style={styles.tableCell}>{item.DiaChi}</Text></View>
              </View>
            ))}
          </View>
          <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
        </Page>
      ))}
    </Document>
  );
};

