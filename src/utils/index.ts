import {Container} from "pixi.js";
import {Fire} from "../models/fire";

export const randomIntFromInterval=(min:number, max:number) =>{ // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const generateSpeed=()=>{
  return randomIntFromInterval(1,3)
}

export const generatePosition=()=>{
    return randomIntFromInterval(0,750)
}

export const createZombie = (container: Container, speed?: number, size?:number) => {
    const fire = new Fire(generatePosition(), generateSpeed(), size)
    fire.speed = speed || 1;
    container.addChild(fire)
    return fire
}
export const hidePoints = ()=>{
    const hiddenPoints = document.getElementById('points');
    if(!hiddenPoints){
        return
    }
    hiddenPoints.style.display = 'none';

}
export const showPoints = ()=>{
    const hiddenPoints = document.getElementById('points');
    if(!hiddenPoints){
        return
    }
    hiddenPoints.style.display = 'block';
}

export const showLife=()=>{
    const showedLife = document.getElementById('container-life');
    if(!showedLife){
        return
    }
    showedLife.style.display = 'block';
}
export const hideLife=()=>{
    const hideLife = document.getElementById('container-life');
    if(!hideLife){
        return
    }
    hideLife.style.display = 'none';
}

export const clearTitle = () => {
    const title = document.getElementById('level-title')!
    title.innerText ='';
}
