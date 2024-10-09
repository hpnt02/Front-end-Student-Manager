import classNames from 'classnames/bind';
import styles from './ThemMoiLH.module.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNGANH, TMLH } from '~/redux/apiAdmin/apiAdmin';
import Button from '~/components/Button';
import config from '~/config';
import Input from '~/components/Input';
import SelectLabels from '~/components/Select';

const cx = classNames.bind(styles);
function ThemMoiLH() {
    const dispatch = useDispatch();
    const navigate = useDispatch();
    const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh);
    const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien) || '';

    const [malop, setMaLop] = useState('');
    const [tenlop, setTenLop] = useState('');
    const [nganh, setNganh] = useState('');
    const [gv, setGV] = useState('');

    const handleChangeGiaoVien = (value) => {
        setGV(value);
    };

    const handleChangeNganh = (value) => {
        setNganh(value);
    };

    const nganhtuongung = Allnganh?.filter((ng) => ng._id === nganh)[0]?.Khoa || '';
    const giaovientuongung = giaovien?.filter((gv) => gv.Khoa === nganhtuongung);

    const handleCreate = async (e) => {
        e.preventDefault();
        const newLop = {
            MaLopHoc: malop,
            TenLopHoc: tenlop,
            Nganh: nganh,
            GiaoVien: gv,
        };

        const response = await TMLH(newLop, dispatch, navigate);

        // Kiểm tra nếu response payload chứa giá trị LopHoc
        if (response && response.data && response.data.Nganh) {
            // Cập nhật lớp học hiển thị trên màn hình
            setNganh(response.data.Nganh);
        }
    };

    useEffect(() => {
        //Danh sách ngành
        getNGANH(dispatch);
    }, [dispatch]);
    return (
        <div className={cx('bgr-content')}>
            <h2 className={cx('title')}>Thêm mới lớp học</h2>
            <form className={cx('form-create')} onSubmit={handleCreate}>
                <div>
                    <Input
                        label="Mã lớp"
                        placeholder="Vui lòng nhập mã lớp"
                        onChange={(e) => setMaLop(e.target.value)}
                    />

                    <br />
                    <Input
                        label="Tên lớp"
                        placeholder="Vui lòng nhập tên lớp"
                        onChange={(e) => setTenLop(e.target.value)}
                    />
                    <br />
                    <SelectLabels title="Ngành" select={Allnganh} onChange={handleChangeNganh} other="Nganh" />
                    <br />
                    <SelectLabels
                        title="Giáo viên"
                        select={giaovientuongung}
                        onChange={handleChangeGiaoVien}
                        other="GiaoVien"
                    />
                    <br />
                    <div className={cx('button-class')}>
                        <Button primary type="submit">
                            Thêm mới
                        </Button>
                        <Button primary type="text" to={config.routesAdmin.qlkv}>
                            Quay lại
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ThemMoiLH;
