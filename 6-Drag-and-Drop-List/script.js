const sortableList =document.querySelector(".sortable-list");
const items =document.querySelectorAll(".item");
items.forEach(item=>{
    item.addEventListener("dragstart",_=> setTimeout(_=>item.classList.add("dragging"),0))
    // Remove dragging Class from item after dragend event
    item.addEventListener("dragend",e=> {
        item.classList.remove("dragging");
        console.log(e.dataTransfer)
    })
})
//
const initSortableList=(e)=>{
    e.preventDefault();
    e.data
    const draggedItem=sortableList.querySelector(".dragging");
    // console.log(draggedItem)
    const siblings=[...sortableList.querySelectorAll(".item:not(.dragging)")];
    const nextSibling=siblings.find(sibling=>{
        // finding the sibling after which the dragging item should be placed
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2
    })
    sortableList.insertBefore(draggedItem,nextSibling);
}
//
sortableList.addEventListener("dragover",initSortableList)
sortableList.addEventListener("dragenter",e=>e.preventDefault());
