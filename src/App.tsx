/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import BottomNav, { TabType } from './components/BottomNav';
import Feed from './components/Feed';
import Explore from './components/Explore';
import Create from './components/Create';
import Match from './components/Match';
import Inbox from './components/Inbox';
import Profile from './components/Profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('feed');

  const renderTab = () => {
    switch (activeTab) {
      case 'feed':
        return <Feed />;
      case 'explore':
        return <Explore />;
      case 'create':
        return <Create />;
      case 'match':
        return <Match />;
      case 'inbox':
        return <Inbox />;
      case 'profile':
        return <Profile />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden max-w-md mx-auto relative border-x border-white/5 shadow-2xl">
      <main className="flex-1 overflow-hidden relative">
        {renderTab()}
      </main>
      
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
