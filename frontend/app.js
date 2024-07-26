const response = document.getElementById("response")
const retievedData = document.getElementById("retievedData")

const postBtn = document.getElementById("postBtn")
const getAllBtn = document.getElementById("getAllBtn")
const getById = document.getElementById("getById")

const nameEl = document.querySelector("input[name='name']")
const emailEl = document.querySelector("input[name='email']")
const bodyEl = document.querySelector("textarea[name='message']")


const data = {
createdDate: new Date()
}

postBtn.onclick = function(){
 data.name = nameEl.value;
 data.email = emailEl.value;
 data.message = bodyEl.value;

 
console.log(data)

    fetch("/api/contact",{
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            "content-type": "application/json"
        }
    }
        
    ).then(res=> res.json().then(data=>{
        response.innerHTML = data.response
        console.log(data)
    })).catch(err=>{
        response.innerHTML = data.response
        console.log("Error from post request: ", err)
    })
}



getAllBtn.onclick = function(){
    fetch("/api/contact",{
        method: "GET",
        headers:{
            "content-type": "application/json"
        }
    }
        
    ).then(res=> res.json().then(data=>{
        
        console.log(data)
        retievedData.innerHTML = ''; // Clear any previous content

        data.response.forEach(element => {
            // Create a new paragraph (or any other element) for each name
        const nameElement = document.createElement('p');
        nameElement.textContent = element.Name;

            retievedData.innerHTML = nameElement
        });
      
    })).catch(err=>{
        console.log("Error from post request: ", err)
    })
}