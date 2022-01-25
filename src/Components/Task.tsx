import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { todoState } from "../atoms";
import { saveTodos } from "../LocalStorage/LocalStorage";

const Form = styled.form`
margin-bottom: 50px;
min-width: 360px;
input {
  width: 100%;
  padding: 10px 0;
  font-size: 24px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
};
h2 {
  color : white
}
`;

interface ITask {
    task : string
}

function Task() {
    const [toDos, setToDos] = useRecoilState(todoState);
    const {register, handleSubmit, setValue} = useForm<ITask>();
    const onValid = ({task}:ITask) => {
        const data = { [task] : [], ...toDos};
        setToDos(data);
        saveTodos(data);
        setValue("task","");
    }
  
    return (
        <Form onSubmit={handleSubmit(onValid)}>
          <h2>Task Add.</h2>
          <input 
          {...register('task', {required : true})}
          type="text" placeholder="Write Task"/>
        </Form>
    );
};

export default Task;