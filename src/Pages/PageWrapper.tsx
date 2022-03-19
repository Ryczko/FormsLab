import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Navigation from '../Layouts/Navigation/Navigation';
import FormPage from './FormPage/FormPage';
import HomePage from './HomePage/HomePage';

function PageWrapper() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="m-auto pt-16 px-8 sm:px-4 bg-zinc-50 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form/:formId" element={<FormPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default PageWrapper;
