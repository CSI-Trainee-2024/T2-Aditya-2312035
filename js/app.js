let addWorkoutBtn = document.querySelector("#addWorkoutBtn");

let workouts;

try{
    workouts = JSON.parse(localStorage.getItem("workouts")) || [];
}catch(error){
    workouts = [];
}

function formatTime(unFormatedTime) {
    const minutes = Math.floor(unFormatedTime / 60);
    const seconds = unFormatedTime % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formattedDuration = `${minutes}:${formattedSeconds}`;
    return formattedDuration;
  }

function deleteWorkout(){
    let deleteBtns = document.querySelectorAll(".deleteBtn");
    

    deleteBtns.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            let i = parseInt(btn.getAttribute("data-index"));
            delElement(i);
        });
    });
}

function delElement(i){
    workouts.splice(i,1);
    localStorage.setItem("workouts",JSON.stringify(workouts));
    displayWorkout();
}

function parseTime(duration) {
    const parts = duration.split(":");
    const minutes = parseInt(parts[0]) || 0;
    const seconds = parseInt(parts[1]) || 0;
    return minutes * 60 + seconds;
  }

function displayWorkout(){
    let elements ="";
    for(i=0; i<workouts.length; i++){
        elements += `<li class="tableRow">
                        <div class="col col1">${workouts[i].name}</div>
                        <div class="col col2">${formatTime(workouts[i].duration)}</div>
                        <button class="col col3 deleteBtn" data-index="${i}" > X </button> </li>`;
    }
    document.querySelector(".table").innerHTML = elements;
    deleteWorkout();
}

function addWorkout(){
    let workout = document.getElementById("workout");
    let timeLmt = document.getElementById("timeLimit");
    let timeDur = parseTime(timeLmt.value);
    data = {
        name: `${workout.value}`,
        duration: `${timeDur}`,
    };

    if(timeLmt.value && workout.value){
        workouts.push(data);
        localStorage.setItem("workouts",JSON.stringify(workouts));
        displayWorkout();
        workout.value="";
        timeLmt.value="";
    }else{
        alert("please enter atleast 1 workout, duration");
    }
}

addWorkoutBtn.addEventListener("click",addWorkout);

document.querySelector("#beginWorkout").addEventListener("click",()=>{
    if(workouts.length > 0){
        window.location.href = "workout.html";
    }else{
        alert("please add atleast one exercise!!!");
    }
})

window.onload = function(){
    displayWorkout();
}