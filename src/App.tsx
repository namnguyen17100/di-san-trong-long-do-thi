/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header, { NavTab } from './components/Header';
import Footer from './components/Footer';
import ArchitectureModal from './components/ArchitectureModal';
import SearchModal from './components/SearchModal';
import { HeritageItem } from './types/heritage';

// Views
import HomeView from './views/HomeView';
import AboutView from './views/AboutView';
import HeritageExplorerView from './views/HeritageExplorerView';
import HeritageDetailView from './views/HeritageDetailView';
import DigitalRepositoryView from './views/DigitalRepositoryView';
import CulturalMapView from './views/CulturalMapView';
import SourcesVerificationView from './views/SourcesVerificationView';
import ContributionView from './views/ContributionView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('trang-chu');
  const [selectedHeritageId, setSelectedHeritageId] = useState<string>('mo-muong');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isArchModalOpen, setIsArchModalOpen] = useState<boolean>(false);

  const handleNavigateTab = (tab: NavTab) => {
    if (tab === 'kien-truc-he-thong') {
      setIsArchModalOpen(true);
      return;
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHeritageItem = (item: HeritageItem) => {
    setSelectedHeritageId(item.id);
    setCurrentTab('chi-tiet-di-san');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHeritageId = (id: string) => {
    setSelectedHeritageId(id);
    setCurrentTab('chi-tiet-di-san');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f8] text-[#1c1b1b] selection:bg-[#fec25f] selection:text-[#754f00]">
      {/* Sticky Navigation Bar */}
      <Header 
        currentTab={currentTab}
        onNavigate={handleNavigateTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenArchitectureModal={() => setIsArchModalOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1 w-full pt-20">
        {currentTab === 'trang-chu' && (
          <HomeView 
            onNavigate={handleNavigateTab}
            onSelectHeritage={handleSelectHeritageItem}
          />
        )}

        {currentTab === 'gioi-thieu' && (
          <AboutView 
            onNavigate={handleNavigateTab}
          />
        )}

        {currentTab === 'kham-pha-di-san' && (
          <HeritageExplorerView 
            onNavigate={handleNavigateTab}
            onSelectHeritage={handleSelectHeritageItem}
          />
        )}

        {currentTab === 'chi-tiet-di-san' && (
          <HeritageDetailView 
            itemId={selectedHeritageId}
            onNavigateTab={handleNavigateTab}
            onSelectHeritage={handleSelectHeritageId}
          />
        )}

        {currentTab === 'kho-tu-lieu-so' && (
          <DigitalRepositoryView 
            onNavigateTab={handleNavigateTab}
          />
        )}

        {currentTab === 'ban-do-van-hoa' && (
          <CulturalMapView 
            onNavigateTab={handleNavigateTab}
            onSelectHeritage={handleSelectHeritageId}
          />
        )}

        {currentTab === 'nguon-va-kiem-chung' && (
          <SourcesVerificationView 
            onNavigateTab={handleNavigateTab}
          />
        )}

        {currentTab === 'dong-gop-tu-lieu' && (
          <ContributionView 
            onNavigateTab={handleNavigateTab}
          />
        )}
      </main>

      {/* Academic Heritage Footer */}
      <Footer 
        onNavigate={handleNavigateTab}
        onOpenArchitectureModal={() => setIsArchModalOpen(true)}
      />

      {/* Interactive Global Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateTab={handleNavigateTab}
        onSelectHeritage={handleSelectHeritageId}
      />

      {/* Spring Boot + Hibernate + MySQL Architecture Modal */}
      <ArchitectureModal 
        isOpen={isArchModalOpen}
        onClose={() => setIsArchModalOpen(false)}
      />
    </div>
  );
}
