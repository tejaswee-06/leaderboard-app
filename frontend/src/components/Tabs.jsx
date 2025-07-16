import React from 'react';

function Tabs({ activeTab, setActiveTab, activeSubTab, setActiveSubTab }) {
  const mainTabs = ['Party Ranking', 'Live Ranking', 'Hourly Ranking', 'Family Ranking'];
  const subTabs = ['Weekly Contribution', 'Weekly Charm'];

  return (
    <>
      <div className="nav-tabs">
        {mainTabs.map(tab => (
          <button
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="sub-tabs">
        {subTabs.map(tab => (
          <button
            key={tab}
            className={activeSubTab === tab ? 'active' : ''}
            onClick={() => setActiveSubTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </>
  );
}

export default Tabs;