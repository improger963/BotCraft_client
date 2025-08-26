
import React from 'react';
import { NodeType, ActionType, NodeData } from '../../types';
import { LightningIcon, GearIcon, QuestionIcon, TimerIcon, BellIcon } from '../icons';

const nodeCreationList = [
  {
    category: 'Triggers',
    nodes: [
      {
        label: 'On Message',
        icon: LightningIcon,
        data: { type: NodeType.Trigger, label: 'On Message' },
      },
    ],
  },
  {
    category: 'Actions',
    nodes: [
      {
        label: 'Send Message',
        icon: GearIcon, // Using Gear for the general action type
        data: { type: NodeType.Action, actionType: ActionType.SendMessage, label: 'New Message', text: 'Enter message text...' },
      },
      // Hiding User Input for now as it's not in the simple flow
      // {
      //   label: 'User Input',
      //   icon: UserInputIcon,
      //   data: { type: NodeType.Action, actionType: ActionType.UserInput, label: 'Wait for Input', variableName: 'user_input' },
      // },
    ],
  },
  {
    category: 'Logic',
    nodes: [
        {
            label: 'Condition',
            icon: QuestionIcon,
            data: { type: NodeType.Condition, label: 'If/Else', condition: 'true' },
        },
        {
            label: 'Delay',
            icon: TimerIcon,
            data: { type: NodeType.Delay, label: 'Wait', duration: 1000 },
        },
    ]
  },
  {
      category: 'Events',
      nodes: [
        {
            label: 'Custom Event',
            icon: BellIcon,
            data: { type: NodeType.Event, label: 'Custom Event', eventName: 'user_event' },
        },
      ]
  }
];

const DraggableNode: React.FC<{ label: string; icon: React.ElementType; data: Partial<NodeData> }> = ({ label, icon: Icon, data }) => {
    const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeData: Partial<NodeData>) => {
        const nodeInfo = { type: 'custom', data: nodeData };
        event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeInfo));
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div 
            onDragStart={(event) => onDragStart(event, data)}
            draggable
            className="flex flex-col items-center justify-center p-2 w-20 h-20 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-400 cursor-grab transition-all duration-200 text-center"
        >
            <Icon className="w-6 h-6 text-blue-600 mb-1" />
            <span className="text-gray-700 text-xs font-semibold">{label}</span>
        </div>
    );
}

export const NodePalette: React.FC = () => {
  return (
    <aside className="w-64 flex-shrink-0 bg-white p-4 border-r border-gray-200 flex flex-col gap-6 z-10 overflow-y-auto shadow-md">
        {nodeCreationList.map(({ category, nodes }) => (
            <div key={category}>
                <h3 className="text-sm font-bold text-gray-500 px-2 mb-3 uppercase tracking-wider">{category}</h3>
                <div className="grid grid-cols-2 gap-3">
                    {nodes.map(({ label, icon, data }) => (
                       <DraggableNode key={label} label={label} icon={icon} data={data} />
                    ))}
                </div>
            </div>
        ))}
    </aside>
  );
};