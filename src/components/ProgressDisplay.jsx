import React from 'react';
import {Cog6ToothIcon } from '@heroicons/react/24/outline';

const ProgressDisplay = ({ progress, userName, onSettingsClick }) => {

    const greeting = () => {
         const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 18) return 'Good afternoon';
        return 'Good evening';
    }

    return (
        <div className="card">
            <div className="flex justify-between items-center mb-4">
               <span className="text-lg font-medium">{greeting()}, {userName ? userName : 'User'}!</span>
                <button onClick={onSettingsClick} className="p-1 hover:opacity-80">
                   <Cog6ToothIcon className="w-5 h-5 text-gray-600" />
                </button>
            </div>
            <div className="progress-metrics">
                <div>
                   <div className="text-2xl font-medium text-blue-500">{progress?.topicsMastered || 0}</div>
                    <div className="text-sm text-gray-600">Topics Mastered</div>
                </div>
                  <div>
                     <div className="text-2xl font-medium text-blue-500">{progress?.insightsGained || 0}</div>
                    <div className="text-sm text-gray-600">Insights Gained</div>
                </div>
                   <div className="relative overflow-hidden streak-shine">
                     <div className="text-2xl font-medium text-blue-500">{progress?.learningStreak || 0}</div>
                    <div className="text-sm text-gray-600">Learning Streak</div>
                </div>
            </div>
             {progress && progress.recentTopics && (
                <div className="mt-4">
                   <div className="text-sm text-gray-600">Recent Topics: {progress.recentTopics.slice(-5).map(topic => <span key={topic} className="inline-block bg-blue-50 rounded-sm px-1 mx-1">{topic}</span>)}</div>
                 </div>
             )}
        </div>
    );
};

export default ProgressDisplay;