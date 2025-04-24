import gsap from 'gsap';
import '@pixi/events';
import { Application } from '@pixi/app';
import { Sprite } from '@pixi/sprite';
import { Graphics } from '@pixi/graphics';
import { Container } from '@pixi/display';
import { Text, TextStyle } from '@pixi/text';
import { Rectangle } from '@pixi/math';
import { generateCombination, Direction } from './game/combo';
import { Vault } from './game/vault';
import { wait } from './utils';


type InteractiveGraphics = Graphics & {
  eventMode: string;
  cursor: string;
  hitArea: Rectangle;
  on: (event: string, fn: (...args: any[]) => void) => void;
};

const DESIGN_WIDTH = 1280;
const DESIGN_HEIGHT = 640;

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xffffff,
});

const canvas = app.view as HTMLCanvasElement;
document.body.appendChild(canvas);
canvas.setAttribute('tabindex', '0');
canvas.style.outline = 'none';
canvas.style.touchAction = 'none';
canvas.focus();
Object.assign(canvas.style, {
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  display: 'block',
});

app.stage.eventMode = 'static';
app.stage.hitArea = new Rectangle(0, 0, app.screen.width, app.screen.height);

setup();

function setup() {
  console.log('🚀 Running setup');

  let secretCombo = generateCombination();
  let turnCount = 0;
  let currentRotation = 0;

  let handle: Sprite;
  let handleShadow: Sprite;

  const statusText = new Text('', new TextStyle({
    fontSize: 32,
    fill: 0x000000,
  }));
  statusText.position.set(50, 50);

  const timerText = new Text('00:00', new TextStyle({
    fontFamily: 'Courier',
    fontSize: 14,
    fill: 0xffffff,
    align: 'center',
  }));
  timerText.anchor.set(0.5);
  timerText.x = 390;
  timerText.y = 290;

  let elapsedSeconds = 0;
  let timerInterval: ReturnType<typeof setInterval>;

  function updateTimerText() {
    const mins = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
    const secs = String(elapsedSeconds % 60).padStart(2, '0');
    timerText.text = `${mins}:${secs}`;
  }

  function startTimer() {
    elapsedSeconds = 0;
    updateTimerText();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      elapsedSeconds++;
      updateTimerText();
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  startTimer();

  const bg = Sprite.from('assets/bg.png');
  bg.anchor.set(0);
  bg.x = 0;
  bg.y = 0;
  bg.width = DESIGN_WIDTH;
  bg.height = DESIGN_HEIGHT;

  const scene = new Container();
  scene.eventMode = 'static';
  scene.addChild(bg);
  scene.addChild(statusText); // ⬅️ Add here so it's above background but under rest

  const door = Sprite.from('assets/door.png');
  door.anchor.set(0.5);
  door.x = 654;
  door.y = 310;
  door.scale.set(0.21);
  scene.addChild(door);

  handleShadow = Sprite.from('assets/handleShadow.png');
  handle = Sprite.from('assets/handle.png');
  handleShadow.anchor.set(0.48);
  handle.anchor.set(0.50);
  handleShadow.x = handle.x = 635;
  handleShadow.y = handle.y = door.y;
  handleShadow.scale.set(0.20);
  handle.scale.set(0.20);
  scene.addChild(handleShadow);
  scene.addChild(handle);

  const vault = new Vault(
    secretCombo,
    async () => {
      stopTimer();
      statusText.text = '✔ Vault Unlocked!';
      statusText.style.fill = 0x00ff00;

      handle.destroy();
      handleShadow.destroy();
      scene.removeChild(door);

      const openDoor = Sprite.from('assets/doorOpen.png');
      openDoor.anchor.set(0.5);
      openDoor.x = 940;
      openDoor.y = 310;
      openDoor.scale = door.scale;

      const openDoorShadow = Sprite.from('assets/doorOpenShadow.png');
      openDoorShadow.anchor.set(0.5);
      openDoorShadow.x = openDoor.x;
      openDoorShadow.y = openDoor.y + 10;
      openDoorShadow.scale = openDoor.scale;
      openDoorShadow.alpha = 0.4;

      scene.addChild(openDoorShadow);
      scene.addChild(openDoor);

      const glitter = Sprite.from('assets/blink.png');
      glitter.anchor.set(0.5);
      glitter.x = DESIGN_WIDTH / 2;
      glitter.y = DESIGN_HEIGHT / 2;
      glitter.scale.set(1.5);
      glitter.alpha = 0;
      scene.addChild(glitter);

      gsap.to(glitter, {
        alpha: 1,
        duration: 0.3,
        repeat: 4,
        yoyo: true,
        ease: 'sine.inOut',
      });

      await wait(5000);
      app.stage.removeChildren();
      setup();
    },
    () => {
      stopTimer();
      statusText.text = '✘ Wrong Combo! Resetting...';
      statusText.style.fill = 0xff3333;

      const crazySpin = 3 * Math.PI;
      gsap.to([handle, handleShadow], {
        rotation: `+=${crazySpin}`,
        duration: 2,
        ease: 'power2.inOut',
        onComplete: () => {
          secretCombo = generateCombination();
          vault.reset(secretCombo);
        }
      });

      startTimer();
    }
  );

  const scale = Math.min(
    app.screen.width / DESIGN_WIDTH,
    app.screen.height / DESIGN_HEIGHT
  );
  scene.scale.set(scale);
  scene.x = (app.screen.width - DESIGN_WIDTH * scale) / 2;
  scene.y = (app.screen.height - DESIGN_HEIGHT * scale) / 2;
  app.stage.addChild(scene);
  scene.addChild(timerText);

  const leftZone = new Graphics() as InteractiveGraphics;
  leftZone.beginFill(0x0000ff, 0)
    .drawRect(0, 0, DESIGN_WIDTH / 2, DESIGN_HEIGHT)
    .endFill();
  leftZone.eventMode = 'static';
  leftZone.cursor = 'pointer';
  leftZone.hitArea = new Rectangle(0, 0, DESIGN_WIDTH / 2, DESIGN_HEIGHT);
  leftZone.on('pointertap', () => {
    handleTurn('counterclockwise');
  });
  scene.addChild(leftZone);

  const rightZone = new Graphics() as InteractiveGraphics;
  rightZone.beginFill(0xff0000, 0)
    .drawRect(DESIGN_WIDTH / 2, 0, DESIGN_WIDTH / 2, DESIGN_HEIGHT)
    .endFill();
  rightZone.eventMode = 'static';
  rightZone.cursor = 'pointer';
  rightZone.hitArea = new Rectangle(DESIGN_WIDTH / 2, 0, DESIGN_WIDTH / 2, DESIGN_HEIGHT);
  rightZone.on('pointertap', () => {
    handleTurn('clockwise');
  });
  scene.addChild(rightZone);

  const rotationDegrees = 60;
  const halfCircle = 180;

  function handleTurn(direction: Direction) {
    turnCount = (turnCount % 9) + 1;
    vault.inputTurn(turnCount, direction);

    const delta = direction === 'clockwise' ? rotationDegrees : -rotationDegrees;
    currentRotation += delta;
    const radians = (currentRotation * Math.PI) / halfCircle;

    if (handle?.transform && handleShadow?.transform) {
      gsap.to([handle, handleShadow], {
        rotation: radians,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }
}

