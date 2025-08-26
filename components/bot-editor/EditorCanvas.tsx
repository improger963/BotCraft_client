import React, { useMemo } from 'react';
import ReactFlow, { Background, MiniMap, Controls } from 'reactflow';
import { useBotEditorStore } from '../../store/botEditorStore';
import { BotNodeComponent } from './BotNode';

export const EditorCanvas: React.FC = () => {
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect, 
    setSelectedNodeId 
  } = useBotEditorStore();
  
  const nodeTypes = useMemo(() => ({ custom: BotNodeComponent }), []);

  const handlePaneClick = () => {
    setSelectedNodeId(null);
  };
  
  const handleNodeClick = (_event: React.MouseEvent, node: any) => {
    setSelectedNodeId(node.id);
  };


  return (
    <div className="flex-grow h-full bg-gray-900/30 relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={handlePaneClick}
        onNodeClick={handleNodeClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-800/20"
      >
        <Background color="#555" gap={24} />
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
        <Controls />
      </ReactFlow>
    </div>
  );
};