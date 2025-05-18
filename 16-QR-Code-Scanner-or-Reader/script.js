const DOM={
    form:document.querySelector("form"),
    wrapper:document.querySelector(".wrapper"),
    uploadIcon:document.querySelector(".fa-cloud-upload"),
    fileInput:document.querySelector("#file-input"),
    p:document.querySelector("p"),
    textarea:document.querySelector("textarea")
}
const displayResult=([{symbol}],file)=>{
    const [{data,error}]=symbol;// Restructuring data and error from symbol Object
    DOM.wrapper.classList.add("active")
    if(error) DOM.textarea.innerText=error
    console.log(data,error)
}
const fetchQR=async (data)=>{
    DOM.p.innerText="Scanning QR Code..."
   await fetch("http://api.qrserver.com/v1/read-qr-code/",{
        method:"POST",
        body:data,
    }).then(res=>res.json()).then((res)=>displayResult(res))
}
const readFile=(e)=>{
    const file=e.currentTarget.files[0];
    if(!file) return;
    const formDataObject=new FormData();
    formDataObject.append("file",file);
    fetchQR(formDataObject,file);
}
DOM.fileInput.addEventListener("change",readFile)
DOM.form.addEventListener("click",()=>DOM.fileInput.click())