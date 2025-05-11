const sortableList =document.querySelector(".sortable-list");
const items =document.querySelectorAll(".item");
items.forEach(item=>{
    item.addEventListener("dragstart",_=> setTimeout(_=>item.classList.add("dragging"),0))
    // Remove dragging Class from item after dragend event
    item.addEventListener("dragend",_=> item.classList.remove("dragging"))
})
// Determine the New Position For Dragged Item
const initSortableList=(e)=>{
    e.preventDefault();
    const draggedItem=sortableList.querySelector(".dragging");
    // Selects all items except the one being dragged.
    const siblings=[...sortableList.querySelectorAll(".item:not(.dragging)")];
    const nextSibling=siblings.find(sibling=>{
        // finding the sibling after which the dragging item should be placed
        /*
        * sibling.offsetTop → Distance from top of the parent (ul.sortable-list) to sibling.
        * sibling.offsetHeight / 2 → Half of the sibling’s height.
        * e.clientY → Current Y position of the mouse.
        */
            return e.clientY <= sibling.offsetTop + (sibling.offsetHeight / 2);
        //If the mouse is above the middle of sibling, that sibling is chosen as nextSibling
    })
    sortableList.insertBefore(draggedItem,nextSibling);
}
// when the drag over we will call the function initSortableList
sortableList.addEventListener("dragover",initSortableList)
// hide the not allowed cursor by preventing default behavior of dragEnter event
sortableList.addEventListener("dragenter",e=>e.preventDefault());
