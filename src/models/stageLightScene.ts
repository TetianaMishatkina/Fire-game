import {Container, Assets} from 'pixi.js';
import {AbstractGameScene} from "./abstractGameScene";
import {createZombie, showLife, showPoints} from "../utils";

const stage = await Assets.load("./stageLightBack.jpg");

export class StageLightScene extends AbstractGameScene {

    private counter: number = 0;

    constructor() {
        super();
        this.title = 'Easy'
    }

    setup(sceneContainer: Container) {
        this.sceneContainer = sceneContainer;
        this.preSetup(0xCBE7f2, 200, stage)
        showPoints()
        showLife()
    }

    sceneUpdate(delta: number) {
        this.counter++;
        if(this.counter % 60 === 0){
            this.fires.push(createZombie(this.sceneContainer, 1))
        }
        if(this.points >= 25){
                alert('You are going to new level!')
                this.sceneSwitcher('stageMedium')

        }
    }
}