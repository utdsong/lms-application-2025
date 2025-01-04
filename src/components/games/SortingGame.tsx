import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';
import { BaseGame } from './BaseGame';
import { GameConfig } from '../../types/course';

interface Props {
  config: GameConfig;
  onComplete: (result: any) => void;
}

export function SortingGame({ config, onComplete }: Props) {
  const [items, setItems] = useState(config.elements);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
    
    // Check if order is correct
    const isCorrect = newItems.every((item, index) => 
      item.content.order === index + 1
    );

    if (isCorrect) {
      engine.handleInteraction('order', 'complete');
    }
  };

  return (
    <BaseGame config={config} onComplete={onComplete}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="items">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {items.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <motion.div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      initial={false}
                      animate={{
                        scale: snapshot.isDragging ? 1.05 : 1
                      }}
                      className="bg-secondary p-4 rounded-lg"
                    >
                      {item.content.value}
                    </motion.div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </BaseGame>
  );
} 