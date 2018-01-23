import request from '../utils/request';

export function fetch({ page }) {
  return request(`/api/bills?_page=${page}&_limit=10`);
}
export function create(values) {
  return request('/api/bills', {
    method: 'POST',
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values),
  });
}
