# LandStack — Digital Land Governance & Unified Land Records

> **A citizen-centric, multi-district land aggregation and spatial intelligence platform aligned with DILRMP, Bhu-Aadhaar (ULPIN), and AgriStack standards.**

---

## 📌 Problem Statement

In India, land administration records are fragmented across multiple circle offices, district portals, and state departments.

Citizens holding agricultural or residential plots across multiple districts often need to:

- Navigate different state and district portals.
- Visit Circle Offices (Anchal) to collect land records.
- Search through disconnected textual and spatial records.
- Verify whether a property has pending disputes or financial encumbrances.
- Match textual land records such as Jamabandi/RoR with cadastral maps.

Important information such as active bank mortgages, registered security interests, or pending revenue disputes may not be visible through a single citizen-facing interface.

Similarly, textual land records and spatial cadastral maps are often maintained separately, making land-boundary verification difficult for ordinary citizens.

---

# 💡 Solution — LandStack

**LandStack** is a unified, citizen-facing land governance dashboard designed to bring multiple land-related datasets into a single interface.

The platform provides:

1. **Unified Land Discovery**  
   Search and view land records using District, Anchal, Mauza, Khesra, Khata, Jamabandi, or ULPIN.

2. **Cadastral GIS Mapping**  
   Display land parcels as GIS polygons over map and satellite layers.

3. **Risk Intelligence**  
   Highlight potential litigation and financial encumbrance information associated with a land parcel.

4. **Revenue Record Visualization**  
   Present important RoR/Jamabandi information in a structured and readable format.

5. **Print-Optimized Land Transcript**  
   Generate a clean, A4-friendly printable view for demonstrations and document workflows.

---

# 🚀 Key Features

## 1. Unified Land Discovery

Users can search for land using:

- District
- Anchal
- Mauza
- Khata
- Khesra
- Jamabandi
- ULPIN

The objective is to provide a single discovery interface instead of requiring users to search across multiple disconnected systems.

---

## 2. Cadastral GIS Mapping

Land parcels can be visualized through an interactive GIS interface.

### Features

- Interactive cadastral map
- Plot boundary polygon visualization
- Automatic map bounds fitting
- Map marker and parcel information
- Street map layer
- Satellite imagery layer
- Land parcel selection
- Spatial visualization of land records

The prototype uses **Leaflet / React-Leaflet** for map rendering.

---

## 3. Risk Intelligence

LandStack provides visual indicators for important land-related risks.

### 🔴 Litigation Alert

Displays potential litigation or dispute information associated with a land parcel.

Possible sources in a future production integration could include:

- State Revenue Court Management Systems (RCMS)
- e-Courts
- Revenue department databases

### 🟡 Financial Encumbrance

Displays potential mortgage or security-interest information associated with a property.

A future production implementation could integrate relevant information from:

- CERSAI
- Registered mortgage records
- State registration systems

> **Note:** The current prototype uses simulated/demo data. It does not directly access restricted government databases.

---

## 4. Revenue Transcript

LandStack provides a structured view of important land-record information such as:

- Owner / recorded holder
- Khata number
- Khesra number
- Area
- Land type
- Mauza
- Anchal
- District
- ULPIN
- Revenue information
- Risk indicators

The interface also includes print-specific CSS using `@media print` to isolate the relevant land schedule and create a clean A4 print layout.

---

## 5. Centralized Branding Architecture

The project uses a reusable `BrandLogo` component as a single source of truth for the application's branding.

This allows the same branding component to be reused across:

- Navbar
- Dashboard
- Authentication pages
- Footer
- Land profile
- Other application modules

---

# 🏗️ Architecture & Data Flow

```text
┌──────────────────────────────────────────────────────────┐
│                    Citizen Interface                     │
│                                                          │
│       React + Tailwind CSS + Lucide + Leaflet GIS       │
└─────────────────────────────▲────────────────────────────┘
                              │
                              │ Secure Authentication
                              │
┌─────────────────────────────┴────────────────────────────┐
│                 Unified Aggregation Gateway              │
│                                                          │
│              DILRMP / AgriStack Model                    │
└──────────────┬────────────────┬────────────────┬─────────┘
               │                │                │
               ▼                ▼                ▼
      ┌────────────────┐ ┌───────────────┐ ┌───────────────┐
      │  State Land    │ │ e-Courts/RCMS │ │    CERSAI     │
      │    Records     │ │   Judicial    │ │   Financial   │
      │                │ │   / Revenue   │ │   Registry    │
      │ • Jamabandi    │ │   Records     │ │               │
      │ • RoR          │ │ • Litigation  │ │ • Mortgage    │
      │ • Bhu-Naksha   │ │ • Cases       │ │ • Lien        │
      │ • Land Use     │ │ • Status      │ │ • Security    │
      └────────────────┘ └───────────────┘ └───────────────┘

---

## 🛠️ Tech Stack

| Domain             | Technology / Tool                          |
| ------------------ | ------------------------------------------ |
| Frontend Framework | React 18 / Vite                            |
| Styling            | Tailwind CSS                               |
| Mapping & GIS      | Leaflet / React-Leaflet                    |
| Satellite Layer    | Esri World Imagery                         |
| Icons              | Lucide React                               |
| Data Layer         | JavaScript / JSON                          |
| Print Styling      | CSS3 `@media print`                        |
| Authentication     | Prototype OTP / Identity Verification Flow |

---

## 📂 Project Structure

landstack/
├── public/
│
├── src/
│   ├── assets/
│   │   └── Logo.png
│   │
│   ├── components/
│   │   │
│   │   ├── auth/
│   │   │   └── LoginPage.jsx
│   │   │
│   │   ├── common/
│   │   │   └── BrandLogo.jsx
│   │   │
│   │   ├── dashboard/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── land/
│   │   │   ├── LandMap.jsx
│   │   │   └── LandProfile.jsx
│   │   │
│   │   └── landing/
│   │       ├── Features.jsx
│   │       ├── Footer.jsx
│   │       ├── Hero.jsx
│   │       ├── HowItWorks.jsx
│   │       ├── LandingPage.jsx
│   │       └── Navbar.jsx
│   │
│   ├── data/
│   │   └── landData.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── package.json
└── README.md

---

## 📄 Component Overview

| Component         | Purpose                                            |
| ----------------- | -------------------------------------------------- |
| `LoginPage.jsx`   | Authentication and identity verification interface |
| `BrandLogo.jsx`   | Reusable application branding component            |
| `Dashboard.jsx`   | Unified land holdings dashboard                    |
| `LandMap.jsx`     | GIS map and cadastral parcel visualization         |
| `LandProfile.jsx` | Detailed land information and risk indicators      |
| `Features.jsx`    | Landing page feature section                       |
| `Footer.jsx`      | Footer and governance information                  |
| `Hero.jsx`        | Main landing page introduction                     |
| `HowItWorks.jsx`  | Explains the platform workflow                     |
| `LandingPage.jsx` | Main landing page layout                           |
| `Navbar.jsx`      | Application navigation                             |
| `landData.js`     | Demo land records and normalized data structure    |


---

## 🔄 Application Workflow

                 ┌─────────────────┐
                 │  Landing Page   │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Authentication  │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │   Dashboard     │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Search Land     │
                 │ District/Khata/ │
                 │ Khesra/ULPIN    │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Land Profile    │
                 └───────┬─┬───────┘
                         │ │
              ┌──────────┘ └──────────┐
              ▼                       ▼
       ┌──────────────┐       ┌──────────────┐
       │ GIS Map      │       │ Risk Status  │
       │ Parcel       │       │ Litigation   │
       │ Boundary     │       │ Mortgage     │
       └──────────────┘       └──────────────┘
                         │
                         ▼
                 ┌─────────────────┐
                 │ Print Transcript│
                 └─────────────────┘

---

##⚡ Getting Started

Prerequisites
Make sure the following are installed:
● Node.js v18 or higher
● npm or yarn
● Git

Installation

1. Clone the Repository
git clone https://github.com/your-username/landstack.git
cd landstack

2. Install Dependencies
npm install

3. Start Development Server
npm run dev

The application will normally be available at: http://localhost:5173
4. Build for Production
npm run build

5. Preview Production Build
npm run preview

---

## 🗺️ GIS Implementation

LandStack uses Leaflet / React-Leaflet for interactive map visualization.
The GIS module is designed to support:
Land Parcel
     │
     ├── Parcel ID
     ├── Khesra
     ├── Khata
     ├── Area
     ├── Owner
     └── Coordinates
              │
              ▼
       GeoJSON / Polygon
              │
              ▼
       Leaflet Map Layer
              │
        ┌─────┴─────┐
        ▼           ▼
     Street      Satellite
       Map          Map

The current prototype can use mock polygon coordinates.
A production implementation would require authenticated and authorized access to official cadastral/geospatial datasets.

---

## 🧩 Data Model
The prototype uses a normalized land-record structure similar to:
```{
  id: "LS-001",
  state: "Bihar",
  district: "Example District",
  anchal: "Example Anchal",
  mauza: "Example Mauza",
  khata: "123",
  khesra: "456",
  jamabandi: "789",
  ulpin: "XXXXXXXXXXXXXX",

  owner: {
    name: "Demo User"
  },

  land: {
    area: "0.25 Acre",
    type: "Agricultural",
    classification: "Residential"
  },

  location: {
    latitude: 25.5941,
    longitude: 85.1376
  },

  risks: {
    litigation: false,
    mortgage: false
  }
}

The above data is intended for demonstration purposes only.```

---

## 🔐 Privacy & Security Approach

LandStack follows a Privacy by Design approach for the prototype.
The application should avoid unnecessarily exposing sensitive personal information.

Prototype Principles
● Identity verification before accessing personalized records.
● Masking of sensitive identifiers where appropriate.
● Demo records instead of real citizen data.
● No real government credentials stored in the frontend.
● No real financial or judicial records exposed through demo APIs.
● Production Requirements

A production implementation would require:
● Government-approved authentication.
● Role-based access control.
● API authentication and authorization.
● Encryption in transit and at rest.
● Audit logging.
● Consent and purpose limitation.
● Secure handling of personal information.
● Official API agreements and data-sharing permissions.

---

## 🏛️ Governance Standards & Alignment

LandStack is conceptually aligned with major digital land-governance initiatives.

DILRMP
The Digital India Land Records Modernization Programme (DILRMP) provides the broader framework for modernization and computerization of land records.
LandStack follows a compatible administrative hierarchy:
State
  │
  ▼
District
  │
  ▼
Anchal / Circle
  │
  ▼
Mauza / Village
  │
  ▼
Khata
  │
  ▼
Khesra / Plot

---

Bhu-Aadhaar / ULPIN

LandStack is designed to support the concept of a standardized Unique Land Parcel Identification Number (ULPIN) for identifying land parcels.
The prototype treats ULPIN as a key identifier for connecting different land-related datasets.
 
---

Cadastral Mapping

The GIS layer is designed around the concept of connecting:

Textual Land Record
        +
Cadastral Map
        ↓
Unified Land Parcel View

This allows citizens to understand both the textual record and spatial representation of a land parcel through a single interface.

---

Financial Encumbrance

The architecture allows future integration with relevant financial/security-interest registries such as CERSAI, subject to official API access, authorization, and applicable data-sharing rules.

---

Judicial / Revenue Dispute Information
The architecture also allows future integration with appropriate judicial or revenue dispute systems.

Potential sources may include:

● e-Courts
● State RCMS
● Revenue department systems

Actual production integration would depend on official APIs, permissions, data standards, and interoperability agreements.

---

## 🔌 Future API Integration

The prototype currently uses local/mock data.
The planned production architecture can replace the mock data layer with secure government APIs.

                    LandStack Frontend
                           │
                           ▼
                   Backend API Gateway
                           │
            ┌──────────────┼──────────────┐
            │              │              │
            ▼              ▼              ▼
      Land Records      GIS Data       Risk Data
            │              │              │
            ▼              ▼              ▼
       State APIs      Cadastral       Judicial /
       / DILRMP        Services        Financial APIs

The frontend should not directly expose sensitive government API credentials.

---

## 🎯 Hackathon / SIH Prototype Scope
The current version focuses on demonstrating the core concept:

Citizen
   ↓
Authentication
   ↓
Unified Land Dashboard
   ↓
Land Search
   ↓
Land Profile
   ├── Ownership Information
   ├── Land Characteristics
   ├── GIS Boundary
   ├── Litigation Indicator
   ├── Mortgage Indicator
   └── Printable Record

The prototype demonstrates the user experience and technical architecture required for a unified land-governance platform.
Official government API integration can be implemented as the next phase after obtaining the required access, authentication mechanisms, and data-sharing permissions.

---

## 🧪 Demo Data Disclaimer

All land records, parcel boundaries, owners, identifiers, coordinates, litigation statuses, mortgage statuses, and other information displayed in the prototype are mock/demo data unless explicitly connected to an authorized official data source.

They must not be interpreted as actual land ownership records, legal title documents, court records, mortgage certificates, or government-issued certificates.

---

## 🛡️ Disclaimer

LandStack is an educational and technological prototype developed for digital-governance demonstrations, research, and hackathon purposes. The application does not currently represent an official government land-record system. All demo land parcels, identifiers, boundaries, ownership information, risk indicators, and documents are simulated unless explicitly stated otherwise. Production deployment would require appropriate government authorization, official APIs, data-sharing agreements, authentication mechanisms, security controls, and compliance with applicable laws and policies.

---

##📌 Project Status
| Module                     | Status        |
| -------------------------- | ------------- |
| Landing Page               | ✅ Implemented |
| Responsive Navbar          | ✅ Implemented |
| Authentication UI          | ✅ Implemented |
| Dashboard                  | ✅ Implemented |
| Land Search                | ✅ Prototype   |
| Land Profile               | ✅ Implemented |
| GIS Map                    | ✅ Prototype   |
| Satellite Layer            | ✅ Prototype   |
| Cadastral Polygon          | ✅ Demo        |
| Risk Indicators            | ✅ Demo        |
| Printable Transcript       | ✅ Implemented |
| Mock Land Dataset          | ✅ Implemented |
| Government API Integration | 🔄 Future     |
| Real Cadastral Data        | 🔄 Future     |
| Real Judicial Integration  | 🔄 Future     |
| Real CERSAI Integration    | 🔄 Future     |
| Production Authentication  | 🔄 Future     |

---

## 👥 Team / Project

Project Name: LandStack
Category: Digital Public Infrastructure / Land Governance / GIS
Primary Technologies: React, Vite, Tailwind CSS, Leaflet, JavaScript

Purpose:
To demonstrate how fragmented land-related information can be presented through a unified, citizen-centric interface while maintaining a clear separation between prototype functionality and official government data systems.

---

##📄 License

This project is currently intended for educational, research, and hackathon demonstration purposes
Add an appropriate open-source license if the repository is intended for public distribution.
