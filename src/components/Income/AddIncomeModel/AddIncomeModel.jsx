import React from 'react';
import Modal from '../../common/Model/Model'; //
import AddIncomeForm from '../AddIncomeForm/AddIncomeForm'; //

const AddIncomeModal = ({ isOpen, onClose, onAddIncome, onUpdateIncome, editData, isLoading }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={editData ? "Edit Income" : "Add Income"} 
    >
      <AddIncomeForm 
        editData={editData} // Data pass karein form ko
        onAddIncome={(incomeData) => {
          if (editData) {
            onUpdateIncome(editData._id, incomeData);
          } else {
            onAddIncome(incomeData);
          }
        }} 
      />
    </Modal>
  );
};

export default AddIncomeModal;