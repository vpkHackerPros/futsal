import React from 'react';
import './App.global.css';
import MainGrid from './components/MainGrid'
import {PlayerContextProvider} from './context/PlayerContext'
import {StatisticsContextProvider} from './context/StatisticsContext'

export default function App() {
  return (
    <StatisticsContextProvider>
    <PlayerContextProvider>
      <MainGrid />
    </PlayerContextProvider>
    </StatisticsContextProvider>
  );
}
