// src/data/landData.js

export const users = [
  {
    userId: "USR-1001",
    identifierMasked: "XXXX-XXXX-3333",
    name: "Ramesh Kumar",
    fatherName: "Late Rajendra Prasad",
    mobile: "98XXXXXX21",
    identityStatus: "Verified",
    totalParcels: 6,
    districtsCount: 3,
  },
  {
    userId: "USR-1002",
    identifierMasked: "XXXX-XXXX-6666",
    name: "Suresh Kumar",
    fatherName: "Ramchandra Sharma",
    mobile: "97XXXXXX45",
    identityStatus: "Verified",
    totalParcels: 5,
    districtsCount: 2,
  },
  {
    userId: "USR-1003",
    identifierMasked: "XXXX-XXXX-9999",
    name: "Amit Kumar",
    fatherName: "Shyam Sundar Singh",
    mobile: "96XXXXXX78",
    identityStatus: "Verified",
    totalParcels: 6,
    districtsCount: 3,
  },
];

export const landRecords = [
  // ==========================================
  // RAMESH KUMAR (USR-1001)
  // ==========================================
  {
    id: "LAND-1001-01",
    userId: "USR-1001",
    ulpin: "BR-PAT-2026-001254",

    district: "Patna",
    anchal: "Danapur",
    mauza: "Demo Mauza A",

    khesra: "1254",
    khata: "342",
    jamabandi: "JMB-2026-001254",

    areaAcre: 2.5,
    area: "2.50 Acre",
    landType: "Agricultural",
    landUse: "Cultivation (Do-Fasla)",

    mutationStatus: "Completed",
    registrationStatus: "Registered",
    status: "Active",

    // Encumbrance / Loan Data (CERSAI)
    encumbrance: {
      hasLoan: true,
      bankName: "State Bank of India, Danapur",
      amount: "₹ 4,50,000",
      status: "Active Mortgage (Lien)",
      cersaiId: "CERSAI-CHG-89210",
    },

    // Litigation / Case Data (e-Courts)
    litigation: {
      hasDispute: false,
      caseNumber: null,
      court: null,
      caseStatus: "No case available in connected records",
      disclaimer:
        "Available digital records ke aadhar par vivad-mukt hone ki pushti nahi hoti.",
    },

    // Registered Sale Deed (कबाला) Data
    deedDetails: {
      deedNo: "DEED/2018/04582",
      registrationDate: "14-07-2018",
      bookNo: "1",
      volumeNo: "42",
      pageFrom: "112",
      pageTo: "118",
      sroOffice: "Sub-Registrar Office, Danapur (Patna)",
      sellerName: "Bishwanath Singh",
      buyerName: "Ramesh Kumar",
      considerationAmount: "₹ 18,50,000",
      stampDuty: "₹ 1,11,000",
      chauhaddi: {
        north: "Nij Khesra 1253 (Ramautar Rai)",
        south: "Gramin Sadak (P.W.D. Road)",
        east: "Nala Awam Khesra 1255",
        west: "Khesra 1251 (Kailash Yadav)",
      },
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },

    latitude: 25.5941,
    longitude: 85.1376,
    boundary: [
      [25.5952, 85.1365],
      [25.5955, 85.138],
      [25.5938, 85.1385],
      [25.5935, 85.137],
    ],
  },

  {
    id: "LAND-1001-02",
    userId: "USR-1001",
    ulpin: "BR-BHG-2026-000842",

    district: "Bhagalpur",
    anchal: "Gopalpur",
    mauza: "Demo Mauza B",

    khesra: "842",
    khata: "218",
    jamabandi: "JMB-2026-000842",

    areaAcre: 1.75,
    area: "1.75 Acre",
    landType: "Agricultural",
    landUse: "Agriculture",

    mutationStatus: "Completed",
    registrationStatus: "Registered",
    status: "Active",

    encumbrance: {
      hasLoan: false,
      bankName: null,
      amount: "Nil",
      status: "Free of Lien (Clear)",
      cersaiId: null,
    },

    litigation: {
      hasDispute: true,
      caseNumber: "REV-CAS-2024-891",
      court: "Sub-Divisional Magistrate Court, Gopalpur",
      caseType: "Title & Boundary Demarcation",
      filingDate: "2024-03-12",
      caseStatus: "Hearing in Progress (Interim Stay)",
      disclaimer:
        "Record tracked via State Revenue Court Management System (RCMS).",
    },

    deedDetails: {
      deedNo: "DEED/2015/01289",
      registrationDate: "22-11-2015",
      bookNo: "1",
      volumeNo: "18",
      pageFrom: "45",
      pageTo: "50",
      sroOffice: "Sub-Registrar Office, Naugachia (Bhagalpur)",
      sellerName: "Mahavir Sharma",
      buyerName: "Ramesh Kumar",
      considerationAmount: "₹ 11,20,000",
      stampDuty: "₹ 67,200",
      chauhaddi: {
        north: "Bandh Road",
        south: "Khesra 843 (Sitaram Sah)",
        east: "Khesra 845 (Devendra Prasad)",
        west: "Payen (Irrigation Canal)",
      },
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },

    latitude: 25.2425,
    longitude: 86.9842,
    boundary: [
      [25.2435, 86.983],
      [25.2438, 86.9855],
      [25.2415, 86.9852],
      [25.2412, 86.9835],
    ],
  },

  {
    id: "LAND-1001-03",
    userId: "USR-1001",
    ulpin: "BR-BEG-2026-000316",

    district: "Begusarai",
    anchal: "Begusarai",
    mauza: "Demo Mauza C",

    khesra: "316",
    khata: "176",
    jamabandi: "JMB-2026-000316",

    areaAcre: 1.2,
    area: "1.20 Acre",
    landType: "Agricultural",
    landUse: "Agriculture",

    mutationStatus: "Completed",
    registrationStatus: "Registered",
    status: "Active",

    encumbrance: {
      hasLoan: false,
      status: "Clear",
    },
    litigation: {
      hasDispute: false,
      caseStatus: "No case available in connected records",
    },

    deedDetails: {
      deedNo: "DEED/2020/03145",
      registrationDate: "05-02-2020",
      bookNo: "1",
      volumeNo: "29",
      pageFrom: "80",
      pageTo: "85",
      sroOffice: "District Registry Office, Begusarai",
      sellerName: "Shri Ram Nandan Mahto",
      buyerName: "Ramesh Kumar",
      considerationAmount: "₹ 9,50,000",
      stampDuty: "₹ 57,000",
      chauhaddi: {
        north: "Khesra 315 (Harihar Singh)",
        south: "Rasta Sarkari (Public Road)",
        east: "Khesra 317 (Ganga Prasad)",
        west: "Khesra 312 (Radha Mohan)",
      },
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },

    latitude: 25.4182,
    longitude: 86.1271,
    boundary: [
      [25.419, 86.126],
      [25.4195, 86.128],
      [25.4175, 86.1282],
      [25.417, 86.1265],
    ],
  },

  {
    id: "LAND-1001-04",
    userId: "USR-1001",
    ulpin: "BR-BEG-2026-000401",

    district: "Begusarai",
    anchal: "Begusarai",
    mauza: "Demo Mauza D",

    khesra: "401",
    khata: "177",
    jamabandi: "JMB-2026-000401",

    areaAcre: 0.8,
    area: "0.80 Acre",
    landType: "Agricultural",
    landUse: "Agriculture",

    mutationStatus: "Completed",
    registrationStatus: "Registered",
    status: "Active",

    encumbrance: { hasLoan: false, status: "Clear" },
    litigation: {
      hasDispute: false,
      caseStatus: "No case available in connected records",
    },

    deedDetails: {
      deedNo: "DEED/2021/05612",
      registrationDate: "18-09-2021",
      bookNo: "1",
      volumeNo: "35",
      pageFrom: "201",
      pageTo: "206",
      sroOffice: "District Registry Office, Begusarai",
      sellerName: "Gajendra Narayan Roy",
      buyerName: "Ramesh Kumar",
      considerationAmount: "₹ 7,20,000",
      stampDuty: "₹ 43,200",
      chauhaddi: {
        north: "Khesra 400 (Dinesh Paswan)",
        south: "Khesra 403 (Ram Bilas)",
        east: "Village Pathway",
        west: "Khesra 398 (Gauri Shankar)",
      },
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },

    latitude: 25.421,
    longitude: 86.1305,
    boundary: [
      [25.422, 86.1295],
      [25.4225, 86.1315],
      [25.42, 86.1318],
      [25.4198, 86.13],
    ],
  },

  {
    id: "LAND-1001-05",
    userId: "USR-1001",
    ulpin: "BR-BEG-2026-000512",

    district: "Begusarai",
    anchal: "Teghra",
    mauza: "Demo Mauza E",

    khesra: "512",
    khata: "231",
    jamabandi: "JMB-2026-000512",

    areaAcre: 1.5,
    area: "1.50 Acre",
    landType: "Agricultural",
    landUse: "Agriculture",

    mutationStatus: "In-Process",
    registrationStatus: "Registered",
    status: "Active",

    encumbrance: { hasLoan: false, status: "Clear" },
    litigation: {
      hasDispute: false,
      caseStatus: "No case available in connected records",
    },

    deedDetails: {
      deedNo: "DEED/2019/02890",
      registrationDate: "10-10-2019",
      bookNo: "1",
      volumeNo: "24",
      pageFrom: "15",
      pageTo: "21",
      sroOffice: "Sub-Registrar Office, Teghra",
      sellerName: "Bhagwan Das",
      buyerName: "Ramesh Kumar",
      considerationAmount: "₹ 12,00,000",
      stampDuty: "₹ 72,000",
      chauhaddi: {
        north: "Sarkari Sadak",
        south: "Khesra 513 (Chandeshwar Singh)",
        east: "Khesra 515 (Ram Padarath)",
        west: "Khesra 510 (Manoj Kumar)",
      },
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },

    latitude: 25.489,
    longitude: 85.94,
    boundary: [
      [25.489, 85.939],
      [25.4905, 85.941],
      [25.488, 85.9415],
      [25.4878, 85.9395],
    ],
  },

  {
    id: "LAND-1001-06",
    userId: "USR-1001",
    ulpin: "BR-BEG-2026-000638",

    district: "Begusarai",
    anchal: "Bachhwara",
    mauza: "Demo Mauza F",

    khesra: "638",
    khata: "245",
    jamabandi: "JMB-2026-000638",

    areaAcre: 0.9,
    area: "0.90 Acre",
    landType: "Agricultural",
    landUse: "Agriculture",

    mutationStatus: "Completed",
    registrationStatus: "Registered",
    status: "Active",

    encumbrance: { hasLoan: false, status: "Clear" },
    litigation: {
      hasDispute: false,
      caseStatus: "No case available in connected records",
    },

    deedDetails: {
      deedNo: "DEED/2022/07431",
      registrationDate: "12-04-2022",
      bookNo: "1",
      volumeNo: "41",
      pageFrom: "88",
      pageTo: "94",
      sroOffice: "Sub-Registrar Office, Teghra",
      sellerName: "Santosh Roy",
      buyerName: "Ramesh Kumar",
      considerationAmount: "₹ 8,10,000",
      stampDuty: "₹ 48,600",
      chauhaddi: {
        north: "Khesra 637 (Shashi Kant)",
        south: "Khesra 640 (Nagendra Jha)",
        east: "Chak Sadak",
        west: "Khesra 635 (Vinod Paswan)",
      },
      pdfUrl:
        "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    },

    latitude: 25.515,
    longitude: 85.88,
    boundary: [
      [25.516, 85.879],
      [25.5165, 85.881],
      [25.514, 85.8815],
      [25.5138, 85.8795],
    ],
  },
];

// Universal Alias exports to prevent missing import issues
export const parcels = landRecords;
export const lands = landRecords;
