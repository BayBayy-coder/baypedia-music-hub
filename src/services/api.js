const API_BASE = import.meta.env.VITE_API_BASE || '/api';

const getToken = () => localStorage.getItem('baypedia_token');

export const api = async (path, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'API request failed');
  return data;
};

export const authApi = {
  captcha: () => api('/auth/captcha', { method: 'POST' }),
  register: (payload) => api('/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  login: (payload) => api('/auth/login', { method: 'POST', body: JSON.stringify(payload) })
};

export const contentApi = {
  articles: () => api('/articles'),
  createArticle: (payload) => api('/articles', { method: 'POST', body: JSON.stringify(payload) }),
  announcements: () => api('/announcements'),
  overview: () => api('/admin/overview'),
  submitRelease: (payload) => api('/releases', { method: 'POST', body: JSON.stringify(payload) }),
  comments: (articleId) => api(`/comments?articleId=${encodeURIComponent(articleId)}`),
  comment: (payload) => api('/comments', { method: 'POST', body: JSON.stringify(payload) })
};
