import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function PulseVisionApp() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Connect to our Python Broadcasting Tower
    const ws = new WebSocket('ws://localhost:8765');
    
    ws.onmessage = (event) => {
      const incoming = JSON.parse(event.data);
      setData(prevData => {
        const newData = [...prevData, incoming];
        // Keep only the last 50 data points so the wave scrolls smoothly
        return newData.length > 50 ? newData.slice(1) : newData;
      });
    };

    return () => ws.close();
  }, []);

  return (
    
      ⚡ PulseVision Waveform Studio
      
        
          
            
            
            
            
            
          
        
      
    
  );
}
