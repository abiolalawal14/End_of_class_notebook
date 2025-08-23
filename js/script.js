// --- Core UI Functionality ---

// Progress bar on scroll
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
});

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const body = document.body;
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Back to top button
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Interactive Demos ---

function showResult(elementId, content) {
    const resultDiv = document.getElementById(elementId);
    if (resultDiv) {
        resultDiv.innerHTML = content;
        resultDiv.style.display = 'block';
    }
}

function generateSampleData() {
    const samples = Array.from({length: 10}, () => Math.floor(Math.random() * 100) + 1);
    const mean = (samples.reduce((a, b) => a + b) / samples.length).toFixed(2);
    const content = `<strong>Data:</strong> ${samples.join(', ')}<br>
                     <strong>Mean:</strong> ${mean}<br>
                     <strong>Max:</strong> ${Math.max(...samples)}`;
    showResult('sampleDataResult', content);
}

function calculateMean() {
    const input = document.getElementById('meanInput').value;
    const numbers = input.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (numbers.length === 0) {
        alert('Please enter valid numbers separated by commas.');
        return;
    }
    const mean = (numbers.reduce((a, b) => a + b) / numbers.length).toFixed(2);
    const content = `<strong>Numbers:</strong> [${numbers.join(', ')}]<br>
                     <strong>Mean:</strong> ${mean}`;
    showResult('meanResult', content);
}

function testExcelFunction(func) {
    const input = document.getElementById('excelFormulaInput').value;
    const numbers = input.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (numbers.length === 0) {
        alert('Please enter valid numbers separated by commas.');
        return;
    }

    let resultText = '';
    let value = 0;
    switch(func) {
        case 'sum':
            value = numbers.reduce((a, b) => a + b);
            resultText = `=SUM(...) = ${value}`;
            break;
        case 'average':
            value = (numbers.reduce((a, b) => a + b) / numbers.length).toFixed(2);
            resultText = `=AVERAGE(...) = ${value}`;
            break;
        case 'max':
            value = Math.max(...numbers);
            resultText = `=MAX(...) = ${value}`;
            break;
        case 'min':
            value = Math.min(...numbers);
            resultText = `=MIN(...) = ${value}`;
            break;
    }
    showResult('excelResult', resultText);
}

function suggestChart(type) {
    const suggestions = {
        comparison: "Use <strong>Bar or Column Charts</strong> to compare values across categories, like sales by region.",
        trend: "Use a <strong>Line Chart</strong> to show changes over time, like monthly revenue.",
        composition: "Use a <strong>Pie or Donut Chart</strong> to show parts of a whole, like market share.",
        relationship: "Use a <strong>Scatter Plot</strong> to see if two variables are related, like price vs. quantity sold."
    };
    showResult('pbiChartSuggestion', suggestions[type]);
}

function simulatePython(operation) {
    const outputs = {
        load: "<code>pd.read_csv(...)</code><br>Successfully loaded 1,245 rows.",
        clean: "<code>df.dropna()</code><br>Data cleaned. Removed 23 null values.",
        analyze: "<code>df.groupby('region')['sales'].sum()</code><br>Analysis complete. Lagos is the top region.",
        visualize: "<code>sns.lineplot(...)</code><br>Visualization generated showing a positive sales trend."
    };
    showResult('pythonSimResult', outputs[operation]);
}

function buildQuery(type) {
    const queries = {
        select: "<code>SELECT product_name, unit_price FROM products WHERE category = 'Grains';</code>",
        join: "<code>SELECT c.first_name, o.total_amount FROM customers c JOIN orders o ON c.id = o.customer_id;</code>",
        aggregate: "<code>SELECT category, AVG(unit_price) FROM products GROUP BY category;</code>",
        window: "<code>SELECT product_name, RANK() OVER (ORDER BY unit_price DESC) FROM products;</code>"
    };
    showResult('sqlResult', queries[type]);
}

function startProject(id) {
    alert('Simulating download of sample_project_data.zip...');
}

function showProjectTips(id) {
    const content = "<strong>Tip:</strong> Start by loading the data in Excel or Python. Use `info()` or `describe()` to understand its structure before cleaning.";
    showResult('project1Result', content);
}

// --- Quiz Functionality ---
function selectQuizOption(selectedOption, isCorrect) {
    const parentContainer = selectedOption.closest('.quiz-container');
    const resultDiv = parentContainer.querySelector('.quiz-result');
    const allOptions = parentContainer.querySelectorAll('.quiz-option');

    allOptions.forEach(opt => opt.classList.remove('selected'));
    selectedOption.classList.add('selected');
    
    resultDiv.classList.remove('correct', 'incorrect');
    if (isCorrect) {
        resultDiv.textContent = 'Correct! Great job.';
        resultDiv.classList.add('correct');
    } else {
        resultDiv.textContent = 'Not quite, try again!';
        resultDiv.classList.add('incorrect');
    }
    resultDiv.classList.add('show');
}
// --- End of File ---