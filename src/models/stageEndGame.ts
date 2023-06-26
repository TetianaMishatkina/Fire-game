import {Container, Text} from 'pixi.js';
import {AbstractGameScene} from "./abstractGameScene";
import {clearTitle, hideLife, hidePoints} from "../utils";


export class StageEndGameScene extends AbstractGameScene {

    setup(sceneContainer: Container, points:number) {
        this.sceneContainer = sceneContainer;
        this.preSetup(0xffffff)


        const text = new Text('' +
           `Game over... You've got ${points} points! 
           Wanna try again?`
         , {
            fontFamily: 'Times',
            fontSize: 30,
            fill: 0x000000,
            align: 'left',
        });
        text.y = 330;
        text.x = 220;
        sceneContainer.addChild(text)
        hidePoints()
        hideLife()
        clearTitle()
    }

    sceneUpdate(delta: number) {}
}