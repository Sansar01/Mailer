import React, { useState } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    removeElements,
    Controls,
    MiniMap,
} from 'react-flow-renderer';
import axios from 'axios'

function FlowChart() {

    const [elements, setElements] = useState([]);
    const [nodeId, setNodeId] = useState(1);

    const onAddNode = (type) => {
        const newNode = {
            id: `node-${nodeId}`,
            type: 'default',
            position: { x: Math.random() * 250, y: Math.random() * 250 },
            data: { label: type },
        };
        setNodeId(nodeId + 1);
        setElements((els) => [...els, newNode]);
    };

    const onConnect = (params) => setElements((els) => addEdge(params, els));

    const onSaveFlow = async () => {
        const response = await axios.post('/api/save-flow', { elements });
        console.log(response.data);
    };

    return (
        <ReactFlowProvider>
            <div style={{ height: 800 }}>
                <ReactFlow
                    elements={elements}
                    onElementsRemove={(elsToRemove) =>
                         setElements((els) => removeElements(elsToRemove, els))
                    }
                    onConnect={onConnect}
                >
                    <Controls />
                    <MiniMap />
                </ReactFlow>
                <button onClick={() => onAddNode('Cold Email')}>Add Cold Email</button>
                <button onClick={() => onAddNode('Wait/Delay')}>Add Wait/Delay</button>
                <button onClick={onSaveFlow}>Save Flow</button>
            </div>
        </ReactFlowProvider>
    )
}

export default FlowChart