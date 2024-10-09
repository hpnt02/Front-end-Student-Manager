import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
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
    tableHoHS: {
        width: '15%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
    },
    tableMaHS: {
        width: '10%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
    },
    tableDiemQT: {
        width: '24%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
    },
    tableDiemT: {
        width: '24%',
    },
    tablehienThiDiem: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
    },
    tableDieMTong: {
        width: '7%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
    },
    tableCell: {
        width: '100%',
        textAlign: 'center',
        fontSize: 8,
        fontFamily: 'Roboto',
    },
    tableDiem: {
        width: '25%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        // padding: 5
    },
    pageNumber: {
        textAlign: 'center',
        fontSize: 10,
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
    },
    infor: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        margin: '0 auto',
    },
    column: {
        width: '48%', // Mỗi cột chiếm 48% chiều rộng
        padding: 10,
    },
    titleInfor: {
        fontSize: 10,
        padding: 5,
        textAlign: 'center',
        fontFamily: 'Roboto',
    },
});

export const BangDiemTheoMon = ({ hs, ...props }) => {
    const itemsPerPage = 15; // Số hàng trên mỗi trang
    const pages = Math.ceil(hs.length / itemsPerPage);
    return (
        <Document>
            {Array.from({ length: pages }, (_, pageIndex) => (
                <Page style={styles.body} key={pageIndex} size="A4" orientation="landscape">
                    <Text style={styles.title}> Bảng điểm của học sinh</Text>
                    <View style={styles.infor}>
                        <View style={styles.column}>
                            <Text style={styles.titleInfor}>Mã Môn học: {props.infor[0].MonHoc} </Text>
                            <Text style={styles.titleInfor}>Nhóm HP: {props.infor[0].NhomHP} </Text>
                            <Text style={styles.titleInfor}>Học kỳ: {props.infor[0].HocKy} </Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.titleInfor}>Tên môn học: {props.infor[0].TenMonHoc} </Text>
                            <Text style={styles.titleInfor}>Lớp: {props.infor[0].LopHoc} </Text>
                            <Text style={styles.titleInfor}>Năm học: {props.infor[0].NamHoc} </Text>
                        </View>
                    </View>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableMaHS}>
                                <Text style={styles.tableCell}>Mã Học Sinh</Text>
                            </View>
                            <View style={styles.tableHoHS}>
                                <Text style={styles.tableCell}>Họ Tên Học Sinh</Text>
                            </View>
                            <View style={styles.tableDiemQT}>
                                <Text style={styles.tableCell}>Điểm hệ số 1</Text>
                                <View style={styles.tableRow}>
                                    <View style={styles.tableDiem}>
                                        <Text style={styles.tableCell}>Điểm L1</Text>
                                    </View>
                                    <View style={styles.tableDiem}>
                                        <Text style={styles.tableCell}>Điểm L2</Text>
                                    </View>
                                    <View style={styles.tableDiem}>
                                        <Text style={styles.tableCell}>Điểm L3</Text>
                                    </View>
                                    <View style={styles.tableDiem}>
                                        <Text style={styles.tableCell}>Điểm TB</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.tableDiemQT}>
                                <Text style={styles.tableCell}>Điểm hệ số 2</Text>
                                <View style={styles.tableRow}>
                                    <View style={styles.tableDiem}>
                                        <Text style={styles.tableCell}>Điểm L1</Text>
                                    </View>
                                    <View style={styles.tableDiem}>
                                        <Text style={styles.tableCell}>Điểm L2</Text>
                                    </View>
                                    <View style={styles.tableDiem}>
                                        <Text style={styles.tableCell}>Điểm L3</Text>
                                    </View>
                                    <View style={styles.tableDiem}>
                                        <Text style={styles.tableCell}>Điểm TB</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.tableDieMTong}>
                                <Text style={styles.tableCell}>Điểm TBQT</Text>
                            </View>
                            <View style={styles.tableDieMTong}>
                                <Text style={styles.tableCell}>Điểm CK</Text>
                            </View>
                            <View style={styles.tableDieMTong}>
                                <Text style={styles.tableCell}>Điểm TB</Text>
                            </View>
                            <View style={styles.tableDieMTong}>
                                <Text style={styles.tableCell}>Ghi chú</Text>
                            </View>
                        </View>

                        {hs.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((item, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={styles.tableMaHS}>
                                    <Text style={styles.tableCell}>{item.MaHocSinh}</Text>
                                </View>
                                <View style={styles.tableHoHS}>
                                    <Text style={styles.tableCell}>{item.TenHocSinh}</Text>
                                </View>
                                <View style={styles.tableDiemT}>
                                    <View style={styles.tableRow}>
                                        <View style={styles.tablehienThiDiem}>
                                            <Text style={styles.tableCell}>{item.DHS1L1}</Text>
                                        </View>
                                        <View style={styles.tablehienThiDiem}>
                                            <Text style={styles.tableCell}>{item.DHS1L2}</Text>
                                        </View>
                                        <View style={styles.tablehienThiDiem}>
                                            <Text style={styles.tableCell}>{item ? item.DHS1L3 : ''}</Text>
                                        </View>
                                        <View style={styles.tablehienThiDiem}>
                                            <Text style={styles.tableCell}>{item.DQTHS1}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.tableDiemT}>
                                    <View style={styles.tableRow}>
                                        <View style={styles.tablehienThiDiem}>
                                            <Text style={styles.tableCell}>{item.DHS1L1}</Text>
                                        </View>
                                        <View style={styles.tablehienThiDiem}>
                                            <Text style={styles.tableCell}>{item.DHS1L2}</Text>
                                        </View>
                                        <View style={styles.tablehienThiDiem}>
                                            <Text style={styles.tableCell}>{item ? item.DHS1L3 : ''}</Text>
                                        </View>
                                        <View style={styles.tablehienThiDiem}>
                                            <Text style={styles.tableCell}>{item.DQTHS1}</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.tableDieMTong}>
                                    <Text style={styles.tableCell}>{item.DTBQT}</Text>
                                </View>
                                <View style={styles.tableDieMTong}>
                                    <Text style={styles.tableCell}>{item.DCK}</Text>
                                </View>
                                <View style={styles.tableDieMTong}>
                                    <Text style={styles.tableCell}>{item.DTB}</Text>
                                </View>
                                <View style={styles.tableDieMTong}>
                                    <Text style={styles.tableCell}>{item ? item.GhiChu : ''}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <Text
                        style={styles.pageNumber}
                        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                        fixed
                    />
                </Page>
            ))}
        </Document>
    );
};
