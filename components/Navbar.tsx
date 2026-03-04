import React from 'react';
import { CarFront, Shield, Settings, LayoutDashboard, FileText, Search } from 'lucide-react';

interface NavbarProps {
  currentView: 'CLIENT' | 'ADMIN' | 'SERVICES' | 'STATUS';
  onViewChange: (view: 'CLIENT' | 'ADMIN' | 'SERVICES' | 'STATUS') => void;
}

export default function Navbar({ currentView, onViewChange }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onViewChange('CLIENT')}
        >
          <div className="bg-orange-600 text-white p-2 rounded-lg">
            <CarFront size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">WASH & GO</h1>
            <p className="text-xs text-gray-500 font-medium tracking-wide">BALIWAG BRANCH</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => onViewChange('CLIENT')}
            className={`text-sm font-semibold transition-colors ${currentView === 'CLIENT' ? 'text-orange-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            HOME
          </button>
          <button 
             onClick={() => onViewChange('SERVICES')}
             className={`hidden md:block text-sm font-semibold transition-colors ${currentView === 'SERVICES' ? 'text-orange-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            SERVICES & RATES
          </button>
          <button 
             onClick={() => onViewChange('STATUS')}
             className={`text-sm font-semibold transition-colors ${currentView === 'STATUS' ? 'text-orange-600' : 'text-gray-600 hover:text-gray-900'}`}
          >
            CHECK STATUS
          </button>
          
          <button
            onClick={() => onViewChange('ADMIN')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              currentView === 'ADMIN' 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {currentView === 'ADMIN' ? <LayoutDashboard size={16} /> : <Settings size={16} />}
            {currentView === 'ADMIN' ? 'ADMIN PANEL' : 'STAFF LOGIN'}
          </button>
        </div>
      </div>
    </nav>
  );
}