import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/logout');
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🎉 Welcome to the Dashboard!</h1>
      <p>You are now logged in.</p>
      <button onClick={handleLogout} style={{ padding: '10px 20px', marginTop: '20px',backgroundColor:'red',color:'white',borderRadius:'5px',border:'none', }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;