console.log('hello');

let modal = document.querySelector('.modal');
let addBtn = document.querySelector('.add-btn');
let addFlag = false;

addBtn.addEventListener('click', (e)=>{
  addFlag = !addFlag;
  if(addFlag){
    modal.style.display = 'flex';

  }else{
    modal.style.display = 'none';
  }
})

modal.addEventListener('keydown', (e)=>{
  if(e.key === "Shift"){
    createTicket();
    modal.style.display = 'none';
    addFlag = false;
  }
})

function createTicket(ticketId, ticketTask, ticketPriorityColor){
    let main = document.querySelector('.main');
    let div = document.createElement('div');
    div.innerHTML=
      `<div class="ticket">
        <div class="ticketPriority"></div>
        <div class="ticketId"></div>
        <div class="ticketTask">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
          temporibus ratione, est dolor, eos ullam fuga voluptas officia,
          corrupti totam nisi vero eum rem neque sed natus odio placeat eius?
        </div>
      </div>`;
      main.appendChild(div);
}

