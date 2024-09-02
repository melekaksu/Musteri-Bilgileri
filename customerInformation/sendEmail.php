<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $vergiNo = $_POST['vergiNo'];
    $isletmeAdi = $_POST['isletmeAdi'];
    $ad = $_POST['ad'];
    $soyad = $_POST['soyad'];
    $telefon = $_POST['telefon'];
    $ip = $_POST['ip'];
    $port = $_POST['port'];
    $vtkad = $_POST['vtkad'];
    $vtsifre = $_POST['vtsifre'];
    $btarih = $_POST['btarih'];
    $btstarih = $_POST['btstarih'];
    $email = $_POST['email'];

    // Veritabanı bağlantısı
    $servername = "localhost";
    $username = "kullanici_adiniz";
    $password = "sifre";
    $dbname = "veritabaniniz";

    // Bağlantıyı oluştur
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Bağlantı hatası: " . $conn->connect_error);
    }

    // SQL Injection 
    $stmt = $conn->prepare("INSERT INTO musteri (vergiNo, isletmeAdi, ad, soyad, telefon, ip, port, vtkad, vtsifre, btarih, btstarih, email) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    if ($stmt === false) {
        die("Prepared statement oluşturulamadı: " . $conn->error);
    }
    
    $stmt->bind_param("ssssssssssss", $vergiNo, $isletmeAdi, $ad, $soyad, $telefon, $ip, $port, $vtkad, $vtsifre, $btarih, $btstarih, $email);

    if ($stmt->execute()) {

        $to = "berkyazilim@gmail.com"; // E-posta 
        $subject = "Yeni Müşteri Hesabı Açıldı";
        $message = "Bir yeni müşteri hesabı açıldı:\n\n";
        $message .= "Vergi Numarası: $vergiNo\n";
        $message .= "İşletme Adı: $isletmeAdi\n";
        $message .= "Ad: $ad\n";
        $message .= "Soyad: $soyad\n";
        $message .= "Telefon: $telefon\n";
        $message .= "IP Adresi: $ip\n";
        $message .= "Port: $port\n";
        $message .= "Veritabanı Kullanıcı Adı: $vtkad\n";
        $message .= "Veritabanı Şifre: $vtsifre\n";
        $message .= "Başlangıç Tarihi: $btarih\n";
        $message .= "Bitiş Tarihi: $btstarih\n";

        // E-posta gönderme fonksiyonu
        if (mail($to, $subject, $message)) {
            header("Location: index.html?success=1");
            exit();
        } else {
            header("Location: index.html?success=0");
            exit();
        }
    } else {
        echo "Hata: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
