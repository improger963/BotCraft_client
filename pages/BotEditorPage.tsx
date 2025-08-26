
import React from 'react';
import { useAuthStore } from '../store/authStore';
import { PrimaryButton } from '../components/auth/PrimaryButton';
import { NodePalette } from '../components/bot-editor/NodePalette';
import { EditorCanvas } from '../components/bot-editor/EditorCanvas';
import { SettingsPanel } from '../components/bot-editor/SettingsPanel';
import { UndoIcon, RedoIcon, SettingsIcon } from '../components/icons';

const BotEditorPage: React.FC = () => {
  const { user, logout } = useAuthStore((state) => ({ user: state.user, logout: state.logout }));

  return (
    <div className="w-full h-screen max-w-full flex flex-col items-center p-0 m-0 overflow-hidden">
      <header className="w-full flex-shrink-0 flex justify-between items-center bg-gray-900/50 backdrop-blur-sm p-3 border-b border-cyan-400/20 z-20">
        <div className="text-left">
          <h1 className="text-xl font-bold tracking-tight text-white">Bot Editor</h1>
          <p className="text-sm text-gray-400">Editing: My Awesome Bot</p>
        </div>
        <div className="flex items-center gap-2">
            <button className="p-2 rounded-md hover:bg-gray-700/50 transition-colors" aria-label="Undo">
                <UndoIcon className="w-5 h-5 text-gray-300" />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-700/50 transition-colors" aria-label="Redo">
                <RedoIcon className="w-5 h-5 text-gray-300" />
            </button>
            <div className="w-px h-6 bg-gray-700 mx-2"></div>
            <button className="p-2 rounded-md hover:bg-gray-700/50 transition-colors" aria-label="Bot Settings">
                <SettingsIcon className="w-6 h-6 text-gray-300" />
            </button>
            <PrimaryButton onClick={() => alert("Saved!")} className="ml-2">
                Save Flow
            </PrimaryButton>
            <PrimaryButton onClick={logout} className="w-auto !from-red-500 !to-orange-600 hover:!shadow-red-500/40 focus:!ring-red-500">
            Sign out
            </PrimaryButton>
        </div>
      </header>
      
      <main className="w-full flex-grow flex overflow-hidden">
        <NodePalette />
        <EditorCanvas />
        <SettingsPanel />
      </main>
    </div>
  );
};

export default BotEditorPage;