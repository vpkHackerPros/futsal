import React from 'react';
import './App.global.css';
import MainGrid from './components/MainGrid'
import {PlayerContextProvider} from './context/PlayerContext'

export default function App() {
  return (
    <PlayerContextProvider>
      <MainGrid />
    </PlayerContextProvider>
  );
}
