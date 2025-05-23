const adaptiveThreshold = (series, minPeriods, weightIncrement = 0.05) => {
  const result = [];
  for (let i = 0; i < series.length; i++) {
    // Slice the window of the last 3 values or fewer, if at the beginning
    const window = series.slice(Math.max(0, i - 2), i + 1);
    
    let avg = null;
    if (window.length >= minPeriods) {
      const sumOfValues = window.reduce((sum, val) => sum + val, 0);
      let totalWeight = 0;

      // Calculate weights based on zero values
      const numZerosInWindow = window.filter(val => val === 0).length;
      let currentWeightForZero = 0;

      if (numZerosInWindow > 0) {
        const baseZeroWeight = 0.1 + weightIncrement * (numZerosInWindow - 1);
        currentWeightForZero = Math.max(0, Math.min(baseZeroWeight, 1.0));
      }

      // Check if all values in the window are zero
      const allZeros = window.every(val => val === 0);
      
      // If all values are zero, look for the last non-zero value
      if (allZeros) {
        let lastNonZeroIndex = -1;
        let lastNonZeroValue = 0;
        
        // Search backwards in series for the last non-zero value
        for (let k = i - window.length; k >= 0; k--) {
          if (series[k] > 0) {
            lastNonZeroIndex = k;
            lastNonZeroValue = series[k];
            break;
          }
        }
        
        if (lastNonZeroIndex >= 0) {
          // Calculate a weight based on how far back the value is
          const distance = i - lastNonZeroIndex;
          // Weight decreases with distance: 0.5 for distance of 3, down to 0.1 for distance of 10+
          const weight = Math.max(0.1, 0.5 - (distance - 3) * 0.05);
          
          avg = lastNonZeroValue * weight;
          console.log(`Iteration ${i+1}, Using last non-zero value: ${lastNonZeroValue} from ${distance} positions back, Weight: ${weight}, Adjusted Average: ${avg}`);
        } else {
          avg = 0;
          console.log(`Iteration ${i+1}, All zeros in window and no previous non-zero values found. Average: 0`);
        }
      } else {
        // Process each value in the window
        for (let j = 0; j < window.length; j++) {
          const val = window[j];
          let weight = 1; // Default weight for non-zero values
          
          if (val === 0) {
            weight = currentWeightForZero;
          } else if (j > 0) {
            // Compare with previous value in the window
            const prevVal = window[j - 1];
            if (prevVal > 0 && val < prevVal) {
              // Calculate ratio of current value to previous value
              const ratio = val / prevVal;
              if (ratio <= 0.3) { // If current value is 30% or less of previous value
                weight = 0.3; // Minimum weight of 30%
              }
            }
          } else if (i > 0 && j === 0) {
            // For first value in window, compare with previous value in series
            const prevSeriesVal = series[i - 1];
            if (prevSeriesVal > 0 && val < prevSeriesVal) {
              const ratio = val / prevSeriesVal;
              if (ratio <= 0.3) {
                weight = 0.3;
              }
            }
          }
          console.log(`Iteration ${i+1}, Window position ${j+1}, Value: ${val}, Weight: ${weight}`);
          totalWeight += weight;
        }

        if (totalWeight > 0) {
          avg = sumOfValues / totalWeight;
          console.log(`Iteration ${i+1}, Average: ${avg}`);
          console.log(`Iteration ${i+1}, Total Weight: ${totalWeight}`);
          console.log(`Iteration ${i+1}, Sum of Values: ${sumOfValues}`);
        } else {
          avg = 0;
          console.log(`Iteration ${i+1}, Total weight is 0. Setting average to 0.`);
        }
      }
    }
    result.push(avg);
  }
  return result;
};

module.exports = adaptiveThreshold;