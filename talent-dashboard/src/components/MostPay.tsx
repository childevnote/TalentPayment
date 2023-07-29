import React from "react";
import Dashboard from "./Dashboard";

const MostPay: React.FC = () => {
  // 사용자별 사용 금액 데이터
  const userPayData = [
       { name: "User 1", amount: 1000 },
    { name: "User 2", amount: 2000 },
    { name: "User 3", amount: 1500 },
    { name: "User 4", amount: 1500 },
    { name: "User 5", amount: 700 },
    { name: "User 6", amount: 2300 },
    { name: "User 7", amount: 2400 },
    { name: "User 8", amount: 11500 },
    { name: "User 9", amount: 150 },
    { name: "User 10", amount: 10 },
  ];

  return (
    <Dashboard title="달란트를 가장 많이 사용한 사람은?" data={userPayData} valueKey="amount" />
  );
};

export default MostPay;

/*const MostPay: React.FC = () => {
  const [userPayData, setUserPayData] = useState([]);

  useEffect(() => {
    // API 호출하여 데이터 받아오는 로직
    const fetchData = async () => {
      try {
        const response = await fetch("API_URL");
        const data = await response.json();
        setUserPayData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Dashboard title="누가 가장 많이 사용했나요?" data={userPayData} valueKey="amount" />
  );
};
*/

