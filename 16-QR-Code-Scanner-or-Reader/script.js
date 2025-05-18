const DOM={
    form:document.querySelector("form"),
    wrapper:document.querySelector(".wrapper"),
    uploadIcon:document.querySelector(".fa-cloud-upload"),
    fileInput:document.querySelector("#file-input"),
    p:document.querySelector(".content p"),
    textarea:document.querySelector("textarea"),
    image:document.querySelector("img"),
    copyButton:document.querySelector("button.copy"),
    copiedPopup:document.querySelector(".copied"),
    closeButton:document.querySelector("button.close")
}
const displayResult=([{symbol}],file)=>{
    const [{data,error}]=symbol;// Restructuring data and error from symbol Object
    DOM.wrapper.classList.add("active")
    if(error) DOM.textarea.innerText=error;
    if(data) DOM.textarea.innerText=data;
    DOM.image.src=URL.createObjectURL(file)

}
const fetchQR=async (data,file)=>{
    DOM.p.innerText="Scanning QR Code..."
   await fetch("http://api.qrserver.com/v1/read-qr-code/",{
        method:"POST",
        body:data,
    }).then(res=>res.json()).then((res)=>displayResult(res,file))
}
const readFile=(e)=>{
    const file=e.currentTarget.files[0];
    if(!file) return;
    const formDataObject=new FormData();
    formDataObject.append("file",file);
    fetchQR(formDataObject,file);
}
const handelCopy=()=>{
    const text=DOM.textarea.value
    navigator.clipboard.writeText(text).then(()=>{
        DOM.copiedPopup.classList.add("active")
    }).catch((err)=>console.log(err))
    setTimeout(()=>{
        DOM.copiedPopup.classList.remove("active")
    },1500)
}
const handelClose=()=>{
    DOM.wrapper.classList.remove("active")

}
DOM.fileInput.addEventListener("change",readFile)
DOM.form.addEventListener("click",()=>DOM.fileInput.click())
DOM.copyButton.addEventListener("click",handelCopy);
DOM.closeButton.addEventListener("click",handelClose)