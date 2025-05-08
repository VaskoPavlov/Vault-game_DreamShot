// setupGame.ts
import { Application } from '@pixi/app';
import { generateCombination, Direction } from './game/combo';
import { DESIGN_WIDTH, DESIGN_HEIGHT } from './utils/consts/constants';
import { Scene } from './setup/createScene';
import { UI } from './setup/createUI';
import { Zone } from './setup/createClickZones';
import { VaultController } from './setup/createVault';
import { timerUI } from './setup/setupTimer'
import gsap from 'gsap';

export function setupGame(app: Application) {
  const secretCombo = generateCombination();

  const scene = new Scene();
  const ui = new UI();
  const timer = new timerUI();
  app.stage.addChild(scene, ui);

  
  timer.startTimer();

  const controller = new VaultController({
    combo:        secretCombo,
    door:         scene.door,
    handle:       scene.handle,
    handleShadow: scene.handleShadow,
    doorOpen:     scene.doorOpen,
    doorOpenShadow: scene.doorOpenShadow,
    statusText:   ui.statusText,
    reset: () => {
      gsap.to([scene.handle, scene.handleShadow], {
        rotation: '+=1080',
        duration: 0.6,
        ease: 'power2.in',
        onComplete: () => {
          app.stage.removeChildren();
          setupGame(app);
        }
      });
    }
  });

  const leftZone = new Zone({
    side: 'left',
    onTurn: (dir) => controller.inputTurn(0,dir),
  });
  const rightZone = new Zone({
    side: 'right',
    onTurn: (dir) => controller.inputTurn(0,dir),
  });
  
  scene.addChild(leftZone, rightZone);

  const resize = () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    const scale = Math.min(
      app.screen.width  / DESIGN_WIDTH,
      app.screen.height / DESIGN_HEIGHT
    );
    scene.pivot.set(DESIGN_WIDTH/2, DESIGN_HEIGHT/2);
    scene.position.set(app.screen.width/2, app.screen.height/2);
    scene.scale.set(scale);
  };
  resize();
  window.addEventListener('resize', resize);
}
