import React from 'react';
import 'antd/dist/antd.css'; 
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import { Card } from 'antd';
import DateRange from "./components/DateRange"


function App() {
  return (
    <div className="App">
      <Card title="Campaign Information" className="App-card">
        <DateRange />
      </Card>
    </div>
  );
}

export default App;
