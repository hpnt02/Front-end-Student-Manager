import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateNganhHoc } from '~/redux/apiAdmin/apiAdmin';
import { getKhoa } from '~/redux/apiAdmin/apiAdmin';
import classNames from 'classnames/bind';
import styles from './UpdateNganh.module.scss';
import Input from '~/components/Input';
import SelectLabels from '~/components/Select';
import Button from '~/components/Button';
import config from '~/config';

const cx = classNames.bind(styles);
function UpdateNganh() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const id = location.state?.id;
    const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa) || '';

    useEffect(() => {
        getKhoa(dispatch);
    }, [dispatch]);

    const a = useSelector((state) => {
        const b = state.dshs?.AllNganh?.AllNganh.find((x) => x._id === id);
        return b;
    });
    console.log(a);
    const [inputValue, setInputValue] = useState(a.MaNganh);
    const [inputTenNganh, setInputTenNganh] = useState(a.TenNganh);
    const [inputKhoa, setInputKhoa] = useState(a.Khoa);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleInputChange1 = (e) => {
        setInputTenNganh(e.target.value);
    };

    const handleInputKhoa = (value) => {
        setInputKhoa(value);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedData = {
            MaNganh: inputValue,
            TenNganh: inputTenNganh,
            Khoa: inputKhoa,
        };
        UpdateNganhHoc(updatedData, dispatch, navigate, a._id);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>Thêm mới học sinh</h2>
                    <form className={cx('form-create')} onSubmit={handleUpdate}>
                        <div className={cx('infor-newstudent')}>
                            <div>
                                <div className={cx('witdh-input')}>
                                    <Input
                                        label="Mã ngành"
                                        type="text"
                                        placeholder="Chỉnh sửa mã ngành"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <br />
                                <div className={cx('witdh-input')}>
                                    <Input
                                        label="Tên ngành"
                                        type="text"
                                        placeholder="Chỉnh sửa tên ngành"
                                        value={inputTenNganh}
                                        onChange={handleInputChange1}
                                    />
                                </div>
                                <br />
                                <div className={cx('witdh-input')}>
                                    <SelectLabels
                                        title="Khoa"
                                        select={Allkhoa}
                                        onChange={handleInputKhoa}
                                        other="Khoa"
                                        Current={inputKhoa}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('button-center')}>
                            <Button type="submit" primary>
                                Lưu{' '}
                            </Button>
                            <Button type="text" primary to={config.routesAdmin.qln}>
                                Quay lại{' '}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateNganh;
