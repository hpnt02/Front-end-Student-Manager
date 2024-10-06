
import classNames from 'classnames/bind';
import styles from './QLKQ.module.scss';

import { useDispatch,useSelector } from 'react-redux';
import { getLichHoc, getMonHoc,DSLH, GiaoVien, getNamHoc, getHocKy, getLoaiDiem } from '~/redux/apiAdmin/apiAdmin';
import { useEffect} from 'react';
import moment from 'moment';
import { useState } from 'react';
import SelectLabels from '~/components/Select';
import DataGridDemo from '~/components/Test';
import Button from '~/components/Button';
import config from '~/config';
import DeleteLichHoc from './DeleteLichHoc';
import { AccountBoxOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ThemMoiHocSinh from './ThemMoiHocSinh';


const cx = classNames.bind(styles);

function QLKQHT() {

  const columns = [
 
    {
      field: 'MaHocPhan',
      headerName: 'Mã HP',
      width: 80,
    },
    {
      field: 'NhomHP',
      headerName: 'Nhóm HP',
      width: 90,
    },
    {
      field: 'TenMonHoc',
      headerName: 'Tên môn học',
      width: 304,
    },
    {
      field: 'SoTinChi',
      headerName: 'Số TC',
      width: 70, 
    }, 
     {
      field: 'LopHocPhan',
      headerName: 'Lớp',
      width: 120, 
    },
    {
      field: 'Thu',
      headerName: 'Thứ',
      width: 50,
    },
    {
      field: 'Tiet',
      headerName: 'Tiết',
      width: 100,
    },
    {
      field: 'GVGD',
      headerName: 'Giáo viên giảng dạy',
      width: 250,
    },
    {
      field: 'PhongHoc',
      headerName: 'Phòng học',
      width: 100,
    },
    {
      field: 'NgayBatDau',
      headerName: 'Ngày bắt đầu',
      width: 120,
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
          <span title="Thông tin chi tiết" style={{ marginLeft: '8px' }}>
            Xem chi tiết
          </span>
        </div>
      ),
    },
    {
      field: 'TMHS',
      headerName: 'Thêm mới học sinh',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex',cursor: 'pointer', alignItems: 'center', justifyContent:'center' }}  onClick={() => handleTMHSClick(params.row)}>
          <AccountBoxOutlined
            style={{  color: 'blue' }} 
            
          />
          <span title="Xem chương trình" style={{ marginLeft: '8px' }}>
            Thêm học sinh
          </span>
        </div>
      ),
    },
  ];


    const lichhoc = useSelector((state) => state.lichhoc?.lichhoc?.lichhoc)||""  
    const monhoc = useSelector((state) => state.monhoc?.monhoc?.monhoc)||""
    const lophoc = useSelector((state) => state.dslh?.dslh?.dslh)||""
    const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien)||""
    const namhoc = useSelector((state) => state.namhoc?.namhoc?.namhoc)||""
    const hocky = useSelector((state) => state.hocky?.hocky?.hocky)||""
    const [onCancel, setOncancel] = useState(false)
    const [onCancel1, setOncancel1] = useState(false);
    const [LichHocID, setlichHocID] = useState("");
    const navigate = useNavigate()

    const handleIDLichHocChange = () => {
      setOncancel1( false)
    };



    const handleIconClick = (row) => {
      const id = row._id
      const namHoc = row.NamHoc
      const hocKy = row.HocKy
       navigate(config.routesAdmin.dshstm, { state:{id, namHoc, hocKy} });
    };
  
    const handleTMHSClick = (row) => {
      setlichHocID(row._id)
      setOncancel1(true);
    };

    function handleUpdateDiemCancel() {
      setOncancel(false);
    }
    const  handleClickCancel = () => {
      setOncancel(true);
    }

  const dispatch = useDispatch()

//---------------------------------------------------------------------------------
  //Kiểm tra học kỳ hiện tại
  const currentHocKy = []
  let foundMatch = false; 
  // Lặp qua mảng hocky từ cuối đến đầu
  for (let i = hocky.length - 1; i >= 0 && !foundMatch; i--) {
    const HocKy = hocky[i];
    // Kiểm tra xem id có nằm trong lichHoc không
    const isMatched = lichhoc.some(lich => lich.HocKy === HocKy._id); 
    if (isMatched) {
      currentHocKy.push(HocKy);
      foundMatch = true; 
    }
  }
//------------------------------------------------------------------------------

//Kiểm tra học kỳ hiện tại
const currentNamHoc = [];
let foundMatch1 = false;  
// Lặp qua mảng hocky từ trên xuống dưới
for (let i = 0; i < namhoc.length && !foundMatch1; i++) {
  const NamHoc = namhoc[i];
  // Kiểm tra xem id có nằm trong lichHoc không
  const isMatched = lichhoc.some(lich => lich.NamHoc === NamHoc._id);
  if (isMatched) {
    currentNamHoc.push(NamHoc);
    foundMatch1 = true; 
  }
}

//-----------------------------------------------------------------------------------

  const [selectedHocKy, setSelectedHocKy] = useState(currentHocKy[0]?._id||"");
  const [selectedNamHoc, setSelectedNamHoc] = useState(currentNamHoc[0]?._id || "");
 

  const handleHocKyChange = (value) => {
    setSelectedHocKy(value);
   
  };

  const handleNamHocChange = (value) => {
    setSelectedNamHoc(value);
   
  };

  //----------------------------Thông tin cần hiển thị -----------------------------------------------------
  
  const resultArray = [];

  lichhoc.forEach((LichHoc,index) => {
    if( LichHoc.NamHoc === selectedNamHoc && LichHoc.HocKy === selectedHocKy){
        const mhoc = monhoc?.find((monHoc) => monHoc._id === LichHoc.MonHoc);
        const lop = lophoc?.find((lop) => lop._id === LichHoc.LopHoc )
        const GiaoVien =  giaovien?.find((gv) => gv._id === LichHoc.GiaoVien )
        const data = {
          id: index + 1,
          _id:LichHoc._id,
          MaHocPhan: mhoc?.MaMonHoc,
          TenMonHoc: mhoc?.TenMonHoc,
          SoTinChi: mhoc?.SoTC,
          NhomHP: LichHoc.NhomHP,
          LopHocPhan: lop?.MaLopHoc,
          Thu: LichHoc.Thu,
          Tiet: LichHoc.Tiet,
          PhongHoc: LichHoc.PhongHoc,
          GVGD: GiaoVien?.HoGV +" "+ GiaoVien?.TenGV,
          NgayBatDau: moment(LichHoc?.NgayBD).utc().format('DD/MM/YYYY'),
          NamHoc: LichHoc.NamHoc,
          HocKy: LichHoc.HocKy,
        
        };
        resultArray.push(data);
    }
    // Tạo đối tượng mới với dữ liệu đã lọc
  
    // Thêm vào mảng kết quả
  });

    
 
   
  //-----------------------------------------------------------------------------------------------------------------
//-----------------------------------------------Tìm kiếm------------------------------------------------------
// const [records, setRecords] = useState(resultArray);

// function handleFilter(event) {
//   const searchValue = event.target.value.toLowerCase();
//   const newData = resultArray.filter(row => {
//     const mahp = row.MaHocPhan?.toLowerCase() || '';
//     const tenhp = row.TenMonHoc?.toLowerCase() || '';
    
//     return (
//       mahp.includes(searchValue) ||
//       tenhp.includes(searchValue)
//     );
//   });

//   setRecords(newData);
// }
//---------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------
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
//-------------------------------------------------------------------------------------------



    useEffect(() => {
      getLoaiDiem(dispatch)
      getHocKy(dispatch)
      getNamHoc(dispatch)
        GiaoVien(dispatch)
        DSLH(dispatch)
        getMonHoc(dispatch)
        getLichHoc(dispatch)
    }, [dispatch])
   
    return ( 
    
      
        <div className={cx('wrapperr')}>
        <div className={cx('innerr')}>
           <div className={cx('bgr-content')}>
             <h2 className={cx('title')}>Danh sách học phần</h2>
        
            <div className={cx('option')}>
               <SelectLabels 
                    title="Học kỳ"    
                    select={hocky}     
                    onChange={handleHocKyChange}        
                    label="Chọn học kỳ mong muốn"
                    Current={currentHocKy[0]?._id ||""}
                    other="HocKy"    
            />
                <SelectLabels 
                    title="Năm học"    
                    select={namhoc}     
                    onChange={handleNamHocChange}        
                    label="Chọn năm học mong muốn"
                    Current={currentNamHoc[0]?._id ||""}
                    other="NamHoc"     
            />
             {/* <div className={cx('input-search')} onChange={handleFilter}><input type="text" placeholder='Nhập mã môn học hoặc tên môn học' /></div>  */}
            </div>
             <div className={cx('button-create')}>                        
                          <Button type="text" primary to={config.routesAdmin.tmlh}>Thêm mới KHHT</Button>
                          <Button type="text" disabled={selectedIDs.length === 0} primary onClick={handleClickCancel}>Xóa KHHT</Button>                                                                                
                          <Button type="text" primary to={config.routes.home}>Quay lại</Button>        
                 </div>
       <div>
       {onCancel ?                
                  <DeleteLichHoc onCancel={handleUpdateDiemCancel} lichHocID={ selectedIDs}/>:""
                }

{onCancel1 ?                
                  <ThemMoiHocSinh onCancel={handleIDLichHocChange} id={ LichHocID}/>:""
                }

        <DataGridDemo columns={columns} rows={resultArray} data={[]} onClick={handleIDChange}/>
       </div>
           
          </div>

    </div>
    </div>
     
    
 );
     
}

export default QLKQHT;