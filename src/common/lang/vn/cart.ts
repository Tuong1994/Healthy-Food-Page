const cart_vn = {
  confirm: "Xác nhận đơn hàng",
  finish: "Thanh toán và mua hàng",
  actions: {
    payment: "Thanh toán",
    return: "Quay lại",
    purchase: "Mua hàng",
  },
  methods: {
    title: "Hình thức thanh toán",
    note: "Chọn phương thức thanh toán",
    transfer: {
      title: "Chuyển khoản",
      content:
        "Thực hiện thanh toán vào ngay tài khoản ngân hàng của chúng tôi. Đơn hàng sẽ đươc giao sau khi tiền đã chuyển",
      holders: "Chủ tài khoản",
      branch: "Chi nhánh",
      number: "Số tài khoản",
      bank: "Ngân hàng",
    },
    cod: {
      title: "COD",
      content: "'Cho đơn đạt giá trị tối thiểu",
    },
    cash: {
      title: "Tiền mặt",
      content:
        "Thanh toán 100% trực tiếp tại cửa hàng hoặc đặt cọc trước 40% giá trị đơn hàng. Sau khi nhận hàng thanh toán số tiền còn lại",
    },
  },
  received: {
    title: "Nhận hàng",
    store: "Nhận hàng tại cửa hàng",
    delivery: "Giao nhận",
  },
  info: {
    title: "Thông tin chung",
    totalPrice: "Tổng giá tiền",
    deliveryFee: "Phí vận chuyển",
    tax: "VAT",
    totalPayment: "Tổng tiền thanh toán",
  },
  shipment: {
    title: "Thông tin vận chuyển",
  },
  purchased: {
    title: "Mua hàng thành công",
  },
  empty: {
    note: "Bạn không có sản phẩm nào trong giỏ hàng",
    action: "Trở về trang chủ",
  },
};

export default cart_vn;
