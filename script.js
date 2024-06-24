// ... (前のコードは変更なし)

function updateChart() {
    const lang = document.getElementById("language").value;
    const chartType = document.getElementById("chartType").value;
    const skillMetric = document.getElementById("skillMetric").value;

    if (chart) {
        chart.destroy();
    }

    const ctx = document.getElementById('skillChart').getContext('2d');
    const data = skillMetric === 'years' ? skillData.years : skillData.projects.map(() => 1);
    const backgroundColor = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)'
    ];

    const config = {
        type: chartType === 'pie' ? 'pie' : 'bar',
        data: {
            labels: skillData.labels,
            datasets: [{
                label: translations[lang].skillLevel,
                data: data,
                backgroundColor: backgroundColor,
                borderColor: backgroundColor.map(color => color.replace('0.6', '1')),
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: chartType === 'pie' ? undefined : 'y',
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: { color: '#333333' },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: '#333333' },
                    grid: { color: 'rgba(0, 0, 0, 0.1)' }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (skillMetric === 'years') {
                                return `${context.parsed} ${translations[lang].yearsOfExperience}`;
                            } else {
                                return skillData.projects[context.dataIndex];
                            }
                        }
                    }
                }
            }
        }
    };

    if (chartType === 'pie') {
        config.options.scales = {};
    }

    chart = new Chart(ctx, config);
}

// デフォルトのグラフタイプを横棒グラフに設定
document.getElementById('chartType').value = 'horizontalBar';

updateContent();
