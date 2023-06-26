import {Application, Container} from 'pixi.js';
import {AbstractGameScene} from './abstractGameScene'

export interface SceneSettings {
    index: number;
    name?: string,
    gameScene: AbstractGameScene;
}
export class Engine {
    private sceneSettings: SceneSettings[];
    private app: Application;
    private currentScene: SceneSettings;

    constructor(
        app: Application,
        scenes: SceneSettings[]
    ) {
        this.app = app;
        this.sceneSettings = scenes;
        this.sceneSettings.forEach(
            (sceneSettings: SceneSettings) => {
                sceneSettings.gameScene.init(
                    this.app,
                    this.sceneSwitcher

                );
            });

        this.currentScene = scenes[0];

        this.setupScene(this.currentScene);
    }

    sceneSwitcher = (sceneName: string, points?: number) => {
        this.currentScene.gameScene.setFinalizing(() => {
            const scene = this.sceneSettings.find(
                (sceneSettings) => {
                    return sceneSettings.name === sceneName;
                }
            );
            if (scene) {
                this.setupScene(scene, points);
                this.currentScene = scene;
            } else {
                console.error("SCENE NOT FOUND: " + sceneName);
            }
        });
    }

    setupScene(sceneSettings: SceneSettings, points?: number) {
        this.app.stage.removeChildren();
        const sceneContainer = new Container();
        this.app.stage.addChild(sceneContainer);

        const gameScene: AbstractGameScene = sceneSettings.gameScene;
        gameScene.setup(sceneContainer, points);
    }

    update(delta: number) {
        this.currentScene.gameScene.update(delta);
    }
}