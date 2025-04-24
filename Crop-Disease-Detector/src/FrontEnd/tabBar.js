import React from 'react';

export default function TabBar({ setSelectedTab }) 
{
  return React.createElement('section', { className: 'TabBar' },
    React.createElement('button', { onClick: () => setSelectedTab("About") }, 'About'),
    React.createElement('button', { onClick: () => setSelectedTab("Home") }, 'Home'),
    React.createElement('button', { onClick: () => setSelectedTab("History") }, 'History'),
    React.createElement('button', { onClick: () => setSelectedTab("Profile") }, 'Profile')
  );
}
