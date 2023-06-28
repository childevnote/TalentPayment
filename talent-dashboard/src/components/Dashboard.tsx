import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

type DataItem = {
    name: string;
    [key: string]: any; // additional data properties
};

type DashboardProps = {
    title: string;
    data: DataItem[];
    valueKey: string;
};

const Dashboard: React.FC<DashboardProps> = ({ title, data, valueKey }) => {
    // 데이터를 기준으로 정렬
    const sortedData = [...data].sort((a, b) => b[valueKey] - a[valueKey]);

    return (
        <div>
            <h2>{title}</h2>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "bold" }}>순위</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>이름</TableCell>
                            <TableCell sx={{ fontWeight: "bold" }}>{valueKey}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{index + 1}위</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item[valueKey]} 달란트</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Dashboard;
