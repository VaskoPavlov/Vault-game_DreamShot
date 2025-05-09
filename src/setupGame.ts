
import { Application } from '@pixi/app';
import { generateCombination, Direction } from './game/combo';
import { DESIGN_WIDTH, DESIGN_HEIGHT } from './utils/consts/constants';
import { Scene } from './setup/createScene';
import { UI } from './setup/createUI';
import { Zone } from './setup/createClickZones';
import { VaultController } from './setup/createVault';
import gsap from 'gsap';

export function setupGame(app: Application) {
  const secretCombo = generateCombination();

  const scene = new Scene();
  const ui = new UI();

  const controller = new VaultController({
    scene,
    combo: secretCombo,
    door: scene.door,
    handle: scene.handle,
    handleShadow: scene.handleShadow,
    doorOpen: scene.doorOpen,
    doorOpenShadow: scene.doorOpenShadow,
    statusText: ui.statusText,
    reset: () => {
      gsap.to([scene.handle, scene.handleShadow], {
        rotation: '+=1080',
        duration: 0.6,
        ease: 'power2.in',
        onComplete: () => {
          app.stage.removeChildren();
          setupGame(app);
        },
      });
    },
  });

  let currentRotation = 0;
  function handleTurn(direction: Direction) {
    controller.inputTurn(currentRotation, direction);

    const delta = direction === 'CLOCKWISE' ? 60 : -60;
    currentRotation += delta;
    const radians = (currentRotation * Math.PI) / 180;

    gsap.to([scene.handle, scene.handleShadow], {
      rotation: radians,
      duration: 0.4,
      ease: 'power2.out',
    });
  }

  const leftZone = new Zone({ side: 'left', onTurn: handleTurn });
  const rightZone = new Zone({ side: 'right', onTurn: handleTurn });
  scene.addChild(leftZone, rightZone);

  const resize = () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    const scale = Math.min(
      app.screen.width / DESIGN_WIDTH,
      app.screen.height / DESIGN_HEIGHT
    );
    scene.pivot.set(DESIGN_WIDTH / 2, DESIGN_HEIGHT / 2);
    scene.position.set(app.screen.width / 2, app.screen.height / 2);
    scene.scale.set(scale);
    app.stage.addChild(scene);
    scene.timerUI.startTimer();
  };
  resize();
  window.addEventListener('resize', resize);
}
