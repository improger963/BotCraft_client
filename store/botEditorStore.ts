
import { create } from 'zustand';
import { applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';
import type { OnNodesChange, OnEdgesChange, OnConnect } from 'reactflow';
import type { BotEditorStore, BotNode } from '../types';
import { NodeType, ActionType } from '../types';

const getInitialNodes = (): BotNode[] => [
  {
    id: 'trigger-1',
    type: 'custom',
    position: { x: 100, y: 150 },
    data: { type: NodeType.Trigger, label: 'On Message' },
  },
  {
    id: 'action-1',
    type: 'custom',
    position: { x: 400, y: 150 },
    data: { 
      type: NodeType.Action, 
      actionType: ActionType.SendMessage,
      label: 'Welcome Message', 
      text: 'Hello! Welcome to our service.' 
    },
  },
];

export const useBotEditorStore = create<BotEditorStore>((set, get) => ({
  nodes: getInitialNodes(),
  edges: [{ id: 'e-trigger-1-action-1', source: 'trigger-1', target: 'action-1', animated: true }],
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
    set({
      edges: addEdge(connection, get().edges),
    });
  },
}));