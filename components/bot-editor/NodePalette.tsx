
import React from 'react';
import { useBotEditorStore } from '../../store/botEditorStore';
import { NodeType, ActionType, BotNode } from '../../types';
import { TriggerIcon, MessageIcon, UserInputIcon, ConditionIcon, DelayIcon, EventIcon } from '../icons';

const nodeCreationList = [
  {
    category: 'Triggers',
    nodes: [
      {
        label: 'On Message',
        icon: TriggerIcon,
        data: { type: NodeType.Trigger, label: 'On Message' },
      },
    ],
  },
  {
    category: 'Actions',
    nodes: [
      {
        label: 'Send Message',
        icon: MessageIcon,
        data: { type: NodeType.Action, actionType: ActionType.SendMessage, label: 'New Message', text: 'Enter message text...' },
      },
      {
        label: 'User Input',
        icon: UserInputIcon,
        data: { type: NodeType.Action, actionType: ActionType.UserInput, label: 'Wait for Input', variableName: 'user_input' },
      },
    ],
  },
  {
    category: 'Logic',
    nodes: [
        {
            label: 'Condition',
            icon: ConditionIcon,
            data: { type: NodeType.Condition, label: 'If/Else', condition: 'true' },
        },
        {
            label: 'Delay',
            icon: DelayIcon,
            data: { type: NodeType.Delay, label: 'Wait', duration: 1000 },
        },
    ]
  },
  {
      category: 'Events',
      nodes: [
        {
            label: 'Custom Event',
            icon: EventIcon,
            data: { type: NodeType.Event, label: 'Custom Event', eventName: 'user_event' },
        },
      ]
  }
];

export const NodePalette: React.FC = () => {
  const addNode = useBotEditorStore((state) => state.addNode);

  const onAddNode = (data: any) => {
    const newNode: BotNode = {
      id: `${data.label.toLowerCase().replace(' ', '-')}-${Date.now()}`,
      type: 'custom',
      position: { x: Math.random() * 400 + 50, y: Math.random() * 200 + 50 },
      data,
    };
    addNode(newNode);
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-900/50 p-4 border-r border-cyan-400/20 flex flex-col gap-4 z-10 overflow-y-auto">
        {nodeCreationList.map(({ category, nodes }) => (
            <div key={category}>
                <h3 className="text-sm font-semibold text-gray-400 px-2 mb-2">{category}</h3>
                <div className="flex flex-col gap-2">
                    {nodes.map(({ label, icon: Icon, data }) => (
                        <button
                        key={label}
                        onClick={() => onAddNode(data)}
                        className="w-full flex items-center gap-3 p-3 bg-gray-800/60 rounded-lg border border-gray-700 hover:border-cyan-400 hover:bg-gray-700/50 transition-all duration-200 text-left"
                        >
                        <Icon className="w-5 h-5 text-cyan-400" />
                        <span className="text-gray-200 text-sm">{label}</span>
                        </button>
                    ))}
                </div>
            </div>
        ))}
    </aside>
  );
};