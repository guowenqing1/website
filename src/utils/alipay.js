const objetc = {
      amount: "0.01",
      orderId: "123456789",
    };
    try {
      const { data } = await axios.post("http://localhost:3000/pay", objetc, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      console.log(data);
      window.location.href = data.result;
    } catch (error) {
      console.log(error);
    }
  };


