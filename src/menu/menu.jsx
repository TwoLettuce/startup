import React from 'react';
import "./menu.css";
import { Leaderboard } from './Leaderboard';
import { MatchSelect } from './MatchSelect';

export function Menu() {
  return (
    <main className="menu_main">
      <Leaderboard />
      <MatchSelect />
    </main>
  );
}