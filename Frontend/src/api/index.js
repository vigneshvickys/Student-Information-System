import {GET, NOTOKENPOST, POST} from './api-interface';

//login
export const loginApi = (payload) => NOTOKENPOST('/v1/admin/client/login', payload);
export const getstudentsApi = (payload) => GET('/v1/admin/student/getstudents');
export const AddstudentsApi = (payload) => POST('/v1/admin/student/create', payload);
export const EditstudentsApi = (payload) => POST('/v1/admin/student/update', payload);
export const DeleteStudentApi = (payload) => POST('/v1/admin/student/delete', payload);
export const sendEmailStudentApi = (payload) => POST('/v1/admin/client/sendemail', payload);

