import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
  interface Window {
    Echo: Echo;
    Pusher: any;
  }
}

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true
});

export const initializeWebSocket = (userId: string) => {
  // Listen for user points updates
  window.Echo.private(`user.${userId}`)
    .listen('UserPointsUpdated', (e: any) => {
      console.log('Points updated:', e);
    });

  // Listen for challenge completions
  window.Echo.channel('challenge-completions')
    .listen('ChallengeCompleted', (e: any) => {
      console.log('Challenge completed:', e);
    });
}; 