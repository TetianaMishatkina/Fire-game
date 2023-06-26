import {Application, Container, Sprite, Texture} from 'pixi.js';
import {Fire} from "./fire";

export enum SceneState {
    LOAD,
    PROCESS,
    FINALIZE,
    DONE
}
export interface GameScene {
    sceneUpdate(delta: number): void;
}

const liveElement = '<img class="player-life" src="./player-life.png" alt="life"/>'
const livesElements= [liveElement,liveElement,liveElement]


export abstract class AbstractGameScene implements GameScene {
    protected sceneState: SceneState;
    protected app: Application;
    protected sceneContainer: Container;
    protected background: Sprite;
    protected backgroundColor: Sprite;
    private backgroundColorHurt: Sprite;
    protected points: number = 0;
    protected lives: string[] = [...livesElements];
    protected fires: Fire[] = [];
    protected title: string = ''
    protected resultElement: HTMLElement;
    protected sceneSwitcher: (sceneName: string, points?: number) => void;
    private onDone: () => void;

    init(
        app: Application,
        sceneSwitcher: (sceneName: string, points?: number) => void): void {
        this.app = app;
        this.sceneSwitcher = sceneSwitcher;
    }
    abstract setup(sceneContainer: Container, points?: number): void;
    abstract sceneUpdate(delta: number): void;

    update(delta: number): void {
        switch (this.sceneState) {
            case SceneState.LOAD:
                this.lives =  [...livesElements];
                const livesContainer = document.getElementById('container-life')!;
                livesContainer.innerHTML =''
                this.lives.forEach((live)=>{
                    livesContainer.innerHTML += live
                })

                this.resultElement = document.getElementById('result') as HTMLElement
                if(!this.resultElement){
                    return;
                }
                this.resultElement.innerText = "0";

                const title = document.getElementById('level-title')

                if(!title){
                    return;
                }

                title.innerHTML = this.title

                this.fires = [];

                this.sceneState = SceneState.PROCESS
                break;
            case SceneState.PROCESS:
                this.preProcess()
                this.sceneUpdate(delta);
                break;
            case SceneState.FINALIZE:
                this.sceneState = SceneState.DONE;
                if (this.onDone) {
                    this.onDone();
                }
                break;
        }
    }
    setFinalizing(onDone: () => void) {
        this.onDone = onDone;
        this.sceneState = SceneState.FINALIZE;
    }

    preSetup(color: number, y?: number, stage?:any){
        this.sceneState = SceneState.LOAD;
        this.setBackgroundColor(color)
        if(stage){
            this.setBackgroundBase(stage, y || 0)
        }

        this.sceneContainer.on('pointertap', (event: any)=>{
            if(event.target?.killFire){
                event.target?.killFire()
                this.sceneContainer.removeChild(event.target);
                this.points++;
                this.resultElement.innerText = `${this.points}`;
            }
        })
    }

    preProcess(){
        this.fires.forEach( z => {
            if(z.isAlive){
                z.moveFire()
                if(z.y >= 700){
                    z.killFire()
                    this.triggerHurtBackground()
                    const livesContainer = document.getElementById('container-life')!;
                    livesContainer.innerHTML = '';
                    this.lives.pop();

                    this.lives.forEach((live)=>{
                        livesContainer.innerHTML += live
                    })
                    if(this.lives.length === 0){
                        this.sceneSwitcher('stageEndGame', this.points)
                    }
                }
            }
        })
    }

    setBackgroundBase(stage: any, y: number){
        this.background = new Sprite(stage);
        this.background.anchor.x = 0;
        this.background.anchor.y = 0;
        this.background.position.x = 0;
        this.background.position.y = y;
        this.background.width = 800;
        this.background.height = 700;
        this.sceneContainer.addChild(this.background)
    }

    setBackgroundColor(color: number){
        this.backgroundColor= new Sprite(Texture.WHITE);
        this.backgroundColor.anchor.x = 0;
        this.backgroundColor.anchor.y = 0;
        this.backgroundColor.position.x = 0;
        this.backgroundColor.position.y = 0;
        this.backgroundColor.width = 800;
        this.backgroundColor.height = 700;
        this.backgroundColor.tint = color;
        this.sceneContainer.addChild( this.backgroundColor)
    }

    triggerHurtBackground(){
        this.backgroundColorHurt= new Sprite(Texture.WHITE);
        this.backgroundColorHurt.tint = 0xFF0000;
        this.backgroundColorHurt.alpha = 0.2;
        this.backgroundColorHurt.anchor.x = 0;
        this.backgroundColorHurt.anchor.y = 0;
        this.backgroundColorHurt.position.x = 0;
        this.backgroundColorHurt.position.y = 0;
        this.backgroundColorHurt.width = 800;
        this.backgroundColorHurt.height = 700;
        this.sceneContainer.addChild( this.backgroundColorHurt)
        setTimeout(()=>{
            this.sceneContainer.removeChild( this.backgroundColorHurt)
        },300)
    }

}