let elForm = document.querySelector(".todo-form ")
let elChooseInput = document.querySelector(".choose-input")
let elChooseImg = document.querySelector(".choose-img")

let todos = JSON.parse(localStorage.getItem("todos")) || []

// create todo start 
elForm.addEventListener("submit", function (evt) {
    evt.preventDefault() 
    let todo = {
        id: todos[todos.length - 1 ]?.id ? todos[todos.length - 1].id + 1 : 1,
        title: evt.target.todoInput.value,
        isComplated: false,
        image:elChooseImg.src
    }
    todos.push(todo)
    evt.target.reset()
    renderTodos(todos, elForm.nextElementSibling)
    localStorage.setItem("todos", JSON.stringify(todos))
    console.log(todos);
    
})
// create todo end

// render todos
function renderTodos(arr, list) {
    list.innerHTML = null
    arr.forEach((item, index) => {
        let elItem = document.createElement("li")
        elItem.className = `bg-white ${item.isComplated ? "line-through pacity-[70%] cursor-not-allowed" : " "} duration-300 p-5 rounded-md flex items-center justify-between `
        elItem.innerHTML = `
        <div class="flex items-center justify-between">
               <div class="flex items-center gap-2">
                <label>
                    <input class="hidden" type="checkbox">
                    <div onclick="handleCheckClick(${item.id})" id="complate" class="w-[20px] h-[20px] relative flex items-center justify-center rounded-full border-[1px] border-slate-500 ">
                        <div id="complate" class= "${item.isComplated ? "bg-red-500" : ""} absolute  inset-[1.3px]  rounded-full"></div>
                    </div>
                </label>
                <strong>${index + 1}.</strong>
                <p>${item.title}</p>
            </div>
            <div class="flex items-center gap-5">
                <button id="edit" class="bg-green-600 text-white p-2 rounded-md w-[100px]">Edit</button>
                <button id="delete" class="bg-red-700 text-white p-2 rounded-md w-[100px]">Delete</button>
                
            </div>
        </div>
        <img class=" mt-5 rounded-md w-full h-[300px]" src="${item.image}" alt="todo img" width="200" height="200"/>
        `
        list.appendChild(elItem)

        elItem.addEventListener("click", function (e) {
            if (e.target.id == "delete") {
                todos.splice(index, 1)
                renderTodos(todos, elForm.nextElementSibling)
                localStorage.setItem("todos", JSON.stringify(todos))
            }
            else if(e.target.id == "edit"){
                if(!item.isComplated){
                    let newValue = prompt(item.title)
                    todos[index].title = newValue
                    renderTodos(todos,elForm.nextElementSibling)
                    localStorage.setItem("todos", JSON.stringify(todos))
                }
            }
        })
    });
}
renderTodos(todos, elForm.nextElementSibling)
// render todos

// check part

function handleCheckClick(id){
    let findObj = todos.find(item => item.id == id)
    findObj.isComplated = !findObj.isComplated
    renderTodos(todos, elForm.nextElementSibling)
    localStorage.setItem("todos", JSON.stringify(todos))
}
//check part

// choose img part
elChooseInput.addEventListener("change",function(e) {
    elChooseImg.src = URL.createObjectURL(e.target.files[0]);
})

// choose img part end