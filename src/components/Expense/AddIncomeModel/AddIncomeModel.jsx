import React from 'react';
import Modal from '../../common/Model/Model'; 
import AddExpenseForm from '../AddExpenseForm/AddExpenseForm'; 

const AddExpenseModal = ({ isOpen, onClose, onAddExpense, onUpdateExpense, editData, isLoading }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      // ✅ Title change based on mode
      title={editData ? "Edit Expense" : "Add Expense"} 
    >
      <AddExpenseForm 
        editData={editData} // ✅ Purana data form ko bhejein
        isLoading={isLoading}
        onAddExpense={(expenseData) => {
          // ✅ Agar editData hai toh Update, warna Add
          if (editData) {
            onUpdateExpense(editData._id, expenseData);
          } else {
            onAddExpense(expenseData);
          }
          onClose(); // Kaam khatam, modal band
        }} 
      />
    </Modal>
  );
};

export default AddExpenseModal;