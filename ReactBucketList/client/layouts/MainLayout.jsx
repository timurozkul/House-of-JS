import React from 'react';
import AccountsIU from '../AccountsUI.jsx';

export const MainLayout = ({content}) => (
  <div className="main-layout">
      <header>
          <h2>My Bucket List</h2>
          <nav>
              <a href="/">Bucket List</a>
              <a href="/about">About</a>
              <AccountsIU />
          </nav>
      </header>
      <main>
          {content}
      </main>
  </div>
);