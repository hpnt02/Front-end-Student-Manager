import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import SelectLabels from '../Select';

import classNames from 'classnames/bind';
import styles from './Table.module.scss';
const cx = classNames.bind(styles);

export default function DataGridDemo({ columns, rows, data, ...prop }) {
    const [page, setPage] = useState(1);
    // const a = prop.columnGroupingModel
    const pageSize = 10;
    const arr = [
        {
            title: '10',
            value: 10,
        },
        {
            title: '50',
            value: 50,
        },
        {
            title: '100',
            value: 100,
        },
    ];

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const [array, setArray] = useState(pageSize);

    const handleArrChange = (value) => {
        setArray(value);
    };

    const handleID = (newSelection) => {
        if (prop && typeof prop.onClick === 'function') {
            prop.onClick(newSelection.row._id) || prop.onClick(newSelection.row.idHocSinh);
        }
    };
    const row = [...rows, ...data];

    const startIndex = (page - 1) * array;
    const endIndex = startIndex + array;
    const displayedRows = row.slice(startIndex, endIndex);

    return displayedRows.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '20px' }}>Không có dữ liệu</div>
    ) : (
        <>
            <DataGrid
                rows={displayedRows}
                columns={columns}
                rowCount={row.length}
                checkboxSelection={!prop.check}
                pageSize={array}
                autoHeight
                hideFooterPagination
                disableColumnMenu
                onCellClick={handleID}
                className="custom-grid"
                onPageChange={handlePageChange}
                sx={{
                    '& .MuiDataGrid-container--bottom': {
                        background: '#ee0404',
                    },
                    '& .MuiDataGrid-cell--textLeft': {
                        textAlign: 'center',
                    },
                    '& .MuiDataGrid-row:hover': {
                        backgroundColor: '#e0e0e0',
                    },
                    '& .css-3eek4p-MuiDataGrid-main': {
                        width: '100%',
                        margin: '0 auto',
                    },
                    '& .MuiDataGrid-columnHeaderTitleContainer': {
                        justifyContent: 'center',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        color: 'white',
                        border: '1px solid black',
                        backgroundColor: '#0099FF',
                    },
                    '& .MuiDataGrid-cell': {
                        border: '1px solid black',
                    },
                    '& .css-1y5vrnu-MuiButtonBase-root-MuiCheckbox-root.Mui-checked': {
                        color: '#000099',
                    },
                    '& .MuiDataGrid-cellEmpty': {
                        width: '0px',
                        maxWidth: 'none',
                    },
                    border: 0,
                }}
            />

            <div className={cx('panigation-footer')}>
                <div className={cx('select-footer')}>
                    <SelectLabels
                        title="Chọn số lượng hiển thị"
                        select={arr}
                        onChange={handleArrChange}
                        Current={array}
                        other="Chon so luong hien thi"
                        widthNumber={false}
                    />
                </div>
                <Stack spacing={2}>
                    <Pagination
                        count={Math.ceil(row.length / array)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        variant="outlined"
                        showFirstButton
                        showLastButton
                        // columnGroupingModel={a}
                        sx={{
                            '& .css-wjh20t-MuiPagination-ul': {
                                justifyContent: 'center',
                            },
                        }}
                    />
                </Stack>
            </div>
        </>
    );
}
