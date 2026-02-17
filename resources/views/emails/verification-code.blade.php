<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-posta Doğrulama</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #1EA885 0%, #158A6F 100%);
            padding: 40px 30px;
            text-align: center;
        }
        .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            font-weight: 600;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            color: #333333;
            margin-bottom: 20px;
        }
        .message {
            font-size: 15px;
            color: #666666;
            line-height: 1.6;
            margin-bottom: 30px;
        }
        .code-container {
            background: linear-gradient(135deg, #1EA885 0%, #158A6F 100%);
            padding: 25px;
            border-radius: 12px;
            text-align: center;
            margin: 30px 0;
        }
        .code-label {
            color: #ffffff;
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
            opacity: 0.9;
        }
        .code {
            color: #ffffff;
            font-size: 36px;
            font-weight: 700;
            letter-spacing: 8px;
            margin: 0;
        }
        .expiry {
            font-size: 13px;
            color: #999999;
            text-align: center;
            margin-top: 15px;
        }
        .footer {
            background-color: #f5f5f5;
            padding: 20px 30px;
            text-align: center;
            font-size: 13px;
            color: #999999;
        }
        .footer a {
            color: #1EA885;
            text-decoration: none;
        }
        .button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #1EA885;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>⚡ EV Şarj Takip</h1>
        </div>
        <div class="content">
            <p class="greeting">Merhaba {{ $name }},</p>
            <p class="message">
                EV Şarj Takip uygulamasına hoş geldiniz! Hesabınızı doğrulamak için aşağıdaki 6 haneli kodu kullanın.
            </p>
            <div class="code-container">
                <div class="code-label">Doğrulama Kodu</div>
                <p class="code">{{ $code }}</p>
            </div>
            <p class="message">
                Bu kod <strong>15 dakika</strong> boyunca geçerlidir. Eğer kod süresi dolarsa, uygulamadan "Yeni Kod Gönder" butonuna tıklayarak yeni bir kod isteyebilirsiniz.
            </p>
            <p class="message">
                Eğer bu kaydı siz oluşturmadıysanız, bu e-postayı görmezden gelebilirsiniz.
            </p>
        </div>
        <div class="footer">
            <p>© {{ date('Y') }} EV Şarj Takip. Tüm hakları saklıdır.</p>
        </div>
    </div>
</body>
</html>
