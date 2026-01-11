// ==================== FORM VALIDATION ==================== 
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.input-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            const arrival = parseFloat(document.getElementById('arrival').value);
            const service = parseFloat(document.getElementById('service').value);

            // Validation
            if (isNaN(arrival) || arrival <= 0) {
                e.preventDefault();
                showAlert('Laju kedatangan harus berupa angka positif!', 'error');
                return false;
            }

            if (isNaN(service) || service <= 0) {
                e.preventDefault();
                showAlert('Laju layanan harus berupa angka positif!', 'error');
                return false;
            }

            // Check stability condition
            const rho = arrival / (2 * service);
            if (rho >= 1) {
                e.preventDefault();
                showAlert(
                    `Peringatan: Sistem tidak stabil (ρ = ${rho.toFixed(4)} ≥ 1). ` +
                    'Laju kedatangan terlalu tinggi atau layanan terlalu lambat.',
                    'warning'
                );
                return false;
            }
        });
    }
});

// ==================== ALERT FUNCTION ====================
function showAlert(message, type = 'error') {
    const messagesContainer = document.querySelector('.messages-container');
    
    if (!messagesContainer) {
        const main = document.querySelector('main');
        const container = document.createElement('div');
        container.className = 'messages-container';
        main.insertBefore(container, main.firstChild);
    }

    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <span class="message-text">${message}</span>
        <button type="button" class="close-btn" onclick="this.parentElement.style.display='none';">&times;</button>
    `;

    const container = document.querySelector('.messages-container');
    container.appendChild(alert);

    // Auto-hide non-error alerts after 5 seconds
    if (type !== 'error') {
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transition = 'opacity 0.3s ease';
            setTimeout(() => alert.remove(), 300);
        }, 5000);
    }
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== RESET FORM ====================
document.addEventListener('DOMContentLoaded', function() {
    const resetBtn = document.querySelector('button[type="reset"]');
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // Clear any validation styles
            document.querySelectorAll('.form-group input').forEach(input => {
                input.style.borderColor = '';
            });
        });
    }
});

// ==================== REAL-TIME STABILITY CHECK ====================
document.addEventListener('DOMContentLoaded', function() {
    const arrivalInput = document.getElementById('arrival');
    const serviceInput = document.getElementById('service');

    function checkStability() {
        const arrival = parseFloat(arrivalInput?.value || 0);
        const service = parseFloat(serviceInput?.value || 0);

        if (arrival > 0 && service > 0) {
            const rho = arrival / (2 * service);
            
            // Visual feedback for stability
            if (arrivalInput) {
                if (rho >= 1) {
                    arrivalInput.style.borderColor = '#dc3545';
                    if (serviceInput) serviceInput.style.borderColor = '#dc3545';
                } else {
                    arrivalInput.style.borderColor = '#28a745';
                    if (serviceInput) serviceInput.style.borderColor = '#28a745';
                }
            }
        }
    }

    if (arrivalInput) {
        arrivalInput.addEventListener('input', checkStability);
        arrivalInput.addEventListener('change', checkStability);
    }
    if (serviceInput) {
        serviceInput.addEventListener('input', checkStability);
        serviceInput.addEventListener('change', checkStability);
    }
});

// ==================== KEYBOARD SHORTCUTS ====================
document.addEventListener('keydown', function(e) {
    // Ctrl+Enter or Cmd+Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.querySelector('.input-form');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
});

// ==================== PRINT FUNCTIONALITY ====================
function printResults() {
    window.print();
}

// ==================== COPY RESULTS ====================
function copyResults() {
    const resultContainer = document.querySelector('.result-container');
    if (resultContainer) {
        const range = document.createRange();
        range.selectNode(resultContainer);
        window.getSelection().addRange(range);
        document.execCommand('copy');
        showAlert('Hasil berhasil disalin ke clipboard!', 'success');
    }
}

// ==================== EXPORT AS CSV ====================
function exportAsCSV() {
    const rows = [];
    const table = document.querySelector('.result-table');
    
    if (table) {
        table.querySelectorAll('tr').forEach(tr => {
            const row = [];
            tr.querySelectorAll('td').forEach(td => {
                row.push(td.textContent.trim());
            });
            rows.push(row.join(','));
        });

        const csv = rows.join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'hasil-perhitungan-mm2.csv';
        a.click();
    }
}

// ==================== DARK MODE TOGGLE ====================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ==================== UTILITY FUNCTIONS ====================
function formatNumber(num, decimals = 4) {
    return parseFloat(num).toFixed(decimals);
}

function validateInput(value) {
    return !isNaN(value) && value > 0;
}

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener('load', function() {
    document.querySelectorAll('.result-card, .info-box, .formulas-box').forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `slideIn 0.5s ease-in-out ${index * 0.1}s forwards`;
    });
});

// ==================== CONSOLE WELCOME MESSAGE ====================
console.log('%c🎓 M/M/2 Queuing Theory Calculator', 'font-size: 16px; font-weight: bold; color: #0066cc;');
console.log('%cTugas Pemodelan dan Simulasi - Semester 5', 'font-size: 12px; color: #666;');
console.log('%cJika Anda menemukan bug atau ingin memberikan feedback, silakan hubungi pengembang.', 'font-size: 11px; color: #999;');
