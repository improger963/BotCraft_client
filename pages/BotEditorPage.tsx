
import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { useAuthStore } from '../store/authStore';
import { PrimaryButton } from '../components/auth/PrimaryButton';
import { NodePalette } from '../components/bot-editor/NodePalette';
import { EditorCanvas } from '../components/bot-editor/EditorCanvas';
import { SettingsPanel } from '../components/bot-editor/SettingsPanel';
import { UndoIcon, RedoIcon, SettingsIcon } from '../components/icons';

const BotEditorPage: React.FC = () => {
  const { logout } = useAuthStore((state) => ({ logout: state.logout }));

  return (
    <div className="w-full h-screen max-w-full flex flex-col items-center p-0 m-0 overflow-hidden bg-white text-gray-800">
      <header className="w-full flex-shrink-0 flex justify-between items-center bg-white p-3 border-b border-gray-200 z-20 shadow-sm">
        <div className="text-left">
          <h1 className="text-xl font-bold font-montserrat tracking-tight text-gray-900">Bot Editor</h1>
          <p className="text-sm text-gray-500">Editing: My Awesome Bot</p>
        </div>
        <div className="flex items-center gap-2">
            <button className="p-2 rounded-md hover:bg-gray-100 transition-colors" aria-label="Undo">
                <UndoIcon className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-md hover:bg-gray-100 transition-colors" aria-label="Redo">
                <RedoIcon className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-px h-6 bg-gray-200 mx-2"></div>
            <button className="p-2 rounded-md hover:bg-gray-100 transition-colors" aria-label="Bot Settings">
                <SettingsIcon className="w-6 h-6 text-gray-600" />
            </button>
            <PrimaryButton onClick={() => alert("Saved!")} className="ml-2">
                Save Flow
            </PrimaryButton>
            <button onClick={logout} className="px-4 py-2.5 rounded-md text-sm font-semibold text-red-600 bg-red-100 hover:bg-red-200 transition-colors">
                Sign out
            </button>
        </div>
      </header>
      
      <main className="w-full flex-grow flex overflow-hidden">
        <ReactFlowProvider>
          <NodePalette />
          <EditorCanvas />
          <SettingsPanel />
        </ReactFlowProvider>
      </main>
    </div>
  );
};

export default BotEditorPage;