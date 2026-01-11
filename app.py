from flask import Flask, render_template, request, redirect, url_for, flash
from math import isfinite

app = Flask(__name__)
app.secret_key = 'secret-key-for-flash'


def compute_mm2(arrival_minutes, service_minutes):
    # Langkah 1: Hitung laju kedatangan (λ)
    lam = 1.0 / arrival_minutes  # λ = 1 / waktu antar kedatangan

    # Langkah 2: Hitung laju pelayanan per pelayan (μ)
    mu = 1.0 / service_minutes   # μ = 1 / waktu pelayanan per pelayan

    # Langkah 3: Hitung pemanfaatan pelayanan untuk dua pelayan (ρ)
    rho = lam / (2.0 * mu)  # ρ = λ / (2μ)

    # Guard stability condition (rho >= 1)
    if rho >= 1:
        # Return None to indicate unstable system
        return None

    # Langkah 4: Hitung waktu total rata-rata dalam sistem (W)
    denominator_W = mu - (lam / 2.0)
    W = 1.0 / denominator_W  # W = 1 / (μ - λ/2)

    # Langkah 5: Hitung waktu rata-rata tunggu dalam antrian (Wq)
    denominator_Wq = 2.0 * mu * (mu - lam / 2.0)
    Wq = (lam ** 2) / denominator_Wq  # Wq = λ² / (2μ(μ - λ/2))

    # Langkah 6: Hitung jumlah pelanggan dalam sistem (L)
    L = lam * W  # L = λ × W

    # Langkah 7: Hitung jumlah pelanggan dalam antrian (Lq)
    Lq = lam * Wq  # Lq = λ × Wq

    return {
        "lambda": lam,
        "mu": mu,
        "rho": rho,
        "W": W,
        "Wq": Wq,
        "L": L,
        "Lq": Lq,
        "arrival_minutes": arrival_minutes,
        "service_minutes": service_minutes,
        "denominator_W": denominator_W,
        "denominator_Wq": denominator_Wq,
    }


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        arrival = request.form.get('arrival', '').strip()
        service = request.form.get('service', '').strip()

        # Basic validation
        if not arrival or not service:
            flash('Input tidak boleh kosong.', 'error')
            return redirect(url_for('index'))

        try:
            arrival_minutes = float(arrival)
            service_minutes = float(service)
        except ValueError:
            flash('Input harus berupa angka (numerik).', 'error')
            return redirect(url_for('index'))

        if arrival_minutes <= 0 or service_minutes <= 0:
            flash('Input harus bernilai positif (> 0).', 'error')
            return redirect(url_for('index'))

        result = compute_mm2(arrival_minutes, service_minutes)
        if result is None:
            flash("Sistem tidak stabil: ρ ≥ 1 (laju kedatangan terlalu tinggi atau layanan terlalu lambat).", "error")
            return redirect(url_for('index'))

        return render_template('result.html',
                               arrival=arrival_minutes,
                               service=service_minutes,
                               r=result)
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
