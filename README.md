# LandStack

### Integrated GIS-Based Digital Public Infrastructure for Land Governance

LandStack is a frontend prototype designed to provide a unified view of a user's land records across multiple districts through a simple and interactive digital interface.

The prototype demonstrates how land ownership information, parcel details, record status, documents, and GIS location can be brought together in one platform.

---

## Problem

Land-related information can be distributed across different records and systems. This makes it difficult for citizens to get a consolidated view of their land holdings and related information.

LandStack addresses this problem through a unified land dashboard where a verified user can view multiple land parcels across different districts.

---

## Current Features

### 1. User Login & OTP Verification

The prototype provides a demo identity verification flow.

* 12-digit demo Aadhaar input
* User validation
* OTP verification
* User-specific dashboard
* Multiple demo users

> The Aadhaar numbers and OTP flow used in this prototype are synthetic demo data and do not perform real Aadhaar authentication.

---

### 2. Unified Land Dashboard

After successful login, the user can view an overview of their available land records.

The dashboard displays:

* Total land area
* Total number of parcels
* Number of districts
* Active cases
* Available land parcels

Land records are displayed according to the logged-in user.

---

### 3. Multi-District Land Records

A user can have multiple land parcels across different districts.

The current demo data includes land records from:

* Patna
* Bhagalpur
* Begusarai

Each parcel is connected to a specific user through a `userId`.

---

### 4. Land Search

The dashboard provides search functionality for finding land records using available parcel information such as:

* District
* Anchal
* Mauza
* Khesra / Plot
* Khata
* Jamabandi
* Area
* Land Type
* Land Use

---

### 5. Land Profile

Each land parcel has a dedicated Land Profile page.

The profile currently displays:

* District
* Anchal
* Mauza
* Khesra / Plot
* Khata Number
* Jamabandi Number
* Area / Rakba
* Owner
* Land Type
* Land Use
* Mutation Status
* Registration Status
* Case / Dispute Status

---

### 6. GIS Parcel Map

Each land parcel can be viewed on an interactive map.

The current map includes:

* Parcel location
* Location marker
* Demo parcel boundary
* Khesra information
* Area information
* Locate on Map
* Full Map view

The prototype currently uses demo coordinates and boundaries.

---

### 7. Documents

The Land Profile contains a Documents section with:

* Jamabandi Record
* Record of Rights
* Registration Record

Clicking a document opens a preview modal containing parcel-related information.

The current documents are prototype/demo documents and are not official government documents.

---

## Application Flow

```text
Landing Page
     ↓
Login
     ↓
OTP Verification
     ↓
Dashboard
     ↓
My Land
     ↓
Search / Select Land
     ↓
Land Profile
     ↓
 ┌───────────────┬───────────────┐
 │               │               │
GIS Map       Documents      Record Status
 │               │               │
Parcel        Jamabandi        Mutation
Location      RoR              Registration
               Registration
```

---

## Technology Stack

* React
* Vite
* Tailwind CSS
* Lucide React
* React Leaflet
* Leaflet
* OpenStreetMap

---

## Project Structure

```text
src/
├── data/
│   └── landData.js
│
├── components/
│   ├── landing/
│   │   ├── LandingPage.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Features.jsx
│   │   ├── HowItWorks.jsx
│   │   └── Footer.jsx
│   │
│   ├── auth/
│   │   └── LoginPage.jsx
│   │
│   ├── dashboard/
│   │   └── Dashboard.jsx
│   │
│   └── land/
│       ├── LandProfile.jsx
│       └── LandMap.jsx
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Installation

Install project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

## Demo Users

The prototype currently contains three synthetic demo users.

### Ramesh Kumar

```text
Demo Aadhaar: 111122223333
OTP: Any 6 digits
```

### Suresh Kumar

```text
Demo Aadhaar: 444455556666
OTP: Any 6 digits
```

### Amit Kumar

```text
Demo Aadhaar: 777788889999
OTP: Any 6 digits
```

> These are synthetic demo credentials created only for the prototype.

---

## Demo Data

The current land records are stored locally in:

```text
src/data/landData.js
```

The data model separates users and land records using `userId`.

```text
User
  ↓
userId
  ↓
Land Records
  ↓
District / Anchal / Mauza
  ↓
Khesra / Khata / Jamabandi
  ↓
Land Details + GIS Data
```

---

## Prototype Disclaimer

LandStack is currently a prototype.

The ownership records, land details, coordinates, parcel boundaries, document numbers, and identity information shown in the application are synthetic/demo data.

The prototype is not connected to live government land records and should not be used to establish legal ownership, title, or the actual status of a land dispute.

---

## Current Status

The following core prototype flow is implemented:

* Landing Page
* Demo Login
* OTP Verification
* User-specific Dashboard
* Multi-district Land Records
* Land Search
* Land Profile
* Record Status
* Case / Dispute Status
* Interactive GIS Map
* Document Preview

**LandStack — Unified View of Land Records**
