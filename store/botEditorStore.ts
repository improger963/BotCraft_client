
import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';
import type { OnNodesChange, OnEdgesChange, OnConnect } from 'reactflow';
import type { BotEditorStore, BotNode } from '../types';
import { NodeType, ActionType } from '../types';

const getInitialNodes = (): BotNode[] => [
  {
    id: 'trigger-1',
    type: 'custom',
    position: { x: 250, y: 100 },
    data: { type: NodeType.Trigger, label: 'User Sends a Message' },
  },
  {
    id: 'action-1',
    type: 'custom',
    position: { x: 550, y: 50 },
    data: { 
      type: NodeType.Action, 
      actionType: ActionType.SendMessage,
      label: 'Send Welcome Message', 
      text: 'Hello! How can I help you today?' 
    },
  },
];

export const useBotEditorStore = create<BotEditorStore>((set, get) => ({
  nodes: getInitialNodes(),
  edges: [{ id: 'e-trigger-1-action-1', source: 'trigger-1', target: 'action-1', animated: true, style: { stroke: '#007ACC', strokeWidth: 2 } }],
  selectedNodeId: null,

  addNode: (node) => {
    set((state) => ({ nodes: [...state.nodes, node] }));
  },
  
  updateNodeData: (nodeId, data) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
    }));
  },

  setSelectedNodeId: (nodeId) => {
    set({ selectedNodeId: nodeId });
  },

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    const newEdge = {
        ...connection,
        animated: true,
        style: { stroke: '#007ACC', strokeWidth: 2 }
    };
    set({
      edges: addEdge(newEdge, get().edges),
    });
  },
}));