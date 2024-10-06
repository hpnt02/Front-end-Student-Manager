import classNames from 'classnames/bind';
import styles from './UpdateDiem.module.scss';
import {useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { TMDiem, getDiem, getHocKy, getLoaiDiem, getNamHoc } from '~/redux/apiAdmin/apiAdmin';
import Input from '~/components/Input';
import SelectLabels from '~/components/Select';

const cx = classNames.bind(styles);                              
function UpdateDiem({ studentId, MonHocID, onCancel,NamHocID, HocKyID }) {
//lấy id học sinh
    const hs = useSelector((state) => {
        const b = state.dshs?.dshs?.dshs.find((x) => x._id === studentId);
         return b
      });
      
//lấy id môn học
      const monhoc = useSelector((state) => {
        const b = state.monhoc?.monhoc?.monhoc.find((x) => x._id === MonHocID);
         return b
      });
      

      const loaiDiem = useSelector((state) => state.loaidiem?.loaidiem?.loaidiem);
      const hocKy = useSelector((state) => state.hocky?.hocky?.hocky);
      const namHoc = useSelector((state) => state.namhoc?.namhoc?.namhoc);
      const namhoctuongung = namHoc.filter((item) => item._id === NamHocID)[0]
      const hockytuongung = hocKy.filter((item) => item._id === HocKyID)[0]
     

      const [diem, setDiem] = useState("")
      const [loaidiem, setloaiDiem] = useState("")
    
      const handleLoaiDiem = (value) => {
        setloaiDiem(value);
      };

      const handleCreate= async(e) =>{
        e.preventDefault();
        const newDiem = {
           HocSinh: studentId,
           MonHoc:MonHocID,
            Diem: diem,
           LoaiDiem: loaidiem,
           HocKy: HocKyID,
           NamHoc: NamHocID
        }
 

      TMDiem(newDiem, dispatch);       
        }


      const dispatch = useDispatch()

      useEffect(() =>{
        getDiem(dispatch)
        getNamHoc(dispatch)
        getHocKy(dispatch)
        getLoaiDiem(dispatch)
      },[dispatch])

      const [isHidden, setIsHidden] = useState(false);

      const handleCancel = () => {
        setIsHidden(true);
        onCancel(); // Invoke the onCancel callback from props
      };
      
      if (isHidden) {
        return null;
      }
    return ( 
        <div className={cx('wrapperrr')}>
            <div className={cx('innerrr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>Nhập điểm học sinh</h2>
                    <div className={cx('infor')}>
                        <div className={cx('diem-time')}>

                        <p>
                            <strong>
                            Tên môn học:
                            </strong> {monhoc ?monhoc.TenMonHoc :""}
                        </p>
                        <p>
                            <strong>
                            Họ và tên học sinh:
                            </strong> {hs?hs.HoHS:""} {hs?hs.TenHS:""}
                        </p>     
                        </div>
                            <div className={cx('diem-time')}>                      
                            <p>
                            <strong>Học kỳ:</strong> {hockytuongung ?hockytuongung.TenHocKy:""}
                            </p> 
                        <p>
                            <strong>Năm học:</strong> {namhoctuongung ?namhoctuongung.TenNamHoc :""}
                            </p>                                    

                            </div>
                    </div>
                    <form className={cx('form-create')} onSubmit={handleCreate}>
                    <Input label='Điểm' placeholder='Vui lòng nhập điểm' onChange={(e) =>setDiem(e.target.value)}/>
                    <SelectLabels 
                    title="Loại điểm"    
                    select={loaiDiem}     
                    onChange={handleLoaiDiem}
                     other="LoaiDiem"
            />              
                
    
                    <div className={cx('format-button')}>
                    <button className={cx('button-submit')} onClick={handleCancel}>Hủy</button>
                     <button type='submit' className={cx('button-submit')}>Thêm mới</button>
            </div>
                    </form>
                </div>
                </div>
                </div>
     );
}

export default UpdateDiem;