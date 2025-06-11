# 💸 MoneyBook-v2 — 가계부 시스템 (Reboot Edition)

**MoneyBook-v2**는 기존 개인 프로젝트인 [`MoneyBook v1`](https://github.com/nsj9164/moneybook-v1)의 경험을 바탕으로  
**UI/UX, 데이터 구조, 사용자 편의성 측면에서 전면 개선한 리부트(Reboot) 버전**입니다.<br><br>

## 📋 프로젝트 개요
**MoneyBook-v2**는 사용자의 지출을 체계적으로 기록하고 분석할 수 있도록 도와주는 웹 기반 가계부입니다.  
예산 설정, 결제수단/카테고리 관리, 고정지출 자동 반영 등 다양한 기능을 통해  
**자신의 소비 습관을 이해하고, 더 합리적인 소비를 실천할 수 있도록 돕는 서비스입니다.**<br><br>

### 개발 기간
2025.04.15 ~ 진행 중<br><br> 

### 핵심 기능
**▪ 지출 입력 및 수정**  
- 항목별 **날짜, 금액, 카테고리, 결제수단** 등 상세 정보 기록 가능
- **실제 지출 금액**과 **정산 금액(더치페이 등)**을 분리 입력 가능  
  → 한 달간의 **정확한 순지출 확인** 가능

**▪ 카테고리 / 결제수단 / 고정지출 관리**  
- 기본 제공 외에 **사용자 정의 카테고리/결제수단** 추가 가능
- 카테고리별 **이모지/색상 설정**으로 시각적 식별 향상
- 월별 고정비(정기 지출)를 미리 등록해 **자동 반영**
- 각 항목별 수정/삭제 기능 제공

**▪ 지출 분석**  
- **사용자 정의 기준**에 따라 지출을 **맞춤 분류 및 분석**
- 월간 총 지출, 주간 지출 변화 등 시간 흐름 기반 분석
- **카테고리별 소비 비중** 시각화
→ 소비 습관 인식 가능

**▪ 예산 설정 & 초과 알림**  
- 카테고리별 월 예산을 설정하여 지출 목표 설정 가능
- **예산 대비 소비율 및 초과 여부 시각 표시**<br><br> 

## 🛠 Tech Stack

### 🏗️ Framework
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### 🎨 Styling
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn--ui-111827?style=for-the-badge)

### 📦 State & Data Management
![Recoil](https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)

### 📋 Forms & Validation
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)<br><br> 


## 🖥 주요 화면
### 📝 대시보드
한눈에 예산 대비 소비 현황과 주간 소비 흐름을 확인할 수 있는 요약 페이지입니다.
![2025-06-12 06 58 19](https://github.com/user-attachments/assets/981f253c-f31a-4996-b5b1-2cddf9ad88d2)

### 💸 지출 관리 화면
날짜별 지출 내역을 입력하고 수정할 수 있으며, 각 항목의 실지출·정산 금액을 명확히 구분합니다.
![2025-06-12 06 58 42](https://github.com/user-attachments/assets/e5e07660-8e20-48ab-8d46-a1df3079d66e)

### 🎯 예산 설정 화면
카테고리별 월 예산을 설정하고, 초과 여부를 실시간으로 시각화하여 목표 소비를 관리합니다.
![2025-06-12 06 59 56](https://github.com/user-attachments/assets/acc0d47c-0159-42e8-bf56-dc4cf510be68)

### 📂 카테고리 관리
카테고리 이름, 아이콘, 색상 등을 사용자 맞춤으로 설정하고 쉽게 수정/삭제할 수 있습니다.
![2025-06-12 07 00 12](https://github.com/user-attachments/assets/c308095b-78d6-49bb-be01-f7c7ee6b245c)

### 💳 결제수단 관리
현금, 카드, 계좌 등 다양한 결제 수단을 사용자 정의로 관리할 수 있으며, 지출 시 선택 가능합니다.
![2025-06-12 07 01 46](https://github.com/user-attachments/assets/8ad07c30-90cd-4f28-986c-24312b0e859e)

### 📌 고정지출 관리
월 고정적으로 발생하는 지출 항목을 등록해 매월 자동으로 반영되도록 설정할 수 있습니다.
![2025-06-12 07 03 25](https://github.com/user-attachments/assets/9609feb6-ca38-4e22-82af-bd8369c1c5dd)



