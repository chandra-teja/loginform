"use client";
import { useState } from "react";

export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");

  const generateUniqueId = (length: number) => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  const uniqueRequestId = generateUniqueId(16);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic phone number validation
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    setError("");
    setShowOtp(true);

    // Trigger the deep link

    // Adjust the length as needed

    window.location.href = `truecallersdk://truesdk/web_verify?
                 type=btmsheet
                 requestNonce=${uniqueRequestId}
                 &partnerKey=7Oikq6a1c41fd8389475f95c57e4507e80702
                 &partnerName=loginform
                 &lang=en
                 &loginPrefix=getstarted
                 &loginSuffix=login
                 &ctaPrefix=continuewith
                 &ctaColor=%23f75d34
                 &ctaTextColor=%23f75d34
                 &btnShape=round
                 &skipOption=useanothernum
                 &ttl=8000`;
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Phone Number:</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
      {showOtp && (
        <div>
          <label>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            required
          />
          <button>Verify OTP</button>
        </div>
      )}
      <style jsx>{`
        .container {
          max-width: 300px;
          margin: auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          text-align: center;
        }
        input {
          width: 100%;
          padding: 8px;
          margin-top: 8px;
        }
        .error {
          color: red;
          font-size: 14px;
        }
        button {
          margin-top: 10px;
          padding: 8px 16px;
          background: blue;
          color: white;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
