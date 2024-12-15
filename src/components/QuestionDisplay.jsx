import React from 'react';

const QuestionDisplay = ({ questionData, onAnswer, isGenerating }) => {
    if (!questionData) return null;

    return (
        <div className="card">
            <h2 className="text-xl font-medium mb-4">{questionData.question}</h2>
             <div className="grid grid-cols-2 gap-4">
             {questionData.options && questionData.options.map((option, index) => (
                <button
                    key={index}
                    className="answer-option"
                    onClick={() => onAnswer(option)}
                >
                    {option}
                </button>
            ))}
              </div>
         </div>
    );
};

export default QuestionDisplay;