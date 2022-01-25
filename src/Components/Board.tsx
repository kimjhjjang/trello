import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled, {keyframes} from "styled-components";
import { ITodo, todoState } from "../atoms";
import DraggableCard from "./DraggableCard";
import React, { useEffect } from "react";
import { saveTodos } from "../LocalStorage/LocalStorage";

// animations
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  padding-top: 30px;
  padding: 10px 10px;
  border-radius: 5px;;
  background-color: ${props => props.theme.boardColor};
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.8s ease-out;
  transition: visibility 0.8s ease-out;
  min-width: 300px;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size:18px;
`;

interface IAreaProps {
    isDraggingFromThis : boolean;
    isDraggingOver : boolean;
}

const Area = styled.div<IAreaProps>`
  background-color: ${props => props.isDraggingOver ?  "#dfe6e9" : 
  props.isDraggingFromThis ? "#b2bec3" : "transparent"};
  flex-grow: 1;
  transition:  background-color 0.3s linear;
  padding:10px;
`;

const Form = styled.form`
    width: 100%;
    padding: 10px;
    input {
        width : 100%;
        border: none;
        height: 40px;
        padding-left: 10px;
        outline: 0;
        font-size: 16px;
        background: none;
        border-bottom: 1px solid #000;
    }
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

const TitleBox = styled.div`
    display : flex ;
    width: 100%;
    justify-content: space-between;
`;

interface IBoardProps {
    toDos: ITodo[];
    boardId : string;
    index: number;
}

interface IForm {
    toDo : string;
}


function Board ({toDos,boardId,index}:IBoardProps) {
    const [todos, setToDos] = useRecoilState(todoState);
    const {register, handleSubmit, setValue} = useForm<IForm>();

    const deleteBoard = (event: React.MouseEvent<HTMLButtonElement>) => {
        const { currentTarget: { value , name} } = event;
        setToDos((allBoards) => {
            const todosBoard = { ...allBoards };
            delete todosBoard[value];
            saveTodos(todosBoard);
            return todosBoard;
        });
        
      /*  let data = Object.keys(todos);
       delete data[Number(name)];
       console.log(data.length); */
    }
    
    const onValid = ({toDo}:IForm) =>{
        const newToDo = {
            id: Date.now(),
            text: toDo
        };

        setToDos(allBoards => {
            const addBoard = {
                ...allBoards,
                [boardId] : [
                    ...allBoards[boardId],
                    newToDo
                ]
            };
            saveTodos(addBoard);
            return addBoard
        });
        setValue("toDo", "");
    };
    
        

    return(
        <Draggable draggableId={boardId} index={index} key={boardId}>
            {(magic) => (
                <Wrapper ref={magic.innerRef}
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                >
                    <TitleBox>
                        <Title>{boardId}</Title>
                        <Button value={boardId} name={index+""} onClick={deleteBoard}>❌</Button>
                    </TitleBox>
                    <Form onSubmit={handleSubmit(onValid)}>
                        <input {...register("toDo", { required: true })} type="text" placeholder={`Add ${boardId}`} />
                    </Form>
                    <Droppable droppableId={boardId} >
                        {(magic, snapshot) => (
                            <Area
                                isDraggingOver={snapshot.isDraggingOver}
                                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                                ref={magic.innerRef} {...magic.droppableProps}>
                                {toDos.map((todo, index) => (
                                    <DraggableCard key={todo.id} index={index} toDoId={todo.id} toDoText={todo.text} boardId={boardId} />
                                )
                                )}
                                {magic.placeholder}
                            </Area>
                        )}
                    </Droppable>
                </Wrapper>
            )}
        </Draggable>
    )
}

export default React.memo(Board);