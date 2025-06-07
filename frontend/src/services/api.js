import axios from 'axios';

// استيراد متغيرات البيئة
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// إنشاء نسخة من axios مع الإعدادات الأساسية
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// واجهات برمجة المنتجات
export const productsAPI = {
  // الحصول على جميع المنتجات
  getAll: () => api.get('/api/products'),
  
  // الحصول على منتج محدد بواسطة المعرف
  getById: (id) => api.get(`/api/products/${id}`),
  
  // البحث عن منتجات
  search: (query) => api.get(`/api/products/search?q=${query}`),
  
  // الحصول على توصيات مخصصة
  getRecommendations: (userId) => api.get(`/api/recommendations?user_id=${userId}`),
};

// واجهات برمجة المصادقة
export const authAPI = {
  // تسجيل الدخول
  login: (credentials) => api.post('/api/auth/login', credentials),
  
  // إنشاء حساب جديد
  register: (userData) => api.post('/api/auth/register', userData),
  
  // الحصول على بيانات الملف الشخصي
  getProfile: (email) => api.get(`/api/auth/profile?email=${email}`),
  
  // تحديث بيانات الملف الشخصي
  updateProfile: (userData) => api.put('/api/auth/profile', userData),
};

export default {
  productsAPI,
  authAPI,
};
