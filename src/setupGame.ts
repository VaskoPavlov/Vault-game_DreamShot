import { Application } from '@pixi/app';
import { generateCombination, Direction } from './game/combo';
import { DESIGN_WIDTH, DESIGN_HEIGHT } from './utils/consts/constants';
import { createClickZones } from './setup/createClickZones';
import { setupTimer } from './setup/setupTimer';
import { createScene } from './setup/createScene';
import { createVault } from './setup/createVault';
import { Text, TextStyle } from '@pixi/text';
import gsap from 'gsap';

export function setupGame(app: Application) {
    console.log('🚀 Running setup');
  
    let secretCombo = generateCombination();
    let turnCount = 0;
    let currentRotation = 0;
  
    const timerText = new Text('00:00', new TextStyle({
      fontFamily: 'Courier',
      fontSize: 14,
      fill: 0xffffff,
      align: 'center',
    }));
    timerText.anchor.set(0.5);
    timerText.x = 390;
    timerText.y = 290;
  
    const statusText = new Text('', new TextStyle({
      fontSize: 32,
      fill: 0x000000,
    }));
    statusText.position.set(50, 50);
  
    const { scene, door, handle, handleShadow, doorOpenShadow, doorOpen } = createScene();
  
    const { startTimer } = setupTimer(timerText);
    startTimer();
  
    const reset = () => {
      if (handle?.transform && handleShadow?.transform) {
        gsap.to([handle, handleShadow], {
          angle: '+=1080',
          duration: 0.6,
          ease: 'power2.in',
          onComplete: () => {
            app.stage.removeChildren();
            setupGame(app);
          },
        });
      } else {
        app.stage.removeChildren();
        setupGame(app);
      }
    };
  
    const vault = createVault(secretCombo, door, handle, handleShadow, statusText, doorOpenShadow, doorOpen, reset);
  
    const clickZones = createClickZones((direction: Direction) => {
      turnCount = (turnCount % 9) + 1;
      vault.inputTurn(turnCount, direction);
  
      const delta = direction === 'CLOCKWISE' ? 60 : -60;
      currentRotation += delta;
      const radians = (currentRotation * Math.PI) / 180;
  
      if (handle?.transform && handleShadow?.transform) {
        gsap.to([handle, handleShadow], {
          rotation: radians,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    });
  
    scene.addChild(timerText);
    scene.addChild(...clickZones);
    app.stage.addChild(scene);
    app.stage.addChild(statusText);
  
    const resizeScene = () => {
      app.renderer.resize(window.innerWidth, window.innerHeight);
  
      const scale = Math.min(
        app.screen.width / DESIGN_WIDTH,
        app.screen.height / DESIGN_HEIGHT
      );
  
      scene.pivot.set(DESIGN_WIDTH / 2, DESIGN_HEIGHT / 2);
      scene.position.set(app.screen.width / 2, app.screen.height / 2);
      scene.scale.set(scale);
    };
  
    resizeScene();
  
    window.addEventListener('resize', resizeScene);
}
