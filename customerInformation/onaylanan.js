function loadApprovedCustomers() {
    // Onaylanan müşterileri localStorage'dan al
    const approvedCustomers = JSON.parse(localStorage.getItem('approvedCustomers')) || [];

    // Onaylananlar tablosuna müşteri ekle
    const tableBody = document.getElementById('approvedCustomersTable');
    tableBody.innerHTML = ''; // Tabloyu temizle (önceki verileri kaldır)

    approvedCustomers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.vergiNo}</td>
            <td>${customer.isletmeAdi}</td>
            <td>${customer.ad}</td>
            <td>${customer.soyad}</td>
            <td>${customer.telefon}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Sayfa yüklendiğinde onaylanan müşterileri yükle
document.addEventListener('DOMContentLoaded', loadApprovedCustomers);