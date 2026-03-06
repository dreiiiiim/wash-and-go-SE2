import React from 'react';
import { CarFront, Settings, LayoutDashboard } from 'lucide-react';
import type { ViewType } from '../App';

interface NavbarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export default function Navbar({ currentView, onViewChange }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onViewChange('HOME')}
        >
          <div className="text-white p-2 rounded-lg" style={{ backgroundColor: '#ee4923' }}>
            <CarFront size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: '#383838' }}>WASH & GO</h1>
            <p className="text-xs text-gray-500 font-medium tracking-wide">BALIWAG BRANCH</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => onViewChange('HOME')}
            className={`text-sm font-semibold transition-colors ${currentView === 'HOME' ? '' : 'text-gray-600 hover:text-gray-900'}`}
            style={currentView === 'HOME' ? { color: '#ee4923' } : {}}
          >
            HOME
          </button>
          <button 
            onClick={() => onViewChange('CLIENT')}
            className={`hidden md:block text-sm font-semibold transition-colors ${currentView === 'CLIENT' ? '' : 'text-gray-600 hover:text-gray-900'}`}
            style={currentView === 'CLIENT' ? { color: '#ee4923' } : {}}
          >
            BOOK NOW
          </button>
          <button 
             onClick={() => onViewChange('SERVICES')}
             className={`hidden md:block text-sm font-semibold transition-colors ${currentView === 'SERVICES' ? '' : 'text-gray-600 hover:text-gray-900'}`}
             style={currentView === 'SERVICES' ? { color: '#ee4923' } : {}}
          >
            SERVICES & RATES
          </button>
          <button 
             onClick={() => onViewChange('STATUS')}
             className={`text-sm font-semibold transition-colors ${currentView === 'STATUS' ? '' : 'text-gray-600 hover:text-gray-900'}`}
             style={currentView === 'STATUS' ? { color: '#ee4923' } : {}}
          >
            CHECK STATUS
          </button>
          
          <button
            onClick={() => onViewChange('ADMIN')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              currentView === 'ADMIN' 
                ? 'text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={currentView === 'ADMIN' ? { backgroundColor: '#383838' } : {}}
          >
            {currentView === 'ADMIN' ? <LayoutDashboard size={16} /> : <Settings size={16} />}
            {currentView === 'ADMIN' ? 'ADMIN PANEL' : 'STAFF LOGIN'}
          </button>
        </div>
      </div>
    </nav>
  );
}