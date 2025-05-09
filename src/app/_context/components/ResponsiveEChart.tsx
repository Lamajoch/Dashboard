import React, { useRef, useEffect } from "react";
import ReactECharts from 'echarts-for-react';

interface ResponsiveEChartProps {
  option: any; 
}

const ResponsiveEChart: React.FC<ResponsiveEChartProps> = ({ option }) => {
  const chartRef = useRef<ReactECharts>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;
  
    const handleResize = () => {
      if (chartRef.current) {
        const echartsInstance = chartRef.current.getEchartsInstance();
          echartsInstance.resize();
      }
    };
  
    if (containerRef.current) {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(containerRef.current);
    }
  
    return () => {
      resizeObserver?.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <ReactECharts
        option={option}
        ref={chartRef}
        style={{ height: "100%", width: "100%" }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
};

export default ResponsiveEChart;