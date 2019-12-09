import ZingTouch from 'zingtouch/src/ZingTouch';

export const region = new ZingTouch.Region(document.getElementById('root'));
export const swipeGesture = new ZingTouch.Swipe({
  maxRestTime: 100,
});
export const tapGesture = new ZingTouch.Tap();
