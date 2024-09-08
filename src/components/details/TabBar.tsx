import { useState } from "react";
import TabbarContent from "./TabbarContent";

const Tabbar: React.FC<{ type: string }> = ({ type }) => {
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
        {type === "anime" && (
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
        )}
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
        <button
          className={`px-4 py-2 focus:outline-none ${
            activeTab === "Externals"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-white"
          }`}
          onClick={() => setActiveTab("Externals")}
        >
          Externals
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content mt-4">
        {type === "anime" ? (
          <TabbarContent activeTab={activeTab} contentType="anime" />
        ) : (
          <TabbarContent activeTab={activeTab} contentType="manga" />
        )}
      </div>
    </div>
  );
};

export default Tabbar;
