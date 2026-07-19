const title=document.getElementById("title");
const description=document.getElementById("description");
const saveBtn=document.getElementById("saveBtn");
const notesContainer=document.getElementById("notesContainer");
const search=document.getElementById("search");
let notes=JSON.parse(localStorage.getItem("notes"))||[];
let editIndex=sessionStorage.getItem("editIndex");
function saveStorage(){
localStorage.setItem("notes",JSON.stringify(notes));
}
async function fakeAPI(){
return new Promise(resolve=>{
setTimeout(()=>{
resolve();
},500);
});
}
async function displayNotes(){
await fakeAPI();
notesContainer.innerHTML="";
let filtered=notes.filter(note=>{
return note.title.toLowerCase().includes(search.value.toLowerCase());
});
filtered.forEach(note=>{
let originalIndex=notes.indexOf(note);
notesContainer.innerHTML+=`
<div class="note">
<h3>${note.title}</h3>
<p>${note.description}</p>
<div class="actions">
<button class="edit" onclick="editNote(${originalIndex})">Edit</button>
<button class="delete" onclick="deleteNote(${originalIndex})">Delete</button>
</div>
</div>
`;
});
}
saveBtn.addEventListener("click",async()=>{
await fakeAPI();
if(title.value==""||description.value==""){
alert("Fill all fields");
return;
}
let note={
title:title.value,
description:description.value
};
if(editIndex===null){
notes.push(note);
}
else{
notes[editIndex]=note;
sessionStorage.removeItem("editIndex");
editIndex=null;
saveBtn.innerText="Save Note";
}
saveStorage();
displayNotes();
title.value="";
description.value="";
});
function deleteNote(index){
notes.splice(index,1);
saveStorage();
displayNotes();
}
function editNote(index){
title.value=notes[index].title;
description.value=notes[index].description;
editIndex=index;
sessionStorage.setItem("editIndex",index);
saveBtn.innerText="Update Note";
}
search.addEventListener("keyup",displayNotes);
displayNotes();