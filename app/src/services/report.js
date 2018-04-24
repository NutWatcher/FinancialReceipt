import request from '../utils/request';

export function fetchGroupByTurnOutSubject({ date, departmentName }) {
  return request(`/api/report/billGroupByTurnOutSubject?department=${departmentName}&date=${date}`);
}
