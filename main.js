var allInputs = [];

if(localStorage.getItem('container') != null){
    allInputs = JSON.parse(localStorage.getItem('container'));
    displayData(); 
}

function validateInputs(element){
    var val = element.value;
    var id = element.id;

    var regex={
        name: /^\w{3,}$/,
        link: /^https?:\/\/\w+(\.\w+)+.*$/
}

    if(regex[id].test(val)){
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
} 
    else{
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
}
}

function addInputs(){
    var nameInput = document.getElementById("name");
    var linkInput = document.getElementById("link");

    if(nameInput.classList.contains("is-valid") && linkInput.classList.contains("is-valid")){
        var bookmark = {
        name: nameInput.value,
        link: linkInput.value
        }
        allInputs.push(bookmark);
        localStorage.setItem("container", JSON.stringify(allInputs));
        displayData();
        clearForm();
} 
    else {
        alert("Please enter valid data before submitting!");
}
}

function displayData(){
    var tableContent = "";

    for (var i = 0; i < allInputs.length; i++){
        tableContent += `
        <tr>
            <td>${i + 1}</td>
            <td>${allInputs[i].name}</td>
            <td>
            <a href="${allInputs[i].link}" target="_blank" class="btn btn-success btn-sm w-50">
            <i class="fa-solid fa-eye"></i> Visit
            </a>
            </td>
            <td>
            <button onclick="deleteBookmark(${i})" class="btn btn-danger btn-sm w-50">
                <i class="fa-solid fa-trash"></i> Delete
            </button>
            </td>
        </tr>
        `;
}

    document.getElementById("tableContent").innerHTML = tableContent;
}

function clearForm(){
    document.getElementById("name").value = "";
    document.getElementById("link").value = "";
    document.getElementById("name").classList.remove("is-valid");
    document.getElementById("link").classList.remove("is-valid");
}

function deleteBookmark(index){
    allInputs.splice(index, 1);
    localStorage.setItem("container", JSON.stringify(allInputs));
    displayData();
}
