-- ============================================
-- SQL Migration Script for IMC Website
-- Import data from JSON files to Supabase
-- ============================================

-- ============================================
-- STEP 1: CREATE/UPDATE TABLES SCHEMA
-- ============================================

-- Create brands table if not exists
CREATE TABLE IF NOT EXISTS brands (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT,
    cover_image TEXT,
    description_th TEXT,
    description_en TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table if not exists
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    brand_id TEXT REFERENCES brands(id) ON DELETE CASCADE,
    title_en TEXT NOT NULL,
    title_th TEXT,
    items_en TEXT,
    items_th TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table if not exists (with brand_id column)
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    brand_id TEXT REFERENCES brands(id) ON DELETE SET NULL,
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    name_en TEXT NOT NULL,
    name_th TEXT,
    description_en TEXT,
    description_th TEXT,
    image TEXT,
    price TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add brand_id column to products if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'products' AND column_name = 'brand_id'
    ) THEN
        ALTER TABLE products ADD COLUMN brand_id TEXT REFERENCES brands(id) ON DELETE SET NULL;
    END IF;
END $$;

-- Create images table if not exists
CREATE TABLE IF NOT EXISTS images (
    id SERIAL PRIMARY KEY,
    url TEXT NOT NULL,
    alt_text TEXT,
    page TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- STEP 2: INSERT BRANDS
-- ============================================

INSERT INTO brands (id, name, logo, cover_image, description_th, description_en) VALUES
('sika', 'SIKA', '/images/logos/sika.png', '/images/brand-covers/sika.png', 'ผลิตภัณฑ์สิ่งก่อสร้างและสารซ่อม', 'Construction products and repair materials'),
('datrend', 'Datrend Systems Inc.', '/images/logos/datrend.png', '/images/brand-covers/datrend.png', 'เครื่องมือสอบเทียบอุณหภูมิและการวัด', 'Temperature calibrators and measurement instruments'),
('aep', 'AEP transducers', '/images/logos/aep.png', '/images/brand-covers/aep.png', 'เซนเซอร์และตัวแปลงสัญญาณความดันอุณหภูมิ', 'Pressure and temperature sensors and transducers'),
('imt', 'IMT Analytics', '/images/logos/imt.png', '/images/brand-covers/imt.png', 'เครื่องมือวิเคราะห์ความชื้นและคุณภาพน้ำ', 'Moisture analyzers and water quality instruments'),
('rigel', 'Rigel Medical', '/images/logos/rigel.png', '/images/brand-covers/rigel.png', 'อุปกรณ์ทดสอบและตรวจสอบทางการแพทย์', 'Medical device testers and diagnostic instruments'),
('foremount', 'Foremount', '/images/logos/foremount.png', '/images/brand-covers/foremount.png', 'เครื่องชั่งและระบบวัดน้ำหนัก', 'Scales and weighing systems'),
('bionit', 'Bionit', '/images/logos/bionit.png', '/images/brand-covers/bionit.png', 'เครื่องมือทางการแพทย์และอิเล็กทรอนิกส์', 'Medical and electronic instruments')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  logo = EXCLUDED.logo,
  cover_image = EXCLUDED.cover_image,
  description_th = EXCLUDED.description_th,
  description_en = EXCLUDED.description_en;

-- ============================================
-- STEP 3: INSERT CATEGORIES
-- ============================================

-- Clear existing categories first (optional - remove if you want to keep existing)
-- DELETE FROM categories;

-- SIKA Categories (IDs 1-5)
INSERT INTO categories (id, brand_id, title_en, title_th, items_en, items_th) VALUES
(1, 'sika', 'Temperature', 'อุณหภูมิ', 'Industrial thermometers, KombiTemp®, Digital thermometers, Temperature sensors, Dial thermometers, Room condition monitoring, Temperature calibrators, Process calibrators, Hand-held instruments', 'เทอร์โมมิเตอร์อุตสาหกรรม, KombiTemp®, เทอร์โมมิเตอร์ดิจิตอล, เซนเซอร์อุณหภูมิ, เทอร์โมมิเตอร์แบบหน้าปัด, ระบบตรวจสอบสภาพห้อง, เครื่องสอบเทียบอุณหภูมิ, เครื่องสอบเทียบกระบวนการ, เครื่องมือวัดแบบมือถือ'),
(2, 'sika', 'Calibration Instruments', 'เครื่องมือสอบเทียบ', 'Temperature calibrators, Process calibrators, Test pumps, Oil deadweight testers, Recalibration sets', 'เครื่องสอบเทียบอุณหภูมิ, เครื่องสอบเทียบกระบวนการ, เครื่องสูบทดสอบ, เครื่องทดสอบ Deadweight แบบน้ำมัน, ชุดสอบเทียบซ้ำ'),
(3, 'sika', 'Pressure', 'ความดัน', 'Pressure gauges, Digital pressure gauges, Test pumps, Oil deadweight testers, Hand-held instruments', 'เกจวัดความดัน, เกจวัดความดันดิจิตอล, เครื่องสูบทดสอบ, เครื่องทดสอบ Deadweight แบบน้ำมัน, เครื่องมือวัดแบบมือถือ'),
(4, 'sika', 'Marine Market Products', 'ผลิตภัณฑ์สำหรับตลาดทางทะเล', 'Industrial thermometers, Dial thermometers, Digital thermometers, Temperature sensors, Room condition monitoring, Pressure gauges, Digital pressure gauges, Flow switches, Magnetic inductive flow sensors, Oval gear flow meters, Temperature calibrators, Test pumps, Recalibration sets', 'เทอร์โมมิเตอร์อุตสาหกรรม, เทอร์โมมิเตอร์แบบหน้าปัด, เทอร์โมมิเตอร์ดิจิตอล, เซนเซอร์อุณหภูมิ, ระบบตรวจสอบสภาพห้อง, เกจวัดความดัน, เกจวัดความดันดิจิตอล, สวิตช์การไหล, เซนเซอร์การไหลแบบแม่เหล็กไฟฟ้า, เครื่องวัดการไหลแบบโอวัล, เครื่องสอบเทียบอุณหภูมิ, เครื่องสูบทดสอบ, ชุดสอบเทียบซ้ำ'),
(5, 'sika', 'Level', 'ระดับ', 'Level switches', 'สวิตช์ระดับ'),

-- Datrend Categories (IDs 6-8)
(6, 'datrend', 'Electrical Safety Analyzers', 'เครื่องวิเคราะห์ความปลอดภัยไฟฟ้า', 'vPad-Mini electrical safety analyzer, Insulation testers, Leakage current testers, Earth/ground testers, Automation options', 'เครื่องวิเคราะห์ความปลอดภัย vPad-Mini, เครื่องวัดฉนวน, เครื่องวัดกระแสรั่ว, เครื่องวัดกราวด์, ตัวเลือกการทำงานอัตโนมัติ'),
(7, 'datrend', 'Patient Simulation Equipment', 'อุปกรณ์จำลองผู้ป่วย', 'ECG simulators, SpO2 (Oxygen saturation) simulators, NIBP (Blood pressure) simulators, Vital signs simulators, Multi-function patient simulators', 'เครื่องจำลอง ECG, เครื่องจำลองระดับออกซิเจน (SpO2), เครื่องจำลองความดันโลหิต (NIBP), เครื่องจำลองสัญญาณชีพจร, เครื่องจำลองผู้ป่วยแบบหลายฟังก์ชัน'),
(8, 'datrend', 'Infusion Pump & Device Analyzers', 'เครื่องวิเคราะห์ปั๊มหลอดและอุปกรณ์อื่น', 'vPad-IV infusion pump analyzer, Defibrillator analyzers, AED testers, Electrosurgery analyzers, CMMS integration', 'เครื่องวิเคราะห์ปั๊มหลอด vPad-IV, เครื่องวิเคราะห์ตัวสั่นไฟฟ้า, เครื่องทดสอบ AED, เครื่องวิเคราะห์ศัลยกรรมไฟฟ้า, การผสานรวม CMMS'),

-- AEP Categories (IDs 9-12)
(9, 'aep', 'Load Cells & Weighing', 'โหลดเซลล์และตัวแปลงสัญญาณชั่งน้ำหนัก', 'Single point load cells, Shear beam load cells, Compression load cells, Tension load cells, Custom load cells, Junction boxes, Weighing modules', 'โหลดเซลล์แบบจุดเดี่ยว, โหลดเซลล์แบบเฉือน, โหลดเซลล์แบบกดแรง, โหลดเซลล์แบบดึง, โหลดเซลล์ตามต้องการ, กล่องรวมสัญญาณ, โมดูลชั่งน้ำหนัก'),
(10, 'aep', 'Force & Torque Transducers', 'ตัวแปลงสัญญาณแรงและแรงบิด', 'Force transducers (tension and compression), Torque transducers, Multi-axis force sensors, Dynamometers, Calibration services', 'ตัวแปลงสัญญาณแรง (ดึงและกดแรง), ตัวแปลงสัญญาณแรงบิด, เซนเซอร์แรงแบบหลายแกน, ไดนาโมมิเตอร์, บริการสอบเทียบ'),
(11, 'aep', 'Pressure & Displacement', 'ตัวแปลงสัญญาณความดันและการเคลื่อนที่', 'Pressure transducers, Pressure gauges, Displacement transducers, LVDT (Linear Variable Displacement), Flush diaphragm sensors, Stainless steel designs', 'ตัวแปลงสัญญาณความดัน, เกจวัดความดัน, ตัวแปลงสัญญาณการเคลื่อนที่, LVDT, เซนเซอร์แบบฟลัช, ออกแบบสแตนเลส'),
(12, 'aep', 'Software & Instruments', 'ซอฟต์แวร์และระบบวัด', 'Measurement software, Data acquisition systems, Calibration instruments, Signal conditioning amplifiers, Display units', 'ซอฟต์แวร์วัด, ระบบเก็บข้อมูล, เครื่องมือสอบเทียบ, แอมปลิฟายเออร์ปรับสัญญาณ, หน่วยแสดงผล'),

-- IMT Categories (IDs 13-16)
(13, 'imt', 'Gas Flow Analyzers', 'เครื่องวิเคราะห์การไหลของแก๊ส', 'Bench top gas flow analyzers, Mobile gas flow analyzers, CITREX H3 entry-level analyzer, Ventilator testing, Anesthesia device testing', 'เครื่องวิเคราะห์การไหลของแก๊สแบบตั้งโต๊ะ, เครื่องวิเคราะห์การไหลของแก๊สแบบพกพา, CITREX H3, ทดสอบเครื่องหายใจ, ทดสอบอุปกรณ์ระดับความเสดือ'),
(14, 'imt', 'Flow Measurement Devices', 'อุปกรณ์วัดการไหล', 'Portable flow meters, Stationary flow meters, Gas composition analyzers, Precision measurement devices', 'เครื่องวัดการไหลแบบพกพา, เครื่องวัดการไหลแบบติดตั้ง, เครื่องวิเคราะห์องค์ประกอบแก๊ส, อุปกรณ์วัดความแม่นยำสูง'),
(15, 'imt', 'Lung Simulation & Testing', 'การจำลองปอดและการทดสอบ', 'SmartLung 2000 (Adult test lung), EasyLung Neonatal (Neonatal test lung), alveo Lung Simulator (Advanced simulator), Test lung accessories', 'SmartLung 2000 (ปอดทดสอบผู้ใหญ่), EasyLung Neonatal (ปอดทดสอบเด็กแรกเกิด), alveo Lung Simulator (จำลองปอดขั้นสูง), อุปกรณ์เสริมปอดทดสอบ'),
(16, 'imt', 'Calibration Services', 'บริการสอบเทียบ', 'EasyCal annual calibration subscription, ISO 17025 accredited calibration, Maintenance and software updates, Global calibration service', 'การสมัครสมาชิก EasyCal สอบเทียบประจำปี, สอบเทียบตามมาตรฐาน ISO 17025, บำรุงรักษาและอัปเดตซอฟต์แวร์, บริการสอบเทียบระดับโลก'),

-- Rigel Categories (IDs 17-20)
(17, 'rigel', 'Electrical Safety Analyzers', 'เครื่องวิเคราะห์ความปลอดภัยไฟฟ้า', 'Rigel 288+ electrical safety analyzer, AC/DC leakage current testers, Insulation resistance testers, Earth bond testers, IEC 60601 & IEC 62353 compliance', 'เครื่องวิเคราะห์ความปลอดภัย Rigel 288+, เครื่องวัดกระแสรั่ว AC/DC, เครื่องวัดความต้านทานฉนวน, เครื่องทดสอบกราวด์บอนด์, ปฏิบัติตาม IEC 60601 & IEC 62353'),
(18, 'rigel', 'Patient Simulation Equipment', 'อุปกรณ์จำลองผู้ป่วย', 'Vital signs simulators, ECG simulators, SpO2 (pulse oximetry) simulators, NIBP (blood pressure) simulators, Multi-function patient simulators', 'เครื่องจำลองสัญญาณชีพจร, เครื่องจำลอง ECG, เครื่องจำลอง SpO2, เครื่องจำลอง NIBP, เครื่องจำลองผู้ป่วยแบบหลายฟังก์ชัน'),
(19, 'rigel', 'Specialized Device Testers', 'เครื่องทดสอบอุปกรณ์เฉพาะทาง', 'Infusion pump analyzers, Defibrillator analyzers, AED testers, Electrosurgery analyzers, Ventilator testing systems, Gas flow analyzers', 'เครื่องวิเคราะห์ปั๊มหลอด, เครื่องวิเคราะห์ตัวสั่นไฟฟ้า, เครื่องทดสอบ AED, เครื่องวิเคราะห์ศัลยกรรมไฟฟ้า, ระบบทดสอบเครื่องหายใจ, เครื่องวิเคราะห์การไหลของแก๊ส'),
(20, 'rigel', 'Software & Support Services', 'ซอฟต์แวร์และบริการสนับสนุน', 'Med-eBase data management software, Calibration services, Technical support, Free testing guides (IEC 60601, IEC 62353, Defibrillation), Training programs', 'ซอฟต์แวร์ Med-eBase สำหรับจัดการข้อมูล, บริการสอบเทียบ, การสนับสนุนทางเทคนิค, คู่มือทดสอบฟรี, โปรแกรมฝึกอบรม'),

-- Foremount Categories (IDs 21-23)
(21, 'foremount', 'Airway Management Equipment', 'อุปกรณ์จัดการทางเดินหายใจ', 'Laryngoscopes (fiber-optic and digital), Intubation tubes, Airway adjuncts, Breathing circuits, Anesthesia masks, Endoscopes for airway visualization', 'ลาริงโกสโคป (ไฟเบอร์ออปติกและดิจิตอล), หลอดสูบลม, อุปกรณ์ช่วยการหายใจ, วงจรทำให้สตึก, หน้ากากสำหรับสูบแก๊ส, เอนโดสโคปสำหรับการมองเห็นทางเดินหายใจ'),
(22, 'foremount', 'Anesthesia Delivery Systems', 'ระบบส่งมอบสารยาสตึก', 'Anesthesia machines, Vaporizers, Regulators, Gas delivery systems, Oxygen concentrators, Ventilator equipment, Monitoring systems', 'เครื่องสตึก, ตัวปล่อยไอ, ตัวควบคุมแรงดัน, ระบบส่งแก๊ส, เครื่องเข้มข้นออกซิเจน, อุปกรณ์เครื่องหายใจ, ระบบตรวจสอบ'),
(23, 'foremount', 'Accessories & Consumables', 'อุปกรณ์เสริมและวัสดุสิ้นเปลือง', 'Breathing tubes, Gas supply tubes, Hoses, Connectors, Filters, Replaceable components, Maintenance supplies', 'หลอดสูบแก๊ส, ท่อจ่ายแก๊ส, สายยาง, ตัวต่อ, ตัวกรอง, ชิ้นส่วนที่ต้องเปลี่ยน, วัสดุบำรุงรักษา'),

-- Bionit Categories (IDs 24-27)
(24, 'bionit', 'Vacuum Blood Collection Systems', 'ระบบเก็บตัวอย่างเลือดแบบสูญญากาศ', 'Blood collection tubes (EDTA, Serum, Plasma), Needle holders and adapters, Collection sets, Vein selection accessories, Quality control products', 'หลอดเก็บเลือด (EDTA, เซรั่ม, พลาสม่า), ผู้ถือเข็มและอะแดปเตอร์, ชุดเก็บตัวอย่าง, อุปกรณ์เสริมสำหรับเลือก, ผลิตภัณฑ์ควบคุมคุณภาพ'),
(25, 'bionit', 'Cytology Solutions', 'สารละลายและเครื่องมือวิทยาเนื้อเยื่อ', 'Cell preservation solutions, Staining reagents, Slides and covers, Microscopy accessories, Specimen collection kits', 'สารละลายรักษาเซลล์, สารเคมีย้อมสี, แผ่นและตัวปิด, อุปกรณ์เสริมกล้องจุลทรรศน์, ชุดเก็บตัวอย่าง'),
(26, 'bionit', 'Medical Diagnostics Equipment', 'เครื่องมือวินิจฉัยทางการแพทย์', 'ECG monitors, Vital signs monitors, Thermometers, Blood pressure monitors, Pulse oximeters, Point-of-care testing devices', 'จอแสดง ECG, จอแสดงสัญญาณชีพจร, เครื่องวัดอุณหภูมิ, เครื่องวัดความดันโลหิต, เครื่องวัดความอิ่มตัวออกซิเจน, อุปกรณ์ทดสอบ POC'),
(27, 'bionit', 'Electronic Testing Equipment', 'เครื่องมือทดสอบอิเล็กทรอนิกส์', 'Oscilloscopes, Function generators, Power supplies, Multimeters, Logic analyzers, Laboratory test instruments', 'ออสซิลโลสโคป, เครื่องสร้างสัญญาณ, ชุดจ่ายไฟ, มัลติมิเตอร์, วิเคราะห์ลอจิก, เครื่องมือทดสอบห้องปฏิบัติการ')
ON CONFLICT (id) DO UPDATE SET
  brand_id = EXCLUDED.brand_id,
  title_en = EXCLUDED.title_en,
  title_th = EXCLUDED.title_th,
  items_en = EXCLUDED.items_en,
  items_th = EXCLUDED.items_th;

-- Reset categories sequence
SELECT setval('categories_id_seq', (SELECT COALESCE(MAX(id), 0) FROM categories));

-- ============================================
-- STEP 4: INSERT PRODUCTS
-- ============================================

INSERT INTO products (id, brand_id, category_id, name_en, name_th, description_en, description_th, image, price) VALUES
(1, 'sika', 1, 'Industrial Thermometer T-201', 'เทอร์โมมิเตอร์อุตสาหกรรม T-201', 'High precision industrial thermometer for process control applications. Range: -50°C to 500°C. Accuracy: ±0.5°C.', 'เทอร์โมมิเตอร์อุตสาหกรรมความแม่นยำสูงสำหรับงานควบคุมกระบวนการ ช่วงวัด: -50°C ถึง 500°C ความแม่นยำ: ±0.5°C', '/uploads/products/thermometer-t201.jpg', '฿8,500'),
(3, 'sika', 1, 'Digital Thermometer DT-500', 'เทอร์โมมิเตอร์ดิจิตอล DT-500', 'Portable digital thermometer with large LCD display. Battery operated with auto power-off feature.', 'เทอร์โมมิเตอร์ดิจิตอลพกพาจอ LCD ขนาดใหญ่ ใช้แบตเตอรี่พร้อมฟังก์ชันปิดอัตโนมัติ', '/uploads/products/dt-500.jpg', '฿3,200'),
(4, 'sika', 2, 'Temperature Calibrator TC-100', 'เครื่องสอบเทียบอุณหภูมิ TC-100', 'Portable dry block temperature calibrator. Range: -25°C to 150°C. Stability: ±0.02°C.', 'เครื่องสอบเทียบอุณหภูมิแบบ Dry Block พกพา ช่วง: -25°C ถึง 150°C ความเสถียร: ±0.02°C', '/uploads/products/tc-100.jpg', '฿45,000'),
(5, 'sika', 2, 'Process Calibrator PC-200', 'เครื่องสอบเทียบกระบวนการ PC-200', 'Multi-function process calibrator for temperature, pressure, and electrical signals. HART compatible.', 'เครื่องสอบเทียบกระบวนการแบบมัลติฟังก์ชันสำหรับอุณหภูมิ ความดัน และสัญญาณไฟฟ้า รองรับ HART', '/uploads/products/pc-200.jpg', '฿89,000'),
(6, 'sika', 3, 'Pressure Gauge PG-100', 'เกจวัดความดัน PG-100', 'Stainless steel pressure gauge with glycerin filling. Range: 0-100 bar. Accuracy class 1.0.', 'เกจวัดความดันสแตนเลสบรรจุกลีเซอรีน ช่วง: 0-100 บาร์ ระดับความแม่นยำ 1.0', '/uploads/products/pg-100.jpg', '฿2,800'),
(7, 'sika', 3, 'Digital Pressure Gauge DPG-500', 'เกจวัดความดันดิจิตอล DPG-500', 'High accuracy digital pressure gauge with data logging. IP67 rated. Accuracy: 0.1% FS.', 'เกจวัดความดันดิจิตอลความแม่นยำสูงพร้อมบันทึกข้อมูล ระดับ IP67 ความแม่นยำ: 0.1% FS', '/uploads/products/dpg-500.jpg', '฿18,500'),
(8, 'datrend', 6, 'vPad-Mini Electrical Safety Analyzer', 'เครื่องวิเคราะห์ความปลอดภัยไฟฟ้า vPad-Mini', 'Compact electrical safety analyzer for medical device testing. IEC 62353 compliant.', 'เครื่องวิเคราะห์ความปลอดภัยไฟฟ้าขนาดกะทัดรัดสำหรับทดสอบอุปกรณ์การแพทย์ ตามมาตรฐาน IEC 62353', '/uploads/products/vpad-mini.jpg', '฿125,000'),
(9, 'datrend', 7, 'ECG Simulator ES-100', 'เครื่องจำลอง ECG ES-100', '12-lead ECG patient simulator with arrhythmia waveforms. Battery or AC powered.', 'เครื่องจำลองผู้ป่วย ECG 12 ลีดพร้อมคลื่นหัวใจเต้นผิดจังหวะ ใช้แบตเตอรี่หรือไฟ AC', '/uploads/products/ecg-sim.jpg', '฿75,000'),
(10, 'datrend', 7, 'SpO2 Simulator SPO-200', 'เครื่องจำลอง SpO2 SPO-200', 'Pulse oximeter tester with adjustable saturation levels 30-100%. Multi-brand finger adapter.', 'เครื่องทดสอบ Pulse Oximeter ปรับระดับความอิ่มตัวได้ 30-100% อะแดปเตอร์หลายยี่ห้อ', '/uploads/products/spo2-sim.jpg', '฿55,000'),
(11, 'aep', 9, 'Single Point Load Cell SP-1000', 'โหลดเซลล์แบบจุดเดี่ยว SP-1000', 'Aluminum single point load cell. Capacity: 10-200 kg. IP65 protection.', 'โหลดเซลล์แบบจุดเดี่ยวอะลูมิเนียม ความจุ: 10-200 กก. ระดับป้องกัน IP65', '/uploads/products/loadcell-sp1000.jpg', '฿6,500'),
(12, 'aep', 9, 'Shear Beam Load Cell SB-5000', 'โหลดเซลล์แบบเฉือน SB-5000', 'Stainless steel shear beam load cell. Capacity: 500-10000 kg. OIML R60 C3 approved.', 'โหลดเซลล์แบบเฉือนสแตนเลส ความจุ: 500-10000 กก. ได้รับการรับรอง OIML R60 C3', '/uploads/products/loadcell-sb5000.jpg', '฿12,800'),
(13, 'imt', 13, 'CITREX H3 Gas Flow Analyzer', 'เครื่องวิเคราะห์การไหลของแก๊ส CITREX H3', 'Entry-level gas flow analyzer for ventilator and anesthesia testing. Touchscreen interface.', 'เครื่องวิเคราะห์การไหลของแก๊สสำหรับทดสอบเครื่องช่วยหายใจและดมยา จอสัมผัส', '/uploads/products/citrex-h3.jpg', '฿185,000'),
(14, 'imt', 14, 'FlowMonitor Pro FM-300', 'เครื่องวัดการไหล FlowMonitor Pro FM-300', 'High precision gas flow meter. Range: 0-300 L/min. Accuracy: ±1% of reading.', 'เครื่องวัดการไหลของแก๊สความแม่นยำสูง ช่วง: 0-300 L/min ความแม่นยำ: ±1% ของค่าที่อ่าน', '/uploads/products/flowmonitor-pro.jpg', '฿95,000'),
(15, 'foremount', 21, 'Mercury Analyzer MA-3000', 'เครื่องวิเคราะห์ปรอท MA-3000', 'Direct thermal decomposition mercury analyzer. Detection limit: 0.001 ng Hg.', 'เครื่องวิเคราะห์ปรอทแบบ Direct Thermal Decomposition ขีดจำกัดการตรวจจับ: 0.001 ng Hg', '/uploads/products/mercury-analyzer.jpg', '฿850,000')
ON CONFLICT (id) DO UPDATE SET
  brand_id = EXCLUDED.brand_id,
  category_id = EXCLUDED.category_id,
  name_en = EXCLUDED.name_en,
  name_th = EXCLUDED.name_th,
  description_en = EXCLUDED.description_en,
  description_th = EXCLUDED.description_th,
  image = EXCLUDED.image,
  price = EXCLUDED.price;

-- Reset products sequence
SELECT setval('products_id_seq', (SELECT COALESCE(MAX(id), 0) FROM products));

-- ============================================
-- STEP 5: VERIFY DATA
-- ============================================

SELECT 'Brands' as table_name, COUNT(*) as count FROM brands
UNION ALL
SELECT 'Categories', COUNT(*) FROM categories
UNION ALL
SELECT 'Products', COUNT(*) FROM products;
