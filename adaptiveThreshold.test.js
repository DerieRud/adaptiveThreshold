const adaptiveThreshold = require('./adaptiveThreshold');

describe('adaptiveThreshold', () => {
  test('Test Case 1: Basic scenario (no zeros, default weightIncrement doesn\'t affect)', () => {
    const weeklyLoads1 = [10, 12, 15, 13, 16, 18, 17];
    const minPeriods1 = 3;
    const expectedOutput1 = [null, null, (10+12+15)/3, (12+15+13)/3, (15+13+16)/3, (13+16+18)/3, (16+18+17)/3];
    const output1 = adaptiveThreshold(weeklyLoads1, minPeriods1);
    output1.forEach((val, i) => {
      if (val === null && expectedOutput1[i] === null) {
        expect(val).toBeNull();
      } else {
        expect(val).toBeCloseTo(expectedOutput1[i]);
      }
    });
  });

  test('Test Case 2: Fewer elements than minPeriods (no zeros)', () => {
    const weeklyLoads2 = [5, 8];
    const minPeriods2 = 3;
    const expectedOutput2 = [null, null];
    const output2 = adaptiveThreshold(weeklyLoads2, minPeriods2);
    output2.forEach((val, i) => {
      if (val === null && expectedOutput2[i] === null) {
        expect(val).toBeNull();
      } else {
        expect(val).toBeCloseTo(expectedOutput2[i]);
      }
    });
  });

  test('Test Case 4: Empty array', () => {
    const weeklyLoads4 = [];
    const minPeriods4 = 3;
    const expectedOutput4 = [];
    const output4 = adaptiveThreshold(weeklyLoads4, minPeriods4);
    output4.forEach((val, i) => {
      if (val === null && expectedOutput4[i] === null) {
        expect(val).toBeNull();
      } else {
        expect(val).toBeCloseTo(expectedOutput4[i]);
      }
    });
  });

  test('Test Case 5: minPeriods larger than array length (no zeros)', () => {
    const weeklyLoads5 = [100, 200];
    const minPeriods5 = 5;
    const expectedOutput5 = [null, null];
    const output5 = adaptiveThreshold(weeklyLoads5, minPeriods5);
    output5.forEach((val, i) => {
      if (val === null && expectedOutput5[i] === null) {
        expect(val).toBeNull();
      } else {
        expect(val).toBeCloseTo(expectedOutput5[i]);
      }
    });
  });

  test('Test Case 6: Scenario with zeros and default weightIncrement (0.05)', () => {
    const weeklyLoads6 = [11, 0, 5, 8];
    const minPeriods6 = 1;
    const expectedOutput6 = [11, 11/1.1, 16/2.1, 13/2.1];
    const output6 = adaptiveThreshold(weeklyLoads6, minPeriods6);
    output6.forEach((val, i) => {
      if (val === null && expectedOutput6[i] === null) {
        expect(val).toBeNull();
      } else {
        expect(val).toBeCloseTo(expectedOutput6[i]);
      }
    });
  });

  test('Test Case 7: Scenario with multiple zeros in window, default weightIncrement', () => {
    const weeklyLoads7 = [11, 0, 0, 5];
    const minPeriods7 = 1;
    const expectedOutput7 = [11, 11/1.1, 11/1.3, 5];
    const output7 = adaptiveThreshold(weeklyLoads7, minPeriods7);
    output7.forEach((val, i) => {
      if (val === null && expectedOutput7[i] === null) {
        expect(val).toBeNull();
      } else {
        expect(val).toBeCloseTo(expectedOutput7[i]);
      }
    });
  });

  test('Test Case 8: All zeros in a window, default weightIncrement', () => {
    const weeklyLoads8 = [0, 0, 0, 5];
    const minPeriods8 = 1;
    const expectedOutput8 = [0, 0, 0, 5];
    const output8 = adaptiveThreshold(weeklyLoads8, minPeriods8);
    output8.forEach((val, i) => {
      if (val === null && expectedOutput8[i] === null) {
        expect(val).toBeNull();
      } else {
        expect(val).toBeCloseTo(expectedOutput8[i]);
      }
    });
  });

  test('Test Case 9: Zeros with large negative weightIncrement causing zero weight', () => {
    const weeklyLoads9 = [10, 0, 0, 0, 5];
    const minPeriods9 = 1;
    const weightIncrement9 = 0.05;
    const expectedOutput9 = [10, 10/1.1, 10/1.3, 10*0.5, 5];
    const output9 = adaptiveThreshold(weeklyLoads9, minPeriods9, weightIncrement9);
    output9.forEach((val, i) => {
      if (val === null && expectedOutput9[i] === null) {
        expect(val).toBeNull();
      } else {
        expect(val).toBeCloseTo(expectedOutput9[i]);
      }
    });
  });

  test('Test Case 10: Zeros with large negative weightIncrement causing zero weight', () => {
    const weeklyLoads10 = [135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200];
    const minPeriods10 = 1;
    const weightIncrement10 = 0.05;
    const expectedOutput10 = [135, (135+140)/2, (135+140+145)/3, (140+145+150)/3, (145+150+155)/3, (150+155+160)/3, (155+160+165)/3, (160+165+170)/3, (165+170+175)/3, (170+175+180)/3, (175+180+185)/3, (180+185+190)/3, (185+190+195)/3, (190+195+200)/3];
    const output10 = adaptiveThreshold(weeklyLoads10, minPeriods10, weightIncrement10);
    output10.forEach((val, i) => {
      if (val === null && expectedOutput10[i] === null) {
        expect(val).toBeNull();
      } else {
        expect(val).toBeCloseTo(expectedOutput10[i]);
      }
    });
  });

  test('Test Case 11: Zeros with large negative weightIncrement causing zero weight', () => {
    const weeklyLoads11 = [135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 0, 200];
    const minPeriods11 = 1;
    const weightIncrement11 = 0.05;
    const expectedOutput11 = [135, (135+140)/2, (135+140+145)/3, (140+145+150)/3, (145+150+155)/3, (150+155+160)/3, (155+160+165)/3, (160+165+170)/3, (165+170+175)/3, (170+175+180)/3, (175+180+185)/3, (180+185+190)/3, (185+190+0)/2.1, (190+0+200)/2.1];
    const output11 = adaptiveThreshold(weeklyLoads11, minPeriods11, weightIncrement11);
    output11.forEach((val, i) => {
      if (val === null && expectedOutput11[i] === null) {
        expect(val).toBeNull();
      } else {
        expect(val).toBeCloseTo(expectedOutput11[i]);
      }
    });
  });

  test('Test Case 12: Testing the new weight adjustment based on magnitude comparison', () => {
    const weeklyLoads12 = [100, 80, 20, 5, 60, 100];
    const minPeriods12 = 1;
    const weightIncrement12 = 0.05;
    const expectedOutput12 = [100, 90, 200/2.3, 105/1.6, 85/2.3, 165/2.3];
    const output12 = adaptiveThreshold(weeklyLoads12, minPeriods12, weightIncrement12);
    output12.forEach((val, i) => {
      if (val === null && expectedOutput12[i] === null) {
        expect(val).toBeNull();
      } else {
        expect(val).toBeCloseTo(expectedOutput12[i]);
      }
    });
  });

  test('Test Case 13: Testing the new weight adjustment based on magnitude comparison', () => {
    const weeklyLoads13 = [100, 80, 20, 5, 60, 100,0];
    const minPeriods13 = 1;
    const weightIncrement13 = 0.05;
    const expectedOutput13 = [100, 90, 200/2.3, 105/1.6, 85/2.3, 165/2.3, (60+100+0)/2.1];
    const output13 = adaptiveThreshold(weeklyLoads13, minPeriods13, weightIncrement13);
    output13.forEach((val, i) => {
      if (val === null && expectedOutput13[i] === null) {
        expect(val).toBeNull();
      } else {
        expect(val).toBeCloseTo(expectedOutput13[i]);
      }
    });
  });

  test('Test Case 14: Testing multiple consecutive zeros and last non-zero value lookup', () => {
    const weeklyLoads14 = [100, 80, 0, 0, 0, 0, 60];
    const minPeriods14 = 1;
    const weightIncrement14 = 0.05;
    const expectedOutput14 = [
      100,
      90,
      180/2.1,
      80/1.3,
      80*0.5,
      80*0.45,
      60
    ];
    const output14 = adaptiveThreshold(weeklyLoads14, minPeriods14, weightIncrement14);
    output14.forEach((val, i) => {
      if (val === null && expectedOutput14[i] === null) {
        expect(val).toBeNull();
      } else {
        expect(val).toBeCloseTo(expectedOutput14[i]);
      }
    });
  });

  test('Test Case 15: Testing multiple consecutive zeros and last non-zero value lookup', () => {
    const weeklyLoads15 = [100, 0, 0, 0, 0, 0, 0, 0, 60];
    const minPeriods15 = 1;
    const weightIncrement15 = 0.05;
    const expectedOutput15 = [
      100,
      90.91,
      100/1.3,
      100*0.5,
      100*0.45,
      100*0.4,
      100*0.35,
      100*0.3,
      60
    ];
    const output15 = adaptiveThreshold(weeklyLoads15, minPeriods15, weightIncrement15);
    output15.forEach((val, i) => {
      if (val === null && expectedOutput15[i] === null) {
        expect(val).toBeNull();
      } else {
        expect(val).toBeCloseTo(expectedOutput15[i]);
      }
    });
  });
});