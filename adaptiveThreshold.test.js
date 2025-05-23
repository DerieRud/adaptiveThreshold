const adaptiveThreshold = require('./adaptiveThreshold');

// Test case 1: Basic scenario (no zeros, default weightIncrement doesn't affect)
console.log('--- Starting Test Case 1:---');
const weeklyLoads1 = [10, 12, 15, 13, 16, 18, 17];
const minPeriods1 = 3;
const expectedOutput1 = [null, null, (10+12+15)/3, (12+15+13)/3, (15+13+16)/3, (13+16+18)/3, (16+18+17)/3];
const output1 = adaptiveThreshold(weeklyLoads1, minPeriods1); // Uses default weightIncrement = -0.01

// Basic assertion
if (JSON.stringify(output1) !== JSON.stringify(expectedOutput1)) {
  console.error('Test Case 1 Failed:');
  console.error('Expected:', expectedOutput1);
  console.error('Got:', output1);
} else {
  console.log('Test Case 1 Passed!');
}

// Test case 2: Fewer elements than minPeriods (no zeros)
console.log('--- Starting Test Case 2:---');
const weeklyLoads2 = [5, 8];
const minPeriods2 = 3;
const expectedOutput2 = [null, null];
const output2 = adaptiveThreshold(weeklyLoads2, minPeriods2);

if (JSON.stringify(output2) !== JSON.stringify(expectedOutput2)) {
  console.error('Test Case 2 Failed:');
  console.error('Expected:', expectedOutput2);
  console.error('Got:', output2);
} else {
  console.log('Test Case 2 Passed!');
}

// Test case 4: Empty array
console.log('--- Starting Test Case 4:---');
const weeklyLoads4 = [];
const minPeriods4 = 3;
const expectedOutput4 = [];
const output4 = adaptiveThreshold(weeklyLoads4, minPeriods4);

if (JSON.stringify(output4) !== JSON.stringify(expectedOutput4)) {
  console.error('Test Case 4 Failed:');
  console.error('Expected:', expectedOutput4);
  console.error('Got:', output4);
} else {
  console.log('Test Case 4 Passed!');
}

// Test case 5: minPeriods larger than array length (no zeros)
console.log('--- Starting Test Case 5:---');
const weeklyLoads5 = [100, 200];
const minPeriods5 = 5;
const expectedOutput5 = [null, null];
const output5 = adaptiveThreshold(weeklyLoads5, minPeriods5);

if (JSON.stringify(output5) !== JSON.stringify(expectedOutput5)) {
  console.error('Test Case 5 Failed:');
  console.error('Expected:', expectedOutput5);
  console.error('Got:', output5);
} else {
  console.log('Test Case 5 Passed!');
}

// Test case 6: Scenario with zeros and default weightIncrement (0.05)
console.log('--- Starting Test Case 6:---');
const weeklyLoads6 = [11, 0, 5, 8]; // Window size 3
const minPeriods6 = 1; // Set to 1 for simplicity to test each step, actual use case likely >1

// W1 [10]: numZeros=0. Avg = 10/1 = 10
// W2 [10,0]: numZeros=1. weightForZero = 0.1. totalWeight = 1(10) + 0.1(0) = 1.1. Avg = 10/1.1
// W3 [10,0,5]: numZeros=1. weightForZero = 0.1. totalWeight = 1(10) + 0.1(0) + 1(5) = 2.1. Avg = 15/2.1
// W4 [0,5,8]: numZeros=1. weightForZero = 0.1. totalWeight = 0.1(0) + 1(5) + 1(8) = 2.1. Avg = 13/2.1
const expectedOutput6 = [11, 11/1.1, 16/2.1, 13/2.1]; 
const output6 = adaptiveThreshold(weeklyLoads6, minPeriods6); 

if (JSON.stringify(output6) !== JSON.stringify(expectedOutput6)) {
  console.error('Test Case 6 Failed:');
  console.error('Expected:', expectedOutput6);
  console.error('Got:', output6);
} else {
  console.log('Test Case 6 Passed!');
}

// Test case 7: Scenario with multiple zeros in window, default weightIncrement
console.log('--- Starting Test Case 7:---');
const weeklyLoads7 = [11, 0, 0, 5]; 
const minPeriods7 = 1;
// W1 [10]: numZeros=0. Avg = 10/1 = 10
// W2 [10,0]: numZeros=1. weightForZero = 0.1. totalWeight = 1.1. Avg = 10/1.1
// W3 [10,0,0]: numZeros=2. weightForZero = 0.1 + 0.05 * (2-1) = 0.15. totalWeight = 1(10) + 0.15(0) + 0.15(0) = 1.3. Avg = 10/1.3
// W4 [0,0,5]: numZeros=2. weightForZero = 0.15. totalWeight = 0.15(0) + 0.15(0) + 1(5) = 1.3. Avg = 5/1.3
const expectedOutput7 = [11, 11/1.1, 11/1.3, 5/1.3];
const output7 = adaptiveThreshold(weeklyLoads7, minPeriods7); // Default weightIncrement = 0.05

if (JSON.stringify(output7) !== JSON.stringify(expectedOutput7)) {
  console.error('Test Case 7 Failed:');
  console.error('Expected:', expectedOutput7);
  console.error('Got:', output7);
} else {
  console.log('Test Case 7 Passed!');
}

// Test case 8: All zeros in a window, default weightIncrement
console.log('--- Starting Test Case 8:---');
const weeklyLoads8 = [0, 0, 0, 5]; // Window size 3
const minPeriods8 = 1;
// W1 [0]: numZeros=1. weightForZero = 0.1. totalWeight = 0.1. Avg = 0/0.1 = 0
// W2 [0,0]: numZeros=2. weightForZero = 0.09. totalWeight = 0.09+0.09 = 0.18. Avg = 0/0.18 = 0
// W3 [0,0,0]: numZeros=3. weightForZero = 0.1 + (0.05)*(3-1) = 0.15. totalWeight = 0.15*3 = 0.45. Avg = 0/0.45 = 0
// W4 [0,0,5]: numZeros=2. weightForZero = 0.15. totalWeight = 0.15(0) + 0.15(0) + 1(5) = 1.3. Avg = 5/1.3
const expectedOutput8 = [0, 0, 0, 5/1.3];
const output8 = adaptiveThreshold(weeklyLoads8, minPeriods8);

if (JSON.stringify(output8) !== JSON.stringify(expectedOutput8)) {
  console.error('Test Case 8 Failed:');
  console.error('Expected:', expectedOutput8);
  console.error('Got:', output8);
} else {
  console.log('Test Case 8 Passed!');
}

// Test case 9: Zeros with large negative weightIncrement causing zero weight
console.log('--- Starting Test Case 9:---');
const weeklyLoads9 = [10, 0, 0, 0, 5]; // Window size 3
const minPeriods9 = 1;
const weightIncrement9 = 0.05; // chosen so 3 zeros -> 0.1 + (0.05)*(3-1) = 0.1 + 0.1 = 0.2 weight
// W1 [10]: 10
// W2 [10,0]: numZeros=1. wf0=0.1. totalW=1.1. Avg=10/1.1
// W3 [10,0,0]: numZeros=2. wf0 = 0.1 + (0.05)*(2-1) = 0.15. totalW = 1(10)+0.15(0)+0.15(0) = 1.3. Avg=10/1.3
// W4 [0,0,0]: numZeros=3. wf0 = 0.15. totalW = 0.15(0)+0.15(0)+1(0)=1.3. Avg=0/1.3
// W5 [0,0,5]: numZeros=2. wf0 = 0.15. totalW = 0.15(0)+0.15(0)+1(5)=1.3. Avg=5/1.3
const expectedOutput9 = [10, 10/1.1, 10/1.3, 0, 5/1.3];
const output9 = adaptiveThreshold(weeklyLoads9, minPeriods9, weightIncrement9);

if (JSON.stringify(output9) !== JSON.stringify(expectedOutput9)) {
  console.error('Test Case 9 Failed:');
  console.error('Expected:', expectedOutput9);
  console.error('Got:', output9);
} else {
  console.log('Test Case 9 Passed!');
}

// Test case 10: Zeros with large negative weightIncrement causing zero weight
console.log('--- Starting Test Case 10:---');
const weeklyLoads10 = [135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200]; // Window size 3
const minPeriods10 = 1;
const weightIncrement10 = 0.05; // chosen so 3 zeros -> 0.1 + (0.05)*(3-1) = 0.1 + 0.1 = 0.2 weight
const expectedOutput10 = [135, (135+140)/2, (135+140+145)/3, (140+145+150)/3, (145+150+155)/3, (150+155+160)/3, (155+160+165)/3, (160+165+170)/3, (165+170+175)/3, (170+175+180)/3, (175+180+185)/3, (180+185+190)/3, (185+190+195)/3, (190+195+200)/3];
const output10 = adaptiveThreshold(weeklyLoads10, minPeriods10, weightIncrement10);

if (JSON.stringify(output10) !== JSON.stringify(expectedOutput10)) {
  console.error('Test Case 10 Failed:');
  console.error('Expected:', expectedOutput10);
  console.error('Got:', output10);
} else {
  console.log('Test Case 10 Passed!');
}

// Test case 11: Zeros with large negative weightIncrement causing zero weight
console.log('--- Starting Test Case 11:---');
const weeklyLoads11 = [135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 0, 200]; 
const minPeriods11 = 1;
const weightIncrement11 = 0.05; // chosen so 3 zeros -> 0.1 + (0.05)*(3-1) = 0.1 + 0.1 = 0.2 weight
// W13 [185, 190,0]: numZeros=1. wf0 = 0.1. totalW = 1(185)+1(190)+0.1(0) = 2.1 avg = (185+190+0)/2.1
// W14 [185, 190,0,200]: numZeros=1. wf0 = 0.1. totalW = 1(190)+0.1(0)+1(200) = 2.2 avg = (190+0+200)/2.1
const expectedOutput11 = [135, (135+140)/2, (135+140+145)/3, (140+145+150)/3, (145+150+155)/3, (150+155+160)/3, (155+160+165)/3, (160+165+170)/3, (165+170+175)/3, (170+175+180)/3, (175+180+185)/3, (180+185+190)/3, (185+190+0)/2.1, (190+0+200)/2.1];
const output11 = adaptiveThreshold(weeklyLoads11, minPeriods11, weightIncrement11);

if (JSON.stringify(output11) !== JSON.stringify(expectedOutput11)) {
  console.error('Test Case 11 Failed:');
  console.error('Expected:', expectedOutput11);
  console.error('Got:', output11);
} else {
  console.log('Test Case 11 Passed!');
}

// Test case 12: Testing the new weight adjustment based on magnitude comparison
console.log('--- Starting Test Case 12:---');
const weeklyLoads12 = [100, 80, 20, 5, 60, 100]; 
const minPeriods12 = 1;
const weightIncrement12 = 0.05;
// W1 [100]: Avg = 100
// W2 [100,80]: 80 is 80% of 100 - no weight adjustment. Avg = (100+80)/2 = 90
// W3 [100,80,20]: 20 is 25% of 80 - weight adjustment to 0.3. Avg = (100+80+20)/2.3 = 200/2.3 = 86.96
// W4 100 [80,20,5]: 20 is 25% of 80 & 5 is 25% of 20 - 2* weight adjustment to 0.3. Avg = (80+20+5)/1.6 = 105/1.6 = 65.625
// W5 80 [20,5,60]: 60 is greater than 5 - no weight adjustment. Avg = (20+5+60)/2.3 = 85/2.3 = 36.96
// W6 [5,60,100]: 100 is greater than 60 - no weight adjustment. Avg = (5+60+100)/3 = 165/3 = 55
const expectedOutput12 = [100, 90, 200/2.3, 105/1.6, 85/2.3, 165/2.3];
const output12 = adaptiveThreshold(weeklyLoads12, minPeriods12, weightIncrement12);

if (JSON.stringify(output12) !== JSON.stringify(expectedOutput12)) {
  console.error('Test Case 12 Failed:');
  console.error('Expected:', expectedOutput12);
  console.error('Got:', output12);
} else {
  console.log('Test Case 12 Passed!');
}

// Test case 13: Testing the new weight adjustment based on magnitude comparison
console.log('--- Starting Test Case 13:---');
const weeklyLoads13 = [100, 80, 20, 5, 60, 100,0]; 
const minPeriods13 = 1;
const weightIncrement13 = 0.05;
// W1 [100]: Avg = 100
// W2 [100,80]: 80 is 80% of 100 - no weight adjustment. Avg = (100+80)/2 = 90
// W3 [100,80,20]: 20 is 25% of 80 - weight adjustment to 0.3. Avg = (100+80+20)/2.3 = 200/2.3 = 86.96
// W4 100 [80,20,5]: 20 is 25% of 80 & 5 is 25% of 20 - 2* weight adjustment to 0.3. Avg = (80+20+5)/1.6 = 105/1.6 = 65.625
// W5 80 [20,5,60]: 60 is greater than 5 - no weight adjustment. Avg = (20+5+60)/2.3 = 85/2.3 = 36.96
// W6 [5,60,100]: 100 is greater than 60 - no weight adjustment. Avg = (5+60+100)/3 = 165/3 = 55
// W7 5[60,100,0]: 0 is 0% of 100 - weight adjustment to 0.1. Avg = (60+100+0)/2.1 = 160/2.1
const expectedOutput13 = [100, 90, 200/2.3, 105/1.6, 85/2.3, 165/2.3, (60+100+0)/2.1];
const output13 = adaptiveThreshold(weeklyLoads13, minPeriods13, weightIncrement13);

if (JSON.stringify(output13) !== JSON.stringify(expectedOutput13)) {
  console.error('Test Case 13 Failed:');
  console.error('Expected:', expectedOutput13);
  console.error('Got:', output13);
} else {
  console.log('Test Case 13 Passed!');
}

// Test case 14: Testing multiple consecutive zeros and last non-zero value lookup
console.log('--- Starting Test Case 14:---');
const weeklyLoads14 = [100, 80, 0, 0, 0, 0, 60]; 
const minPeriods14 = 1;
const weightIncrement14 = 0.05; // Negative to ensure zero weight for multiple zeros

// For the windows with all zeros, we expect the algorithm to look back and find the last non-zero value
// W1 [100]: Avg = 100
// W2 [100,80]: Avg = (100+80)/2 = 90
// W3 [100,80,0]: numZeros=1, weight=0.1, Avg = (100+80+0)/2.1 = 180/2.1
// W4 [80,0,0]: numZeros=2, weight=0.05, Avg = (80+0+0)/1.3 = 80/1.3
// W5 [0,0,0]: All zeros in window. Look back to find 80, distance=3, weight=0.5-(1-3)*0.05=0.55, Avg = 80*0.55 = 44 0.5 - (distance - 3) * 0.05
// W6 [0,0,0]: All zeros in window. Look back to find 80, distance=4, weight=0.5-(2-3)*0.05=0.55, Avg = 80*0.55 = 44
// W7 [0,0,60]: numZeros=2, weight=0.05, Avg = (0+0+60)/1.3 = 60/1.3

// Create a deep copy of the expected results to avoid reference issues
const expectedOutput14 = [
  100,                     // W1
  90,                      // W2
  180/2.1,                 // W3
  80/1.3,                  // W4
  80*0.5,                 // W5 - using last non-zero value with distance-based weight
  80*0.45,                  // W6 - using last non-zero value with distance-based weight
  60/1.3                   // W7
];
const output14 = adaptiveThreshold(weeklyLoads14, minPeriods14, weightIncrement14);

if (JSON.stringify(output14) !== JSON.stringify(expectedOutput14)) {
  console.error('Test Case 14 Failed:');
  console.error('Expected:', expectedOutput14);
  console.error('Got:', output14);
  console.error('Differences:');
  for (let i = 0; i < Math.max(expectedOutput14.length, output14.length); i++) {
    if (expectedOutput14[i] !== output14[i]) {
      console.error(`Position ${i}: Expected ${expectedOutput14[i]}, Got ${output14[i]}`);
    }
  }
} else {
  console.log('Test Case 14 Passed!');
}

// Test case 14: Testing multiple consecutive zeros and last non-zero value lookup
console.log('--- Starting Test Case 15:---');
const weeklyLoads15 = [100, 0, 0, 0, 0, 0, 0, 0, 60]; 
const minPeriods15 = 1;
const weightIncrement15 = 0.05; // Negative to ensure zero weight for multiple zeros

// For the windows with all zeros, we expect the algorithm to look back and find the last non-zero value
// W1 [100]: Avg = 100
// W2 [100,0]: Avg = (100+0)/1.1 = 90.91
// W3 [100,0,0]: numZeros=2, weight=0.1, Avg = (100+0+0)/1.3 = 100/1.3
// W4 [0,0,0]:  All zeros in window. Look back to find 100, distance=3, weight=0.5-(1-3)*0.05=0.55, Avg = 100*0.55 = 55 0.5 - (distance - 3) * 0.05
// W5 [0,0,0]: All zeros in window. Look back to find 100, distance=3, weight=0.5-(1-3)*0.05=0.55, Avg = 100*0.55 = 55 0.5 - (distance - 3) * 0.05
// W6 [0,0,0]: All zeros in window. Look back to find 100, distance=4, weight=0.5-(2-3)*0.05=0.55, Avg = 100*0.55 = 55 0.5 - (distance - 3) * 0.05
// W7 [0,0,0]: All zeros in window. Look back to find 100, distance=5, weight=0.5-(3-3)*0.05=0.55, Avg = 100*0.55 = 55 0.5 - (distance - 3) * 0.05
// W8 [0,0,0]: All zeros in window. Look back to find 100, distance=6, weight=0.5-(4-3)*0.05=0.55, Avg = 100*0.55 = 55 0.5 - (distance - 3) * 0.05
// W9 [0,0,60]: numZeros=2, weight=0.05, Avg = (0+0+60)/1.3 = 60/1.3

// Create a deep copy of the expected results to avoid reference issues
const expectedOutput15 = [
  100,                     // W1
  90.91,                      // W2
  100/1.3,                 // W3
  100*0.5,                  // W4
  100*0.45,                 // W5 - using last non-zero value with distance-based weight
  100*0.4,                  // W6 - using last non-zero value with distance-based weight
  100*0.35, 
  100*0.3,                // W7 - using last non-zero value with distance-based weight
  60/1.3                   // W8
];
const output15 = adaptiveThreshold(weeklyLoads15, minPeriods15, weightIncrement15);

if (JSON.stringify(output15) !== JSON.stringify(expectedOutput15)) {
  console.error('Test Case 15 Failed:');
  console.error('Expected:', expectedOutput15);
  console.error('Got:', output15);
  console.error('Differences:');
  for (let i = 0; i < Math.max(expectedOutput15.length, output15.length); i++) {
    if (expectedOutput15[i] !== output15[i]) {
      console.error(`Position ${i}: Expected ${expectedOutput15[i]}, Got ${output15[i]}`);
    }
  }
} else {
  console.log('Test Case 15 Passed!');
}