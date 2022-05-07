import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../Components/ProtectedRoute';
import Navigation from '../Components/Navigation';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import SurveyCreatePage from '../Pages/SurveyCreatePage';
import SurveyPage from '../Pages/SurveyPage';
import SurveyListPage from '../Pages/SurveyListPage';
import SurveyAnswerPage from '../Pages/SurveyAnswerPage';

function PageWrapper() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="min-h-screen px-6 pt-32 m-auto sm:px-4">
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
      </div>
    </BrowserRouter>
  );
}

export default PageWrapper;
