const axios = require('axios');

export default async function handler(req, res) {
  const { mobile } = req.query;
  if (!mobile) return res.status(400).json({ error: '📵 মোবাইল নাম্বার দরকার!' });

  const fullMobile = mobile.startsWith('+880') ? mobile : `+88${mobile}`;

  try {
    const response = await axios.post('https://ecom.rangs.com.bd/send-otp-code', {
      mobile: fullMobile,
      type: 1
    }, {
      headers: {
        "host": "ecom.rangs.com.bd",
        "authorization": "Bearer", // Empty, as in original
        "user-agent": "Mozilla/5.0 (Linux; Android 15...)",
        "accept": "application/json",
        "content-type": "application/json",
        "origin": "https://shop.rangs.com.bd",
        "referer": "https://shop.rangs.com.bd/"
      }
    });

    return res.status(200).json({
      message: "✅ OTP পাঠানো হয়েছে!",
      response: response.data
    });
  } catch (error) {
    return res.status(error.response?.status || 500).json({
      error: "❌ OTP পাঠাতে সমস্যা হয়েছে!",
      details: error.response?.data || error.message
    });
  }
}
