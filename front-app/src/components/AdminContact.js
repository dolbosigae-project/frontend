import AdminContactDefaultTable from './AdminContactDefaultTable';
import AdminContactNormalTable from './AdminContactNormalTable';
import SubTitleAdminContact from './SubTitles/SubTitleAdminContact';
import AdminContactWrite from './AdminContactWrite';
import { Link } from 'react-router-dom';

export default function AdminContact() {


  return(
    <div>
      <SubTitleAdminContact/>
      <AdminContactDefaultTable/>
      <AdminContactNormalTable/>
      <Link to='/admin/write' style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}>
        <button
          style={{
            width: '200px', height: '40px', backgroundColor: '#595959',
            color: 'white', marginBottom: '100px'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          글쓰기
        </button>
      </Link>
    </div>
  );
}