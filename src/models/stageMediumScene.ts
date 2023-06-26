import { Container, Assets} from 'pixi.js';
import {AbstractGameScene} from "./abstractGameScene";
import {createZombie, showLife, showPoints} from "../utils";

const stage = await Assets.load("./stageMediumBack.jpeg");

export class StageMediumScene extends AbstractGameScene {

    private counter: number = 0;
    constructor() {
        super();
        this.title = 'Medium'
    }

    setup(sceneContainer: Container, points:number) {
        this.sceneContainer = sceneContainer;
        this.preSetup(0xc8d2ff, 200, stage)
        showPoints()
        showLife()
    }

    sceneUpdate(delta: number) {
        this.counter++;
        if(this.counter % 60 === 0){
            this.fires.push(createZombie(this.sceneContainer, 1.5))
        }if(this.points >= 50){
            alert('You are going to new level!')
            this.sceneSwitcher('stageHard')

        }    }
}