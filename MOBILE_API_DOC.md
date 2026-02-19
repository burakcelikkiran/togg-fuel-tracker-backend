# Mobil Uygulama API Dokümantasyonu

## API Bilgileri

```
Base URL: http://localhost:8000/api
Header: Content-Type: application/json
```

## Authentication

### Login

Müşteri login olduğunda **api_token** alır ve bu token'ı güvenli bir şekilde saklar.

**Request:**
```http
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "sifre123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "api_token": "mfUpjuB7iI66iNgA94M6BNdYEBweniPQTPH6E2tcUszbBl4Zs7iiShI4svThm5HS",
    "customer": {
      "id": 2,
      "name": "Ahmet Yılmaz",
      "email": "user@example.com"
    }
  }
}
```

### Token Kullanımı

Tüm korumalı isteklerde `X-API-Token` header'ı ile token gönderilir:

```http
GET /api/vehicles
X-API-Token: mfUpjuB7iI66iNgA94M6BNdYEBweniPQTPH6E2tcUszbBl4Zs7iiShI4svThm5HS
```

---

## API Endpoint'leri

### Public (Token Gerekmez)

#### Register
```http
POST /api/register
Content-Type: application/json

{
  "name": "Ahmet Yılmaz",
  "email": "ahmet@example.com",
  "password": "sifre123",
  "password_confirmation": "sifre123"
}
```

**Response:** `api_token` ve `customer_id` döner.

#### Verify Email
```http
POST /api/verify
Content-Type: application/json

{
  "customer_id": 1,
  "code": "123456"
}
```

#### Resend Code
```http
POST /api/resend-code
Content-Type: application/json

{
  "customer_id": 1
}
```

---

### Protected (Token Gerekli)

#### Logout
```http
POST /api/logout
X-API-Token: {token}
```

#### Mevcut Kullanıcı
```http
GET /api/user
X-API-Token: {token}
```

#### Araçlar
```http
GET    /api/vehicles          # Araç listesi
POST   /api/vehicles          # Yeni araç
PUT    /api/vehicles/{id}     # Araç güncelle
DELETE /api/vehicles/{id}     # Araç sil
POST   /api/vehicles/{id}/set-current  # Araç seç
```

#### Şarj İşlemleri
```http
GET    /api/charges           # Şarj listesi
POST   /api/charges           # Yeni şarj
PUT    /api/charges/{id}      # Şarj güncelle
DELETE /api/charges/{id}      # Şarj sil
POST   /api/parse-charge-receipt  # Fiş okuma
```

#### Dashboard & Raporlar
```http
GET /api/dashboard            # Özet bilgiler
GET /api/reports             # Raporlar
```

#### Şirketler
```http
GET /api/companies           # Şirket listesi
```

---

## Hata Response'ları

```json
{
  "success": false,
  "message": "Hata mesajı",
  "error_code": "UNAUTHENTICATED" | "VALIDATION_FAILED" | "NOT_FOUND" | ...
}
```

## Hata Kodları

| Kod | Açıklama |
|-----|----------|
| `UNAUTHENTICATED` | Token eksik veya geçersiz |
| `VALIDATION_FAILED` | Girdi hatalı |
| `NOT_FOUND` | Kaynak bulunamadı |
| `UNAUTHORIZED` | Yetkisiz işlem |
| `TOO_MANY_REQUESTS` | Çok fazla istek |

---

## React Native Örnek Implementasyon

### 1. Token Saklama (SecureStore)

```typescript
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'api_token';

export const TokenStorage = {
  async saveToken(token: string) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },

  async deleteToken() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
};
```

### 2. API Service

```typescript
import { TokenStorage } from './TokenStorage';

const API_URL = 'http://localhost:8000/api';

class Api {
  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private async authHeaders() {
    const token = await TokenStorage.getToken();
    return {
      ...this.getHeaders(),
      'X-API-Token': token || '',
    };
  }

  // Login
  async login(email: string, password: string) {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success && data.data.api_token) {
      await TokenStorage.saveToken(data.data.api_token);
      return data.data;
    }

    throw new Error(data.message || 'Login failed');
  }

  // Register
  async register(name: string, email: string, password: string) {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        name,
        email,
        password,
        password_confirmation: password,
      }),
    });

    const data = await response.json();

    if (data.success && data.data.api_token) {
      await TokenStorage.saveToken(data.data.api_token);
      return data.data;
    }

    throw new Error(data.message || 'Register failed');
  }

  // Logout
  async logout() {
    const headers = await this.authHeaders();
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers,
    });
    await TokenStorage.deleteToken();
  }

  // Generic request
  async request(endpoint: string, options?: RequestInit) {
    const headers = await this.authHeaders();

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options?.headers,
      },
    });

    const data = await response.json();

    // Token geçersizse, logout yap
    if (!response.ok && data.error_code === 'UNAUTHENTICATED') {
      await TokenStorage.deleteToken();
      // Navigate to login
      throw new Error('Oturum süresi doldu');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  }

  // Vehicles
  getVehicles() {
    return this.request('/vehicles');
  }

  createVehicle(data: any) {
    return this.request('/vehicles', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Charges
  getCharges() {
    return this.request('/charges');
  }

  // Dashboard
  getDashboard() {
    return this.request('/dashboard');
  }
}

export default new Api();
```

### 3. Hook Kullanımı

```typescript
import { useState, useEffect } from 'react';
import api from './api';

export const useVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await api.getVehicles();
      setVehicles(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return { vehicles, loading, error, refresh: fetchVehicles };
};
```

### 4. Login Screen Örneği

```typescript
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import api from '../api';
import { TokenStorage } from '../utils/TokenStorage';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const data = await api.login(email, password);
      // Ana ekrana yönlendir
      navigation.replace('App');
    } catch (error: any) {
      Alert.alert('Hata', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={loading ? 'Giriş yapılıyor...' : 'Giriş'}
        onPress={handleLogin}
        disabled={loading}
      />
    </View>
  );
};
```

---

## Test Token'ları

```
test@example.com  → mfUpjuB7iI66iNgA94M6BNdYEBweniPQTPH6E2tcUszbBl4Zs7iiShI4svThm5HS
burak@example.com → U9tqXmyuazge50TP61AGw0AZHWzRcvcqUn3QBZqTpI2qgHSmeXVPikOPkSiGTisi
demo@example.com  → 8yV2xC73O05Isl3qTfxDVxzT88zrGqnol7Il59OVNtDRqwo7cJGPUbEDcpqhE1eO
```

---

## Önemli Notlar

1. **Token güvenliği:** Token'ı cihazda güvenli saklayın (Keychain/Keystore)
2. **Token kaybolursa:** Kullanıcı tekrar login yapmalı
3. **Logout:** Token iptal edilir, tekrar login gerekir
4. **CORS:** Tüm origin'lere izin var (`*`)
5. **Her istekte:** `X-API-Token` header gereklidir