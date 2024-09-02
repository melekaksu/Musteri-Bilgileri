const urlParams = new URLSearchParams(window.location.search);
const vergiNo = urlParams.get('id');

// ID'ye göre veriyi localStorage'dan çek ve formu doldur
const approvedCustomers = JSON.parse(localStorage.getItem('approvedCustomers')) || [];
const customerData = approvedCustomers.find(customer => customer.vergiNo === vergiNo);

if (customerData) {
    document.getElementById('vergi').value = customerData.vergiNo;
    document.getElementById('isletme').value = customerData.isletmeAdi;
    document.getElementById('ad').value = customerData.ad;
    document.getElementById('soyad').value = customerData.soyad;
    document.getElementById('telefon').value = customerData.telefon;
    document.getElementById('ip').value = customerData.ip;
    document.getElementById('port').value = customerData.port;
    document.getElementById('vtkad').value = customerData.vtkad;
    document.getElementById('vtsifre').value = customerData.vtsifre;
    document.getElementById('btarih').value = customerData.btarih;
    document.getElementById('btstarih').value = customerData.btstarih;
    document.getElementById('email').value = customerData.email
};

class Toast {
    constructor(message, color, time) {
      this.message = message;
      this.color = color;
      this.time = time;
      this.element = null;
      this.createToast();
    }
  
    createToast() {
      var element = document.createElement('div');
      element.className = "toast-notification";
      this.element = element;
      var countElements = document.getElementsByClassName("toast-notification");
      
      element.style.opacity = 0.8;
      element.style.marginBottom = (countElements.length * 55) + "px";
      element.style.backgroundColor = this.color;
      
      var message = document.createElement("div");
      message.className = "message-container";
      message.textContent = this.message;
      
      element.appendChild(message);
      
      var close = document.createElement("div");
      close.className = "close-notification";
      
      var icon = document.createElement("i");
      icon.className = "lni lni-close";
      
      close.appendChild(icon);
      element.append(close);
      
      document.body.appendChild(element);
      
      setTimeout(() => {
        element.remove();
      }, this.time);
      
      close.addEventListener("click", () => {
        element.remove();
      });
    }
}
  
const ToastType = {
    Danger: "#eb3b5a",
    Warning: "#fdcb6e",
    Success: "#00b894",
}
  
document.querySelector("#btn-pwd").addEventListener("click", (event) => {
    event.preventDefault();
    new Toast("Kayıt Başarıyla Güncellendi!", ToastType.Success, 1000);
    
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000); // 1 saniye sonra yönlendirme yapılacak
});

function saveFormData() {
  // Form verilerini localStorage'dan alın
  const customerData = JSON.parse(localStorage.getItem('pendingCustomer'));

  // Form alanlarını doldurun
  document.getElementById('vergiNo').value = customerData.vergiNo;
  document.getElementById('isletmeAdi').value = customerData.isletmeAdi;
  document.getElementById('ad').value = customerData.ad;
  document.getElementById('soyad').value = customerData.soyad;
  document.getElementById('telefon').value = customerData.telefon;

  // formun sunucuya gönderilmesine izin verin
  return true;
}
