import api from './index';

export const announcementApi = {
  getActive: () => api.get('/announcements/active'),
};

export default announcementApi;
