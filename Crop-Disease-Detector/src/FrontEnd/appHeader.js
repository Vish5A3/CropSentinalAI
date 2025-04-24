import React from 'react';

export default function AppHeader() 
{
  return React.createElement('header', { className: 'AppHeader' },
                              React.createElement('h1', null, 'CropSentinel AI'),
    React.createElement('p', null, "Friendly Farmers, Thriving Fields – Your Smarter Farming Starts Here. Detect, Diagnose, and Defend with Every Scan. Protect Crops, Prevent Loss. Healthy Plants, Higher Yields!")
  );
}
