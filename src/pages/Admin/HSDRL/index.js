
import classNames from 'classnames/bind';
import styles from './HSDRL.module.scss';
import {useNavigate,  useLocation } from 'react-router-dom';
import { useSelector, useDispatch, } from 'react-redux';

import { useEffect, useState} from 'react';
import {  DSHS, getKhoa, getNGANH, getDRL, getLoiViPham,getHocKy, getNamHoc} from '~/redux/apiAdmin/apiAdmin';

import config from '~/config';

import { SummarizeOutlined } from '@mui/icons-material';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import DataGridDemo from '~/components/Test';
import Button from '~/components/Button';
import SelectLabels from '~/components/Select';
import ThemMoiDRL from './ThemMoiDRL';
const cx = classNames.bind(styles);




function HSDRL() {
  const columns = [
    {
      field: 'id',
      headerName: 'STT',
      width: 80,
    },
    {
      field: 'MaHocSinh',
      headerName: 'Mã học sinh',
      width: 150,
    },
    {
      field: 'HoTenHS',
      headerName: 'Họ và tên học sinh',
      width: 354,
    },
    {
      field: 'SoLoiViPham',
      headerName: 'Số lỗi vi phạm',
      width: 200, 
    }, 
     {
      field: 'DRL',
      headerName: 'Điểm rèn luyện',
      width: 200, 
    },
    {
      field: 'ThongTin',
      headerName: 'Thông tin chi tiết',
      width: 300,
      renderCell: (params) => (
        <div style={{ display: 'flex',cursor: 'pointer', alignItems: 'center', justifyContent:'center' }}  onClick={() => handleIconClick(params.row)}>
          <SummarizeOutlined
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
            Nhập điểm rèn luyện
          </span>
        </div>
      ),
    },
  ];
  
    
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const location = useLocation();
  const id = location.state?.id; 
 
       const user = useSelector((state) => state?.auth?.login?.currentUser?.ChucVu?.MaChucVu)||""
  
        const lophoc = useSelector((state) => state.dslh?.dslh?.dslh)||""
        const hocsinh = useSelector((state) => state.dshs?.dshs?.dshs)||[]   
     
         const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh)||""
         const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa)||""
    
        const hocsinhlophoc = lophoc.filter((item) => item._id === id)[0]||""
        const HSLH = hocsinh.filter((item) => item.LopHoc === hocsinhlophoc._id )||""
    
    
        const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien)||[]||""
        const giaovienlophoc = giaovien.filter((item) => item._id === hocsinhlophoc.GiaoVien)[0]||""
    
    
        const nganhhocsinh = Allnganh.filter((item) => item._id === hocsinhlophoc.Nganh)[0]||""
    
         const khoahocsinh = Allkhoa.filter((item) => item._id === nganhhocsinh.Khoa)[0]||""
      
      const count = HSLH.length
        const diemrenluyen = useSelector((state) => state.diemrenluyen?.diemrenluyen?.diemrenluyen)||[]
        const loihs = useSelector((state) => state.loivipham?.loivipham?.loivipham)||""

        const namhoc = useSelector((state) => state.namhoc?.namhoc?.namhoc)||""
        const hocky = useSelector((state) => state.hocky?.hocky?.hocky)||[]
        
         const handleIconClick = (row) => {
          const id = row._id
          const id1=  row.NamHoc
          const id2=  row.HocKy
          navigate(config.routesAdmin.ctlvp, { state:{id, id1, id2} });
             
  };

  //---------------------------------------------------------------------------------
  //Kiểm tra học kỳ hiện tại
  const currentHocKy = []
  let foundMatch = false; 
  // Lặp qua mảng hocky từ cuối đến đầu
  for (let i = hocky.length - 1; i >= 0 && !foundMatch; i--) {
    const HocKy = hocky[i];
    // Kiểm tra xem id có nằm trong lichHoc không
    const isMatched = diemrenluyen.some(drl => drl.HocKy === HocKy._id); 
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
  const isMatched = diemrenluyen.some(drl => drl.NamHoc === NamHoc._id);
  if (isMatched) {
    currentNamHoc.push(NamHoc);
    foundMatch1 = true; 
  }
}

//-----------------------------------------------------------------------------------

//==========================================================================================
const [selectedHocKy, setSelectedHocKy] = useState(currentHocKy[0]?._id ||[]);
  const [selectedNamHoc, setSelectedNamHoc] = useState(currentNamHoc[0]?._id);
 

  const handleHocKyChange = (value) => {
    setSelectedHocKy(value);
    console.log("Selected Học Kỳ:", value);
  };

  const handleNamHocChange = (value) => {
    setSelectedNamHoc(value);
    console.log("Selected Năm Học:", value);
  };

//==========================================================================================


        
       const resultArray = []
HSLH.forEach((hs,index) => {
  const DiemRL = diemrenluyen.filter((drl) => drl.HocSinh === hs._id);
    const diem=[]
    let tongloi = 0
    DiemRL.forEach((d) =>{
      if(d?.NamHoc === selectedNamHoc && d?.HocKy === selectedHocKy){
               diem.push(d)            
           }  
    })
      loihs.forEach((l) =>{
        if(l.HocSinh === hs._id && l.NamHoc === selectedNamHoc && l.HocKy === selectedHocKy){
          tongloi+=1
        }
        return tongloi
      })
    
          const data = {
            id: index + 1,
            _id: hs._id,
            MaHocSinh:hs.MaHS,
            HoTenHS:hs.HoHS +" "+hs.TenHS,
              DRL: diem[0] !== undefined ? diem[0]?.DiemRenLuyen :' ',
              SoLoiViPham: tongloi,
              NamHoc: selectedNamHoc,
              HocKy: selectedHocKy
          };
          resultArray.push(data);
        }

    
    // Tạo đối tượng mới với dữ liệu đã lọc
    )
    // Thêm vào mảng kết quả
  

    const [onCancel, setOncancel] = useState(false)

  
    function handleUpdateDiemCancel() {
      setOncancel(false);
    }

    const [hocSinhId, sethocSinhId] = useState("")
    const handleKHHTClick = (row) => {
      sethocSinhId(row._id)
      setOncancel(true);
    };

          //----------------------------------------------------------------------
       useEffect(() => {
        getHocKy(dispatch)
        getNamHoc(dispatch)
        getLoiViPham(dispatch)
        getDRL(dispatch)
        getKhoa(dispatch)
        getNGANH(dispatch)
        DSHS( dispatch)
            // DSHS(maxItem,dispatch)
    }, [dispatch])
        return ( 
            <div className={cx('wrapperr')}>
                <div className={cx('innerr')}>
                    <div className={cx('bgr-content')}>
                       <h2 className={cx('title')}>Điểm rèn luyện học sinh</h2>
    
                       <div className={cx('infor-student')}>
                     <div>
                       <p>
                            <strong>Mã lớp học:</strong> {hocsinhlophoc.MaLopHoc}
                        </p>
                        <p>
                            <strong>Giáo viên cố vấn:</strong> {giaovienlophoc.HoGV} {giaovienlophoc.TenGV}
                        </p>
                        <p>
                            <strong>Ngành:</strong> {nganhhocsinh.TenNganh}
                        </p>
                    </div>
                    <div>
                     <p>
                            <strong>Tên lớp học:</strong> {hocsinhlophoc.TenLopHoc}
                        </p>               
                        <p>
                            <strong>Sĩ số:</strong> {count}
                        </p>
                        <p>
                            <strong>Khoa:</strong> {khoahocsinh.TenKhoa}
                        </p>
                    </div>
                     <div>
                  
                       
                    </div>  
                </div>
                <div className={cx('option')}>
               <SelectLabels 
                    title="Học kỳ"    
                    select={hocky}     
                    onChange={handleHocKyChange}        
                    label="Chọn học kỳ mong muốn"
                    Current={currentHocKy[0]?._id}
                    other="HocKy"    
            />
                <SelectLabels 
                    title="Năm học"    
                    select={namhoc}     
                    onChange={handleNamHocChange}        
                    label="Chọn năm học mong muốn"
                    Current={currentNamHoc[0]?._id}
                    other="NamHoc"     
            />
          
          <div className={cx('button-create')}>     
            {
                user === '1' ?
                <Button type="text" className={cx('mb')} primary to={config.routesAdmin.qlkv}>Quay lại</Button>      :
                <>
                 
                  <Button type="text" className={cx('mb')} primary to={config.routesAdmin.dslcv}>Quay lại</Button>   
                </>
            }                  
            </div>
            </div>
            {onCancel ?                
                  <ThemMoiDRL onCancel={handleUpdateDiemCancel} studentId={hocSinhId} NamHocID={selectedNamHoc} HocKyID={selectedHocKy}/>:""
                }
               <DataGridDemo columns={columns} rows={resultArray} data={[]}/>
              
           
      </div> :
                    </div>
                </div>
         
         );
 
}

export default HSDRL;

