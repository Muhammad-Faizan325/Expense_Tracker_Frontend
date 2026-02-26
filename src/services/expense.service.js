import apiClient from "./apiClient.service";

// Expense CRUD operations using apiClient
const addExpense = async (data) => {
  const response = await apiClient.post("/expense/add", data);
  return response.data;
};

const getExpenses = async () => {
  const response = await apiClient.get("/expense/get");
  return response.data.data;
};

const editExpense = async (id, data) => {
  const response = await apiClient.put(`/expense/edit/${id}`, data);
  return response.data.data;
};

const deleteExpense = async (id) => {
  const response = await apiClient.delete(`/expense/delete/${id}`);
  return response.data;
};

// Excel Download Logic
const downloadExpenseExcel = async () => {
  const response = await apiClient.get("/expense/download-excel", {
    responseType: "blob", // File data ke liye zaroori hai
  });
  
  // Browser download trigger logic
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `Expenses_${new Date().toLocaleDateString()}.xlsx`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const expenseService = {
  addExpense,
  getExpenses,
  editExpense,
  deleteExpense,
  downloadExpenseExcel,
};