
import React, { useEffect, useState } from 'react';
import { useBotEditorStore } from '../../store/botEditorStore';
import { NodeData, NodeType, ActionType } from '../../types';

const SettingsInputField: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-gray-600 mb-1">
      {label}
    </label>
    <input
      id={id}
      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
      {...props}
    />
  </div>
);

const SettingsTextareaField: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }> = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-gray-600 mb-1">
      {label}
    </label>
    <textarea
      id={id}
      rows={4}
      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
      {...props}
    />
  </div>
);

export const SettingsPanel: React.FC = () => {
  const { selectedNodeId, nodes, updateNodeData } = useBotEditorStore();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

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
    if (selectedNodeId && JSON.stringify(formData) !== JSON.stringify(selectedNode?.data)) {
      updateNodeData(selectedNodeId, formData);
    }
  };
  
  const renderSettings = () => {
    if (!selectedNode) return null;

    const nodeType = selectedNode.data.type;
    const actionType = selectedNode.data.actionType;

    return (
       <div className="space-y-4">
        <SettingsInputField
          id="label"
          name="label"
          label="Node Label"
          value={formData.label || ''}
          onChange={handleInputChange}
          onBlur={handleBlur}
        />
        {nodeType === NodeType.Action && actionType === ActionType.SendMessage && (
          <SettingsTextareaField
            id="text"
            name="text"
            label="Message Text"
            value={formData.text || ''}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        )}
        {nodeType === NodeType.Action && actionType === ActionType.UserInput && (
          <SettingsInputField
            id="variableName"
            name="variableName"
            label="Variable Name"
            value={formData.variableName || ''}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
        )}
        {nodeType === NodeType.Condition && (
          <SettingsInputField
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
          <SettingsInputField
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
          <SettingsInputField
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
      <aside className="w-80 flex-shrink-0 bg-[#F9F9F9] p-6 border-l border-gray-200 z-10">
        <h3 className="text-lg font-bold text-gray-800 mb-4 font-montserrat">Settings</h3>
        <p className="text-gray-500 text-sm">Select a node to view its properties.</p>
      </aside>
    );
  }

  return (
    <aside className="w-80 flex-shrink-0 bg-[#F9F9F9] p-6 border-l border-gray-200 flex flex-col gap-4 z-10 overflow-y-auto">
      <div>
        <h3 className="text-lg font-bold text-gray-800 truncate font-montserrat">{selectedNode.data.label}</h3>
        <p className="text-xs text-gray-500 uppercase tracking-wider">{selectedNode.data.actionType || selectedNode.data.type}</p>
      </div>
      <div className="border-t border-gray-200 pt-4">
        {renderSettings()}
      </div>
    </aside>
  );
};