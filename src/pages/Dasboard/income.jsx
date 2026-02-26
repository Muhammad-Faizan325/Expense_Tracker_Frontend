import React, { useEffect, useState } from 'react';
import DashboardLayout from "../../components/Layouts/dashboardLayout";
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchIncomesThunk, 
  addIncomeThunk, 
  removeIncomeThunk, 
  downloadIncomeExcelThunk ,
  updateIncomeThunk
} from "../../redux/thunks/income.thunk";
import IncomeOverview from "../../components/Income/IncomeOverview/IncomeOverview"; // Image 4 ke mutabiq
import AddIncomeModal from "../../components/Income/AddIncomeModel/AddIncomeModel";
import {toast} from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList/IncomeList';
import DeleteAlert from '../../components/common/DeleteAlert/DeleteAlert';

const Income = () => {
  const dispatch = useDispatch();
  const { incomes, isLoading, isDownloading } = useSelector((state) => state.income);
  
  // ✅ Step 1: State as an Object
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState({ show: false, data: null });
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

  useEffect(() => {
    dispatch(fetchIncomesThunk());
  }, [dispatch]);

  const handleAddIncome = async (incomeData) => {
    try {
      await dispatch(addIncomeThunk(incomeData)).unwrap();
      setOpenAddIncomeModal({ show: false, data: null }); // ✅ Reset state
      toast.success("Income added successfully!");
    } catch (error) {
      toast.error(error || "Failed to add income");
    }
  };

  const handleUpdateIncome = async (id, updatedData) => {
    try {
      await dispatch(updateIncomeThunk({ id, data: updatedData })).unwrap();
      setOpenAddIncomeModal({ show: false, data: null }); // ✅ Modal band
      toast.success("Income updated successfully!");
    } catch (error) {
      toast.error(error || "Failed to update income");
    }
  };

  const handleDeleteIncome = async () => {
    const id = openDeleteAlert.data;
    try {
      await dispatch(removeIncomeThunk(id)).unwrap();
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully!");
    } catch (error) {
      toast.error(error || "Failed to delete income");
    }
  };

  const handleDownloadIncomeDetails = async () => {
    try {
      await dispatch(downloadIncomeExcelThunk()).unwrap();
      toast.success("Excel report downloaded!");
    } catch (error) {
      toast.error(error || "Download failed");
    }
  };

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto px-4 lg:px-8 space-y-7">
        
        <IncomeOverview 
          transactions={incomes} 
          // ✅ Data null matlab "Add Mode"
          onAddIncome={() => setOpenAddIncomeModal({ show: true, data: null })} 
          onDownload={handleDownloadIncomeDetails}
          isDownloading={isDownloading}
        />

        <IncomeList 
          transactions={incomes} 
          onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })} 
          // ✅ Step 2: Edit function pass karein
          onEdit={(income) => setOpenAddIncomeModal({ show: true, data: income })}
          onDownload={handleDownloadIncomeDetails}
        />

      </div>

      {/* ✅ Step 3: Condition check on .show */}
      {openAddIncomeModal.show && (
        <AddIncomeModal 
          isOpen={openAddIncomeModal.show} 
          onClose={() => setOpenAddIncomeModal({ show: false, data: null })} 
          onAddIncome={handleAddIncome}
          onUpdateIncome={handleUpdateIncome}
          editData={openAddIncomeModal.data} // Modal ko data bhejein
          isLoading={isLoading}
        />
      )}

      <DeleteAlert
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        onConfirm={handleDeleteIncome}
        title="Delete Income"
        message="Are you sure you want to delete this income?"
      />
    </DashboardLayout>
  );
};

export default Income;