

const getVerifyTemplate = (verification_link)=>{
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f6f6f6;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding: 20px 0;
            }
            .header img {
                max-width: 100px;
            }
            .content {
                padding: 20px;
                text-align: center;
            }
            .content h1 {
                color: #333333;
            }
            .content p {
                color: #666666;
                line-height: 1.6;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin: 20px 0;
                background-color: #007BFF;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
            }
            .footer {
                text-align: center;
                padding: 20px;
                font-size: 12px;
                color: #aaaaaa;
            }
            @media (max-width: 600px) {
                .container {
                    padding: 10px;
                }
                .content {
                    padding: 10px;
                }
                .button {
                    width: 100%;
                    box-sizing: border-box;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <img src="${process.env.BUSINESS_LOGO}" width="100%" height="auto" alt="${process.env.BUSINESS_NAME}">
            </div>
            <div class="content">
                <h1>Verify Your Email</h1>
                <p>Hello,</p>
                <p>Thank you for signing up. Please click the button below to verify your email address and complete your registration.</p>
                <a href="${verification_link}" class="button">Verify Email</a>
                <p>If you did not sign up for this account, you can ignore this email.</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 ${process.env.BUSINESS_NAME}. All rights reserved.</p>
                <p>${process.env.BUSINESS_NAME}, ${process.env.BUSINESS_ADDRESS}</p>
            </div>
        </div>
    </body>
    </html>
    
    `
}

export default getVerifyTemplate;


