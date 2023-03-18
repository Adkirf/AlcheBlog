import { useState, useEffect, useRef } from 'react';

const DraggableBar = () => {
  
  useDragger("circle","parent");

  return (
    <div id="parent" className="bar-container flex justify-center items-center h-8" >
        <div  className="relative w-80 h-2 bg-gray-400" />
        <div className="absolute w-6 h-6 rounded-full bg-red-500 cursor-move" id="circle"/>
    </div>
  );
}

export default DraggableBar;

function useDragger(circleId, parentId) {

    const isClicked = useRef(false);
  
    const coords = useRef({
      startX: 0,
      lastX: 0,
    })
  
    useEffect(() => {
  
      const target = document.getElementById(circleId);
  
      //const container = target.parentElement;
      const container = document.getElementById(parentId);

      const onMouseDown = (e) => {
        isClicked.current = true;
        coords.current.startX = e.clientX;
      }
  
      const onMouseUp = (e) => {
        isClicked.current = false;
        coords.current.lastX = target.offsetLeft;
      }
  
      const onMouseMove = (e) => {
        if (!isClicked.current) return;
  
        const nextX = e.clientX - coords.current.startX + coords.current.lastX;
  
        target.style.left = `${nextX}px`;
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
  
 