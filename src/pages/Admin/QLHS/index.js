import classNames from 'classnames/bind';
import styles from './QLHS.module.scss';
import config from '~/config';

import {  useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import moment from 'moment';
import {  DSHS,  DSLH, getNGANH, getKhoa} from '~/redux/apiAdmin/apiAdmin';
import { useEffect,useState } from 'react';
import React from 'react';
import 'tippy.js/dist/tippy.css'
import  DataGridDemo from '~/components/Test';
import { AccountBoxOutlined, Edit } from '@mui/icons-material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Button from '~/components/Button';
import DeleteHS from './DeleteHS';
import Switch from '@mui/material/Switch';



const cx = classNames.bind(styles);


function QLHS() {


  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'MaHocSinh',
      headerName: 'Mã học sinh',
      width: 100,
    
    },
    {
      field: 'TenHocSinh',
      headerName: 'Tên học sinh',
      width: 150,
    },
    {
      field: 'GioiTinh',
      headerName: 'Giới tính',
      width: 110,
    
    },
    {
      field: 'DiaChi',
      headerName: 'Địa chỉ',
      width: 200,
    },
    {
      field: 'NgaySinh',
      headerName: 'Ngày Sinh',
      width: 100,
    },
    {
      field: 'TenLop',
      headerName: 'Tên lớp',
      width: 200,
    },
    {
      field: 'TenNganh',
      headerName: 'Tên ngành',
      width: 200,
    },
    {
      field: 'TenKhoa',
      headerName: 'Tên khoa',
      width: 200,
    },
    {
      field: 'ThongTin',
      headerName: 'Thông tin chi tiết',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex',cursor: 'pointer', alignItems: 'center', justifyContent:'center' }}  onClick={() => handleIconClick(params.row)}>
          <AccountBoxOutlined
            style={{  color: 'blue' }} 
            
          />
          <span title="Xem chương trình" style={{ marginLeft: '8px' }}>
            Xem chi tiết
          </span>
        </div>
      ),
    },
    {
      field: 'KHHT',
      headerName: 'Kế hoạch học tập',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex',cursor: 'pointer', alignItems: 'center', justifyContent:'center' }}  onClick={() => handleKHHTClick(params.row)}>
          <FactCheckIcon
            style={{  color: 'blue' }} 
            
          />
          <span title="Xem KHHT" style={{ marginLeft: '8px' }}>
            Xem kế hoạch học tập
          </span>
        </div>
      ),
    },
    {
      field: 'KQHT',
      headerName: 'Kết quả học tập',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex',cursor: 'pointer', alignItems: 'center', justifyContent:'center' }}  onClick={() => handleKQHTClick(params.row)}>
          <FactCheckIcon
            style={{  color: 'blue' }} 
            
          />
          <span title="Xem KQHT" style={{ marginLeft: '8px' }}>
            Xem kết quả học tập
          </span>
        </div>
      ),
    },
    {
      field: 'ChinhSua',
      headerName: 'Chỉnh sửa thông tin',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex',cursor: 'pointer', alignItems: 'center', justifyContent:'center' }}  onClick={() => handleEditClick(params.row)}>
          <Edit style={{  color: 'blue' }} />
          <span title="Chỉnh sửa" style={{ marginLeft: '8px' }}>
            Chỉnh sửa thông tin
          </span>
        </div>
      ),
    },
  ];
  
  //Lấy ra danh sách học sinh
  const hocsinh = useSelector((state) => state.dshs?.dshs?.dshs)||[]
  //Lấy ra danh sách lớp học
  const lophoc = useSelector((state) => state.dslh?.dslh?.dslh)||""
  //Lấy ra danh sách ngành
  const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh)||""
  //Lấy ra danh sách khoa
  const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa)||""
  //Gán số lượng hiển thị trên 1 trang
 
  const navigate = useNavigate()

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Lấy giá trị từ localStorage khi trang được tải
    const storedValue = localStorage.getItem('switchValue');
    if (storedValue !== null) {
      setChecked(JSON.parse(storedValue));
    }
  }, []);

  const handleSwitch = (event) => {
    setChecked(event.target.checked);
    // Lưu giá trị vào localStorage
    localStorage.setItem('switchValue', event.target.checked);
  };


  
  localStorage.setItem('Switch', checked);

  const [onCancel, setOncancel] = useState(false)

  
    function handleUpdateDiemCancel() {
      setOncancel(false);
    }
    const  handleClickCancel = () => {
      setOncancel(true);
    }
    
    const [selectedIDs, setSelectedIDs] = useState([]); // Mảng để lưu các ID đã chọn

    const handleIDChange = (value) => {
      if (value === undefined) return; // Ngăn không cho xử lý giá trị undefined
  
      if (selectedIDs.includes(value)) {
          setSelectedIDs(prevIDs => prevIDs.filter(id => id !== value));
      } else {
          setSelectedIDs(prevIDs => [...prevIDs, value]);
      }
  };

  const resultArray = [];
  hocsinh.forEach((hs,index) => {
    const lop = lophoc?.find((lop) => lop._id === hs.LopHoc);
    const nganh = Allnganh?.find((nganh) => nganh._id === lop?.Nganh);
    const khoa = Allkhoa?.find((khoa) => khoa._id === nganh?.Khoa);
    
    // Tạo đối tượng mới với dữ liệu đã lọc
    const data = {
      id: index + 1,
      _id: hs._id,
      MaHocSinh: hs.MaHS,
      TenHocSinh: hs.HoHS + " " +hs.TenHS,
      GioiTinh: hs.GioiTinh=== true ? "Nam" :"Nữ",
      DiaChi: hs.DiaChi,
      NgaySinh:moment(hs.NgaySinh).utc().format('DD/MM/YYYY'),
      TenLop: lop?.TenLopHoc, // hoặc thuộc tính bạn cần
      TenNganh: nganh?.TenNganh, // hoặc thuộc tính bạn cần
      TenKhoa: khoa?.TenKhoa, // hoặc thuộc tính bạn cần
      
    };
    
    // Thêm vào mảng kết quả
    resultArray.push(data);
  });
  

  const handleIconClick = (row) => {
    const id = row._id
    navigate(config.routes.tths, { state:{id} });
  };
  const handleEditClick = (row) => {
    const id = row._id
    navigate(config.routesAdmin.edit, { state:{id} });
  };


  const handleKHHTClick = (row) => {
    const id = row._id
    navigate(config.routesAdmin.lhhs, { state:{id} });
  };

  const handleKQHTClick = (row) => {
    const id = row._id
     navigate(config.routesAdmin.bdhs, { state:{id} });
 };

const dispatch = useDispatch()
 const [records, setRecords] = useState(resultArray)
 function handleFilter(event) {
  const searchValue = event.target.value.toLowerCase();

  const newData = resultArray.filter(row => {
    const tenHocSinh = row.TenHocSinh?.toLowerCase() || '';
    const maHS = row.MaHocSinh?.toLowerCase() || '';
    
    return (
      tenHocSinh.includes(searchValue) ||
      maHS.includes(searchValue)
    );
  });

  setRecords(newData);
}

useEffect(() => {
          DSHS(dispatch)
          DSLH(dispatch)
          getNGANH(dispatch)
          getKhoa(dispatch)
  }, [dispatch])
  
    return ( 
        <div className={cx('wrapperr')}>               
         <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                 <h2 className={cx('title')}>
                    DANH SÁCH HỌC SINH
                 </h2>
              <div className={cx('tool')}>
              <div className={cx('search')}><input type="text" onChange={handleFilter} placeholder="Nhập mã học sinh hoặc tên học sinh"/></div>               
                  <div className={cx('button-create')}>
                          {window.location.pathname === '/quan-ly-hoc-sinh' ? (          
                            <> 
                             <Switch
  checked={checked}
  onChange={handleSwitch}
  inputProps={{ 'aria-label': 'controlled' }}
/>
                          <Button type="text" primary to={config.routesAdmin.tmhs}>Thêm mới học sinh</Button>  
                          <Button type="text" disabled={selectedIDs.length === 0} primary onClick={handleClickCancel}>
                                                    Xóa học sinh
                          </Button>                
                          </>                       
                  ):""}                                
                          <Button type="text" primary to={config.routes.home}>Quay lại</Button>        
                 </div>
              </div>
                <div>
                  {onCancel ?                
                  <DeleteHS onCancel={handleUpdateDiemCancel} studentId={ selectedIDs}/>:""
                }
<DataGridDemo columns={columns} rows={records} data={[]} onClick={handleIDChange}/>

        

                 </div>
                </div>
            </div>
        </div>
)
}

export default QLHS;

