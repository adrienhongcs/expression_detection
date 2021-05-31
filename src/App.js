import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'; 

import CameraDisplay from './hooks/CameraDisplay'
import AppNavbar from './hooks/AppNavBar'


function App() {
  return (
    <div className="App">
      <AppNavbar />
      <CameraDisplay />
    </div>
  );
}

export default App;
