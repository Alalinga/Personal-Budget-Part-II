//const { response } = require("express");


function updateEnvelope(title,budget,id) {
    
    upateModal.style.display = "block";
    document.getElementById("title").value = title;
    document.getElementById("budget").value = budget;
    document.getElementById("envelope-id").value = id;
}

function deleteEnvelope(id) {
    
    deleteModal.style.display = "block";
    document.getElementById("envelope-to-delete").value=id;
    
}

const tannsferEvelopes =()=>{
    const successResponse = document.getElementById("success-response");
    const errorResponse = document.getElementById("error-response");
    successResponse.innerHTML='';
    errorResponse.innerHTML='';
  const fromValue=  document.getElementById("transfer-from").value.substring(0,1);
  const toValue=  document.getElementById("transfer-to").value.substring(0,1);
  const budget ={ budget:parseInt(document.getElementById("transfer-amount").value)};
  fetch('api/envelopes/transfer/'+fromValue+'/'+toValue,{method:"POST",body:JSON.stringify(budget),headers:{'Content-Type': 'application/json'}}).then((response)=>{
      if(response.ok){
        fetchAllEvelopes();
       return successResponse.innerHTML='envelope was transfered successfully!';
      }
    errorResponse.innerHTML='error occured data could be processed ';

  }).catch((error)=>{
    responsebody.innerHTML='error occured data could be processed '+error
       console.log(error)
  })
 
}

const searchEvelope =()=>{
    const value = document.getElementById("search-envelope-value").value;
    const notFound = document.getElementById("not-found");
    notFound.innerHTML='';
    fetch('api/envelopes/'+value).then((response)=>{
            if(response.ok){
             return response.json()   
            }else{
            notFound.innerHTML=`No results found for ${value}`;
            }
    }).then((response)=>{
        renderEvelopes(response.data);
    });
}

const renderEvelopes = (data) => {   
     
    if (data.length > 0) {
        let allEnvelopes = document.getElementById('envelopes-data');
        let envelopesList = document.getElementById('envelopes-datalist');

        allEnvelopes.innerHTML=`<tr>
        <th>Id</th>
          <th>Title</th>
          <th>Budget</th>
        </tr>`;
        envelopesList.innerHTML='';
        data.forEach(element => {
            allEnvelopes.innerHTML += `<tr><td>${element.id}</td>
            <td>${element.title}</td>
            <td>${element.budget}</td>
            <td><button id="update" onclick="updateEnvelope('${element.title}','${element.budget}','${element.id}')">update</button></td>
            <td><button style="background-color: red;" id="delete" onclick="deleteEnvelope('${element.id}')">Delete</button> </td></tr>`

            envelopesList.innerHTML+=`<option value="${element.id}-${element.title}"></option>`
        });
        
    } else {
        document.getElementById("no-envelopes").innerHTML = "No envelopes"
    }

}

// modal call
        //update modal
        
        let upateModal = document.getElementById("updateModal");
        let deleteModal = document.getElementById("deleteModal");

   
        //Buttons
        let deleteButton = document.getElementById("delete")
        let closeDelete = document.getElementById("close-delete")
        let updateEnvelopeButton = document.getElementById("update-envelope");
        let yesDelete = document.getElementById("yes-delete")
        let noDelete = document.getElementById("no-delete");
        let updateButton = document.getElementById("update")
        let closeUpdate = document.getElementById("close-update")
        let searchButton = document.getElementById("search-envelope")


        //click events
        // updateButton.onclick=()=>{

        //     upateModal.style.display="block";
        // }

       
       
        closeUpdate.onclick = () => {

            upateModal.style.display = "none";
        }


        closeDelete.onclick = () => {
            deleteModal.style.display = "none";
        }
        noDelete.onclick = () => {

            deleteModal.style.display = "none";
        }
        yesDelete.onclick = () => {
          const enve=  document.getElementById("envelope-to-delete").value;
          fetch('/api/envelopes/'+enve,{method:"delete"}).then((response)=>{
              if(response.ok){
                  console.log("deleted",response)
                  fetchAllEvelopes()
              }
          })
                       
            deleteModal.style.display = "none";
        }

        updateEnvelopeButton.onclick = () => {

            const title=  document.getElementById("title").value;
            const budget=  document.getElementById("budget").value;
            const id=  document.getElementById("envelope-id").value;
            const data ={id:id,title:title,budget:parseInt(budget)}
            console.log(data)
            fetch('/api/envelopes/'+id,{method:"put",body: JSON.stringify(data), headers:{'Content-Type': 'application/json'}
            }).then((response)=>{
                if(response.ok){
                    console.log("updated",response)
                    fetchAllEvelopes()
                }
            })
                         
              deleteModal.style.display = "none";
          }







const fetchAllEvelopes=()=>{
        fetch('/api/envelopes').then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log('error', response.status)
            }
        }).then((response) => {
            renderEvelopes(response.data);
        })
        

    }







    fetchAllEvelopes();