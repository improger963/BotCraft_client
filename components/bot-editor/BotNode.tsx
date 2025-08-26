
import React from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { NodeData, NodeType } from '../../types';
import { LightningIcon, GearIcon, QuestionIcon, TimerIcon, BellIcon, WarningIcon } from '../icons';

type CustomNodeProps = NodeProps<NodeData>;

// --- Style Definitions ---
const nodeStyles: { [key in NodeType]: { bg: string, text: string, icon: React.FC<any> } } = {
  [NodeType.Trigger]: { bg: 'from-[#E0F7FF] to-[#B3ECFF]', text: '#004466', icon: LightningIcon },
  [NodeType.Action]: { bg: 'from-[#E6F4EA] to-[#E6F4EA]', text: '#2B5D34', icon: GearIcon },
  [NodeType.Condition]: { bg: 'from-[#FFF9E0] to-[#FFF9E0]', text: '#997A00', icon: QuestionIcon },
  [NodeType.Delay]: { bg: 'from-[#F2F2F2] to-[#F2F2F2]', text: '#333333', icon: TimerIcon },
  [NodeType.Event]: { bg: 'from-[#F2F2F2] to-[#F2F2F2]', text: '#333333', icon: BellIcon },
};

const handleStyle = (type: NodeType) => {
    const baseStyle = { width: '12px', height: '12px', border: '2px solid white' };
    switch (type) {
        case NodeType.Trigger: return { ...baseStyle, background: '#007ACC' };
        case NodeType.Action: return { ...baseStyle, background: '#28a745' };
        case NodeType.Condition: return { ...baseStyle, background: '#ffc107' };
        default: return { ...baseStyle, background: '#6c757d' };
    }
};

const NodeIcon: React.FC<{ data: NodeData, color: string }> = ({ data, color }) => {
  const Icon = nodeStyles[data.type].icon;
  return <Icon className="w-5 h-5 mr-3" style={{ color }} />;
};

// --- Main Component ---
export const BotNodeComponent: React.FC<CustomNodeProps> = ({ id, data, selected }) => {
  const styles = nodeStyles[data.type];
  const Icon = styles.icon;

  const hasTarget = data.type !== NodeType.Trigger;
  
  const baseClasses = "w-64 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 overflow-hidden";
  const borderClasses = data.error 
    ? "border-2 border-red-500" 
    : selected 
    ? "border-2 border-[#007ACC] shadow-lg shadow-blue-500/30" 
    : "border border-gray-200";

  return (
    <div className={`${baseClasses} ${borderClasses}`}>
      
      {hasTarget && (
        <Handle
          type="target"
          position={data.type === NodeType.Trigger ? Position.Top : Position.Left}
          style={handleStyle(data.type)}
        />
      )}
      
      <div className={`p-3 bg-gradient-to-r ${styles.bg} flex items-center`}>
        <Icon className="w-5 h-5 mr-3 shrink-0" style={{ color: styles.text }} />
        <h4 className="font-montserrat font-bold text-base truncate" style={{ color: styles.text }}>
            {data.label}
        </h4>
        {data.error && <WarningIcon className="w-5 h-5 ml-auto text-red-600 shrink-0" title={data.error} />}
      </div>
      
      <div className="p-3 text-sm text-gray-600 min-h-[40px]">
        {data.type === NodeType.Action && data.text ? (
             <p className="truncate italic">"{data.text}"</p>
        ) : data.type === NodeType.Delay ? (
            <p>Wait for {data.duration} ms</p>
        ) : (
            <p className="text-gray-400">Configure in settings.</p>
        )}
      </div>

      {data.type === NodeType.Condition ? (
        <div className="bg-gray-50 text-xs text-gray-700 font-semibold rounded-b-lg">
          <div className="flex justify-between items-center px-3 py-2 border-t border-gray-200">
            <span>Yes</span>
            <Handle id="true" type="source" position={Position.Right} style={handleStyle(data.type)} />
          </div>
          <div className="flex justify-between items-center px-3 py-2 border-t border-gray-200">
            <span>No</span>
            <Handle id="false" type="source" position={Position.Right} style={handleStyle(data.type)} />
          </div>
        </div>
      ) : (
        <Handle
          type="source"
          position={data.type === NodeType.Trigger ? Position.Bottom : Position.Right}
          style={handleStyle(data.type)}
        />
      )}
    </div>
  );
};