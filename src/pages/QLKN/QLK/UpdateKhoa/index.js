import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UpdateKhoa } from '~/redux/apiAdmin/apiAdmin';
import classNames from 'classnames/bind';
import styles from './UpdateKhoa.module.scss';
import Input from '~/components/Input';
const cx = classNames.bind(styles);
function UpdateK() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const id = location.state?.id;

    const a = useSelector((state) => {
        const b = state.dshs?.AllKhoa?.AllKhoa.find((x) => x._id === id);
        return b;
    });

    console.log(a);
    const [inputValue, setInputValue] = useState(a.MaKhoa);
    const [inputTenKhoa, setInputTenKhoa] = useState(a.TenKhoa);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };
    const handleInputChange1 = (e) => {
        setInputTenKhoa(e.target.value);
    };

    const KhoahandleUpdate = (e) => {
        e.preventDefault();
        const updatedData = {
            MaKhoa: inputValue,
            TenKhoa: inputTenKhoa,
        };
        UpdateKhoa(updatedData, dispatch, navigate, a._id);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>Chỉnh sửa thông tin khoa</h2>
                    <form className={cx('form-create')} onSubmit={KhoahandleUpdate}>
                        <div className={cx('infor-newstudent')}>
                            <div>
                                <div className={cx('witdh-input')}>
                                    <Input
                                        label="Mã khoa"
                                        type="text"
                                        placeholder="Chỉnh sửa mã khoa"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <br />
                                <div className={cx('witdh-input')}>
                                    <Input
                                        label="Tên khoa"
                                        type="text"
                                        placeholder="Chỉnh sửa tên khoa"
                                        value={inputTenKhoa}
                                        onChange={handleInputChange1}
                                    />
                                </div>
                                <br />
                            </div>
                        </div>
                        <div className={cx('button-center')}>
                            <button type="submit" className={cx('button-submit')}>
                                Thêm mới
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default UpdateK;
