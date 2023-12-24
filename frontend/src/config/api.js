import axios from "./axios-customize";

export const callFetchEmployee = (query) => {
  return axios.get(`/employees?${query}`);
};

export const callCreateEmployee = (createEmployee) => {
  return axios.post(`/employees`, { ...createEmployee });
};

export const callDeleteEmployee = (id) => {
  return axios.delete(`/employees/${id}`);
};

export const callUpdateEmployee = (id, updateEmployee) => {
  return axios.patch(`/employees/${id}`, {
    ...updateEmployee,
  });
};

export const callFetchEmployeeByID = (id) => {
  return axios.get(`/employees/${id}`);
};
