import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../../components/Layouts/dashboardLayout";
import { fetchDashboardStats } from "../../redux/thunks/dasboard.thunk";
import InfoCard from "../../components/common/cards/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";
import { cardsData } from "../../utils/data";
import RecentTransactions from "../../components/Dashboard/RecentTransaction/RecentTransaction";
import { useNavigate } from "react-router-dom";
import FinanceOverview from "../../components/Dashboard/FinanceOverview/FinanceOverview";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions/ExpenseTransactions";
import Last30DaysExpenses from "../../components/Dashboard/last30DaysExpense/last30DaysExpense";
import RecentIncomeWithChart from "../../components/Dashboard/RecentIncomeWithChart/RecentIncomeWithChart";
import RecentIncome from "../../components/Dashboard/RecentIncome/RecentIncome";

function Home() {
  const dispatch = useDispatch();
  const { stats, isLoading } = useSelector((state) => state.dashboard);
  const navigate = useNavigate();
2
  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const displayCards = useMemo(() => cardsData(stats), [stats]);

  const expenseTransactions = useMemo(() => {
    return stats?.recentTransactions?.expense || [];
  }, [stats]);

  return (
    <DashboardLayout activeMenu="dashboard">
      <div className="my-5 mx-2">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {!isLoading &&
            displayCards.map((card, index) => (
              <InfoCard
                key={index}
                label={card.label}
                value={`PKR ${addThousandsSeparator(card.value)}`}
                icon={card.icon}
                iconColor={card.color}
                iconBg={card.bg}
              />
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentTransactions
            transactions={expenseTransactions}
            onSeeMore={() => navigate("/expense")}
          />

          <FinanceOverview
            totalBalance={stats?.totalBalance || 0}
            totalIncome={stats?.totalIncome || 0}
            totalExpense={stats?.totalExpenses || 0}
          />
          <ExpenseTransactions
            transactions={stats?.last30DaysExpenses}
            onSeeMore={() => navigate("/expense")}
          />

          <Last30DaysExpenses
            data={stats?.last30DaysExpenses?.transactions || []}
          />
          <RecentIncomeWithChart
            data={stats?.last60DaysIncome?.transactions || []}
            totalIncome={stats?.totalIncome || 0}
          />
          <RecentIncome
            transactions={stats?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;
