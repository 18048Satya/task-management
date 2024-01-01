import React, { useState } from "react";
import "./Task.css";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";
const item1 = {
  id: v4(),
  name: "Task A",
};
const item2 = {
  id: v4(),
  name: "Task B",
};
const item3 = {
  id: v4(),
  name: "Task C",
};
const item4 = {
  id: v4(),
  name: "Task D",
};
const item5 = {
  id: v4(),
  name: "Task E",
};


function Task() {
  const [text,setText] = useState()
  const [state, setState] = useState({ 
    Todo: {
      title: "Todo",
      items: [item1,item3,item4],
    },
    Inprogress: {
      title: "In progress",
      items: [item2],
    },
    Review: {
      title: "Review",
      items: [item5],
    },
    Done: {
      title: "Completed",
      items: [],
    },
  });
  const handleDragEnd = ({destination,source}) =>{
    console.log(destination)
    console.log(source)
    if(!destination){
      console.log("not dropped in droppable")
      return
    }
    if(destination.index === source.index && destination.droppableId ===source.droppableId ){
      console.log("dropped in same place")
      return
    }
    const itemCopy = {...state[source.droppableId].items[source.index]}
     setState( prev =>{
      prev = {...prev}
     prev[source.droppableId].items.splice(source.index, 1)
     prev[destination.droppableId].items.splice(destination.index,0, itemCopy)

      return prev
    })
  }
  const addItem =() =>{
    setState(prev =>{
      return{
        ...prev,
        Todo:{ 
          title:"Todo",
          items:[
            {
              id:v4(),
              name: text
            },
            ...prev.Todo.items
          ]

        }
      }
    })
    setText("")
  }
 
  return (
    <div className="TaskContainer"> 
    <div className="subContainer">
    <h3>Task Prograss</h3>
    <div className="input">
     <input type="text" value={text} onChange={(e)=> setText(e.target.value) } placeholder="Add task"/>
     <button onClick={addItem} >Add</button>
   </div>
   </div>
   <div className="Taskadd">
     <input type="text" value={text} onChange={(e)=> setText(e.target.value) } placeholder="Add task"/>
     <button onClick={addItem} >Add</button>
   </div>
   
   <div className="Task">
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return (
            <div className={"column"}>
              <h4>{data.title}</h4>
              <Droppable droppableId={key}>
                {(provided) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      {data.items.map((el, index) => {
                        return (
                          <Draggable
                            key={el.id}
                            index={index}
                            draggableId={el.id}
                
                          >
                            {(provided,snapshot) => {
                              return (
                                <div
                                 className={`item ${snapshot.isDragging && "dragging"}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                    
                                >
                                {el.name}

                                </div>
                             
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
      </div>
    </div>
  );
}

export default Task;
