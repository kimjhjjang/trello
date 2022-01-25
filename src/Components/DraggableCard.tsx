import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "../atoms";
import { saveTodos } from "../LocalStorage/LocalStorage";

const Card = styled.div<{isDragging : boolean}>`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 10px;
  background-color: ${(props) => 
      props.isDragging? "tomato" : props.theme.cardColor
  };
  box-shadow: ${(props) => 
  props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)":"none"};
`;

const Button = styled.button`
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
`;

interface IDraggableCard {
    toDoId : number;
    toDoText : string;
    index : number;
    boardId : string;
};

function DraggableCard({toDoId,toDoText, index , boardId}:IDraggableCard) {
    
    const setToDos = useSetRecoilState(todoState);
    const onDeleteClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget: {value}}= event;
        const id = value;
      setToDos((todo) => {
        const todoCopy = { ...todo };
        const keys = Object.keys(todoCopy);
        keys.forEach((key) => {
          todoCopy[key] = todo[key].filter(
            (toDoCard) =>  toDoCard.id !== parseInt(id)
          );
        });
        saveTodos(todoCopy);
        return todoCopy;
      });
    };
    return (
        <Draggable key={toDoId} draggableId={toDoId+""} index={index}>
            {(magic, snapshot) => (
            <Card 
            isDragging={snapshot.isDragging}
            ref={magic.innerRef} 
            {...magic.draggableProps} 
            {...magic.dragHandleProps}>
             <span>{toDoText}</span>
             <Button value={toDoId} name={boardId} onClick={onDeleteClick}>❌</Button>
            </Card>
        )}</Draggable>
    )
}

export default React.memo(DraggableCard);