import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ParentPage from "./pages/ParentPage";
import TeacherPage from "./pages/TeacherPage";
import AdminPage from "./pages/AdminPage";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/parent" element={<ParentPage />} />
        <Route path="/teacher" element={<TeacherPage />} />
       
      </Routes>
    </BrowserRouter>
  );
}