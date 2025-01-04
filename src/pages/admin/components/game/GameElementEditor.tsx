import { useState } from 'react';
import { Plus, X, Move } from 'lucide-react';
import { GameElement } from '../../../../types/course';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Props {
  gameType: string;
  elements: GameElement[];
  onChange: (elements: GameElement[]) => void;
}

export function GameElementEditor({ gameType, elements, onChange }: Props) {
  const [newElement, setNewElement] = useState<Partial<GameElement>>({
    type: 'text',
    content: '',
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(elements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onChange(items);
  };

  const getElementForm = () => {
    switch (gameType) {
      case 'memory':
        return (
          <>
            <input
              type="text"
              placeholder="Front content"
              value={newElement.content?.front || ''}
              onChange={e => setNewElement(prev => ({
                ...prev,
                content: { ...prev.content, front: e.target.value }
              }))}
              className="flex-1 bg-gray-600 p-2 rounded-lg"
            />
            <input
              type="text"
              placeholder="Back content"
              value={newElement.content?.back || ''}
              onChange={e => setNewElement(prev => ({
                ...prev,
                content: { ...prev.content, back: e.target.value }
              }))}
              className="flex-1 bg-gray-600 p-2 rounded-lg"
            />
          </>
        );

      case 'sorting':
      case 'matching':
        return (
          <>
            <input
              type="text"
              placeholder="Label"
              value={newElement.content?.label || ''}
              onChange={e => setNewElement(prev => ({
                ...prev,
                content: { ...prev.content, label: e.target.value }
              }))}
              className="flex-1 bg-gray-600 p-2 rounded-lg"
            />
            <input
              type="text"
              placeholder="Value"
              value={newElement.content?.value || ''}
              onChange={e => setNewElement(prev => ({
                ...prev,
                content: { ...prev.content, value: e.target.value }
              }))}
              className="flex-1 bg-gray-600 p-2 rounded-lg"
            />
          </>
        );

      case 'coding':
        return (
          <textarea
            placeholder="Code snippet"
            value={newElement.content || ''}
            onChange={e => setNewElement(prev => ({
              ...prev,
              content: e.target.value
            }))}
            className="w-full bg-gray-600 p-2 rounded-lg h-24 font-mono"
          />
        );

      default:
        return (
          <input
            type="text"
            placeholder="Content"
            value={newElement.content || ''}
            onChange={e => setNewElement(prev => ({
              ...prev,
              content: e.target.value
            }))}
            className="flex-1 bg-gray-600 p-2 rounded-lg"
          />
        );
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold">Game Elements</h3>
      
      <div className="flex gap-2">
        {getElementForm()}
        <button
          onClick={() => {
            onChange([...elements, { ...newElement, id: Date.now().toString() } as GameElement]);
            setNewElement({ type: 'text', content: '' });
          }}
          className="bg-accent p-2 rounded-lg"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="elements">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {elements.map((element, index) => (
                <Draggable
                  key={element.id}
                  draggableId={element.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="bg-gray-600 p-3 rounded-lg flex items-center gap-3"
                    >
                      <div {...provided.dragHandleProps}>
                        <Move className="w-5 h-5 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        {typeof element.content === 'object' ? (
                          <div className="grid grid-cols-2 gap-2">
                            <div>{element.content.front || element.content.label}</div>
                            <div>{element.content.back || element.content.value}</div>
                          </div>
                        ) : (
                          <div>{element.content}</div>
                        )}
                      </div>
                      <button
                        onClick={() => onChange(elements.filter(e => e.id !== element.id))}
                        className="text-red-500"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
} 