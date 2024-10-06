import classNames from 'classnames/bind';
import styles from '../TTHS.module.scss';
import { useState } from 'react';
import {  useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import Input from '~/components/Input';
import SelectLabels from '~/components/Select';
const cx = classNames.bind(styles);
function UpdateThongTin() {
    const location = useLocation();
    const id = location.state?.id; 
    const hocsinh = useSelector((state) => state.dshs?.dshs?.dshs)
    const hocsinhtuongung = hocsinh.filter((state) => state._id === id)[0]||""
    // const user = useSelector((state) => state.auth.login?.currentUser);
    const a = useSelector((state) => state.auth.login?.currentUser?.HocSinh);
    const student = hocsinhtuongung ? hocsinhtuongung : a
    const lop = useSelector((state) => state.dslh?.dslh?.dslh)||""
    const loptuongung= lop.filter((state) => state._id === student.LopHoc)[0]||""
    const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh)||""
    const nganhtuongung = Allnganh.filter((state) => state._id === loptuongung.Nganh)[0]||""
    const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa)||""
    const khoatuongung = Allkhoa.filter((state) => state._id === nganhtuongung.Khoa)[0]||""
    const phuhuynh = useSelector((state) => state.phuhuynh?.phuhuynh?.phuhuynh)||""
    const phuhuynhtuongung = phuhuynh.filter((state) => state.HocSinh === student._id)[0]||""

    // const dispatch = useDispatch();

    //Thông tin học sinh
    const [inputValue, setInputValue] = useState(student.MaHS);
    const [inputHoHS, setInputHoHS] = useState(student.HoHS + "" +student.TenHS);
    const [inputNgaySinh, setInputNgaySinh] = useState(moment(a.NgaySinh).utc().format('DD/MM/YYYY'));
    const [inputDiaChi, setInputDiaChi] = useState(student.DiaChi);
    const [inputCCCD, setInputCCCD] = useState(student.CCCD)
    const [inputlop, setInputLop] = useState(student.LopHoc);
    const [inputNganh, setInputNganh] = useState(nganhtuongung._id);
    const [inputKhoa, setInputKhoa] = useState(khoatuongung._id);
    const [inputHTMe, setInputHTMe] = useState(phuhuynhtuongung.HoTenMe);
    const [inputNNMe, setInputNNMe] = useState(phuhuynhtuongung.NgheNghiepMe);
    const [inputSDTMe, setInpuSDTMe] = useState(phuhuynhtuongung.SDTMe);
    const [inputHTCha, setInputHTCha] = useState(phuhuynhtuongung.HoTenCha);
    const [inputNNCha, setInputNNCha] = useState(phuhuynhtuongung.NgheNghiepCha);
    const [inputSDTCha, setInputSDTCha] = useState(phuhuynhtuongung.SDTCha);
 

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
      };
      
      const handleInputChange4 = (e) => {
        setInputHoHS(e.target.value)
      };

      const handleInputChange8 = (e) =>{
        setInputNgaySinh(e.target.value)
      }

      const handleInputChange6 = (e) =>{
        setInputDiaChi(e.target.value)
      }
      
      const handleInputChange7 = (e) =>{
        setInputCCCD(e.target.value)
      }

      const handleInputChange1 = (value) => {
        setInputLop(value)
      };

      const handleInputNganh = (value) => {
        setInputNganh(value)
      };

      const handleInputKhoa = (value) => {
        setInputKhoa(value)
      };

      const handleInputHoTenMe = (value) => {
        setInputHTMe(value)
      };

      const handleInputNNMe = (value) => {
        setInputNNMe(value)
      };

      const handleInputSDTMe = (value) => {
        setInpuSDTMe(value)
      };

      const handleInputHoTenCha = (value) => {
        setInputHTCha(value)
      };

      const handleInputNNCha = (value) => {
        setInputNNCha(value)
      };

      const handleInputSDTCha = (value) => {
        setInputSDTCha(value)
      };
 
    return ( 
        <div className={cx('wrapper')}>
        <div className={cx('inner')}>
            <div className={cx('tths')}>
                
                    
                <h2 className={cx('title')}>Chỉnh sửa thông tin học sinh</h2>               
                <div className={cx('infor-student')}>
                 <div>
                 <Input label='Mã học sinh' type="text" disable={true}  placeholder="Chỉnh sửa mã học sinh" value={inputValue} onChange={handleInputChange}/>   
                    <br/>
                 <Input label='Họ tên học sinh' type="text" disable={true} placeholder="Chỉnh sửa họ học sinh" value={inputHoHS} onChange={handleInputChange4}/>            
                    <br/>
                 <Input label='Ngày sinh' type="date" placeholder="Chỉnh sửa ngày sinh" value={inputNgaySinh} onChange={handleInputChange8}/>                                
                    <br/>
                 <Input label='Địa chỉ' type="text" placeholder="Chỉnh sửa địa chỉ" value={inputDiaChi} onChange={handleInputChange6}/>                  
                   
                </div>
                 <div>
                 <Input label='CCCD' type="text" placeholder="Chỉnh sửa CCCD" value={inputCCCD} onChange={handleInputChange7}/>                  
                    <br/>
                 <SelectLabels 
                    title="Lớp học"    
                    select={lop}     
                    onChange={handleInputChange1}
                     other="LopHoc"
                     disable={true}
                     Current={inputlop}
            />    
                         <br/>
                 <SelectLabels 
                    title="Ngành"    
                    select={Allnganh}     
                    onChange={handleInputNganh}
                     other="Nganh"
                     disable={true}
                     Current={inputNganh}
            />   
                     <br/>
                 <SelectLabels 
                    title="Khoa"    
                    select={Allkhoa}     
                    onChange={handleInputKhoa}
                     other="Khoa"
                     disable={true}
                     Current={inputKhoa}
            />   
                </div>  
            </div>
            <h2 className={cx('title')}>Thông tin phụ huynh</h2>
                <div className={cx('infor-student')}>
                 <div>
                   
                   <Input label='Họ tên mẹ' type="text" placeholder="Chỉnh sửa họ tên mẹh" value={inputHTMe} onChange={handleInputHoTenMe}/>                  
                    <br/>             
                 <Input label='Nghề nghiệp mẹ' type="text" placeholder="Chỉnh sửa nghề nghiệp mẹ" value={inputNNMe} onChange={handleInputNNMe}/>                  
                 <br/>
                   <Input label='Só điện thoại mẹ' type="text" placeholder="Chỉnh sửa só điện thoại mẹ" value={inputSDTMe} onChange={handleInputSDTMe}/>                  
                </div>
                 <div>
                 <Input label='Họ tên cha' type="text" placeholder="Chỉnh sửa họ tên cha" value={inputHTCha} onChange={handleInputHoTenCha}/>                  
                 <br/>
                    <Input label='Nghề nghiệp cha' type="text" placeholder="Chỉnh sửa nghề nghiệp cha" value={inputNNCha} onChange={handleInputNNCha}/>                  
                    <br/>
                    <Input label='Só điện thoại cha' type="text" placeholder="Chỉnh sửa só điện thoại cha" value={inputSDTCha} onChange={handleInputSDTCha}/>                  
                  
                </div>  
            </div>
        </div>
    </div>
    </div>
);
     
}

export default UpdateThongTin;