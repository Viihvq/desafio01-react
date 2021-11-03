import { useEffect, useState } from 'react';
import {v4 as uuidv4} from 'uuid';

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

let geral = 0;

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    console.log(tasks)
  }, [tasks])

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    if(newTaskTitle){

      const filtro =
        tasks.filter(task => {
          return (
            newTaskTitle == task.title
          )
        })

        console.log(`aaaaaaaaa`,filtro)
      

      if(filtro.length == 0){

        setTasks(taskAntiga =>
          [
            ...taskAntiga,
            {
              id: uuidv4(),
              title: newTaskTitle,
              isComplete: false
            },
          ]
        );
      }
    }
    
  }

  function handleToggleTaskCompletion(id: string) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    
    const temp = [...tasks]

    console.log("temp", temp)

    const index = tasks.findIndex(task => { //obj
      return task.id === id
    })

    console.log("tempindex", temp[index])
    
    temp[index] = {...temp[index], }

    // OUTRA FORMA DE FAZER:

    // const temp2 = [...tasks].map(task => {
    //   if(task.id === id){
    //     task.isComplete = !task.isComplete
    //   }
    //   return task
    // })

    console.log(temp)

    //
    
    setTasks([...temp]) //bom deixar o ..., senao a temp e tasks ficam interligados.
  }

  /* ALTERAÇÃO/EDIÇÃO NO OBJ
  const temp2 = [...tasks].map(task => {
      if(task.id === id){
        task = {...task, title: "teste", isComplete: !task.isComplete}
        return task
      }
      return task
    })
  */

  function handleRemoveTask(id: string) {
    //1 OPÇÃO
    // Remova uma task da listagem pelo ID
    // const temp = [...tasks]
    // const index = tasks.findIndex(task => task.id === id)
    // temp.splice(index, 1)//2º argumento é a quantidade de elementos excluidos
    
    //2 OPÇÃO
    const temp = [...tasks].filter(task => id != task.id)

    setTasks([...temp])
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}