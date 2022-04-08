import { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Navigation from '../Layouts/Navigation';
import HomePage from './HomePage';

const CreatePage = lazy(() => import('./CreatePage'));
const FormPage = lazy(() => import('./FormPage'));
const LoginPage = lazy(() => import('./LoginPage'));
const FormRaportPage = lazy(() => import('./FormRaportPage'));
const AnswerPage = lazy(() => import('./AnswerPage'));

function PageWrapper() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="min-h-screen px-8 pt-16 m-auto sm:px-4 bg-zinc-50">
        <Suspense
          fallback={
            <div className="flex items-center justify-center transition-all duration-250 animate-pulse">
              <div className="flex-1 py-1 space-y-6">
                <div className="h-screen ease-in-out rounded-lg bg-gradient-to-r from-zinc-100 to-transparent"></div>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/form/:formId" element={<FormPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/form-raport/:formId" element={<FormRaportPage />} />
            <Route path="/answer/:formId" element={<AnswerPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default PageWrapper;
