import React from 'react';
import { BookOpenIcon } from '@heroicons/react/24/outline';


const Explanation = ({ explanation, links }) => {
  if (!explanation) return null;

  return (
    <div className="card">
      <div className="flex gap-4">
           <BookOpenIcon className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <div className="space-y-4">
               <div>
                   <h3 className="text-lg font-medium mb-2">Understanding the Concept</h3>
                   <p className="text-gray-700 leading-relaxed">{explanation}</p>
               </div>
              {links && links.length > 0 && (
                 <div>
                        <h3 className="text-lg font-medium mb-2">Learn More</h3>
                           <div className="space-y-2">
                            {links.map((link, index) => (
                                 <button
                                      key={index}
                                      onClick={() => window.open(link, '_blank')}
                                    className="block p-2 bg-blue-50 border border-blue-100 rounded-md hover:bg-blue-100 text-blue-600 cursor-pointer text-left"
                                 >
                                     {link}
                                 </button>
                            ))}
                           </div>
                   </div>
               )}
            </div>
      </div>
    </div>
  );
};

export default Explanation;