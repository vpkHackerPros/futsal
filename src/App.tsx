import React from 'react';
import MainGrid from './components/MainGrid'
import { HalftimeContextProvider } from './context/HalftimeContext';
import {PlayerContextProvider} from './context/PlayerContext'
import {StatisticsContextProvider} from './context/StatisticsContext'
import useKeyPress from './hooks/useKeyPress'

export default function App() {
  useKeyPress(() => console.log('esc'), "b")
  return (
    <HalftimeContextProvider>
    <StatisticsContextProvider>
    <PlayerContextProvider>
      <MainGrid />
    </PlayerContextProvider>
    </StatisticsContextProvider>
    </HalftimeContextProvider>
  );
}
