import React, { createContext, useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import LeftContainerImg from '../images/view-3d-kids-library-removebg-preview.png';
import '../Assets/css/index.css';
import { useFormik } from 'formik';
import 'react-phone-number-input/style.css'
import PasswordInput from '../Component/PasswordInput/Passwordinput';
import { InnerLoader } from '../Component/Loader/InnerLoader';
import { InputErrorMessage } from '../Component/ErrorMessge/InputErrorMessge';
import { SigninValidation } from '../Validation/ValidationSchema';
import { InputComponent } from '../Component/InputElements/InputElements';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api';
import { EditProfileLoader } from '../Component/common/loader';
const LoginPage = () => {


  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SigninValidation,
    onSubmit: async (values) => {
      const { email, password } = values;
  
      try {
        setLoader(true);
        const res = await loginApi({
          "user": email,
          "password": password
        });
        if (res.status === 200) {
          if(res.data.status==true){
            toast.success("Welcome to Student System");
            localStorage.setItem('token', res.data.token);
            navigate('/');
          }
          else{
            const message = res.data.message;
           toast.error(message, { id: 'error' });
          }
          
        }
      } catch (error) {
        setLoader(false);
        const message = error.response.data.message || error.response.statusText;
        toast.error(message, { id: 'error' });
      } finally {
        setLoader(false);
       
      }
    },
  });
  
  return (
    <div className='container  d-flex justify-content-center align-items-center min-vh-100'>
      <div className='row border  bg-white shadow login-container'>
        <div className='col-md-6  p-3 d-flex justify-content-center align-items-center flex-column left-container left-container-login'>
          <div className='featured-image mb-3'>
            <img src={LeftContainerImg} alt='no logo' className='rounded-4 img-fluid logo-img' />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='row align-items-center'>
            <div className='header-text mb-2'>
              <p className='text-xl text-center font-bold p-2 m-1 lg-heading'>Student Information System</p>
            </div>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <InputComponent label="Email address" mandate={true}
                  input={
                    <div>
                      <input type='text' className={Boolean(formik.touched?.email && formik.errors?.email) ? 'form-control border-danger' : 'form-control'} id='email' name='email' placeholder='Enter your Email ID' value={formik.values.email} onChange={formik.handleChange} />
                      <InputErrorMessage error={formik.touched.email && formik.errors.email} />
                    </div>

                  }
                />
                <InputComponent label="Password" mandate={true}
                  input={
                    <div>
                      <PasswordInput
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder="Enter your password"
                        className={Boolean(formik.touched?.password && formik.errors?.password) ? 'form-control border-danger' : 'form-control'}
                        id="password"
                        name="password"
                      />
                      <InputErrorMessage error={formik.touched.password && formik.errors.password} />
                    </div>

                  }
                />
                
                <button type='submit' className='w-full inline-block mt-3 mb-3 pt-2.5 pb-2.5 shadow rounded-2 bg-[#31093b] custom-font'>
                  {!loader ? (
                    <span className='text-center  text-xl text-white'>Sign in</span>
                  ) : (
                    <div className='text-xs w-full'>
                      <EditProfileLoader />
                    </div>
                  )}
                </button>
               
              </form>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;
