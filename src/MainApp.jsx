import React, { useState, useEffect, useContext } from 'react';
import TopicSelection from './components/TopicSelection';
import QuestionDisplay from './components/QuestionDisplay';
import ProgressDisplay from './components/ProgressDisplay';
import Explanation from './components/Explanation';
import Settings from './components/Settings';
import { AuthContext } from './context/AuthContext';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import Loading from './components/Loading';

const MainApp = () => {
    const [topic, setTopic] = useState('');
    const [level, setLevel] = useState('Discover');
    const [questionData, setQuestionData] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [progress, setProgress] = useState(null);
    const [showSettings, setShowSettings] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [messages, setMessages] = useState([]);
      const { currentUser, userDetails, setUserDetails } = useContext(AuthContext);

    useEffect(() => {
         const fetchProgress = async () => {
            try {
                const userRef = doc(db, 'users', currentUser.uid);
               const userSnap = await getDoc(userRef);

                if(userSnap.exists()) {
                    setProgress(userSnap.data());
                } else {
                   await setDoc(userRef, {
                        topicsMastered: 0,
                        insightsGained: 0,
                        learningStreak: 0,
                        lastSessionDate: null
                    });
                   setProgress({
                        topicsMastered: 0,
                        insightsGained: 0,
                        learningStreak: 0,
                        lastSessionDate: null
                    })
                   }

                const q = query(collection(db, "questions"), where("userId", "==", currentUser.uid));

                 const querySnapshot = await getDocs(q);
                   const recentTopics = querySnapshot.docs.map(doc => doc.data().topic);

                setProgress(prev => ({ ...prev, recentTopics, uniqueQuestions: querySnapshot.docs.length }));
               } catch (error) {
                console.error('Failed to fetch progress:', error);
                 setProgress({
                        topicsMastered: 0,
                        insightsGained: 0,
                        learningStreak: 0,
                        lastSessionDate: null,
                        recentTopics: []
                    });
            }
         };

         if(currentUser){
             fetchProgress();
         }

    }, [currentUser]);

     const generateQuestion = async () => {
        if(!topic) {
           return;
        }

         setIsGenerating(true);
          setShowExplanation(false);
         setQuestionData(null);

        try {
            const response = await fetch('/.netlify/functions/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                   topic,
                    level,
                    messages,
                    apiKey: userDetails?.apiKey
                })
            });

           if (!response.ok) {
              const errorData = await response.json();
                throw new Error(errorData.error || `Failed to generate question. Status ${response.status}`);
           }

            const data = await response.json();

             setQuestionData(data);
             setMessages(data.messages);

        } catch (error) {
             console.error('Failed to generate question:', error.message);
                setQuestionData({
                      question: `Failed to generate question: ${error.message}`,
                        options: [],
                        answer: null,
                        explanation: null,
                        links: []
                    });
        }
         setIsGenerating(false);
     };

    const handleAnswer = async (selectedOption) => {
        if(!questionData) {
            return;
        }
       const isCorrect = selectedOption === questionData.answer;
       setShowExplanation(true);

        try {
            const response = await fetch('/.netlify/functions/gemini', {
                method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                body: JSON.stringify({
                   topic,
                    level,
                    messages,
                    isCorrect,
                    userAnswer: selectedOption,
                    apiKey: userDetails?.apiKey
                })
            });

              if (!response.ok) {
                  const errorData = await response.json();
                throw new Error(errorData.error || `Failed to generate question. Status ${response.status}`);
               }

            const data = await response.json();
             setQuestionData(data);
            setMessages(data.messages);
           
              const userRef = doc(db, 'users', currentUser.uid);
              await updateDoc(userRef, {
                    insightsGained: (progress?.insightsGained || 0) + 1,
                   learningStreak:  (isCorrect ? (progress?.learningStreak || 0) + 1 : 0),
                    lastSessionDate: new Date().toISOString().split('T')[0]
             });
              setProgress(prev => ({
                    ...prev,
                    insightsGained: (prev?.insightsGained || 0) + 1,
                   learningStreak:  (isCorrect ? (prev?.learningStreak || 0) + 1 : 0),
                   lastSessionDate: new Date().toISOString().split('T')[0]
                }));

            if(isCorrect) {
                const q = query(collection(db, "questions"), where("userId", "==", currentUser.uid), where("topic", "==", topic));
                 const querySnapshot = await getDocs(q);

                if(querySnapshot.docs.length === 0) {
                   await updateDoc(userRef, {
                        topicsMastered: (progress?.topicsMastered || 0) + 1
                   })
                   setProgress(prev => ({
                        ...prev,
                       topicsMastered: (prev?.topicsMastered || 0) + 1
                    }));
                }
            }

            const q = query(collection(db, "questions"), where("userId", "==", currentUser.uid));

                 const querySnapshot = await getDocs(q);
                  const recentTopics = querySnapshot.docs.map(doc => doc.data().topic);

                setProgress(prev => ({ ...prev, recentTopics, uniqueQuestions: querySnapshot.docs.length }));

             }
        catch (error) {
            console.error("Failed to fetch question", error.message);
             setQuestionData({
                      question: `Failed to generate question: ${error.message}`,
                        options: [],
                        answer: null,
                        explanation: null,
                        links: []
                    });
        }
    };

    const handleSettingsClick = () => setShowSettings(true);
    const handleCloseSettings = () => setShowSettings(false);

    if (!currentUser) return null;

     if(isGenerating && !questionData) {
         return <Loading />
     }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <ProgressDisplay progress={progress} userName={userDetails?.name} onSettingsClick={handleSettingsClick} />
            {showSettings && <Settings onClose={handleCloseSettings} />}
            <TopicSelection topic={topic} setTopic={setTopic} level={level} setLevel={setLevel} onGenerate={generateQuestion} />
             <QuestionDisplay questionData={questionData} onAnswer={handleAnswer} isGenerating={isGenerating} />
             {questionData?.explanation && <Explanation explanation={questionData.explanation} links={questionData.links} />}
        </div>
    );
};

export default MainApp;