import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {signOut} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Settings = ({ onClose }) => {
  const { currentUser, userDetails, setUserDetails } = useContext(AuthContext);
  const [name, setName] = useState(userDetails?.name || "");
    const [apiKey, setApiKey] = useState(userDetails?.apiKey || "");
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState("");
    const [signOutError, setSignOutError] = useState("");

    const handleSaveSettings = async () => {
         setIsSaving(true);
         setSaveError("");

        if(!name || !apiKey) {
             setSaveError("Please fill out all the fields");
             setIsSaving(false);
             return;
        }

        try {
            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, { name, apiKey });
             setUserDetails(prev => ({ ...prev, name, apiKey }));
              setIsSaving(false);
               onClose();
         } catch (error) {
           setSaveError(`Error saving settings. ${error.message}`);
             setIsSaving(false);
        }
    };

    const handleSignOut = async () => {
       setSignOutError('');
        try {
            await signOut(auth);
        }
        catch (error) {
            setSignOutError(`Error signing out. ${error.message}`)
        }
    };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md relative">
                <button
                     onClick={onClose}
                      className="absolute top-2 right-2 p-1 text-gray-600 hover:text-gray-800"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold mb-6">Settings</h2>
                {saveError && (<div className="text-red-500 mb-4">{saveError}</div>)}
                  {signOutError && (<div className="text-red-500 mb-4">{signOutError}</div>)}
                <div className="space-y-4">
                      <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                        <input
                             type="text"
                            className="input"
                            value={name}
                             onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gemini API Key</label>
                        <input
                            type="password"
                             className="input"
                             value={apiKey}
                             onChange={(e) => setApiKey(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-between gap-4">
                        <button
                            className="button button-secondary"
                            onClick={handleSignOut}
                        >
                          Sign out
                        </button>
                        <button
                            className="button button-primary"
                           onClick={handleSaveSettings}
                            disabled={isSaving}
                        >
                           {isSaving ? 'Saving...' : 'Save Settings'}
                        </button>
                     </div>
                </div>
            </div>
        </div>
  );
};

export default Settings;