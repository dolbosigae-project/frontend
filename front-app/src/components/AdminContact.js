import AdminContactDefaultTable from './AdminContactDefaultTable';
import AdminContactNormalTable from './AdminContactNormalTable';
import SubTitleAdminContact from './SubTitles/SubTitleAdminContact';

export default function AdminContact() {


  return(
    <div>
      <SubTitleAdminContact/>
      <AdminContactDefaultTable/>
      <AdminContactNormalTable/>
    </div>
  );
}