import request from '../utils/request';
export function fetchByName(values) {
  return request(`/api/companies?name=${values}`);
}
