import React from 'react';
import { Input, Select } from '@headlessui/react';
import { SparklesIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const TopicSelection = ({ topic, setTopic, level, setLevel, onGenerate }) => {
    return (
        <div className="card topic-section">
             <div className="flex items-center gap-2 mb-4">
                <SparklesIcon className="w-6 h-6 text-blue-500" />
                <input
                     type="text"
                    className="input flex-grow"
                    placeholder="What would you like to learn about?"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                     maxLength="100"
                />
                 <select
                      className="select w-48"
                     value={level}
                    onChange={(e) => setLevel(e.target.value)}
                 >
                    <option value="Discover">Discover</option>
                    <option value="Explore">Explore</option>
                    <option value="Apply">Apply</option>
                    <option value="Deepen">Deepen</option>
                </select>
            </div>
              <div className="flex justify-end mt-4">
                   <button
                        className="button button-primary"
                        onClick={onGenerate}
                    >
                        <span>Let's Learn!</span>
                       <ArrowRightIcon className="w-4 h-4"/>
                    </button>
              </div>
        </div>
    );
};

export default TopicSelection;