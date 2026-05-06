import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from "./components/context/AuthContext";

// استيراد مكونات الأدمن
import Sidebar from './components/Pages/Admin/Sidebar';
import Navbar from './components/Pages/Admin/Navbar';
import Overview from './components/Pages/Admin/Overview';
import Reports from './components/Pages/Admin/Reports';
import Therapists from './components/Pages/Admin/Therapists';
import Patients from './components/Pages/Admin/Patients'; 
import Support from './components/Pages/Admin/Support';

// 🌟 استيراد صفحات الإعدادات (بناءً على ترتيب الملفات في الصورة)
import Settings from './components/Pages/Settings';

import TherapistDashboard from './components/Pages/TherapistDashboard';
import TherapistSetting from './components/Pages/TherapistSettings'; 

// استيراد صفحة تسجيل الدخول
import Login from './components/Pages/Login';

// 1. عملنا Component جديد مجمع شكل لوحة تحكم الأدمن كلها
const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar activeTab={activeTab} />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'dashboard' && <Overview setActiveTab={setActiveTab} />}
          {activeTab === 'reports' && <Reports />}
          {activeTab === 'therapists' && <Therapists />}
          {activeTab === 'patients' && <Patients />}
          {activeTab === 'support' && <Support />}
        </main>
      </div>
    </div>
  );
};

// 2. الكومبوننت الأساسي اللي بيتحكم في المسارات (الراوتر)
function App() {
  const { isLoggedIn, userRole, user } = useAuth(); // بنجيب حالة تسجيل الدخول ودور المستخدم
  const storedUser = user ?? (() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  })();
  const effectiveRole = userRole || storedUser?.role || null;
  const defaultRedirect = effectiveRole === 'therapist' ? '/therapist' : '/admin';

  return (
    <Routes>
      {/* مسار اللوجين */}
      <Route 
        path="/login" 
        element={!isLoggedIn ? <Login /> : <Navigate to={defaultRedirect} replace />} 
      />

      {/* مسار الأدمن */}
      <Route 
        path="/admin" 
        element={isLoggedIn && effectiveRole === 'admin' ? <AdminLayout /> : <Navigate to={defaultRedirect} replace />} 
      />

      {/* مسار الثيرابيست */}
      <Route 
        path="/therapist" 
        element={isLoggedIn && effectiveRole === 'therapist' ? <TherapistDashboard /> : <Navigate to={defaultRedirect} replace />} 
      />

      {/* 🌟 مسار إعدادات الأدمن */}
      <Route 
        path="/settings" 
        element={isLoggedIn && effectiveRole === 'admin' ? <Settings /> : <Navigate to={defaultRedirect} replace />} 
      />

      {/* 🌟 مسار إعدادات الثيرابيست الجديد */}
      <Route 
        path="/therapist-settings" 
        element={isLoggedIn && effectiveRole === 'therapist' ? <TherapistSetting /> : <Navigate to={defaultRedirect} replace />} 
      />

      {/* أي مسار تاني غلط نرجعه للصفحة الصحيحة حسب الدور */}
      <Route 
        path="*" 
        element={<Navigate to={isLoggedIn ? defaultRedirect : "/login"} replace />} 
      />
    </Routes>
  );
}

export default App;