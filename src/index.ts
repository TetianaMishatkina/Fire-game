import './styles.scss';
import { Application ,ICanvas} from 'pixi.js';
import {StageLightScene} from "./models/stageLightScene";
import {StageMediumScene} from "./models/stageMediumScene";
import {StageHardScene} from "./models/stageHardScene";
import {StageWelcomeScene} from "./models/stageWelcome";
import {StageEndGameScene} from "./models/stageEndGame";
import {Engine} from "./models/engine";

let app:  Application<ICanvas>;
app = new Application({height: 700, width:800, antialias: true })
document.getElementById("game")?.appendChild(app.view as any);


const createZombieGame=()=>{
    const engine: Engine = new Engine(app, [
        {
            index: 0,
            name: "stageWelcome",
            gameScene: new StageWelcomeScene(),
        },
        {
            index: 1,
            name: "stageLight",
            gameScene: new StageLightScene(),
        },
        {
            index: 2,
            name: "stageMedium",
            gameScene: new StageMediumScene(),
        },
        {
            index: 3,
            name: "stageHard",
            gameScene: new StageHardScene(),
        },
        {
            index: 4,
            name: "stageEndGame",
            gameScene: new StageEndGameScene(),
        },
    ]);

    app.ticker.add(delta => {
        engine.update(delta);
    });




    document.getElementById('light')?.addEventListener("click",()=>{
        engine.sceneSwitcher('stageLight' , 0)

    })
    document.getElementById('medium')?.addEventListener("click",()=>{
        engine.sceneSwitcher('stageMedium',0 )


    })
    document.getElementById('hard')?.addEventListener("click",()=>{
        engine.sceneSwitcher('stageHard' ,0)
    })

}

createZombieGame()


