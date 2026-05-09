export const LEADS_DATA = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex.t@techcorp.com",
    phone: "+1 (555) 123-4567",
    company: "TechCorp Solutions",
    source: "Website Form",
    status: "New",
    priority: "High",
    assignedDate: "2024-05-01",
    lastContacted: "2024-05-02",
    notes: "Interested in enterprise plan. Needs a demo by Friday.",
    history: [
      { date: "2024-05-01", activity: "Lead created via Website Form" },
      { date: "2024-05-02", activity: "Sent introductory email" }
    ]
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    email: "sjen@innovate.io",
    phone: "+1 (555) 987-6543",
    company: "Innovate.io",
    source: "LinkedIn",
    status: "Contacted",
    priority: "Medium",
    assignedDate: "2024-04-28",
    lastContacted: "2024-04-30",
    notes: "Follow-up scheduled for next Tuesday. Sarah is the CTO.",
    history: [
      { date: "2024-04-28", activity: "Lead imported from LinkedIn" },
      { date: "2024-04-30", activity: "Initial discovery call completed" }
    ]
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@globalship.net",
    phone: "+1 (555) 246-8135",
    company: "Global Ship & Logistics",
    source: "Referral",
    status: "Converted",
    priority: "High",
    assignedDate: "2024-04-15",
    lastContacted: "2024-05-05",
    notes: "Contract signed for 24 months. Onboarding starts Monday.",
    history: [
      { date: "2024-04-15", activity: "Lead created via Referral" },
      { date: "2024-04-20", activity: "Demo completed" },
      { date: "2024-05-05", activity: "Status changed to Converted" }
    ]
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    email: "elena@RodriguezLaw.com",
    phone: "+1 (555) 369-1472",
    company: "Rodriguez Law Firm",
    source: "Website Form",
    status: "Lost",
    priority: "Low",
    assignedDate: "2024-04-10",
    lastContacted: "2024-04-25",
    notes: "Chose a competitor due to pricing.",
    history: [
      { date: "2024-04-10", activity: "Lead created via Website Form" },
      { date: "2024-04-25", activity: "Status changed to Lost" }
    ]
  },
  {
    id: 5,
    name: "David Smith",
    email: "dsmith@nexus.com",
    phone: "+1 (555) 159-7531",
    company: "Nexus Creative",
    source: "Direct",
    status: "Contacted",
    priority: "Medium",
    assignedDate: "2024-05-05",
    lastContacted: "2024-05-06",
    notes: "Requested a quote for the Pro plan.",
    history: [
      { date: "2024-05-05", activity: "Lead created via Direct" },
      { date: "2024-05-06", activity: "Price quote sent" }
    ]
  },
  {
    id: 6,
    name: "Jessica Wu",
    email: "j.wu@startuphub.co",
    phone: "+1 (555) 753-9514",
    company: "Startup Hub",
    source: "Cold Call",
    status: "New",
    priority: "Medium",
    assignedDate: "2024-05-07",
    lastContacted: null,
    notes: "Awaiting callback regarding team collaboration features.",
    history: [
      { date: "2024-05-07", activity: "Lead created via Cold Call" }
    ]
  }
];

export const DASHBOARD_STATS = [
  { label: "Total Leads", value: "1,284", change: "+12.5%", trend: "up" },
  { label: "New Leads", value: "156", change: "+18.2%", trend: "up" },
  { label: "Contacted", value: "892", change: "+4.1%", trend: "up" },
  { label: "Converted", value: "236", change: "-2.4%", trend: "down" },
];

export const CONVERSION_DATA = [
  { month: "Jan", leads: 400, conversions: 240 },
  { month: "Feb", leads: 300, conversions: 139 },
  { month: "Mar", leads: 200, conversions: 980 },
  { month: "Apr", leads: 278, conversions: 390 },
  { month: "May", leads: 189, conversions: 480 },
  { month: "Jun", leads: 239, conversions: 380 },
];

export const SOURCE_DATA = [
  { name: "Website Form", value: 45 },
  { name: "LinkedIn", value: 25 },
  { name: "Referral", value: 15 },
  { name: "Cold Outreach", value: 10 },
  { name: "Direct", value: 5 },
];

export const RECENT_ACTIVITY = [
  { id: 1, user: "Alex Thompson", action: "Lead status changed to Converted", time: "2 hours ago", type: "conversion" },
  { id: 2, user: "Sarah Jenkins", action: "Scheduled a follow-up call", time: "4 hours ago", type: "schedule" },
  { id: 3, user: "David Smith", action: "Sent a new message", time: "1 day ago", type: "message" },
  { id: 4, user: "Jessica Wu", action: "Added to the system", time: "2 days ago", type: "new" },
];
