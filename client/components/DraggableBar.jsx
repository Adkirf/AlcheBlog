import { useState, useEffect, useRef } from 'react';

const DraggableBar = ({setDeepness}) => {
  const [value, setValue] = useState("0")

  const  onDrag = (value) => {
    setValue(value);
    setDeepness(value);
  }
  
  useDragger("circle","parent", onDrag);


  return (
    <div id="parent" className="relative bar-container flex justify-center items-center h-8 w-full" >
        <div className="absolute -left-4 flex z-10 w-8 h-8 rounded-full bg-pink-500 cursor-move align-center items-center justify-center" id="circle"> 
            {value} 
        </div>
        <div  className="relative w-full h-2 bg-slate-800" />
    </div>
  );
}

export default DraggableBar;

function useDragger(circleId, parentId, setValue) {

    const isClicked = useRef(false);
  
    const coords = useRef({
      startX: -12,
      lastX: 0,
    })
  
    useEffect(() => {
  
      const target = document.getElementById(circleId);
  
      //const container = target.parentElement;
      const container = document.getElementById(parentId);

      const onMouseDown = (e) => {
        isClicked.current = true;
        const clientX = e.touches? e.touches[0].clientX  : e.clientX;

        coords.current.startX = clientX;
      }
  
      const onMouseUp = (e) => {
        isClicked.current = false;
        coords.current.lastX = target.offsetLeft;
      }
  
      const onMouseMove = (e) => {
        if (!isClicked.current) return;
        

        const clientX = e.touches? e.touches[0].clientX  : e.clientX;
        var nextX = clientX - coords.current.startX + coords.current.lastX;
        
        if(nextX <= 0 - target.offsetWidth /2){
            nextX = 0 - target.offsetWidth/2;
        }
        if(nextX >= container.offsetWidth - target.offsetWidth/2){
            nextX = container.offsetWidth - target.offsetWidth /2;
        }
        target.style.left = `${nextX}px`;
        const newValue = (nextX +target.offsetWidth/2)/ container.offsetWidth * 10;
        setValue(Math.round(newValue))
      }

  
      target.addEventListener('mousedown', onMouseDown);
      target.addEventListener('touchstart', onMouseDown);
      
      target.addEventListener('mouseup', onMouseUp);
      target.addEventListener('touchend', onMouseUp);
      
      container.addEventListener('mousemove', onMouseMove);
      container.addEventListener('touchmove', onMouseMove);
      
      container.addEventListener('mouseleave', onMouseUp);
      container.addEventListener('touchcancel', onMouseUp);
      
  
      const cleanup = () => {
        target.removeEventListener('mousedown', onMouseDown);
        target.removeEventListener('mouseup', onMouseUp);
        container.removeEventListener('mousemove', onMouseMove);
        container.removeEventListener('mouseleave', onMouseUp);
        target.removeEventListener("touchstart", onMouseDown);
        target.removeEventListener("touchend", onMouseUp);
        container.removeEventListener("touchmove", onMouseMove);
        container.removeEventListener("touchcancel", onMouseUp);
      }
  
      return cleanup;
    }, [])
  
  }
  
 