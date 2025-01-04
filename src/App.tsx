import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AdminLayout } from './layouts/AdminLayout';
import { CourseManagementPage } from './pages/admin/CourseManagementPage';
import { TutorialStepsPage } from './pages/admin/TutorialStepsPage';
import { SoundManagementPage } from './pages/admin/SoundManagementPage';
import { AnalyticsPage } from './pages/admin/AnalyticsPage';
import { SettingsPage } from './pages/admin/SettingsPage';
import { AchievementCenter } from './components/achievements/AchievementCenter';
import { ProgressProvider } from './contexts/ProgressContext';
import { LessonPage } from './pages/LessonPage';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <ProgressProvider>
          <div className="min-h-screen bg-[#0B1120]">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route path="/" element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 py-8">
                    <Dashboard />
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/admin/*" element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout>
                    <Routes>
                      <Route index element={<CourseManagementPage />} />
                      <Route path="tutorials" element={<TutorialStepsPage />} />
                      <Route path="sounds" element={<SoundManagementPage />} />
                      <Route path="analytics" element={<AnalyticsPage />} />
                      <Route path="settings" element={<SettingsPage />} />
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              } />

              <Route path="/achievements" element={
                <ProtectedRoute>
                  <AchievementCenter />
                </ProtectedRoute>
              } />

              <Route 
                path="/course/:courseSlug/lesson/:lessonSlug" 
                element={
                  <ProtectedRoute>
                    <LessonPage />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </ProgressProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
