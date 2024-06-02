document.addEventListener("DOMContentLoaded",()=>{
    const taskTitle = document.getElementById("taskTitle");
    const taskPriority= document.getElementById("taskPriority");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const tasksTable = document.getElementById("tasksTable").querySelector("tbody");
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];

    function rTasks() {
        tasksTable.innerHTML="";
        tasks.forEach((task,index)=>{
            const row = document.createElement("tr");
            row.innerHTML=

                        `   <td>${task.title}</td>
                            <td style="color: ${getPriorityColor(task.priority)}">${task.Priority}</td>
                            <td><button onclick="toggleStatus(${index})">${task.status}</button></td>
                            <td><button onclick="deleteTask(${index})">Remove</button></td>

                        `;
            tasksTable.appendChild(row);
        });
    }

    function getPriorityColor(priority){
        switch(priority){
            case "low": return 'rgb(0,128,0)';
            case "medium": return 'rgb(0,0,255)';
            case "high": return 'rgb(255,0,0)';
            default: return "";

        }
    }

    function addTask(){
        if(taskTitle.value==="" || taskPriority.value===""){
            alert("Task cannot be empty");
            return;
        }
        const newTask ={
            title: taskTitle.value,
            priority:taskPriority.value,
            status: "pending"
        };

        tasks.push("newTask");
        localStorage.setItem("tasks",JSON.stringify(tasks));
        rTasks();
        taskTitle.value="";
        taskPriority.value='';
    }

    function toggleStatus(index){
        const statusOrder=['pending','in-progress','complete'];
        const currentStatus= tasks[index].status;
        const nextStatus = statusOrder[(statusOrder.indexOf(currentStatus)+1) % statusOrder.length];
        tasks[index].status=nextStatus;
        localStorage.setItem('tasks',JSON.stringify(tasks));
        rTasks();

    }
    function deleteTask(index){
        const taskToDelete=tasks.splice(index,1)[0];
        deletedTasks.push(taskToDelete);
        localStorage.setItem('tasks',JSON.stringify(tasks));
        localStorage.setItem('deletedTasks',JSON.stringify(deletedTasks));
        rTasks();
    }
    addTaskBtn.addEventListener('click',addTask);
    rTasks();

    window.toggleStatus=toggleStatus;
    window.deleteTask=deleteTask;
});