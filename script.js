console.log("hello");

let modal = document.querySelector(".modal");
let addBtn = document.querySelector(".add-btn");
let removeBtn = document.querySelector(".remove-btn");
let textArea = document.querySelector("textarea");
let addFlag = false;
let removeFlag = false;

let ticketObj = [];
let allPriorityColors = ["lightpink", "lightblue", "lightgreen", "black"];

let defaultColor = allPriorityColors[allPriorityColors.length - 1];

let priorityColors = document.querySelectorAll(".priority-color");

priorityColors.forEach((priorityColor) => {
  priorityColor.addEventListener("click", (e) => {
    priorityColors.forEach((priorityColorElement) => {
      priorityColorElement.classList.remove("border");
    });
    priorityColor.classList.add("border");
    defaultColor = priorityColor.classList[0];
  });
});

addBtn.addEventListener("click", (e) => {
  addFlag = !addFlag;
  if (addFlag) {
    modal.style.display = "flex";
  } else {
    modal.style.display = "none";
  }
});

removeBtn.addEventListener("click", (e) => {
  removeFlag = !removeFlag;
  if (removeFlag) {
    e.currentTarget.style.backgroundColor = "red";
  } else {
    e.currentTarget.style.cssText = "backgroundColor:#485460; ";
  }
  console.log(e.currentTarget);
});
function handleRemove(ticket) {
  ticket.addEventListener("click", (e) => {
    if (!removeFlag) {
      return;
    }
    ticket.remove();
  });
}

modal.addEventListener("keydown", (e) => {
  if (e.key === "Shift") {
    createTicket(null, textArea.value, defaultColor);
    modal.style.display = "none";
    addFlag = false;
    setDefault();
  }
});

function createTicket(ticketId, ticketTask, ticketPriorityColor) {
  let id = ticketId || shortid();
  let main = document.querySelector(".main");
  let ticketCont = document.createElement("div");
  ticketCont.classList.add("ticket");
  ticketCont.innerHTML = `
        <div class="ticketPriority ${ticketPriorityColor}"></div>
        <div class="ticketId">${id}</div>
        <div class="ticketTask">${ticketTask}</div>
       <div class="lock"><i class="fa-solid fa-lock"></i></div>
        `;
  main.appendChild(ticketCont);
  if (ticketId != id) {
    ticketObj.push({ ticketPriorityColor, id, ticketTask });
  }
  handleLock(ticketCont);
  handleColor(ticketCont);
  handleRemove(ticketCont);
  console.log(ticketObj);
}

let lockClass = "fa-lock";
let lockOpen = "fa-lock-open";
function handleLock(ticket) {
  let ticketLock = ticket.querySelector(".fa-lock");
  let ticketTask = ticket.querySelector(".ticketTask");
  ticketLock.addEventListener("click", (e) => {
    if (ticketLock.classList.contains(lockClass)) {
      ticketLock.classList.remove(lockClass);
      ticketLock.classList.add(lockOpen);
      ticketTask.setAttribute("contenteditable", true);
    } else {
      ticketLock.classList.remove(lockOpen);
      ticketLock.classList.add(lockClass);
      ticketTask.setAttribute("contenteditable", false);
    }
  });
}

function handleColor(ticketCont) {
  let ticketPriorityColor = ticketCont.querySelector(".ticketPriority");

  ticketPriorityColor.addEventListener("click", (e) => {
    let currentColor = ticketPriorityColor.classList[1];
    let priorityColorIdx = allPriorityColors.indexOf(currentColor);
    // console.log(priorityColorIdx);
    let nextPriorityColorIdx =
      (priorityColorIdx + 1) % allPriorityColors.length;
    let nextPriorityColor = allPriorityColors[nextPriorityColorIdx];

    ticketPriorityColor.classList.remove(currentColor);
    ticketPriorityColor.classList.add(nextPriorityColor);
  });
}

let filterPriorityColors = document.querySelectorAll(".color");
filterPriorityColors.forEach((filterPriorityColor) => {
  filterPriorityColor.addEventListener("click", (e) => {
    let filteredlist = ticketObj.filter((ticket) => {
      return ticket.ticketPriorityColor === filterPriorityColor.classList[0];
    });
    console.log(filteredlist);

    let allTickets = document.querySelectorAll(".ticket");
    for (let ticket of allTickets) {
      ticket.remove();
    }

    filteredlist.forEach((ticket) => {
      // console.log(ticket);
      createTicket(ticket.id, ticket.ticketTask, ticket.ticketPriorityColor);
    });
  });

  filterPriorityColor.addEventListener("dblclick", (e) => {
    ticketObj.forEach((ticket) => {
      createTicket(ticket.id, ticket.ticketTask, ticket.ticketPriorityColor);
    });
  });
});

function setDefault() {
  textArea.value = "";
  defaultColor = allPriorityColors[allPriorityColors.length - 1];
  priorityColors.forEach((pColor)=>{
    pColor.classList.remove('border');
  });
  priorityColors[priorityColors.length-1].classList.add('border');
}
