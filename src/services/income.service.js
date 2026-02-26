import apiClient from "./apiClient.service";

const addIncome = async (data) => {
  const response = await apiClient.post("/income/add", data); //
  return response.data;
};

const getIncomes = async () => {
  const response = await apiClient.get("/income/get"); //
  return response.data;
};

const editIncome = async (id, data) => {
  const response = await apiClient.put(`/income/edit/${id}`, data);
  return response.data.data;
};

const deleteIncome = async (id) => {
  const response = await apiClient.delete(`/income/delete/${id}`);
  return response.data;
};

const downloadIncomeExcel = async () => {
  const response = await apiClient.get("/income/download-excel", {
    responseType: "blob",
  });
  
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `Income_Report_${new Date().toLocaleDateString()}.xlsx`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const incomeService = {
  addIncome,
  getIncomes,
  editIncome,
  deleteIncome,
  downloadIncomeExcel,
};