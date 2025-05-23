// Elements
const dataInput = document.getElementById('dataInput');
const minPeriodsInput = document.getElementById('minPeriods');
const weightIncrementInput = document.getElementById('weightIncrement');
const progressPercentageInput = document.getElementById('progressPercentage');
const calculateBtn = document.getElementById('calculateBtn');
const logsElement = document.getElementById('logs');
const chartCanvas = document.getElementById('chart');

// Chart instance
let myChart = null;

// Modify the adaptiveThreshold function to collect logs
const adaptiveThresholdWithLogs = (series, minPeriods, weightIncrement = 0.05) => {
    const result = [];
    const logs = [];
    
    // Override console.log to capture logs
    const originalConsoleLog = console.log;
    console.log = function(...args) {
        logs.push(args.join(' '));
        originalConsoleLog.apply(console, args);
    };
    
    // Run the algorithm
    const thresholds = adaptiveThreshold(series, minPeriods, weightIncrement);
    
    // Restore console.log
    console.log = originalConsoleLog;
    
    return { thresholds, logs };
};

// Function to visualize the data
function visualizeData() {
    // Clear previous logs
    logsElement.innerHTML = '';
    
    // Parse input data
    const inputData = dataInput.value.split(',').map(val => parseFloat(val.trim()));
    const minPeriods = parseInt(minPeriodsInput.value);
    const weightIncrement = parseFloat(weightIncrementInput.value);
    const progressPercentage = parseInt(progressPercentageInput.value) / 100;
    
    // Run algorithm with log collection
    const { thresholds, logs } = adaptiveThresholdWithLogs(inputData, minPeriods, weightIncrement);
    const thresholdsOriginal = adaptiveThresholdOriginal(inputData, minPeriods);
    
    // Display logs
    logsElement.innerHTML = logs.join('<br>');
    
    // Create or update chart
    createChart(inputData, thresholds, thresholdsOriginal, progressPercentage);
}

// Function to create the chart
function createChart(inputData, thresholds, thresholdsOriginal, progressPercentage) {
    // Destroy existing chart if it exists
    if (myChart !== null) {
        myChart.destroy();
    }
    
    // Labels for x-axis (indices)
    const labels = inputData.map((_, i) => `${i+1}`);
    
    // Shift the thresholds one position to the right by adding null at the beginning
    //const shiftedThresholds = thresholds;
   const shiftedThresholds = [null, ...thresholds.slice(0, thresholds.length - 1)];
   const shiftedThresholdsOriginal = [null, ...thresholdsOriginal.slice(0, thresholdsOriginal.length - 1)];


    // Calculate upper and lower threshold bands for new algorithm
    const upperThresholds = shiftedThresholds.map(val => 
        val !== null ? val * progressPercentage : null
    );
    
    const lowerThresholds = shiftedThresholds.map(val => 
        val !== null ? val * (progressPercentage - progressPercentage * 0.1) : null
    );
    
    // Calculate upper and lower threshold bands for original algorithm
    const upperThresholdsOriginal = shiftedThresholdsOriginal.map(val => 
        val !== null ? val * progressPercentage : null
    );
    
    const lowerThresholdsOriginal = shiftedThresholdsOriginal.map(val => 
        val !== null ? val * (progressPercentage - progressPercentage * 0.1) : null
    );
    
    // Create chart
    myChart = new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    type: 'bar',
                    label: 'Input Values',
                    data: inputData,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    order: 1
                },
                {
                    type: 'line',
                    label: 'New Upper Threshold',
                    data: upperThresholds,
                    borderColor: 'rgba(75, 192, 75, 1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false,
                    tension: 0.1,
                    order: 0
                },
                {
                    type: 'line',
                    label: 'New Lower Threshold',
                    data: lowerThresholds,
                    borderColor: 'rgba(75, 192, 75, 1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: '-1', // Fill between this dataset and the previous one
                    backgroundColor: 'rgba(75, 192, 75, 0.2)',
                    tension: 0.1,
                    order: 0
                },
                {
                    type: 'line',
                    label: 'Original Upper Threshold',
                    data: upperThresholdsOriginal,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: false,
                    tension: 0.1,
                    order: 0,
                    borderDash: [5, 5]
                },
                {
                    type: 'line',
                    label: 'Original Lower Threshold',
                    data: lowerThresholdsOriginal,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    pointRadius: 0,
                    fill: '-1', // Fill between this dataset and the previous one
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.1,
                    order: 0,
                    borderDash: [5, 5]
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Position'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const datasetIndex = context.datasetIndex;
                            const dataIndex = context.dataIndex;
                            
                            if (datasetIndex === 1 || datasetIndex === 3) { // Upper thresholds
                                const inputValue = inputData[dataIndex];
                                const thresholdValue = datasetIndex === 1 ? upperThresholds[dataIndex] : upperThresholdsOriginal[dataIndex];
                                
                                if (thresholdValue === null) {
                                    return `Input: ${inputValue}, Upper Threshold: N/A`;
                                }
                                
                                return `Input: ${inputValue}, Upper Threshold: ${thresholdValue.toFixed(2)}`;
                            } else if (datasetIndex === 2 || datasetIndex === 4) { // Lower thresholds
                                const inputValue = inputData[dataIndex];
                                const thresholdValue = datasetIndex === 2 ? lowerThresholds[dataIndex] : lowerThresholdsOriginal[dataIndex];
                                
                                if (thresholdValue === null) {
                                    return `Input: ${inputValue}, Lower Threshold: N/A`;
                                }
                                
                                return `Input: ${inputValue}, Lower Threshold: ${thresholdValue.toFixed(2)}`;
                            }
                            return '';
                        }
                    }
                },
                legend: {
                    labels: {
                        filter: function(item, chart) {
                            // Show only Input Values, Upper Thresholds in legend (hide lower thresholds)
                            return item.datasetIndex !== 2 && item.datasetIndex !== 4;
                        }
                    }
                }
            }
        }
    });
}

// Event listener
calculateBtn.addEventListener('click', visualizeData);

// Initialize on page load
document.addEventListener('DOMContentLoaded', visualizeData); 