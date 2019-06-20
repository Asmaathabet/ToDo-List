//capture the element will deal with it 
const input = document.querySelector('.title');
const submit = document.querySelector('.submit');
const error = document.querySelector('.error');
const list = document.querySelector('.list');
const sort = document.querySelector('.sort');

var values = [];
let text = '';
let id =0;

input.addEventListener('keyup', (e) =>{
    const todoTitle = e.target.value.trim(); 
    //make validation for input 
    if (/^[a-zA-Z0-9]|\s+$/.test(todoTitle)){
        error.textContent = "";
        text = todoTitle;
     } else {
        error.textContent= "please put your title with only chars and numbers";
        text="";
        }
});

// add title to the page 
submit.addEventListener('click',(e)=> {  
   if (!text){
    error.textContent= "please put your title with only chars and numbers";
   } else { 
       // we can put text alone because the key is the same name with the variable name 
    const titleObject = {id: ++id, value: text };
    values.push(titleObject);
      // To create New Element 
    const child = document.createElement('li');     
     // add test for new element
    child.textContent =text;
        // Add Delete button in every Li 
        var groupbuttons = document.createElement("span");
        var closebutton = document.createElement("button");
        var closetxt = document.createTextNode("\u00D7");
        closebutton.className = "close";
        closebutton.id = id;
        closebutton.appendChild(closetxt);
        groupbuttons.appendChild(closebutton);
        child.appendChild(groupbuttons);
        closebutton.addEventListener('click', function(ev) {
                idElement= ev.target.id; 
                console.log(idElement);
                closebutton.parentElement.parentElement.remove(); 
          
                values = values.filter(Element =>{
                    // console.log(Element.id, idElement, Element.id == idElement);
                    return !(Element.id == idElement);
                })
                console.log(values);
        })
      // Add Edit button in every Li 
      var Editbutton = document.createElement("button");
      var edittxt = document.createTextNode("\u270E");
      Editbutton.className = "edit";
      Editbutton.appendChild(edittxt);
      groupbuttons.appendChild(Editbutton);
      child.appendChild(groupbuttons);
    
      Editbutton.addEventListener('click', function(ev) {
        var editable = Editbutton.parentElement.parentElement.contentEditable ;
        if(editable === true) {
            Editbutton.parentElement.parentElement.contentEditable = false;
        } else {
            Editbutton.parentElement.parentElement.contentEditable = true;
        }
      })

      // Add check button 
      var checkbutton = document.createElement("INPUT");
      checkbutton.setAttribute("type", "checkbox");
      checkbutton.className = "checkbutton";
      child.appendChild(checkbutton);
      checkbutton.addEventListener('click', function(ev) {
      var check =checkbutton.checked;
      if (check === true){
        checkbutton.parentElement.style.backgroundColor = "#9c9cdc"; 
        checkbutton.parentElement.style.textDecoration= "line-through";
      }
      else {
        checkbutton.parentElement.style.backgroundColor = ""; 
        checkbutton.parentElement.style.textDecoration= "none";
      }
      
      
      })

    // append it in its parent 
    list.appendChild(child);
  
    // reset input field
    input.value = '';
    text = '';
   }
});

// make sort Function
const sortFun = (text1,text2)=>{
    if (text1.value.toLowerCase() > text2.value.toLowerCase()){
        return 1;
    }
    if (text1.value.toLowerCase() < text2.value.toLowerCase()){
     return -1;
     }
     return 0 ;
}

sort.addEventListener('click', (e)=>{
   const sortedValues = values.sort(sortFun); 
    list.textContent ='';
    sortedValues.forEach(Element =>{
        const child = document.createElement('li');
        child.textContent = Element.value; 
        list.appendChild(child);
    })
});


 

 
 
  
