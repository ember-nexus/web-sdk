import { getElement } from '../../src/endpoint/get-element.js';
import { expect } from 'chai';

describe('getElement tests', () => {
  it('should load an existing element from the api', async () => {
    const testUuid = '439dc91f-10c2-4da2-babb-41fa33e52f26';
    const node = await getElement(testUuid).then((node) => {
      return node;
    });

    expect(node).to.eql({
      type: 'Post',
      id: '439dc91f-10c2-4da2-babb-41fa33e52f26',
      data: {
        content:
          'Key effort ask nation. Party be behind yet city.\n\n```information\nTend here line man peace young. Check fill include mission difference five.\n```\n\n1. Key head child.\n1. Nice PM friend at head season building.\n1. Create a necessary either around shoulder before.\nBlack so collection picture.\n\n```land\nAway enjoy purpose Democrat conference central. Ball choice weight church ready suggest. Take bar while.\n```\n\n![Own either try last recognize manager even.](https://picsum.photos/471 "Model arm win six important recognize less.\nExample but and meeting poor air federal. Cup too kitchen understand hospital treatment. Police out sure. Point social themselves claim.")\n\n1. Admit series back message understand.\n1. Peace begin line same everyone choice.\n1. Line generation image leg reality that security.\n\n1. Old detail voice protect.\n1. Deal the travel some compare.\n1. Customer western none simply director technology six close.\n\n*World also blue that Congress hour.*\n___\n\n1. Create trouble draw yeah try science.\n1. Group avoid model single institution.\n1. Now item those Mr son myself turn.\n\n |Important important party listen reduce lot.|Between race worker carry tree local.|Fine action pull central left represent product.|\n|--------------------------------------------|-------------------------------------|------------------------------------------------|\n|Lay contain career up toward.|Able many forget doctor number single even pressure.|Key sort southern leave serve later.|\n|Parent blue population thing.|Challenge college against society fall around.|Race it read.|\n|Should glass politics decide.|Both hit take street easy watch energy.|Media north minute evidence increase along environment.|\n|Figure successful though along couple guess.|Home mind within.|Thing need threat still much executive.|\n\n\n**edge**\nHouse civil help shoulder couple story national. Family thus because fall statement.\n\n***Care inside great tree what fall.***\nattention\nanother\nnot\n1. Listen full conference of when already.\n1. Visit walk side blood number need modern.\n1. Development section report still drop among.\n***Nature avoid per age feel.***\n',
        created: '2004-06-27 13:21:02',
        title: 'Woman anyone suggest defense',
        updated: '2012-04-28 23:36:17',
      },
    });
  });
});
