import { useState } from "react";
import TabbarContent from "./TabbarContent";

const Tabbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Overview"); // State untuk mengelola tab aktif

  return (
    <div className="tab-bar mt-6">
      <div className="tabs flex border-b border-gray-700 justify-evenly">
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "Overview"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-white"
          }`}
          onClick={() => setActiveTab("Overview")}
        >
          Overview
        </button>
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "Character"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-white"
          }`}
          onClick={() => setActiveTab("Character")}
        >
          Character
        </button>
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "Staff"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-white"
          }`}
          onClick={() => setActiveTab("Staff")}
        >
          Staff
        </button>
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "Pictures"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-white"
          }`}
          onClick={() => setActiveTab("Pictures")}
        >
          Pictures
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content mt-4">
        <TabbarContent activeTab={activeTab} contentType="anime"/>
      </div>
    </div>
  );
};

export default Tabbar;
