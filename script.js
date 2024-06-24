// コンテンツデータ
const content = {
    ja: {
        title: "エンジニア自己紹介",
        personalInfo: [
            { key: "名前", value: "山田 太郎" },
            { key: "年齢", value: "30歳" },
            { key: "職業", value: "ソフトウェアエンジニア" },
            { key: "趣味", value: "オープンソースプロジェクトへの貢献、テックカンファレンス参加、ガジェット収集" },
            { key: "自己PR", value: "新技術の習得に熱心で、チーム内での知識共有を大切にしています。効率的なコード作成とユーザー体験の向上を常に意識しています。" }
        ],
        skillset: "スキルセット",
        learningTech: "現在学習中の技術",
        currentlyLearning: [
            "Rust言語",
            "Kubernetesオーケストレーション",
            "機械学習アルゴリズム"
        ],
        chartLabels: {
            skillLevel: "スキルレベル",
            yearsOfExperience: "経験年数",
            projectExperience: "プロジェクト経験",
            verticalBar: "縦棒グラフ",
            horizontalBar: "横棒グラフ",
            pieChart: "円グラフ"
        }
    },
    en: {
        title: "Software Engineer Introduction",
        personalInfo: [
            { key: "Name", value: "Taro Yamada" },
            { key: "Age", value: "30 years old" },
            { key: "Occupation", value: "Software Engineer" },
            { key: "Hobbies", value: "Contributing to open-source projects, attending tech conferences, collecting gadgets" },
            { key: "Self PR", value: "I'm passionate about learning new technologies and value knowledge sharing within the team. I always focus on efficient coding and improving user experience." }
        ],
        skillset: "Skill Set",
        learningTech: "Currently Learning",
        currentlyLearning: [
            "Rust programming language",
            "Kubernetes orchestration",
            "Machine learning algorithms"
        ],
        chartLabels: {
            skillLevel: "Skill Level",
            yearsOfExperience: "Years of Experience",
            projectExperience: "Project Experience",
            verticalBar: "Vertical Bar",
            horizontalBar: "Horizontal Bar",
            pieChart: "Pie Chart"
        }
    }
};

const skillData = {
    labels: ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Docker'],
    years: [5, 3, 4, 2, 3, 1],
    projects: [
        "React, Redux, Next.js",
        "Django, Flask, NumPy, Pandas",
        "Spring Boot, Android Development",
        "React Native, Gatsby",
        "Express.js, Socket.io",
        "Docker Compose, Kubernetes"
    ]
};

function updateContent() {
    const lang = document.getElementById("language").value;
    const currentContent = content[lang];

    document.title = currentContent.title;
    document.querySelector("h1").textContent = currentContent.title;

    const table = document.querySelector("table");
    table.innerHTML = "";
    currentContent.personalInfo.forEach(item => {
        const row = table.insertRow();
        const keyCell = row.insertCell(0);
        const valueCell = row.insertCell(1);
        keyCell.textContent = item.key;
        valueCell.textContent = item.value;
    });

    document.querySelector("h2[data-translate='skillset']").textContent = currentContent.skillset;
    document.querySelector("h2[data-translate='learningTech']").textContent = currentContent.learningTech;

    const learningList = document.querySelector("ul");
    learningList.innerHTML = "";
    currentContent.currentlyLearning.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        learningList.appendChild(li);
    });

    document.getElementById("chartType").querySelectorAll("option").forEach(option => {
        option.textContent = currentContent.chartLabels[option.value];
    });

    document.getElementById("skillMetric").querySelectorAll("option").forEach(option => {
        option.textContent = currentContent.chartLabels[option.value];
    });

    updateChart();
}

let chart;

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
        type: chartType === 'horizontalBar' ? 'bar' : chartType,
        data: {
            labels: skillData.labels,
            datasets: [{
                label: content[lang].chartLabels.skillLevel,
                data: data,
                backgroundColor: backgroundColor,
                borderColor: backgroundColor.map(color => color.replace('0.6', '1')),
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: chartType === 'horizontalBar' ? 'y' : 'x',
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: { color: '#ffffff' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                },
                y: {
                    beginAtZero: true,
                    ticks: { color: '#ffffff' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            if (skillMetric === 'years') {
                                return `${context.parsed} ${content[lang].chartLabels.yearsOfExperience}`;
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

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('language').addEventListener('change', updateContent);
    document.getElementById('chartType').addEventListener('change', updateChart);
    document.getElementById('skillMetric').addEventListener('change', updateChart);
    updateContent();
});
