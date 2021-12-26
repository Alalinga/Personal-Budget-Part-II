

const addEnvelope =()=>{
    const successResponse = document.getElementById("success-response-add");
    const errorResponse = document.getElementById("error-response-add")
     successResponse.innerHTML='';
     errorResponse.innerHTML='';
    const title = document.getElementById("add-envelope-title").value;
    const budget = document.getElementById("add-envelope-budget").value;
    const data= {title:title,budget:parseInt(budget)}
    fetch('api/envelopes',{method:"post",body:JSON.stringify(data),headers:{'Content-Type': 'application/json'}})
    .then((response)=>{
        if(response.ok){
        
        return successResponse.innerHTML="Envelope successfully added"
        }
        errorResponse.innerHTML="Error occured!! data could not processed"
    })
}