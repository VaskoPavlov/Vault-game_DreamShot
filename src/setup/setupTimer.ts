import { Text } from '@pixi/text';

export function setupTimer(timerText: Text) {
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

  return {
    startTimer,
    stopTimer,
  };
}
