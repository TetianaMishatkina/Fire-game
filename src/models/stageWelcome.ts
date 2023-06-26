import {Container, Text} from 'pixi.js';
import {clearTitle, hideLife, hidePoints} from "../utils";
import {AbstractGameScene} from "./abstractGameScene";

export class StageWelcomeScene extends AbstractGameScene {

    setup(sceneContainer: Container) {
        this.sceneContainer = sceneContainer;
        this.preSetup( 0xf9c3d5)

        const text = new Text('Hello! Choose a level...', {
            fontFamily: 'Times',
            fontSize: 30,
            fill: 0x000000,
            align: 'right',
        });
        text.y = 330;
        text.x = 250;
        sceneContainer.addChild(text)

        hidePoints()
        hideLife()
        clearTitle()

    }

    sceneUpdate(delta: number) {
    }

}