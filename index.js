
//parent element container.
const taskContainer = document.querySelector(".task__container");
//Gloabl store
let globalStore = [];

const newCard = ({ id, imageUrl, tasktitle, tasktype, taskdescription }) =>
  `<div class="col-md-6 col-lg-4" id=${id}>
<div class="card ">
  <div class="card-header d-flex justify-content-end gap-2" id="parentnode">
    <button type="button" class="btn btn-outline-success"  id=${id} onclick="editCard.apply(this,arguments)" >
    <i class="fas fa-pencil-alt"  id=${id} onclick="editCard.apply(this,arguments)"></i></button>
    <button type="button"  class="btn btn-outline-danger"  id=${id} onclick="deleteCard.apply(this,arguments)" >
    <i class="fas fa-trash-alt" id=${id} onclick="deleteCard.apply(this,arguments)" ></i>
    </button>
  </div>
  <div class="card-body ">
    <img
      src=${imageUrl}
      class="card-img-top" alt="...">
    <h5 class="card-title" >${tasktitle}</h5>
    <p class="card-text" >${taskdescription}</p>
    <span class="badge bg-primary">${tasktype}</span></h5>
  </div>
  <div class="card-footer text-muted ">
    <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
  </div>
</div>
</div>`;

const loadInitialCards = () => {
  const getInitialData = localStorage.getItem("tasky");
  if (!getInitialData) return;

  const { cards } = JSON.parse(getInitialData);
  cards.map((cardObjects) => {
    const CreateNewcard = newCard(cardObjects);
    taskContainer.insertAdjacentHTML("beforeend", CreateNewcard);
    globalStore.push(cardObjects);

  });

};

const updateLocalStorage=()=>{
  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));
};

const savchanges = () => {
  const taskData = {
    id: `${Date.now()}`,
    imageUrl: document.getElementById("imageurl").value,
    tasktitle: document.getElementById("tasktitle").value,
    tasktype: document.getElementById("tasktype").value,
    taskdescription: document.getElementById("taskdescription").value,
  };
  //creating a new card.
  const createNewcard = newCard(taskData);
  // pushing the card object in HTML.using (insertAdjacentHTML) function.
  taskContainer.insertAdjacentHTML("beforeend", createNewcard);

  globalStore.push(taskData);
  // console.log(globalStore);
  updateLocalStorage();
};

const deleteCard = (event) => {
  //id
  event = window.event;
  const targetId = event.target.id;
  const tagName = event.target.tagName;//BUTTON
  // update the globalStore.
  globalStore=globalStore.filter((cardObjects)=>{
      return cardObjects.id!==targetId;
  });
  
  updateLocalStorage();
  // access the DOM to remove the element.

  if (tagName === "BUTTON") {
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode);
  }

  return taskContainer.removeChild(
    event.target.parentNode.parentNode.parentNode.parentNode);
    


};

const editCard=(event)=>{
  event = window.event;
  const targetId = event.target.id;
  const tagName = event.target.tagName;//BUTTON
  // accessing the target

  let parentElement;

  if(tagName=="BUTTON")
  {
    parentElement=event.target.parentNode.parentNode;
  }
  else{
    parentElement=event.target.parentNode.parentNode.parentNode;
  }

  let taskTitle=parentElement.childNodes[3].childNodes[3];
  let taskDescription=parentElement.childNodes[3].childNodes[5];
  let taskType=parentElement.childNodes[3].childNodes[7];
  let submitButton=parentElement.childNodes[5].childNodes[1];
  // setAttribute
  taskTitle.setAttribute("contenteditable","true");
  taskDescription.setAttribute("contenteditable","true");
  taskType.setAttribute("contenteditable","true");
  submitButton.innerHTML="Save Changes";


};

// edit->😎
// open
