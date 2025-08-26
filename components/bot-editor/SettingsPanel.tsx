
import React, { useEffect, useState } from 'react';
import { useBotEditorStore } from '../../store/botEditorStore';
import { InputField } from '../auth/InputField';
// Fix: Import NodeData to properly type the form state.
import { NodeType, ActionType, NodeData } from '../../types';

export const SettingsPanel: React.FC = () => {
  const { selectedNodeId, nodes, updateNodeData } = useBotEditorStore();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  // Using a key with the state forces a re-render and state reset when the node changes
  // Fix: Provide an explicit type for formData to prevent TypeScript errors
  // when accessing properties on what could be an empty object initially.
  const [formData, setFormData] = useState<Partial<NodeData>>(selectedNode?.data || {});

  useEffect(() => {
    if (selectedNode) {
      setFormData(selectedNode.data);
    }
  }, [selectedNode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number';
    setFormData({ ...formData, [name]: isNumber ? Number(value) : value });
  };

  const handleBlur = () => {
    if (selectedNodeId) {
      updateNodeData(selectedNodeId, formData);
    }
  };
  
  const renderSettings = () => {
    if (!selectedNode) return null;

    const nodeType = selectedNode.data.type;
    const actionType = selectedNode.data.actionType;

    return (
       <div className="space-y-4">
        <InputField
          id="label"
          name="label"
          label="Node Label"
          value={formData.label || ''}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        {nodeType === NodeType.Action && actionType === ActionType.SendMessage && (
          <div>
            <label htmlFor="text" className="block text-sm font-medium text-gray-300 mb-2">Message Text</label>
            <textarea
              id="text"
              name="text"
              value={formData.text || ''}
              onChange={handleInputChange}
              onBlur={handleBlur}
              rows={4}
              className="w-full px-4 py-2 bg-gray-900/70 border rounded-md text-white placeholder-gray-500 transition-all duration-300 ease-in-out border-gray-700 focus:ring-cyan-400/30 focus:border-cyan-400 focus:outline-none focus:ring-2"
            />
          </div>
        )}
        {nodeType === NodeType.Action && actionType === ActionType.UserInput && (
          <InputField
            id="variableName"
            name="variableName"
            label="Variable Name"
            value={formData.variableName || ''}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        )}
        {nodeType === NodeType.Condition && (
          <InputField
            id="condition"
            name="condition"
            label="Condition Logic"
            value={formData.condition || ''}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="e.g., {{user_input}} === 'yes'"
          />
        )}
         {nodeType === NodeType.Delay && (
          <InputField
            id="duration"
            name="duration"
            label="Duration (ms)"
            type="number"
            value={formData.duration || 0}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        )}
        {nodeType === NodeType.Event && (
          <InputField
            id="eventName"
            name="eventName"
            label="Event Name"
            value={formData.eventName || ''}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        )}
      </div>
    )
  }

  if (!selectedNode) {
    return (
      <aside className="w-80 flex-shrink-0 bg-gray-900/50 p-6 border-l border-cyan-400/20 z-10">
        <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
        <p className="text-gray-400 text-sm">Select a node to view its properties.</p>
      </aside>
    );
  }

  return (
    <aside className="w-80 flex-shrink-0 bg-gray-900/50 p-6 border-l border-cyan-400/20 flex flex-col gap-4 z-10">
      <h3 className="text-lg font-semibold text-white">Edit: {selectedNode.data.label}</h3>
      <p className="text-xs text-gray-500 -mt-3 pb-2 border-b border-gray-700/50">Type: {selectedNode.data.actionType || selectedNode.data.type}</p>
      {renderSettings()}
    </aside>
  );
};
