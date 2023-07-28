import React from "react";
import Dashboard from "./Dashboard";

const MostBalance: React.FC = () => {
  // 사용자별 잔액 데이터
  const userBalanceData = [
    { name: "User 1", balance: 1000 },
    { name: "User 2", balance: 2000 },
    { name: "User 3", balance: 1500 },
    { name: "User 4", balance: 1500 },
    { name: "User 5", balance: 700 },
    { name: "User 6", balance: 2300 },
    { name: "User 7", balance: 2400 },
    { name: "User 8", balance: 11500 },
    { name: "User 9", balance: 150 },
    { name: "User 10", balance: 10 },
  ];

  return (
    <Dashboard title="남은 달란트가 가장 많은 사람은 누구인가요?" data={userBalanceData} valueKey="balance" />
  );
};

export default MostBalance;

/*
const MostBalance: React.FC = () => {
  const [userBalanceData, setUserBalanceData] = useState([]);

  useEffect(() => {
    // API 호출하여 데이터 받아오는 로직
    const fetchData = async () => {
      try {
        const response = await fetch("API_URL");
        const data = await response.json();
        setUserBalanceData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
   return (
    <Dashboard title="남은 달란트가 가장 많은 사람은 누구인가요?" data={userBalanceData} valueKey="balance" />
  );
};
*/
