import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./home.css";

const Home = () => {
    const navigate= useNavigate();
    const [newTitle, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [allToDos, setToDos] = useState([]);
    const [completeScreen, setCompleteScreen] = useState(false);
    const [completedToDo, setCompletedToDo] = useState([]);
  
    const handleAdd = () => {
      if (newTitle === "" || desc === "") {
        alert("Add a proper Title or Description to your task");
      } else {
        let todoItem = {
          title: newTitle,
          description: desc,
        };
        let updatedTodoArr = [...allToDos];
        updatedTodoArr.push(todoItem);
        setToDos(updatedTodoArr);
        setDesc("");
        setTitle("");
        localStorage.setItem("todoList", JSON.stringify(updatedTodoArr));
      }
    };
  
    const handleDelete = (index) => {
      let reducedToDo = [...allToDos];
      reducedToDo.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(reducedToDo));
      setToDos(reducedToDo);
    };
  
    const handleDone = (index) => {
      let updatedCompletedToDo = [...completedToDo];
     

      let completedTask = {
        ...allToDos[index],
      };
      updatedCompletedToDo.push(completedTask);
      localStorage.setItem(
        "completedToDoList",
        JSON.stringify(updatedCompletedToDo)
      );
      setCompletedToDo(updatedCompletedToDo);
      let reducedToDo = [...allToDos];
      reducedToDo.splice(index, 1);
      localStorage.setItem("todoList", JSON.stringify(reducedToDo));
      setToDos(reducedToDo);
    };
    const handleCompletedDelete = (index) => {
      let reducedCompletedToDo = [...completedToDo];
      reducedCompletedToDo.splice(index, 1);
      localStorage.setItem(
        "completedToDoList",
        JSON.stringify(reducedCompletedToDo)
      );
      setCompletedToDo(reducedCompletedToDo);
    };
  
    useEffect(() => {
      let toDoArray = JSON.parse(localStorage.getItem("todoList"));
      if (toDoArray) {
        setToDos(toDoArray);
      }
      let completedToDoArray = JSON.parse(
        localStorage.getItem("completedToDoList")
      );
      if (completedToDoArray) {
        setCompletedToDo(completedToDoArray);
      }
    }, []);
  return (
    <>
    <div className="main_div">
        <div className="header">
        <h1 className="heading">
          To-Do
        </h1>
        <div className="logout">
            <button onClick={()=>{navigate('/')}}>Log Out</button>
        </div>
        </div>
        <div className="input_div">
          <input
            className="title-input"
            type="text"
            value={newTitle}
            placeholder="Task title"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />

          <input
            className="desc-input"
            type="text"
            value={desc}
            placeholder="Task description"
            onChange={(event) => {
              setDesc(event.target.value);
            }}
          />
          <button className="addBtn" onClick={handleAdd}>
            Add
          </button>
        </div>
        <div className="tabDiv">
          <button
            className={`secondaryBtn ${completeScreen === false && "active"}`}
            onClick={() => {
              setCompleteScreen(false);
            }}
          >
            Pending
            <span className={`count-pending ${allToDos.length=== 0 && "d-none"}`}>{allToDos.length}</span>
          </button>
          <button
            className={`secondaryBtn ${completeScreen === true && "active"}`}
            onClick={() => {
              setCompleteScreen(true);
            }}
          >
            Completed
            <span className={`count-pending ${completedToDo.length=== 0 && "d-none"}`}> {completedToDo.length}</span>
          </button>
        </div>
        <div className="list_div">
          {!completeScreen &&
            allToDos.map((item, index) => {
              return (
                <div className="list_item" key={index}>
                  <div className="toDoItemDetail">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="toDoBtnDiv">
                    <button
                      className="doneBtn"
                      onClick={() => handleDone(index)}
                    >
                      Done
                      {""}
                    </button>
                    <button
                      className="doneBtn"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          {/* complete screen tab*/}
          {completeScreen &&
            completedToDo.map((item, index) => {
              return (
                <div className="list_item" key={index}>
                  <div className="toDoItemDetail">
                    <h3 className="k">{item.title}</h3>
                    <p className="k">{item.description}</p>
                  </div>
                  <div className="toDoBtnDiv">
                    <button
                      className="doneBtn"
                      onClick={() => handleCompletedDelete(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>

    </div>
  </>
  )
}

export default Home;