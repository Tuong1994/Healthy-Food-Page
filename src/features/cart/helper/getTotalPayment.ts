const getTotalPayment = (totalPrice: number, shipmentFee: number) => {
    const paymentBeforeTax = totalPrice + shipmentFee;
    const taxFee = (paymentBeforeTax * 10) / 100;
    const totalPayment = paymentBeforeTax + taxFee;
    return { paymentBeforeTax, taxFee, totalPayment };
  };
  
  export default getTotalPayment;
  