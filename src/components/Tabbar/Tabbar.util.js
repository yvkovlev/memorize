const roadMap = {
  sets: new Map(),
  control: new Map([
    [undefined, 'editSet'],
    ['editSet', 'viewSet'],
    ['viewSet', 'studySet'],
  ]),
  profile: new Map(),
};

export function getNextActivePanel(activeStory, activePanel) {
  return roadMap[activeStory].get(activePanel);
}
