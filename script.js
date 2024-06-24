const translations = {
    ja: {
        title: "エンジニア自己紹介",
        name: "名前",
        age: "年齢",
        occupation: "職業",
        occupationValue: "ソフトウェアエンジニア",
        hobbies: "趣味",
        hobbiesValue: "オープンソースプロジェクトへの貢献、テックカンファレンス参加、ガジェット収集",
        selfPR: "自己PR",
        selfPRValue: "新技術の習得に熱心で、チーム内での知識共有を大切にしています。効率的なコード作成とユーザー体験の向上を常に意識しています。",
        skillset: "スキルセット",
        learningTech: "現在学習中の技術",
        tech1: "Rust言語",
        tech2: "Kubernetesオーケストレーション",
        tech3: "機械学習アルゴリズム",
        skillLevel: "スキルレベル",
        yearsOfExperience: "経験年数",
        projectExperience: "プロジェクト経験",
        verticalBar: "縦棒グラフ",
        horizontalBar: "横棒グラフ",
        pieChart: "円グラフ"
    },
    en: {
        title: "Software Engineer Introduction",
        name: "Name",
        age: "Age",
        occupation: "Occupation",
        occupationValue: "Software Engineer",
        hobbies: "Hobbies",
        hobbiesValue: "Contributing to open-source projects, attending tech conferences, collecting gadgets",
        selfPR: "Self PR",
        selfPRValue: "I'm passionate about learning new technologies and value knowledge sharing within the team. I always focus on efficient coding and improving user experience.",
        skillset: "Skill Set",
        learningTech: "Currently Learning",
        tech1: "Rust programming language",
        tech2: "Kubernetes orchestration",
        tech3: "Machine learning algorithms",
        skillLevel: "Skill Level",
        yearsOfExperience: "Years of Experience",
        projectExperience: "Project Experience",
        verticalBar: "Vertical Bar",
        horizontalBar: "Horizontal Bar",
        pieChart: "Pie Chart"
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
    document.querySelectorAll("[data-translate]").forEach(elem => {
        elem.textContent = translations[lang][elem.getAttribute("data-translate")];
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
                label: translations[lang].skillLevel,
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

updateContent();
