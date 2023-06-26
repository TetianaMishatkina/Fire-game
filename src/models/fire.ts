import { Assets, AnimatedSprite, Texture} from "pixi.js";

await Assets.load([
  "spritesheets/fire/fire.json",
])

const animations = Assets.cache.get('spritesheets/fire/fire.json').data.animations;
animations["tile"].splice(1,1)
animations["tile"].splice(2,1)

const textureArray: Texture[] = [];
const double = [...animations["tile"], ...animations["tile"], ...animations["tile"], ...animations["tile"]];

for (let i = 0; i < double.length; i++)
{
  const texture = Texture.from(double[i]);
  textureArray.push(texture);
}

const FIRE_SIZE = 50;

export class Fire extends AnimatedSprite{
  public isAlive: boolean = true;
  public speed: number = 1;
  
  constructor(x: number, speed: number, extraSize: number = 0) {
    super(textureArray);

    this.animationSpeed = 1 / 12;
    this.position.set(x, 0)
    this.cursor = "pointer";
    this.interactive = true;
    this.width = FIRE_SIZE + extraSize;
    this.height = FIRE_SIZE + extraSize;
    this.play()
  }

  killFire() {
    this.isAlive = false;
  }

  moveFire() {
    this.y += this.speed;
  }


}

