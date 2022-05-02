import { lazy, Suspense } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../Components/ProtectedRoute';
import Navigation from '../Components/Navigation';
import HomePage from '../Pages/HomePage';

const SurveyCreatePage = lazy(() => import('../Pages/SurveyCreatePage/SurveyCreatePage'));
const SurveyPage = lazy(() => import('../Pages/SurveyPage/SurveyPage'));
const LoginPage = lazy(() => import('../Pages/LoginPage/LoginPage'));
const SurveyListPage = lazy(() => import('../Pages/SurveyListPage/SurveyListPage'));
const SurveyAnswerPage = lazy(() => import('../Pages/SurveyAnswerPage/SurveyAnswerPage'));

function PageWrapper() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="min-h-screen px-6 pt-32 m-auto sm:px-4">
        <Suspense fallback={<></>}>
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
