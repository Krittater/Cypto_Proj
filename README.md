# Cypto_Proj Backend

## Requirements

- Node.js >= 16
- MySQL Server

## Setup

1. **Clone Project**
   ```sh
   git clone <https://github.com/Krittater/Cypto_Proj>
   cd Cypto_Proj/back_end
   ```

2. **ติดตั้ง dependencies**
   ```sh
   npm install
   ```

3. **ตั้งค่าไฟล์ .env**
   - สร้างไฟล์ `.env` ในโฟลเดอร์ `back_end`
   - ตัวอย่าง:
     ```
     PORT=3000
     DB_HOST=localhost
     DB_PORT=3306
     DB_USER=root
     DB_PASSWORD=
     DB_NAME=cypto_db
     JWT_SECRET=your_jwt_secret_key
     JWT_EXPIRES_IN=1h
     ```

4. **สร้างฐานข้อมูล**
   - สร้าง database ชื่อ `cypto_db` ใน MySQL (หรือชื่ออื่นตาม .env)

5. **Seed ข้อมูลตัวอย่าง (optional)**
   ```sh
   node src/seed.js
   ```

6. **Run Project**
   - สำหรับ development (auto-reload):
     ```
     npm run dev
     ```
   - สำหรับ production:
     ```
     npm start
     ```

7. **API Endpoint**
   - Server: `http://localhost:3000/`
   - ดู routes ทั้งหมดใน `src/routes/`

## ตัวอย่างการทดสอบ API

- **Register:** `POST /api/auth/register`
- **Login:** `POST /api/auth/login`
- **แนบ JWT:** ทุก endpoint ที่ต้อง login ให้แนบ header
  ```
  Authorization: Bearer <token> อย่าลืมแนบ token ใน header ของ postman นะครับ
  ```
- **ดูตัวอย่าง request/response เพิ่มเติมในไฟล์ controllers และ routes**

## หมายเหตุ

- การสร้างตารางจะทำอัตโนมัติเมื่อรัน server ครั้งแรก (`sequelize.sync()`)
- สามารถแก้ไข config/database ได้ในไฟล์ `.env` และ `src/config/index.js`
- หากต้องการ reset ข้อมูล ให้รัน `node src/seed.js` ใหม่

---
