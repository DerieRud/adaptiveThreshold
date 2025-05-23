const adaptiveThresholdOriginal = (series, minPeriods) => {
    const result = [];
    for (let i = 0; i < series.length; i++) {
      // Slice the window of the last 3 values or fewer, if at the beginning
      const window = series.slice(Math.max(0, i - 2), i + 1);
      // Calculate the average of the window
      const avg =
        window.length >= minPeriods
          ? window.reduce((sum, x) => sum + x, 0) / window.length
          : null;
      result.push(avg);
    }
    return result;
  };

  module.exports = adaptiveThresholdOriginal;