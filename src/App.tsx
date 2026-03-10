/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./views/Dashboard";
import { Teams } from "./views/Teams";
import { Batters } from "./views/Batters";
import { Pitchers } from "./views/Pitchers";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [year, setYear] = useState(2024);

  const getTitle = () => {
    switch (activeTab) {
      case "dashboard":
        return "대시보드";
      case "teams":
        return "팀별 성적";
      case "batters":
        return "타자 기록";
      case "pitchers":
        return "투수 기록";
      default:
        return "KBO Stats";
    }
  };

  return (
    <div className="flex h-screen bg-black overflow-hidden font-sans px-[150px]">
      <div className="flex flex-1 bg-slate-100 overflow-hidden w-full">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header year={year} setYear={setYear} title={getTitle()} />
          <main className="flex-1 overflow-y-auto">
            {activeTab === "dashboard" && <Dashboard year={year} />}
            {activeTab === "teams" && <Teams year={year} />}
            {activeTab === "batters" && <Batters year={year} />}
            {activeTab === "pitchers" && <Pitchers year={year} />}
          </main>
        </div>
      </div>
    </div>
  );
}
