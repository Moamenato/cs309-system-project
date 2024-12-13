import { Route, Routes } from "react-router-dom";
import HomePage1 from './Pages/HomePage1';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage1 />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
  
      </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;
