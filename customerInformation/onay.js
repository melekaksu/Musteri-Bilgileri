let rowToDelete;

function approveCustomer(button) {
    // Müşteri verilerini al
    const row = button.closest('tr');
    const customerData = {
        vergiNo: row.cells[0].textContent,
        isletmeAdi: row.cells[1].textContent,
        ad: row.cells[2].textContent,
        soyad: row.cells[3].textContent,
        telefon: row.cells[4].textContent
    };

    // Müşteri verilerini localStorage'a kaydet
    localStorage.setItem('pendingCustomer', JSON.stringify(customerData));

    // Form sayfasına yönlendir, vergi numarasını URL parametresi olarak gönder
    window.location.href = `forms.html?id=${customerData.vergiNo}`;
}

function showDeleteConfirmation(button) {
    // Silinecek satırı seç
    rowToDelete = button.closest('tr');

    // Bootstrap modal'ını göster
    const modal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
    modal.show();
}

function deleteRow() {
    // Seçili satırı sil
    if (rowToDelete) {
        rowToDelete.remove();
    }
    // Modal'ı kapat
    const modal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmationModal'));
    modal.hide();
}

function closeModal() {
    // Modal'ı kapat
    const modal = bootstrap.Modal.getInstance(document.getElementById('deleteConfirmationModal'));
    modal.hide();
}