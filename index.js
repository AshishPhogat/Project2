
//parent element container.
const taskContainer=document.querySelector(".task__container");
//Gloabl store
const globalStore=[];

const newCard=({id,imageUrl,tasktitle,tasktype,taskdescription})=>`<div class="col-md-6 col-lg-4" id=${id}>
<div class="card ">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
    <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
  </div>
  <div class="card-body ">
    <img
      src=${imageUrl}
      class="card-img-top" alt="...">
    <h5 class="card-title">${tasktitle}</h5>
    <p class="card-text">${taskdescription}</p>
    <span class="badge bg-primary">${tasktype}</span></h5>
  </div>
  <div class="card-footer text-muted ">
    <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
  </div>
</div>
</div>`;

const loadInitialCards=()=>{
    const getInitialData=localStorage.getItem("tasky");
    if(!getInitialData) return ;

    const{cards}=JSON.parse(getInitialData);
    cards.map((cardObjects)=>{
        const CreateNewcard=newCard(cardObjects);
        taskContainer.insertAdjacentHTML("beforeend",CreateNewcard);
        globalStore.JSON("tasky",{CreateNewcard});

    }
    );
   
};

const savchanges=()=>{
    const taskData={
        id:`${Date.now()}`,
        imageUrl:document.getElementById("imageurl").value,
        tasktitle:document.getElementById("tasktitle").value,
        tasktype:document.getElementById("tasktype").value,
        taskdescription:document.getElementById("taskdescription").value,
    };
    //creating a new card.
    const createNewcard=newCard(taskData);
    // pushing the card object in HTML.using (insertAdjacentHTML) function.
    taskContainer.insertAdjacentHTML("beforeend",createNewcard);

    globalStore.push(taskData);
    console.log(globalStore);
    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
};