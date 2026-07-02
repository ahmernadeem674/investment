// BPO service catalogue (from the firm's BPO spec). Edit here; the /bpo page
// renders from this data. Icons are assigned by order on the page.

export type BpoGroup = { title: string; items: string[] };
export type BpoCategory = { name: string; desc: string; groups: BpoGroup[] };

export const bpoCategories: BpoCategory[] = [
  {
    name: "Financial Outsourcing",
    desc: "End-to-end finance and accounting solutions, from day-to-day operations to executive-level financial strategy.",
    groups: [
      { title: "Accounting & Bookkeeping", items: ["Bookkeeping & General Ledger Management", "Financial Statement Preparation", "Bank & Account Reconciliations", "Month-End & Year-End Closing"] },
      { title: "Accounting Operations", items: ["Accounts Payable (AP)", "Accounts Receivable (AR)", "Payroll Processing", "Expense Management", "Invoice Processing"] },
      { title: "Financial Planning & Analysis (FP&A)", items: ["Budgeting & Forecasting", "Financial Planning", "Performance Analysis", "KPI Dashboards & Management Reporting", "Variance Analysis"] },
      { title: "Cost & Profitability Management", items: ["Cost Accounting", "Cost Optimization", "Pricing & Profitability Analysis", "Cash Flow Planning & Management", "Working Capital Management"] },
      { title: "Tax, Audit & Compliance", items: ["Tax Preparation Support", "Audit Preparation & Coordination", "Financial Compliance Support", "Internal Controls & Risk Management"] },
      { title: "Strategic Finance", items: ["Virtual / Fractional CFO Services", "Financial Modeling", "Business Valuation Support", "Investment & Capital Planning", "ERP & Accounting System Support"] },
    ],
  },
  {
    name: "Tech Outsourcing",
    desc: "Dedicated engineering and IT teams that design, build, and support modern digital products.",
    groups: [
      { title: "Software Engineering", items: ["Custom Software Development", "Web Development", "Mobile App Development", "Enterprise Applications", "API Development & Integration"] },
      { title: "Cloud & Infrastructure", items: ["Cloud Solutions", "DevOps & CI/CD", "Infrastructure Management", "Database Administration", "System Integration"] },
      { title: "Quality & Security", items: ["QA & Software Testing", "Test Automation", "Performance Testing", "Cybersecurity Support", "Application Security"] },
      { title: "Data & AI", items: ["Data Engineering", "Business Intelligence", "Data Analytics", "AI & Machine Learning Solutions", "Data Warehousing"] },
      { title: "IT Support", items: ["IT Help Desk", "Technical Support", "System Administration", "Network Management", "Application Maintenance"] },
    ],
  },
  {
    name: "Customer Experience Outsourcing",
    desc: "Multichannel customer support teams that improve customer satisfaction and business growth.",
    groups: [
      { title: "Customer Support", items: ["Inbound Call Center", "Outbound Call Center", "Live Chat Support", "Email Support", "Technical Support"] },
      { title: "Customer Success", items: ["Help Desk & Ticket Management", "Customer Onboarding", "Customer Retention", "Complaint Resolution", "Customer Success Management"] },
      { title: "Virtual Assistance", items: ["Executive Assistants", "Administrative Support", "Calendar & Email Management", "Research Assistance", "Travel Coordination"] },
    ],
  },
  {
    name: "Business Operations Outsourcing",
    desc: "Reliable back-office solutions that improve operational efficiency and scalability.",
    groups: [
      { title: "Data Entry & Processing", items: ["Document Management", "Order Processing", "Claims Processing", "Back-Office Administration"] },
      { title: "CRM & Procurement", items: ["CRM Management", "Procurement Support", "Inventory Administration", "Reporting & Documentation", "Process Automation"] },
    ],
  },
  {
    name: "HR & Recruitment Outsourcing",
    desc: "Complete workforce solutions from hiring to employee administration.",
    groups: [
      { title: "Recruitment Process Outsourcing (RPO)", items: ["Talent Acquisition", "Resume Screening", "Interview Coordination", "Employee Onboarding"] },
      { title: "HR Administration", items: ["Payroll & Benefits Administration", "Performance Management Support", "Learning & Development Coordination", "HR Compliance Support"] },
    ],
  },
  {
    name: "Healthcare BPO",
    desc: "Specialized healthcare outsourcing that improves patient outcomes, reduces costs, and ensures full regulatory compliance.",
    groups: [
      { title: "Medical Billing & Coding", items: ["ICD-10 / CPT Medical Coding", "Claims Submission & Management", "Denial Management & Appeals", "Revenue Cycle Management (RCM)", "EOB & ERA Processing", "Charge Entry & Charge Capture"] },
      { title: "Claims & Insurance Processing", items: ["Insurance Eligibility Verification", "Prior Authorization Support", "Claims Follow-Up & Tracking", "Payment Posting", "Credentialing Support", "Payer Contracting Assistance"] },
      { title: "Patient Support Services", items: ["Patient Registration & Scheduling", "Appointment Reminder Services", "Patient Help Desk", "Medical Transcription", "Patient Satisfaction Follow-Up", "Multilingual Patient Support"] },
      { title: "Healthcare Data & Compliance", items: ["HIPAA Compliance Management", "Electronic Health Records (EHR) Support", "Healthcare Data Entry & Management", "Medical Records Processing", "Audit & Quality Assurance", "Regulatory Reporting Support"] },
      { title: "Healthcare IT Support", items: ["EHR / EMR System Administration", "Healthcare Application Support", "Telehealth Technology Support", "HL7 & FHIR Integration Support", "IT Help Desk for Clinical Staff"] },
      { title: "Healthcare Analytics", items: ["Clinical Data Analytics", "Population Health Reporting", "Quality Metrics & KPI Dashboards", "Healthcare Cost Analysis", "Outcomes & Performance Reporting"] },
    ],
  },
];
