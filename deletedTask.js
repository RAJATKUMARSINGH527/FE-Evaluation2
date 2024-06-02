document.addEventListener("DOMContentLoaded",()=>{
    const filterPriority = document.getElementById("filterPriority");
    const filterStatus= document.getElementById("filterStatus");
    const deletedTasksTable = document.getElementById("deletedTasksTable").querySelector("tbody");
    
   
    let deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function rDeletedTasks() {
        deletedTasksTable.innerHTML="";
        let filteredTasks = deletedTasks.filter(task=>{
            return (filterPriority.value === "" || task.Priority === filterPriority.value) &&
            (filterStatus.value === '' || task.status === filterStatus.value);

        });
        
        filteredTasks.forEach((task,index)=>{
            const row = document.createElement('tr');
            row.innerHTML=

                        `   <td>${task.title}</td>
                            <td style="color: ${getPriorityColor(task.priority)}">${task.Priority}</td>
                            <td>${task.status}</td>
                            <td><button onclick="restoreTask(${index})">Restore</button></td>
                            <td><button onclick="deletePermanently(${index})">Delete</button></td>

                        `;
            deletedTasksTable.appendChild(row);
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

    function restoreTask(){
        const taskToRestore = deletedTasks.splice(index,1)[0];
        tasks.push('tasksToRestore');
        local
        if(taskTitle.value==="" || taskPriority.value===""){
            alert("Task cannot be empty");
            return;
        }
        const newTask ={
            title: taskTitle.value,
            priority:taskPriority.value,
            status: "pending"
        };

        ta
    }
    function restoreTask(index){
        const taskToRestore = deletedTasks.splice(index,1)[0];
        tasks.push('tasksToRestore');

        localStorage.setItem('tasks',JSON.stringify(tasks));
        localStorage.setItem('deletedTasks',JSON.stringify(deletedTasks));

        rDeletedTasks();
    }

    function deletePermanently(index){
        deletedTasks.splice(index,1);
        tasks.push('tasksToRestore');
        localStorage.setItem('deletedTasks',JSON.stringify(deletedTasks));
        
        rDeletedTasks();
    }
    filterPriority.addEventListener('change',rDeletedTasks);
    filterPriority.addEventListener('change',rDeletedTasks)
    rDeletedTasks();

    window.restoreTask=restoreTask;
    window.deletePermanently=deletePermanently;

});
 
