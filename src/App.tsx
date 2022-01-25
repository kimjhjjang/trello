import { DragDropContext , Droppable, DropResult} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, todoState } from "./atoms";
import Board from "./Components/Board";
import Task from "./Components/Task";

const Wrapper = styled.div`
  display: flex;
  width: 65%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;


function App() {
  const [toDos, setTodos] = useRecoilState(todoState);
  
  const onDragEnd = (info:DropResult) => {
    const {destination, source, type ,draggableId} = info;
    if(!destination) return;
    if (type === "task") {
      setTodos((allBoards) => {
        const board = Object.keys(allBoards);
        board.splice(source.index, 1);
        board.splice(destination?.index, 0, draggableId);
        const newBoard:IToDoState = {};
        board.forEach((key) => {
          newBoard[key] = allBoards[key];
        });
        return newBoard;
      })
    }else {
      if(destination?.droppableId === source.droppableId){
        setTodos((allBoards) => {
          const boardCopy = [...allBoards[source.droppableId]];
          const taskObj = boardCopy[source.index];
          boardCopy.splice(source.index,1); // 시작지점 index 1개를 제외 시킨다.
          boardCopy.splice(destination?.index ,0 , taskObj); // 도착지점 index에 draggableId -> 즉 Todo list를 만들어준다.
          return {
            ...allBoards,
            [source.droppableId] : boardCopy,
          };
        });
      };
      if(destination.droppableId !== source.droppableId){
        setTodos((allBoard) => {
          const sourceBoard = [...allBoard[source.droppableId]];
          const taskObj = sourceBoard[source.index];
          const destinationBaord = [...allBoard[destination.droppableId]];
          sourceBoard.splice(source.index, 1);
          destinationBaord.splice(destination.index,0,taskObj);
          return {
            ...allBoard,
            [source.droppableId] : sourceBoard,
            [destination.droppableId] : destinationBaord
          }
        })
      }
    }
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Task/>
        <Droppable droppableId="task" type="task" direction="horizontal">
          { (magic) => 
            <Boards  {...magic.droppableProps} ref={magic.innerRef}>
              {Object.keys(toDos).map( (boardId, index) => (
                <Board 
                boardId={boardId} 
                key={boardId} 
                toDos={toDos[boardId]} 
                index={index}
                />
              )
              )}
              {magic.placeholder}
            </Boards>
          }
        </Droppable>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;


