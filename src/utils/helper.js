import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
export const validatePassword = (password) => {
  return password.length >= 8;
};
/**
 * Numbers ko format karne ke liye (e.g., 10000 -> 10,000)
 */
export const addThousandsSeparator = (num) => {
    if (num === null || isNaN(num) || num === undefined) return "0";

    // Number ko string mein convert karke decimal point se split karna
    const [integerPart, fractionalPart] = num.toString().split(".");

    // Regex use karke har 3 digit ke baad comma lagana
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Agar decimal part hai toh usay sath wapis jod dena
    return fractionalPart 
        ? `${formattedInteger}.${fractionalPart}` 
        : formattedInteger;
};

// utils/helper.js ya directly component mein
export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));

  return chartData;
};


export const prepareIncomeBarChartData = (data) => {
  if (!data || !Array.isArray(data)) {
    return []; 
  }

  // 1. Pehle filter karein taake jin items mein date nahi hai wo sorting kharab na karein
  const validData = data.filter(item => item?.date);

  // 2. Robust Sorting: getTime() use karein taake exact comparison ho
  const sortedData = [...validData].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateA - dateB; // Purani date pehle, nayi date baad mein
  });

  // 3. Mapping
  const chartData = sortedData.map((item) => ({
    // Date formatting
    month: moment(item.date).format('Do MMM'), 
    amount: Number(item?.amount) || 0, // Ensure amount is a number
    source: item?.source || "N/A",
  }));

  return chartData; 
};