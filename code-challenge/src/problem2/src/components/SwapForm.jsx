import { useEffect, useState } from "react";
import axios from "axios";

const SwapForm = () => {
  const [amount, setAmount] = useState(""); // Số tiền nhập vào
  const [convertedAmount, setConvertedAmount] = useState(""); // Số tiền sau quy đổi
  const [exchangeRates, setExchangeRates] = useState({}); // Lưu tỷ giá các loại tiền
  const [currencies, setCurrencies] = useState([]); // Danh sách các loại tiền tệ
  const [fromCurrency, setFromCurrency] = useState("USD"); // Tiền tệ nguồn
  const [toCurrency, setToCurrency] = useState("VND"); // Tiền tệ đích

  // Lấy dữ liệu tỷ giá từ API
  useEffect(() => {
    axios
      .get("https://interview.switcheo.com/prices.json")
      .then((response) => {
        const data = response.data;
        const rates = {};
        const uniqueCurrencies = new Set(); // Dùng Set để lọc trùng

        data.forEach((item) => {
          rates[item.currency] = item.price; // Lưu giá của mỗi đồng tiền
          uniqueCurrencies.add(item.currency); // Thêm vào Set (tự động loại trùng)
        });

        setExchangeRates(rates);
        setCurrencies(Array.from(uniqueCurrencies)); // Chuyển Set về Array
      })
      .catch((error) => console.error("Lỗi tải dữ liệu:", error));
  }, []);

  // Xử lý đổi tiền
  const handleSwap = () => {
    if (!amount || isNaN(Number(amount))) {
      alert("Vui lòng nhập số tiền hợp lệ!");
      return;
    }

    if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      alert("Không tìm thấy tỷ giá hợp lệ!");
      return;
    }

    // Quy đổi theo công thức: (amount * tỷ giá từCurrency) / tỷ giá toCurrency
    const result =
      (Number(amount) * exchangeRates[fromCurrency]) /
      exchangeRates[toCurrency];

    setConvertedAmount(result.toFixed(2));
  };

  return (
    <div>
      <h5>Swap Currency</h5>

      {/* Nhập số tiền */}
      <label htmlFor="amount" className="form-label">
        Amount
      </label>
      <input
        type="number"
        id="amount"
        className="form-control"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Chọn loại tiền tệ nguồn */}
      <label className="form-label mt-2">From Currency</label>
      <select
        className="form-select"
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      {/* Chọn loại tiền tệ đích */}
      <label className="form-label mt-2">To Currency</label>
      <select
        className="form-select"
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      {/* Nút xác nhận quy đổi */}
      <button className="btn btn-primary mt-3 w-100" onClick={handleSwap}>
        Convert
      </button>

      {/* Hiển thị kết quả */}
      {convertedAmount && (
        <div className="alert alert-info mt-3">
          You will receive:{" "}
          <strong>
            {new Intl.NumberFormat("vi-VN").format(convertedAmount)}{" "}
            {toCurrency}
          </strong>
        </div>
      )}
    </div>
  );
};

export default SwapForm;
