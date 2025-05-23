# Adaptive Threshold Visualization

A simple web-based visualization tool for the adaptive threshold algorithm. This tool allows you to:

- Input a series of numbers and see how the adaptive threshold algorithm processes them
- Adjust parameters like minimum periods and weight increment
- View both the input data (as bar charts) and the resulting threshold values (as a line chart)
- Examine detailed logs of the algorithm's execution

## How to Use

1. Open `index.html` in your web browser
2. Input your data as comma-separated numbers in the "Input Data" field
3. Adjust the "Min Periods" and "Weight Increment" parameters as needed
4. Click "Calculate & Visualize" to run the algorithm and see the results
5. Examine the chart and logs to understand how the algorithm processes your data

## Files

- `index.html` - The main HTML file
- `styles.css` - CSS styles for the visualization
- `adaptiveThreshold.js` - The implementation of the adaptive threshold algorithm
- `visualization.js` - JavaScript code for the visualization interface

## About the Algorithm

The adaptive threshold algorithm processes a series of values using a windowed approach with weighted averages. It's particularly designed to handle situations where values may drop to zero temporarily by incorporating historical non-zero values when appropriate.

Key features of the algorithm:
- Uses a sliding window to calculate weighted averages
- Applies special handling for zero values
- Considers the relationship between consecutive values when determining weights
- Falls back to historical non-zero values when encountering sequences of zeros 