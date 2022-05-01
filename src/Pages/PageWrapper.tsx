import { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../Components/ProtectedRoute';
import Navigation from '../Layouts/Navigation';
import HomePage from './HomePage';

const SurveyCreatePage = lazy(() => import('./SurveyCreatePage'));
const SurveyPage = lazy(() => import('./SurveyPage'));
const LoginPage = lazy(() => import('./LoginPage'));
const SurveyListPage = lazy(() => import('./SurveyListPage'));
const SurveyAnswerPage = lazy(() => import('./SurveyAnswerPage'));

function PageWrapper() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="min-h-screen px-6 pt-32 m-auto sm:px-4">
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
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/survey/create"
              element={
                <ProtectedRoute>
                  <SurveyCreatePage />
                </ProtectedRoute>
              }
            />
            <Route path="/survey/:surveyId" element={<SurveyPage />} />
            <Route
              path="/surveys"
              element={
                <ProtectedRoute>
                  <SurveyListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/survey/answer/:surveyId"
              element={
                <ProtectedRoute>
                  <SurveyAnswerPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default PageWrapper;
