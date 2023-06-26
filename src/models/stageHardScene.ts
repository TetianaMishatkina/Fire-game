import {Container, Assets} from 'pixi.js';
import {AbstractGameScene} from "./abstractGameScene";
import {createZombie, showLife, showPoints} from "../utils";

const stage = await Assets.load("./stageHardBack.jpeg");

export class StageHardScene extends AbstractGameScene {

    private counter: number = 0;
    constructor() {
        super();
        this.title = 'Hard'
    }

    setup(sceneContainer: Container) {
        this.sceneContainer = sceneContainer;
        this.preSetup(0xfedbc6, 150, stage)
        showPoints()
        showLife()
    }

    sceneUpdate(delta: number) {
        this.counter++;
        if(this.counter % 60 === 0){
            this.fires.push(createZombie(this.sceneContainer, 2,this.counter % 180 === 0 ? 30 : 0))
        }
    }

}