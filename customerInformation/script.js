document.addEventListener('DOMContentLoaded', function() {
    // Edit butonlarına doğru id'yi ve data-row-index ata
    document.querySelectorAll('.btn-rounded').forEach((button, index) => {
        const id = 45 + index;
        button.setAttribute('href', `forms.html?id=${id}`);
        button.setAttribute('data-row-index', index);
    });

    // Toggle switch id'lerini dinamik olarak ayarla
    document.querySelectorAll('.switch-input').forEach((input, index) => {
        const id = `toggleSwitch${index + 1}`;
        input.setAttribute('id', id);
        input.nextElementSibling.setAttribute('for', id);
    });

    // Lisans durumu 0 olan işletmeleri pasif yapma
    document.querySelectorAll('#customerTableBody tr').forEach(row => {
        const licenseStatusCell = row.cells[5];  // Lisans Durumu hücresi (0-indexed, 5. hücre)
        const licenseStatusText = licenseStatusCell.textContent.trim();
        
        if (licenseStatusText === '0 (Gün)') {
            const switchInput = row.querySelector('.switch-input');
            if (switchInput) {
                switchInput.checked = false;  // Toggle switch'i kapalı yap
            }
        }
    });

    // Edit butonlarına işlev ekle
    document.querySelectorAll('.btn-rounded').forEach(function(button) {
        button.addEventListener('click', function(event) {
            var rowIndex = button.getAttribute('data-row-index');
            editRow(rowIndex);
            
            // Sayfayı yönlendirme
            var href = button.getAttribute('href');
            window.location.href = href;
        });
    });

    // Switch input değişimlerini dinleme
    document.querySelectorAll('.switch-input').forEach(function(switchInput) {
        switchInput.addEventListener('change', function() {
            var isChecked = switchInput.checked;
            if (isChecked) {
                console.log("Switch is ON");
            } else {
                console.log("Switch is OFF");
            }
        });
    });

    // URL'den yeni müşteri bilgilerini al ve tabloya ekle
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    
    if (status === 'approved') {
        const taxNumber = urlParams.get('taxNumber');
        const companyName = urlParams.get('companyName');
        const firstName = urlParams.get('firstName');
        const lastName = urlParams.get('lastName');
        const phone = urlParams.get('phone');

        // Yeni müşteri bilgilerini tabloya ekle
        const customerTableBody = document.getElementById('customerTableBody');
        const newRow = document.createElement('tr');
        
        newRow.innerHTML = `
            <td>${taxNumber}</td>
            <td>${companyName}</td>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${phone}</td>
            <td><button class="btn btn-danger" onclick="deleteRow(this)">Sil</button></td>
        `;
        
        customerTableBody.appendChild(newRow);
    }
});

// Satır düzenleme işlevi
function editRow(index) {
    var tableBody = document.getElementById('customerTableBody');
    var row = tableBody.rows[index];
    var inputs = row.querySelectorAll('input[type="password"]');
    
    inputs.forEach(function(input) {
        input.removeAttribute('readonly');
        input.classList.add('editable');
    });
}

// Butonlar
document.getElementById("onaylananlarBtn").addEventListener("click", function() {
    window.location.href = "onaylananlar.html";
});

document.getElementById("onaydaBekleyenlerBtn").addEventListener("click", function() {
    window.location.href = "onayBekleyen.html";
});

// Satırı silme işlevi
function deleteRow(button) {
    // Seçilen satırı tablodan sil
    var row = button.closest('tr');
    row.remove();
}
