import React from 'react';
import Modal from '../../common/Model/Model';
import AddExpenseForm from '../AddExpenseForm/AddExpenseForm';

const AddExpenseModal = ({ isOpen, onClose, onAddExpense, onUpdateExpense, editData, isLoading }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}

      title={editData ? "Edit Expense" : "Add Expense"}
    >
      <AddExpenseForm
        editData={editData}
        isLoading={isLoading}
        onAddExpense={(expenseData) => {

          if (editData) {
            onUpdateExpense(editData._id, expenseData);
          } else {
            onAddExpense(expenseData);
          }
          onClose();
        }}
      />
    </Modal>
  );
};

export default AddExpenseModal;