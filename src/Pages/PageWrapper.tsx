import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Navigation from '../Layouts/Navigation/Navigation';
import FormPage from './FormPage/FormPage';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';

function PageWrapper() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="min-h-screen px-8 pt-16 m-auto sm:px-4 bg-zinc-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form/:formId" element={<FormPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default PageWrapper;
