import React from 'react';
import "./menu.css";
import { Leaderboard } from './Leaderboard';
import { MatchSelect } from './MatchSelect';

export function Menu( { username, password }) {
  return (
    <main className="menu_main">
      <Leaderboard username={username} />
      <MatchSelect username={username} />
    </main>
  );
}