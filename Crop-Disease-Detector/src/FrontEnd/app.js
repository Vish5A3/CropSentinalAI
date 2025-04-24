import "../FrontEnd/src/app.css";
import AppHeader from "../FrontEnd/appHeader";
import TabBar from "../FrontEnd/tabBar";
import { useState } from "react";
import Detection from "../FrontEnd/detection";
import History from "../FrontEnd/history";
import React from 'react';

const App  = () => 
{
  const [selectedTab, setSelectedTab] = useState("Home");

  const children = [
    React.createElement(AppHeader, { key: 'header' }),
    React.createElement(TabBar, { key: 'tabbar', setSelectedTab })
  ];

  if (selectedTab === "Home") 
  {
    children.push(React.createElement(Detection, { key: 'home' }));
  }

  if (selectedTab === "History") 
  {
    children.push(React.createElement(History, { key: 'history' }));
  }

  return React.createElement('main', null, ...children);
}

export default App;
