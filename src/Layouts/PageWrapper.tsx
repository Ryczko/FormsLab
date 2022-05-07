import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from '../Components/ProtectedRoute';
import Navigation from '../Components/Navigation';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import SurveyCreatePage from '../Pages/SurveyCreatePage';
import SurveyPage from '../Pages/SurveyPage';
import SurveyListPage from '../Pages/SurveyListPage';
import SurveyAnswerPage from '../Pages/SurveyAnswerPage';
import { AnimatePresence } from 'framer-motion';
import Background from '../Components/Background/Background';

function PageWrapper() {
  const location = useLocation();
  return (
    <>
      <Navigation />
      <div className="min-h-screen overflow-hidden px-6 pt-32 m-auto sm:px-4">
        <Background />
        <AnimatePresence exitBeforeEnter initial={false}>
          <Routes location={location} key={location.pathname}>
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
        </AnimatePresence>
      </div>
    </>
  );
}

export default PageWrapper;
