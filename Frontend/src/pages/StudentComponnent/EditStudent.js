import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-phone-number-input/style.css';
import { useFormik } from 'formik';
import { AddStudentValidation, SigninValidation } from '../../Validation/ValidationSchema';
import { InputErrorMessage } from '../../Component/ErrorMessge/InputErrorMessge';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { EditProfileLoader } from '../../Component/common/loader';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AddstudentsApi, EditstudentsApi } from '../../api';
const EditStudent = ({ closeModal,onrefresh,data }) => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    formik.handleChange(e);
  };
//   alert(JSON.stringify(data))
  const calculateCutoff = () => {
    const { maths, physics, chemistry } = formik.values;
    return (parseFloat(maths) + parseFloat(physics) + parseFloat(chemistry)) / 3;
  };
  const formik = useFormik({
    initialValues: {
      name: data?.Name || '',
      email: data?.Email || '',
      dob: data?.dob || '',
      maths: data?.Maths,
      physics: data?.Physics,
      chemistry: data?.Chemistry,
      cutoff: '',
    },
    validationSchema: AddStudentValidation,
    onSubmit: async (values) => {
        const { name,email,maths, physics, chemistry,dob } = values;
      const cutoff = (parseFloat(maths) + parseFloat(physics) + parseFloat(chemistry)) / 3;
      try {
        setLoader(true);
        const res = await EditstudentsApi({
          "name": name,
          "email": email,
          "dob": dob,
          "maths": maths,
          "physics": physics,
          "chemistry": chemistry,
          "cutoff": cutoff.toFixed(2)
        }
        );
        if (res.status === 200) {
          if(res.data.status==true || res.data.status==="true"){
            toast.success(res.data.message);
            onrefresh();
            closeModal();
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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div>
            <label className="form-label">Name: *</label>
            <input
              type="text"
              className={
                Boolean(formik.touched?.email) &&
                Boolean(formik.errors?.email)
                  ? 'form-control border-danger'
                  : 'form-control'
              }
              placeholder="John......."
              name="name"
              value={formik.values.name}
              onChange={handleChange}
            />
            <InputErrorMessage
              error={formik.touched.name && formik.errors.name}
              marginBottom={-5}
            />
          </div>
          <div>
            <label className="form-label">Date of Birth: *</label>
            <Flatpickr
  value={formik.values.dob}
  onChange={(date) => formik.setFieldValue('dob', date[0])}
  options={{
    dateFormat: 'd-m-Y', // Display date in the format dd-mm-yyyy
    altFormat: 'F j, Y',
    altInput: true,
    maxDate: 'today',
    enableTime: false, // Disable time picker
  }}
  className={
    Boolean(formik.touched?.dob) && Boolean(formik.errors?.dob)
      ? 'form-control border-danger'
      : 'form-control'
  }
/>
            <InputErrorMessage
              error={formik.touched.dob && formik.errors.dob}
              marginBottom={-5}
            />
          </div>
          <div>
            <label className="form-label">Email:</label>
            <input
              type="text"
              disabled=true
              className={
                Boolean(formik.touched?.email) &&
                Boolean(formik.errors?.email)
                  ? 'form-control border-danger'
                  : 'form-control'
              }
              placeholder="example@example.com"
              name="email"
              value={formik.values.email}
              onChange={handleChange}
            />
            <InputErrorMessage
              error={formik.touched.email && formik.errors.email}
              marginBottom={-5}
            />
          </div>
          <div>
            <label className="form-label">Maths:</label>
            <input
              type="number"
              className={
                Boolean(formik.touched?.maths) &&
                Boolean(formik.errors?.maths)
                  ? 'form-control border-danger'
                  : 'form-control'
              }
              placeholder="Maths marks"
              name="maths"
              value={formik.values.maths}
              onChange={handleChange}
            />
            <InputErrorMessage
              error={formik.touched.maths && formik.errors.maths}
              marginBottom={-5}
            />
          </div>
          <div>
            <label className="form-label">Physics:</label>
            <input
              type="number"
              className={
                Boolean(formik.touched?.physics) &&
                Boolean(formik.errors?.physics)
                  ? 'form-control border-danger'
                  : 'form-control'
              }
              placeholder="Physics marks"
              name="physics"
              value={formik.values.physics}
              onChange={handleChange}
            />
            <InputErrorMessage
              error={formik.touched.physics && formik.errors.physics}
              marginBottom={-5}
            />
          </div>
          <div>
            <label className="form-label">Chemistry:</label>
            <input
              type="number"
              className={
                Boolean(formik.touched?.chemistry) &&
                Boolean(formik.errors?.chemistry)
                  ? 'form-control border-danger'
                  : 'form-control'
              }
              placeholder="Chemistry marks"
              name="chemistry"
              value={formik.values.chemistry}
              onChange={handleChange}
            />
            <InputErrorMessage
              error={formik.touched.chemistry && formik.errors.chemistry}
              marginBottom={-5}
            />
          </div>
          
          <div className="brief-button-container">
            <button
              type="button"
              className="button-close"
              style={{ width: '100%' }}
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="button-primary"
              style={{ width: '100%' }}
            >
              {loader ? (
                <div className="text-xs text-center">
                  <EditProfileLoader />
                </div>
              ) : (
                'Update Student'
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditStudent;
