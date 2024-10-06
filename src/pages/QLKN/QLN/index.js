
import classNames from 'classnames/bind';
import styles from './QLN.module.scss';

import config from '~/config';
import { useDispatch,useSelector } from 'react-redux';
import {  DSHS,  DSLH, getKhoa} from '~/redux/apiAdmin/apiAdmin';
import { useEffect, useState} from 'react';
import { Edit } from '@mui/icons-material';
import { Link, useNavigate} from 'react-router-dom';
import DataGridDemo from '~/components/Test';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Button from '~/components/Button';
import DeleteNganh from './DeleteNganh';



const cx = classNames.bind(styles)
function QLN() {

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'MaNganh',
      headerName: 'Mã ngành',
      width: 150,
    
    },
    {
      field: 'TenNganh',
      headerName: 'Tên ngành',
      width: 350,
    },
    {
      field: 'SLHS',
      headerName: 'Số lượng học sinh',
      width: 250,
    
    },
    {
      field: 'TenKhoa',
      headerName: 'Khoa',
      width: 350,
    },
    {
      field: 'ChucNang',
      headerName: 'Chức năng',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex',cursor: 'pointer', alignItems: 'center' }}  onClick={() => handleIconClick(params.row)}>
          <AssignmentIcon 
            style={{  color: 'blue' }} 
            
          />
          <span title="Xem chương trình" style={{ marginLeft: '8px' }}>
            Xem chương trình
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
          <Edit
            style={{  color: 'blue' }} 
            
          />
          <span title="Chỉnh sửa" style={{ marginLeft: '8px' }}>
            Chỉnh sửa thông tin
          </span>
        </div>
      ),
    },
  ];
  
  const hocsinh = useSelector((state) => state.dshs?.dshs?.dshs)||""
  const lophoc = useSelector((state) => state.dslh?.dslh?.dslh)||""
  const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa)||""
 
  const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh)

  const navigate = useNavigate()

  const handleIconClick = (row) => {
    const id = row._id
    navigate(config.routesAdmin.ctdt ,{ state:{id} })
  };

  const handleEditClick = (row) => {
    const id = row._id
    navigate(config.routesAdmin.editkv, { state:{id} });
  };

  const [onCancel, setOncancel] = useState(false)

  
  function handleUpdateDiemCancel() {
    setOncancel(false);
  }
  const  handleClickCancel = () => {
    setOncancel(true);
  }

  const [selectedIDs, setSelectedIDs] = useState([]); // Mảng để lưu các ID đã chọn
  const handleIDChange = (value) => {
    // Kiểm tra xem ID đã có trong mảng chưa
    if (selectedIDs.includes(value)) {
        // Nếu có, xóa ID khỏi mảng
        setSelectedIDs(prevIDs => prevIDs.filter(id => id !== value));
    } else {
        // Nếu chưa có, thêm ID vào mảng
        setSelectedIDs(prevIDs => [...prevIDs, value]);
    }
};

  const dispatch = useDispatch()
  const resultArray = [];
  Allnganh.forEach((nganh,index) => {
    const khoa = Allkhoa?.find((khoa) => khoa._id === nganh?.Khoa);
    let siso = 0; 
    lophoc.forEach((l)=>{
      if(l.Nganh === nganh._id)
        hocsinh.forEach((hs)=>{
            if(hs.LopHoc === l._id)
              siso +=1
      
        })
})
  

    // Tạo đối tượng mới với dữ liệu đã lọc
    const data = {
      id: index + 1,
      _id: nganh._id,
      MaNganh: nganh?.MaNganh,
      SLHS:siso,
      TenNganh: nganh?.TenNganh, // hoặc thuộc tính bạn cần
      TenKhoa: khoa?.TenKhoa, // hoặc thuộc tính bạn cần
      
    };
    
    // Thêm vào mảng kết quả
    resultArray.push(data);
  });
 
  
  useEffect(() => {
    
    DSHS(dispatch)
    DSLH(dispatch)
    getKhoa(dispatch)
 
}, [dispatch])

  return (  
    
           <div>
             {
          window.location.pathname === '/quan-ly-nganh' ?      
            <div className={cx('header-kv')}>
                <div className={cx('innerrr')}>
                      <div className={cx('qlkv')}>
                        <Link to={config.routesAdmin.qlkv}>
                              Quản lý lớp học
                        </Link>
                      </div>
                      <div className={cx('qln')}>
                        <Link to={config.routesAdmin.qln}>
                              Quản lý ngành
                        </Link>
                      </div>
                      <div className={cx('qlk')}>
                        <Link to={config.routesAdmin.qlk}>
                              Quản lý khoa
                        </Link>
                      </div>
                </div>
            </div>:""
           
}
           <div className={cx('wrapperr')}>
         <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                  <h2 className={cx('title')}>Danh sách các ngành nghề</h2>
                  <div className={cx('button-create')}>
                  <div>
                    <Button type="text" primary to={config.routesAdmin.tm}> Thêm mới ngành </Button>
                    <Button type="text" disabled={selectedIDs.length === 0} primary onClick={handleClickCancel}> Xóa ngành</Button>      
                    <Button type="text" primary to={config.routes.home}> Quay lại </Button>    
          
      </div>
     
            </div>

            {onCancel ?                
                  <DeleteNganh onCancel={handleUpdateDiemCancel} NganhId={ selectedIDs}/>:""
                }
          <DataGridDemo columns={columns} rows={resultArray} data={[]} onClick={handleIDChange}/>
         


    </div></div>

    </div>
   </div>
  );
}
export default QLN;