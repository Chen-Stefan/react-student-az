import HomePage from './pages/HomePage';
import AboutPage from "./pages/AboutPage";
import StudentListPage from "./pages/StudentListPage";
import StudentDetailPage from "./pages/StudentDetailPage";
import NavBar from "./components/NavBar";
import NotFoundPage from './components/NotFoundPage';
import 'bootstrap/dist/css/bootstrap.css'; 
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/about" element={<AboutPage />} exact />
          <Route path="/list" element={<StudentListPage />} exact />
          <Route path="/detail/:id" element={<StudentDetailPage />} exact />
          <Route path="*" element={<NotFoundPage />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
