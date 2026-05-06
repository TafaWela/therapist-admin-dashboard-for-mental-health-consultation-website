import React from 'react';
import logo from '../LOGO.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
function Sidebar({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
    return (
      <aside className="w-[260px] bg-white border-r border-gray-200 flex flex-col flex-shrink-0 z-20 shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
        <img src={logo} alt="Neurea Logo" className="h-14 w-auto object-contain" />
          <span className="text-gray-400 font-bold text-[11px] uppercase tracking-widest ml-3 mt-1 opacity-80">
            Admin
          </span>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto no-scrollbar">
          <p className="px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">System Core</p>
          
          <button 
            onClick={() => setActiveTab('dashboard')} 
            id="nav-dashboard"
            className={`sidebar-tab flex items-center gap-3 px-6 py-3.5 text-[14px] text-gray-600 hover:bg-gray-50 transition-all text-left w-full focus:outline-none border-l-4 ${activeTab === 'dashboard' ? 'sidebar-active' : ''}`}
          >
            <i className="ph-bold ph-squares-four text-lg"></i> Overview
          </button>
  
          <button 
            onClick={() => setActiveTab('reports')} 
            id="nav-reports"
            className={`sidebar-tab flex items-center justify-between px-6 py-3.5 text-[14px] text-gray-600 hover:bg-gray-50 transition-all text-left w-full focus:outline-none border-l-4 ${activeTab === 'reports' ? 'sidebar-active' : ''}`}
          >
            <div className="flex items-center gap-3">
              <i className="ph-bold ph-warning-octagon text-lg"></i> Trust & Safety
            </div>
            <span className="bg-red-100 text-red-600 py-0.5 px-2 rounded-full text-[10px] font-bold">3 New</span>
          </button>
  
          <p className="px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-6">User Management</p>
          
          <button 
            onClick={() => setActiveTab('therapists')} 
            id="nav-therapists"
            className={`sidebar-tab flex items-center justify-between px-6 py-3.5 text-[14px] text-gray-600 hover:bg-gray-50 transition-all text-left w-full focus:outline-none border-l-4 ${activeTab === 'therapists' ? 'sidebar-active' : ''}`}
          >
            <div className="flex items-center gap-3">
              <i className="ph-bold ph-stethoscope text-lg"></i> Therapists
            </div>
          </button>
  
          <button 
            onClick={() => setActiveTab('patients')} 
            id="nav-patients"
            className={`sidebar-tab flex items-center gap-3 px-6 py-3.5 text-[14px] text-gray-600 hover:bg-gray-50 transition-all text-left w-full focus:outline-none border-l-4 ${activeTab === 'patients' ? 'sidebar-active' : ''}`}
          >
            <i className="ph-bold ph-users text-lg"></i> Patients Database
          </button>
  
          <p className="px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 mt-6">App Content</p>
          
          <button 
            onClick={() => setActiveTab('support')} 
            id="nav-support"
            className={`sidebar-tab flex items-center gap-3 px-6 py-3.5 text-[14px] text-gray-600 hover:bg-gray-50 transition-all text-left w-full focus:outline-none border-l-4 ${activeTab === 'support' ? 'sidebar-active' : ''}`}
          >
            <i className="ph-bold ph-envelope-open text-lg"></i> Help Center Inbox
          </button>
        </nav>

      <div className="p-4 border-t border-gray-100">
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-3 w-full p-2 hover:bg-red-50 rounded-xl transition-colors text-gray-600 hover:text-red-600 text-left"
        >
          <i className="ph-bold ph-sign-out text-lg"></i>
          <span className="text-[14px] font-semibold">Log out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;