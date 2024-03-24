import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import { PencilSquare, SendFill, Trash } from 'react-bootstrap-icons';
import SimpleModal from "../Component/Modals/SimpleModal.tsx";
import AddStudent from './StudentComponnent/AddStudent.js';
import FixedHeader from '../Component/common/header.js';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DeleteStudentApi, getstudentsApi, sendEmailStudentApi } from '../api/index.js';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import EditStudent from './StudentComponnent/EditStudent.js';
import { EditProfileLoader } from '../Component/common/loader.js';

const StudentManagement = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [startBrief, setStartBrief] = useState(false);
  const [startBriefedit, setStartBriefedit] = useState(false);
  const columns = [
    // { field: 'id', headerName: 'ID', width: 90, sortable: false },
    { field: 'sno', headerName: 'SNO', width: 90, sortable: false },
    { field: 'Name', headerName: 'Name', width: 150, sortable: false },
    { field: 'Email', headerName: 'Email', width: 355, sortable: false },
    { field: 'DateOfBirth', headerName: 'Date of Birth', width: 210, sortable: false },
    { field: 'Maths', headerName: 'Maths', width: 110, sortable: false },
    { field: 'Physics', headerName: 'Physics', width: 110, sortable: false },
    { field: 'Chemistry', headerName: 'Chemistry', width: 110, sortable: false },
    { field: 'Cutoff', headerName: 'Cutoff', width: 110, sortable: false },
   // { field: 'LastUpdatedAt', headerName: 'Last Updated at', width: 110, sortable: false },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 192,
      sortable: false,
      renderCell: (params) => (
        <div className="flex items-center gap-3">
          <div
            onClick={() =>
              {
                  handleEdit(params.row)
                startBriefDetailsedit()
              }
              
              }
            className="w-10 h-10 flex items-center justify-center rounded-full shadow-lg cursor-pointer"
            style={{ backgroundColor: '#b29104', color: '#fff', fontSize: 15 }}
          >
            <PencilSquare />
          </div>
          <div
            onClick={() => 
              handleDelete(params.row)
            }
            className="w-10 h-10 flex items-center justify-center rounded-full shadow-lg cursor-pointer"
            style={{ backgroundColor: '#f26262', color: '#fff', fontSize: 15 }}
          >
            {
              deleteloader ? <EditProfileLoader /> : <Trash />
            }
            
          </div>
          <div
            onClick={() => handleSend(params.row)}
            className="w-10 h-10 flex items-center justify-center rounded-full shadow-lg cursor-pointer"
            style={{ backgroundColor: 'rgb(75 1 121)', color: '#fff', fontSize: 15 }}
          >
            {
              sendloader ? <EditProfileLoader /> :  <SendFill />
            }
           
          </div>
        </div>
      ),
    },
  ];

  const rows = [
    { id: 1, sno: 1, Name: 'Jon Snow', Email: 'jon@example.com', DateOfBirth: '1990-01-01', Maths: 90, Physics: 85, Chemistry: 95, Cutoff: 270, LastUpdatedAt: '2024-03-23' },
    { id: 2, sno: 2, Name: 'Cersei Lannister', Email: 'cersei@example.com', DateOfBirth: '1980-01-01', Maths: 85, Physics: 90, Chemistry: 80, Cutoff: 255, LastUpdatedAt: '2024-03-22' },
    // Add more rows
  ];
  const[student,setstudent]=useState(null);
  const [deleteloader,setdeleteloader]=useState(false);
  const [sendloader,setsendloader]=useState(false);
  const handleEdit = (row) => {
    setOpenModal(true);
    setSelectedRow(row);
    
  };

  const handleDelete = async(row) => {
    try {
      setdeleteloader(true);
      const res = await DeleteStudentApi({"email": row.Email});
      if (res.status === 200) {
        if(res.data.status==true || res.data.status==="true"){
          toast.success(res.data.message);
          getstudent();
        }
        else{
          const message = res.data.message;
         toast.error(message, { id: 'error' });
        }
        
      }
    } catch (error) {
      setdeleteloader(false);
      const message = error.response.data.message || error.response.statusText;
      toast.error(message, { id: 'error' });
    } finally {
      setdeleteloader(false);
     
    }
   
  };

  const handleSend = async(row) => {
    try {
      setsendloader(true);
      const res = await sendEmailStudentApi({"email": row.Email,"name":row.Name,"cutoff":row.Cutoff,"Maths": row.Maths, physics: row.Physics, chemistry:row.Chemistry,});
      if (res.status === 200) {
        if(res.data.status==true || res.data.status==="true"){
          toast.success(res.data.message);
          //getstudent();
        }
        else{
          const message = res.data.message;
         toast.error(message, { id: 'error' });
        }
        
      }
    } catch (error) {
      setsendloader(false);
      const message = error.response.data.message || error.response.statusText;
      toast.error(message, { id: 'error' });
    } finally {
      setsendloader(false);
     
    }
  };
  const startBriefDetails = () => {
    setStartBrief(!startBrief);
  };
  const startBriefDetailsedit = () => {
    setStartBriefedit(!startBriefedit);
  };
  const [loader, setLoader] = useState(false);
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
  
  const getstudent = async () => {
    try {
      setLoader(true);
      const res = await getstudentsApi();
      if (res.status === 200) {
        const rows = res.data.students.map((student, index) => ({
          id: index + 1,
          sno: index + 1,
          Name: student.name,
          Email: student.email,
          dob:student.dob,
          DateOfBirth: formatDate(student.dob),
          Maths: student.maths,
          Physics: student.physics,
          Chemistry: student.chemistry,
          Cutoff: student.cutoff,
          LastUpdatedAt: student.updatedAt
        }));
        setstudent(rows);
      }
    } catch (error) {
      setLoader(false);
      const message = error?.response?.data?.message;
      if (message === "Unauthorized") {
        toast.error(message, { id: 'error' });
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        toast.error(message, { id: 'error' });
      }
    } finally {
      setLoader(false);
    }
  };
  
  useEffect(() => {
    getstudent()
  }, []);
  
  return (
    <div className='d-flex justify-content-center align-items-center min-vh-100 bg-[#0000] studentbg'>
      <FixedHeader title="Student Information System" />
      <div className='border bg-white shadow m-4 p-4 rounded-lg w-full' style={{height:'73vh'}}>
      
      {startBrief && (
        <SimpleModal
          title="Add Student"
          // description="All fields are mandatory"
          closeModal={startBriefDetails}
        >
         <AddStudent  closeModal={startBriefDetails} onrefresh={getstudent} />
        </SimpleModal>
      )}
       {startBriefedit && (
        <SimpleModal
          title="Edit Student"
          // description="All fields are mandatory"
          closeModal={startBriefDetailsedit}
        >
         <EditStudent  closeModal={startBriefDetailsedit} onrefresh={getstudent} data={selectedRow} />
        </SimpleModal>
      )}
       <div className='mt-2 mb-3'>
       <Button  variant="contained" startIcon={<AddIcon />} onClick={startBriefDetails} >
         Add Students
      </Button>
        
       </div>
        <Box sx={{ width: '100%' }} className=''>
          {
            student &&
            <DataGrid
            rows={student}
            columns={columns}
            initialState={{
              ...student.initialState,
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            pageSizeOptions={[5, 10, 25]}
          />
          }
         
        </Box>
      </div>
    </div>
  );
};

export default StudentManagement;
