import request from '../utils/request';

export function fetch( params ) {
  let url = '/api/bills';
  console.log(params);
  if (params) {
    let paramsArray = [];
    //拼接参数
    Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]));
    if (url.search(/\?/) === -1) {
      url += '?' + paramsArray.join('&');
    } else {
      url += '&' + paramsArray.join('&');
    }
  }
  return request(url);
}
export function fetchTaxTurnOutSubjects({ page }) {
  return request(`/api/bills/taxTurnOutSubjects`);
}
export function fetchProfessions({ page }) {
  return request(`/api/bills/professions`);
}
export function fetchDepartments({ page }) {
  return request(`/api/departments`);
}
export function fetchCloseDate() {
  return request(`/api/bills/closeDate`);
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
export function update(values) {
  return request('/api/bills', {
    method: 'PUT',
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values),
  });
}
export function del(values) {
  return request('/api/bills', {
    method: 'delete',
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values),
  });
}
export function setCloseDate(values) {
  return request('/api/bills/closeDate', {
    method: 'POST',
    headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values),
  });
}
