@echo off
echo Starting MLicense...

:: เข้าไปที่ path ของโปรเจค (แก้ path ให้ตรงกับเครื่องคุณ)
cd /d "D:\MLicense"

:: รันคำสั่ง
npm run dev

:: คำสั่งนี้ช่วยให้หน้าต่างไม่ปิดทันทีถ้ามี error (เพื่อให้เราอ่าน log ได้)
cmd /k