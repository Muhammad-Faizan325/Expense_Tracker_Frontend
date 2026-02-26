import React, { useEffect, useState } from 'react';
import DashboardLayout from "../../components/Layouts/dashboardLayout";
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchExpensesThunk, 
  addExpenseThunk, // Ensure addExpenseThunk is imported
  updateExpenseThunk, 
  downloadExpenseExcelThunk, 
  removeExpenseThunk 
} from "../../redux/thunks/expense"; 
import ExpenseOverview from "../../components/Expense/ExpenseOverview/ExpenseOverview";
import AddExpenseModal from "../../components/Expense/AddIncomeModel/AddIncomeModel"; // Name corrected to AddExpenseModal
import { toast } from 'react-hot-toast';
import ExpenseList from '../../components/Expense/ExpenseList/ExpenseList';
import DeleteAlert from '../../components/common/DeleteAlert/DeleteAlert';

const Expense = () => {
  const dispatch = useDispatch();
  const { expenses, isLoading, isDownloading } = useSelector((state) => state.expense);
  
  // ✅ Step 1: State as an Object (Same as Income)
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState({ show: false, data: null });
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

  useEffect(() => {
    dispatch(fetchExpensesThunk());
  }, [dispatch]);

  // Handle Add Expense
  const handleAddExpense = async (expenseData) => {
    try {
      await dispatch(addExpenseThunk(expenseData)).unwrap();
      setOpenAddExpenseModal({ show: false, data: null });
      toast.success("Expense added successfully!");
    } catch (error) {
      toast.error(error || "Failed to add expense");
    }
  };

  // ✅ Step 2: Handle Update Expense
  const handleUpdateExpense = async (id, updatedData) => {
    try {
      await dispatch(updateExpenseThunk({ id, data: updatedData })).unwrap();
      setOpenAddExpenseModal({ show: false, data: null });
      toast.success("Expense updated successfully!");
    } catch (error) {
      toast.error(error || "Failed to update expense");
    }
  };

  const handleDeleteExpense = async () => {
    const id = openDeleteAlert.data;
    try {
      await dispatch(removeExpenseThunk(id)).unwrap();
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense deleted successfully!");
    } catch (error) {
      toast.error(error || "Failed to delete expense");
    }
  };

  const handleDownloadExpenseDetails = async () => {
    try {
      await dispatch(downloadExpenseExcelThunk()).unwrap();
      toast.success("Expense report downloaded!");
    } catch (error) {
      toast.error(error || "Download failed");
    }
  };

  return (
    <DashboardLayout activeMenu="Expenses">
      <div className="my-5 mx-auto px-4 lg:px-8 space-y-7">
        
        <ExpenseOverview 
          transactions={expenses} 
          // ✅ Open modal in Add mode
          onAddExpense={() => setOpenAddExpenseModal({ show: true, data: null })} 
          onDownload={handleDownloadExpenseDetails}
          isDownloading={isDownloading}
        />

        <ExpenseList 
          transactions={expenses} 
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })} 
          // ✅ Step 3: Edit function pass kiya
          onEdit={(expense) => setOpenAddExpenseModal({ show: true, data: expense })}
          onDownload={handleDownloadExpenseDetails}
        />
      </div>

      {/* ✅ Step 4: Logic update for Modal */}
      {openAddExpenseModal.show && (
        <AddExpenseModal 
          isOpen={openAddExpenseModal.show} 
          onClose={() => setOpenAddExpenseModal({ show: false, data: null })} 
          onAddExpense={handleAddExpense}
          onUpdateExpense={handleUpdateExpense} // Passed update handler
          editData={openAddExpenseModal.data}   // Passed existing data
          isLoading={isLoading}
        />
      )}

      <DeleteAlert
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        onConfirm={handleDeleteExpense}
        title="Delete Expense"
        message="Are you sure you want to delete this expense?"
      />
    </DashboardLayout>
  );
};

export default Expense;