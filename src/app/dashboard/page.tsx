"use client";

import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import ResponsiveEChart from "../_context/components/ResponsiveEChart";

const ResponsiveGridLayout = WidthProvider(Responsive);
  
const lg = [
    { i: "statcard1", x: 0, y: 0, w: 3, h: 4 },
    { i: "statcard2", x: 3, y: 0, w: 3, h: 4 },
    { i: "statcard3", x: 6, y: 0, w: 3, h: 4 },
    { i: "statcard4", x: 9, y: 0, w: 3, h: 4 },
    { i: "eventTrends", x: 0, y: 4, w: 7, h: 10 },
    { i: "completionPie", x: 7, y: 4, w: 5, h: 10 },
    { i: "revisitBar", x: 0, y: 15, w: 6, h: 10 },
    { i: "formClose", x: 6, y: 15, w: 6, h: 10 },
    { i: "map", x: 0, y: 25, w: 12, h: 20 },
    { i: "activity", x: 0, y: 45, w: 7, h: 10 },
    { i: "stepCompletion", x: 7, y: 45, w: 5, h: 10 }
];
  
const md = [
    { i: "statcard1", x: 0, y: 0, w: 5, h: 4 },
    { i: "statcard2", x: 5, y: 0, w: 5, h: 4 },
    { i: "statcard3", x: 0, y: 4, w: 5, h: 4 },
    { i: "statcard4", x: 5, y: 4, w: 5, h: 4 },
    { i: "eventTrends", x: 0, y: 8, w: 10, h: 10 },
    { i: "completionPie", x: 0, y: 18, w: 10, h: 10 },
    { i: "revisitBar", x: 0, y: 28, w: 5, h: 10 },
    { i: "formClose", x: 5, y: 28, w: 5, h: 10 },   
    { i: "map", x: 0, y: 38, w: 10, h: 20 },
    { i: "activity", x: 0, y: 58, w: 5, h: 10 },
    { i: "stepCompletion", x: 5, y: 58, w: 5, h: 10 }
];

const sm = [
    { i: "statcard1", x: 0, y: 0, w: 1, h: 4 },
    { i: "statcard2", x: 0, y: 4, w: 1, h: 4 },
    { i: "statcard3", x: 0, y: 8, w: 1, h: 4 },
    { i: "statcard4", x: 0, y: 12, w: 1, h: 4 },
    { i: "eventTrends", x: 0, y: 16, w: 1, h: 10 },
    { i: "completionPie", x: 0, y: 26, w: 1, h: 10 },
    { i: "revisitBar", x: 0, y: 36, w: 1, h: 10 },
    { i: "formClose", x: 0, y: 46, w: 1, h: 10 },
    { i: "map", x: 0, y: 56, w: 1, h: 20 },
    { i: "activity", x: 0, y: 76, w: 1, h: 10 },
    { i: "stepCompletion", x: 0, y: 86, w: 1, h: 10 }
];

const LOCAL_STORAGE_KEY = "dashboard_layouts";
const defaultLayouts = { lg, md, sm };

const Dashboard = () => {

    const [layouts, setLayouts] = useState(defaultLayouts);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        try {
            const savedLayouts = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedLayouts) {
                setLayouts(JSON.parse(savedLayouts));
            }
        } catch (error) {
            console.error("Error loading layouts from localStorage:", error);
        }
    }, []);
    
    const saveLayouts = () => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(layouts));
            setIsEditMode(false);
            alert("Dashboard layout opgeslagen!");
        } catch (error) {
            console.error("Error saving layouts to localStorage:", error);
            alert("Er is een fout opgetreden bij het opslaan van de layout.");
        }
    };

    const onLayoutChange = (_currentLayout: any, allLayouts: any) => {
        if (isEditMode) {
            setLayouts(allLayouts);
        }
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const resetToDefault = () => {
        setLayouts(defaultLayouts);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        setIsEditMode(false);
        alert("Dashboard layout is hersteld naar de standaard instellingen.");
    };

    const lineChartOption = {
        title: { 
            text: "Sample Chart" 
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: ['A', 'B', 'C', 'D']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [1, 3, 2, 4],
                type: "line"
            }
        ]
    };

    const pieChartOption = {
        title: { 
            text: "Completion" 
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
            {
                type: 'pie',
                name: 'Completed',
                radius: '70%',
                center: ['50%', '50%'],
                data: [
                    { name: "Done", value: 60 },
                    { name: "Remaining", value: 30 },
                    { name: "Deals", value: 10 }
                ],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    const revisitBarOption = {
        title: { 
            text: "Customer Revisits" 
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Gewonnen', 'Open']
        },
        xAxis: {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        yAxis: {
            type: 'value',
            name: 'Revisits'
        },
        series: [
            {
                type: 'bar',
                name: 'Gewonnen',
                data: [49, 71, 106, 129, 144, 176]
            },
            {
                type: 'bar',
                name: 'Open',
                data: [83, 78, 98, 93, 106, 84]
            }
        ]
    };

    const formCloseOption = {
        title: { 
            text: "Gewonnen deals" 
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{b}: {c}%'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        yAxis: {
            type: 'value',
            name: 'Percentage',
            axisLabel: {
                formatter: '{value}%'
            }
        },
        series: [
            {
                type: 'line',
                name: 'Gewonnen deals',
                data: [63, 67, 72, 78, 82, 85],
                areaStyle: {},
                smooth: true
            }
        ]
    };

    const regionOption = {
        title: { 
            text: "Regional Performance" 
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{b}: €{c}'
        },
        xAxis: {
            type: 'category',
            data: ['North', 'East', 'South', 'West', 'Central']
        },
        yAxis: {
            type: 'value',
            name: 'Sales (€)',
            axisLabel: {
                formatter: '€{value}'
            }
        },
        series: [
            {
                type: 'bar',
                name: 'Sales',
                data: [120000, 95000, 75000, 110000, 145000],
                itemStyle: {
                    color: function(params: { dataIndex: number }) {
                        const colorList = ['#c23531','#2f4554','#61a0a8','#d48265','#91c7ae'];
                        return colorList[params.dataIndex];
                    }
                }
            }
        ]
    };

    const activityOption = {
        title: { 
            text: "Daily User Activity" 
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{b}: {c} users'
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value',
            name: 'Active Users',
            min: 0
        },
        series: [
            {
                type: 'line',
                name: 'Active Users',
                data: [143, 176, 202, 148, 187, 236, 225],
                symbol: 'circle',
                symbolSize: 6,
                itemStyle: {
                    color: '#5470c6'
                },
                lineStyle: {
                    width: 3
                }
            }
        ]
    };

    const stepCompletionOption = {
        title: { 
            text: "Workflow Steps" 
        },
        tooltip: {
            trigger: 'axis',
            formatter: '{b}: {c}%'
        },
        xAxis: {
            type: 'value',
            name: 'Completion %',
            max: 100,
            axisLabel: {
                formatter: '{value}%'
            }
        },
        yAxis: {
            type: 'category',
            data: ['Planning', 'Design', 'Development', 'Testing', 'Deployment'].reverse()
        },
        series: [
            {
                type: 'bar',
                name: 'Progress',
                data: [90, 80, 85, 40, 30].reverse(),
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{c}%'
                }
            }
        ]
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <div className="flex space-x-2">
                    {isEditMode ? (
                        <>
                            <button 
                                onClick={saveLayouts} 
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                            >
                                Opslaan
                            </button>
                            <button 
                                onClick={toggleEditMode} 
                                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                            >
                                Annuleren
                            </button>
                            <button 
                                onClick={resetToDefault} 
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                            >
                                Reset
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={toggleEditMode} 
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            Bewerken
                        </button>
                    )}
                </div>
            </div>
            <ResponsiveGridLayout
                className="layout"
                layouts={layouts}
                breakpoints={{ lg: 1200, md: 996, sm: 768 }}
                cols={{ lg: 12, md: 10, sm: 1 }}
                rowHeight={30}
                onLayoutChange={onLayoutChange}
                isDraggable={isEditMode}
                isResizable={isEditMode}
            >
                <div key="statcard1" className="bg-white p-2 border">
                    <div className="text-sm text-gray-600">Leads</div>
                    <div className="text-xl font-bold">131</div>
                </div>
                <div key="statcard2" className="bg-white p-2 border">
                    <div className="text-sm text-gray-600">Deals</div>
                    <div className="text-xl font-bold">27</div>
                </div>
                <div key="statcard3" className="bg-white p-2 border">
                    <div className="text-sm text-gray-600">Revenue</div>
                    <div className="text-xl font-bold">€43,200</div>
                </div>
                <div key="statcard4" className="bg-white p-2 border">
                    <div className="text-sm text-gray-600">Conversion</div>
                    <div className="text-xl font-bold">17%</div>
                </div>

                <div key="eventTrends" className="bg-white p-2 border h-full w-full">
                    <ResponsiveEChart option={lineChartOption} />
                </div>

                <div key="completionPie" className="bg-white p-2 border h-full w-full">
                    <ResponsiveEChart option={pieChartOption} />
                </div>

                <div key="revisitBar" className="bg-white p-2 border h-full w-full">
                    <ResponsiveEChart option={revisitBarOption} />
                </div>

                <div key="formClose" className="bg-white p-2 border h-full w-full">
                    <ResponsiveEChart option={formCloseOption} />
                </div>

                <div key="map" className="bg-white p-2 border h-full w-full">
                    <ResponsiveEChart option={regionOption} />
                </div>

                <div key="activity" className="bg-white p-2 border h-full w-full">
                    <ResponsiveEChart option={activityOption} />
                </div>      

                <div key="stepCompletion" className="bg-white p-2 border h-full w-full">
                    <ResponsiveEChart option={stepCompletionOption} />
                </div>
            </ResponsiveGridLayout>

            <style jsx>{`
                .react-grid-placeholder {
                    background: rgba(52, 152, 219, 0.2) !important;
                }
                
                .react-grid-item {
                    transition: all 200ms ease;
                    transition-property: left, top;
                }
                
                .react-grid-item.react-grid-placeholder {
                    background: rgba(52, 152, 219, 0.2) !important;
                    border: 2px dashed #3498db;
                    opacity: 0.7;
                }
                
                .react-resizable-handle {
                    visibility: ${isEditMode ? 'visible' : 'hidden'};
                }
            `}</style>
        </div>
    );
};

export default Dashboard;