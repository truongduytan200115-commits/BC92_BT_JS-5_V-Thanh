// bài 1
// Hàm bổ trợ 1: Lấy điểm khu vực
function getDiemKhuVuc(khuVuc) {
    const mapKhuVuc = { 'A': 2, 'B': 1, 'C': 0.5, 'X': 0 };
    return mapKhuVuc[khuVuc] || 0;
}

// Hàm bổ trợ 2: Lấy điểm đối tượng
function getDiemDoiTuong(doiTuong) {
    const mapDoiTuong = { '1': 2.5, '2': 1.5, '3': 1, '0': 0 };
    return mapDoiTuong[doiTuong] || 0;
}

// Hàm chính xử lý logic
function ketQuaTuyenSinh() {
    // Lấy giá trị từ HTML
    const diemChuan = parseFloat(document.getElementById('diemChuan').value);
    const m1 = parseFloat(document.getElementById('mon1').value);
    const m2 = parseFloat(document.getElementById('mon2').value);
    const m3 = parseFloat(document.getElementById('mon3').value);
    const khuVuc = document.getElementById('khuVuc').value;
    const doiTuong = document.getElementById('doiTuong').value;

    // Tính toán bằng cách gọi các function bổ trợ
    const tongDiemUuTien = getDiemKhuVuc(khuVuc) + getDiemDoiTuong(doiTuong);
    const tongDiemDatDuoc = m1 + m2 + m3 + tongDiemUuTien;

    // Kiểm tra điều kiện trúng tuyển
    const coMonDiem0 = (m1 === 0 || m2 === 0 || m3 === 0);
    const duDiemChuan = (tongDiemDatDuoc >= diemChuan);

    // Hiển thị kết quả
    hienThiKetQua(tongDiemDatDuoc, !coMonDiem0 && duDiemChuan, coMonDiem0);
}

// Hàm bổ trợ 3: Xử lý hiển thị UI
function hienThiKetQua(diem, isPass, isDiemLiet) {
    const display = document.getElementById('result');
    display.style.display = "block";
    
    if (isDiemLiet) {
        display.innerHTML = `Tổng điểm: ${diem} <br> Kết quả: Rớt (Có môn điểm 0)`;
        display.style.color = "red";
    } else if (isPass) {
        display.innerHTML = `Tổng điểm: ${diem} <br> Kết quả: Đậu`;
        display.style.color = "green";
    } else {
        display.innerHTML = `Tổng điểm: ${diem} <br> Kết quả: Rớt (Thiếu điểm)`;
        display.style.color = "red";
    }
}

// bài 2
// Cấu hình bậc thang điện: [mức giới hạn, giá tiền]
const BAC_THANG = [
    { limit: 50, price: 500 },
    { limit: 50, price: 650 },
    { limit: 100, price: 850 },
    { limit: 150, price: 1100 },
    { limit: Infinity, price: 1300 }
];

function xuLyTinhTien() {
    const hoTen = document.getElementById('hoTen').value;
    let soKw = parseFloat(document.getElementById('soKw').value);
    const resultDiv = document.getElementById('result1');

    if (!hoTen || isNaN(soKw) || soKw < 0) {
        alert("Vui lòng nhập dữ liệu hợp lệ!");
        return;
    }

    // Logic tính tiền tinh gọn
    let tongTien = 0;
    for (let bac of BAC_THANG) {
        if (soKw > 0) {
            let soKwTinhTien = Math.min(soKw, bac.limit);
            tongTien += soKwTinhTien * bac.price;
            soKw -= soKwTinhTien;
        } else break;
    }

    // Hiển thị
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `Họ tên: ${hoTen} <br> Tiền điện: ${tongTien.toLocaleString('vi-VN')} VNĐ`;
}

// bài 3

function calculateTax() {
    const name = document.getElementById('fullName').value;
    const totalIncome = parseFloat(document.getElementById('totalIncome').value);
    const dependents = parseInt(document.getElementById('dependents').value);

    if (!name || isNaN(totalIncome)) return alert("Vui lòng nhập dữ liệu hợp lệ!");

    // Tính thu nhập chịu thuế
    const taxableIncome = totalIncome - 4 - (dependents * 1.6);
    
    if (taxableIncome <= 0) {
        return displayResult(name, 0, 0);
    }

    // Cấu trúc bảng thuế: [Mức trần, Thuế suất]
    const taxTable = [
        { limit: 60, rate: 5 },
        { limit: 120, rate: 10 },
        { limit: 210, rate: 15 },
        { limit: 384, rate: 20 },
        { limit: 624, rate: 25 },
        { limit: 960, rate: 30 },
        { limit: Infinity, rate: 35 }
    ];

    // Tìm thuế suất phù hợp bằng hàm find
    const bracket = taxTable.find(item => taxableIncome <= item.limit);
    const taxAmount = taxableIncome * (bracket.rate / 100);

    displayResult(name, taxableIncome, taxAmount, bracket.rate);
}

function displayResult(name, income, tax, rate) {
    const resultDiv = document.getElementById('result3');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = income <= 0 
        ? `<strong>${name}</strong> không cần nộp thuế.` 
        : `<strong>Họ tên:</strong> ${name} <br>
           <strong>Thu nhập chịu thuế:</strong> ${income.toFixed(2)}tr <br>
           <strong>Thuế suất:</strong> ${rate}% <br>
           <strong style="color:red">Tiền thuế: ${tax.toLocaleString()} triệu VNĐ</strong>`;
}

// bài 4
// 1. Định nghĩa hằng số giá dịch vụ để dễ quản lý và thay đổi
const SERVICE_CONFIG = {
    residential: {
        billFee: 4.5,
        serviceFee: () => 20.5,
        premiumFee: 7.5
    },
    business: {
        billFee: 15,
        serviceFee: (conn) => 75 + (Math.max(0, conn - 10) * 5),
        premiumFee: 50
    }
};

/**
 * Xử lý ẩn/hiện ô nhập số kết nối
 */
function toggleConnections() {
    const type = document.getElementById('customerType').value;
    const connInput = document.getElementById('connections');
    
    // Tinh gọn bằng cách dùng thuộc tính display và disabled linh hoạt
    const isBusiness = type === 'business';
    connInput.style.display = isBusiness ? 'block' : 'none';
    connInput.disabled = !isBusiness;
    if (!isBusiness) connInput.value = "";
}

/**
 * Hàm tính toán chính
 */
function calculateCableBill() {
    const id = document.getElementById('customerId').value;
    const type = document.getElementById('customerType').value;
    const channels = parseInt(document.getElementById('premiumChannels').value) || 0;
    const conn = parseInt(document.getElementById('connections').value) || 0;

    if (!id || !type) return alert("Vui lòng nhập đủ thông tin!");

    // 2. Truy xuất cấu hình dựa trên loại khách hàng
    const config = SERVICE_CONFIG[type];
    
    // 3. Tính toán dựa trên công thức chung
    const total = config.billFee + config.serviceFee(conn) + (config.premiumFee * channels);

    // 4. Xuất kết quả
    document.getElementById('result4').innerHTML = `
        Mã khách hàng: ${id} <br>
        Tổng tiền: <strong>$${total.toFixed(2)}</strong>
    `;
}