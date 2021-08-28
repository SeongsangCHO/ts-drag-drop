import React, { useState, useRef } from "react";
import { classicNameResolver, isNotEmittedStatement } from "typescript";
import "./App.css";

const data = [
  {
    id: 1,
    todo: "1번",
  },
  {
    id: 2,
    todo: "2번",
  },
  {
    id: 3,
    todo: "3번",
  },
  {
    id: 4,
    todo: "4번",
  },
  {
    id: 5,
    todo: "5번",
  },
  {
    id: 6,
    todo: "6번",
  },
  {
    id: 7,
    todo: "7번",
  },
  {
    id: 8,
    todo: "8번",
  },
];
function App() {
  const [todoData, setTodoData] = useState(data);
  const interSectElId = useRef<number>(-1);
  const clickElId = useRef<number>(-1);
  const getInterSectionElementIndex = (id: number) => {
    return todoData.findIndex((todo) => todo.id === id);
  };
  const onDragStart = (e: any) => {
    const { id } = e.target.dataset;
    clickElId.current = interSectElId.current = getInterSectionElementIndex(
      Number(id)
    );
    e.dataTransfer.effectAllowed = "move";
    e.target.classList.add("grabbing");
    console.log(clickElId.current, "잡은 id");
  };
  const onDragEnd = (e: any) => {
    console.log(e.target, "onDragEnd - 드래그 끝날 때");
    const printData = [...todoData];
    const grapItem = printData[clickElId.current];
    printData.splice(clickElId.current, 1); //자르고
    printData.splice(interSectElId.current, 0, grapItem);
    e.target.classList.remove("grabbing");
    // printData.splice(interSectElId.current, 1, todoData[clickElId.current]);
    // console.log(printData);
    setTodoData([...printData]);
  };
  const onDragEnter = (e: any) => {
    const { id } = e.target.dataset;
    interSectElId.current = getInterSectionElementIndex(Number(id));
    console.log(interSectElId.current, "겹침 id");
    //0,1까지/ 2번째 넣고, 3번부터 끝까지
    e.target.classList.add("inter");

    // console.log(e.target, "onDragEnter - 요소 겹칠 때", interSectElId);
  };
  const onDrop = (e: any) => {
    e.preventDefault();
    console.log(e.target, "onDrop - 놓을 때");
  };
  const onDragOver = (e: any) => {
    e.preventDefault();
  };
  const onDragLeave = (e: any) => {
    e.target.classList.remove("inter");
    console.log(e.target.dataset.id);
  };
  return (
    <div className="App">
      <div className="wrapper">
        <ul className="ul-wrapper">
          {todoData.map((item) => {
            return (
              <li
                draggable
                data-id={item.id}
                onDrop={onDrop}
                onDragLeave={onDragLeave}
                onDragEnter={onDragEnter}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                onDragStart={onDragStart}
                key={item.id}
                className="li-item"
              >
                {item.todo}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
