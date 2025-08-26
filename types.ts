
import type { Node, Edge, OnNodesChange, OnEdgesChange, OnConnect } from 'reactflow';

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | Record<string, string> | null;
}

export interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (userData: RegisterUserData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export type AuthStore = AuthState & AuthActions;

// Credentials for API calls
export type LoginCredentials = {
  email: string;
  password:string;
};

export type RegisterUserData = {
  username: string;
  email: string;
  password: string;
};

// --- Bot Editor Types ---

export enum NodeType {
  Trigger = 'Trigger',
  Action = 'Action',
  Condition = 'Condition',
  Delay = 'Delay',
  Event = 'Event',
}

export enum ActionType {
  SendMessage = 'Send Message',
  UserInput = 'User Input',
}

export interface NodeData {
  label: string;
  type: NodeType;
  actionType?: ActionType;
  [key: string]: any;
}

// Extend React Flow's Node type
export type BotNode = Node<NodeData>;

export interface BotEditorState {
  nodes: BotNode[];
  edges: Edge[];
  selectedNodeId: string | null;
}

export interface BotEditorActions {
  addNode: (node: BotNode) => void;
  updateNodeData: (nodeId: string, data: Partial<NodeData>) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
}

export type BotEditorStore = BotEditorState & BotEditorActions;