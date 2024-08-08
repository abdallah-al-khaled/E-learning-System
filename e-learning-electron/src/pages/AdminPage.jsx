import { Link} from "react-router-dom";
import '../styles/LoginPage.css';

function AdminPage() {
  return (
    <div className="admin-dashboard">
      <nav className="classes">
        <ul>
          <li><Link to="/admin/add-class">Add Class</Link></li>
          <li><Link to="/admin/list-students">List Students</Link></li>
          <li><Link to="/admin/upload-files">Upload Files</Link></li>
          <li><Link to="/admin/withdraw-class">Withdraw from Class</Link></li> {/* Add link to WithdrawClass */}
        </ul>
      </nav>
      
    </div>
  )
}
export default AdminPage