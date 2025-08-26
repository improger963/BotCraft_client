import React from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { NodeData, NodeType, ActionType } from '../../types';
import { MessageIcon, TriggerIcon, UserInputIcon, ConditionIcon, DelayIcon, EventIcon } from '../icons';

type CustomNodeProps = NodeProps<NodeData>;

const NodeIcon: React.FC<{ data: NodeData }> = ({ data }) => {
  const iconProps = { className: 'w-5 h-5 mr-2 text-cyan-300' };
  if (data.type === NodeType.Action) {
    switch (data.actionType) {
      case ActionType.SendMessage:
        return <MessageIcon {...iconProps} />;
      case ActionType.UserInput:
        return <UserInputIcon {...iconProps} />;
      default:
        return null;
    }
  }

  switch (data.type) {
    case NodeType.Trigger:
      return <TriggerIcon {...iconProps} />;
    case NodeType.Condition:
        return <ConditionIcon {...iconProps} />;
    case NodeType.Delay:
        return <DelayIcon {...iconProps} />;
    case NodeType.Event:
        return <EventIcon {...iconProps} />;
    default:
      return null;
  }
};

const HandleStyle = {
  width: '12px',
  height: '12px',
  background: '#22d3ee',
  border: '2px solid #1a202c'
}

export const BotNodeComponent: React.FC<CustomNodeProps> = ({ id, data, selected }) => {
  const hasTarget = data.type !== NodeType.Trigger && data.type !== NodeType.Event;
  const hasSource = data.type !== NodeType.Event; // Assuming Event is a terminal node for now.

  const renderContent = () => {
    if (data.type === NodeType.Action && data.actionType === ActionType.SendMessage) {
      return <p className="truncate italic text-gray-400">"{data.text}"</p>;
    }
     if (data.type === NodeType.Delay) {
      return <p>Wait for {data.duration} ms</p>;
    }
     if (data.type === NodeType.Condition) {
      return <p className="text-gray-400">Outputs based on condition.</p>;
    }
    return <p>Configure in settings panel.</p>;
  }

  return (
    <div
      className={`w-64 bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg transition-all duration-200
        ${selected ? 'border-2 border-cyan-400 shadow-cyan-500/30' : 'border border-gray-600/50'}
      `}
    >
      {hasTarget && (
        <Handle
          type="target"
          position={Position.Left}
          style={HandleStyle}
        />
      )}
      
      <div className="p-3 border-b border-gray-700/50 flex items-center">
        <NodeIcon data={data} />
        <h4 className="font-bold text-white text-sm truncate">{data.label}</h4>
      </div>
      <div className="p-3 text-sm text-gray-300">
        {renderContent()}
      </div>

      {data.type === NodeType.Condition ? (
        <div className="bg-gray-900/30 rounded-b-lg text-xs text-gray-300">
          {/* True Branch */}
          <div className="flex justify-between items-center px-3 py-2 border-t border-gray-700/50">
            <span>True</span>
            <Handle
              id="true"
              type="source"
              position={Position.Right}
              style={HandleStyle}
            />
          </div>
          {/* False Branch */}
          <div className="flex justify-between items-center px-3 py-2 border-t border-gray-700/50">
            <span>False</span>
            <Handle
              id="false"
              type="source"
              position={Position.Right}
              style={HandleStyle}
            />
          </div>
        </div>
      ) : hasSource && (
        <Handle
          type="source"
          position={Position.Right}
          style={HandleStyle}
        />
      )}
    </div>
  );
};
