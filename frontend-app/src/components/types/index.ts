// User types
export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'therapist';
    avatar?: string;
    status: 'active' | 'inactive' | 'suspended';
    createdAt: string;
  }
  
  export interface Therapist extends User {
    role: 'therapist';
    specialization?: string;
    licenseNumber?: string;
    patientCount?: number;
    rating?: number;
  }
  
  export interface Admin extends User {
    role: 'admin';
    permissions?: string[];
  }
  
  export interface Patient {
    id: string;
    name: string;
    email: string;
    phone?: string;
    avatar?: string;
    subscription: 'neurea-pro' | 'standard' | 'free';
    status: 'active' | 'suspended' | 'inactive';
    therapistId?: string;
    joinedDate: string;
  }
  
  // Auth types
  export interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    userRole: 'admin' | 'therapist' | null;
    loading: boolean;
    login: (email: string, password: string, role?: string) => Promise<void>;
    logout: () => void;
    verify2FA: (code: string) => Promise<void>;
    resetPassword: (newPassword: string) => Promise<void>;
  }
  
  // Navigation types
  export interface NavigationContextType {
    activeTab: string;
    setActiveTab: (tabId: string) => void;
    previousTab: string;
  }
  
  // Dashboard types
  export interface DashboardStats {
    totalPatients: number;
    activeTherapists: number;
    sessionsThisWeek: number;
    activeUsers: number;
    weeklyChange: string;
    percentageChange: string;
  }
  
  export interface PriorityAction {
    id: string;
    title: string;
    description: string;
    type: 'error' | 'warning' | 'info';
    actionText: string;
    createdAt: string;
  }
  
  // Form types
  export interface LoginFormData {
    email: string;
    password: string;
  }
  
  export interface AddTherapistFormData {
    firstName: string;
    lastName: string;
    email: string;
    specialization: string;
    licenseNumber: string;
  }
  
  export interface PrescriptionFormData {
    patientName: string;
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
    notes: string;
  }
  
  export interface SettingsFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    profileImage?: File;
  }
  
  // API Response types
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }
  
  // Schedule types
  export interface ScheduleDay {
    day: string;
    enabled: boolean;
    startTime?: string;
    endTime?: string;
  }
  
  // Report types
  export interface IncidentReport {
    id: string;
    ticketId: string;
    reportedBy: string;
    reportedEntity: string;
    primaryIssue: string;
    status: 'pending' | 'resolved';
    severity: 'low' | 'medium' | 'high';
    createdAt: string;
    dueDate: string;
  }
  
  // Notification types
  export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    read: boolean;
    createdAt: string;
  }
  