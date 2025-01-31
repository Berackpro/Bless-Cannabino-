document.getElementById('paymentForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const amount = document.getElementById('amount').value;
    const phone = document.getElementById('phone').value;
    const network = document.getElementById('network').value;

    // Validate Tanzanian phone number format
    const phoneRegex = /^(?:\+255|0)[7-9]\d{8}$/;
    if (!phoneRegex.test(phone)) {
        alert('Invalid Tanzanian phone number. Use format: +255XXXXXXXXX or 0XXXXXXXXX');
        return;
    }

    if (!amount || !network) {
        alert('Please fill in all fields.');
        return;
    }

    // Initialize Flutterwave payment
    FlutterwaveCheckout({
        public_key: 'YOUR_FLUTTERWAVE_PUBLIC_KEY', // 🔴 Replace with your key!
        tx_ref: `PAYMENT_${Date.now()}`,
        amount: amount,
        currency: 'TZS',
        payment_options: 'mobilemoney',
        customer: {
            email: 'user@example.com', // Replace with a real email
            phone_number: phone,
            name: 'Customer Name'
        },
        customizations: {
            title: 'Payment Gateway',
            description: 'Payment for Application #173735656212014173',
            logo: 'https://your-logo-url.com/logo.png'
        },
        meta: {
            application_no: '173735656212014173'
        },
        callback: function(response) {
            if (response.status === 'successful') {
                alert('Payment successful! Transaction ID: ' + response.transaction_id);
            } else {
                alert('Payment failed. Please try again.');
            }
        },
        onclose: function() {
            alert('Payment window closed.');
        }
    });
});