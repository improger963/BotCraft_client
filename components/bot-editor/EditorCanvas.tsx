
import React, { useMemo, useRef, useCallback } from 'react';
import ReactFlow, { Background, MiniMap, Controls, useReactFlow } from 'reactflow';
import { useBotEditorStore } from '../../store/botEditorStore';
import { BotNodeComponent } from './BotNode';
import { BotNode, NodeData } from '../../types';

export const EditorCanvas: React.FC = () => {
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect, 
    setSelectedNodeId,
    addNode
  } = useBotEditorStore();

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  
  const nodeTypes = useMemo(() => ({ custom: BotNodeComponent }), []);

  const handlePaneClick = () => {
    setSelectedNodeId(null);
  };
  
  const handleNodeClick = (_event: React.MouseEvent, node: any) => {
    setSelectedNodeId(node.id);
  };

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current) {
        return;
      }

      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }
      
      const { data } = JSON.parse(type);

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: BotNode = {
        id: `${data.label.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
        type: 'custom',
        position,
        data: data as NodeData,
      };

      addNode(newNode);
    },
    [screenToFlowPosition, addNode]
  );

  return (
    <div className="flex-grow h-full bg-[#F2F2F2] relative" ref={reactFlowWrapper}>
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
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <Background color="#ccc" gap={20} />
        <MiniMap nodeStrokeWidth={3} zoomable pannable />
        <Controls />
      </ReactFlow>
    </div>
  );
};