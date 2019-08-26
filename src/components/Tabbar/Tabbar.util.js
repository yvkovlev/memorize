const roadMap = {
  sets: new Map(),
  control: new Map([
    [undefined, 'editSet'],
    ['editSet', 'viewSet'],
    ['viewSet', 'studySet'],
  ]),
  profile: new Map(),
};

export const getNextActivePanel = (story, panel) => roadMap[story].get(panel);

export default getNextActivePanel;
