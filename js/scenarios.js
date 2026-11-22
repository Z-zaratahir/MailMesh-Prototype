/**
 * MailMesh D5 test build: scenario data. D4 seed set kept verbatim below (S3, S4); S1 and S2 added for the study.
 * Author: Aliza (HCI D4 Implementation)
 */

const D4_EMAILS = [
  {
    id: 1,
    subject: "Section change request: CS301 (Data Structures)",
    student: "Hassan Ali",
    rollNo: "22K-4102",
    batch: "Batch 22",
    received: "2 days ago",
    opened: true,
    status: "Opened, no reply",
    statusClass: "opened",
    statusIcon: "■",
    urgent: true,
    content: `Dear Academic Office,

I am writing to formally request a section transfer for CS301 (Data Structures) from Section A to Section B. Due to my verified internship schedule on Tuesdays and Thursdays, the 8:30 AM Section A timing creates an unavoidable conflict with work commitments.

Both instructors have provisionally agreed via email, provided office approval is granted. I have attached my employer letter and transcript.

Looking forward to your favorable response.

Respectfully,
Hassan Ali (22K-4102)`
  },
  {
    id: 2,
    subject: "Marked absent by mistake in CS304 Lab",
    student: "Fatima Noor",
    rollNo: "23K-1120",
    batch: "Batch 23",
    received: "Yesterday",
    opened: true,
    status: "Opened, no reply",
    statusClass: "opened",
    statusIcon: "■",
    urgent: true,
    content: `Respected Sir/Madam,

On Monday's CS304 Database Lab, I was present in Lab 3 throughout the 3-hour session and submitted my lab task on the portal at 11:42 AM. However, in the portal attendance record, I have been marked 'Absent'.

My instructor asked me to lodge this ticket with the Academic Office so the log sheet can be cross-verified.

Thank you,
Fatima Noor`
  },
  {
    id: 3,
    subject: "FYP Supervisor slot confirmation request",
    student: "Zainab Tariq",
    rollNo: "22K-0914",
    batch: "Batch 22",
    received: "3 days ago",
    opened: false,
    status: "Not opened",
    statusClass: "unopened",
    statusIcon: "○",
    urgent: true,
    content: `AOA Academic Office,

Our group of 3 students has received verbal consent from Dr. Salman for supervising our Final Year Project on 'Federated Learning for Healthcare'. We require the official verification form from the office so the FYP committee can finalize group allocations.

Please advise on the next steps.

Best regards,
Zainab Tariq & Group (Batch 22)`
  },
  {
    id: 4,
    subject: "Hostel fee installment query",
    student: "Bilal Ahmed",
    rollNo: "24K-8190",
    batch: "Batch 24",
    received: "6 hours ago",
    opened: true,
    status: "Opened, no reply",
    statusClass: "opened",
    statusIcon: "■",
    urgent: false,
    content: `Dear Sir,

Due to bank holiday delays, my family was unable to pay the hostel dues in a single challan. Can I pay the fee in two installments before the 10th of this month?

Kindly guide me if a written application is needed.

Sincerely,
Bilal Ahmed (Hostel Room 412)`
  },
  {
    id: 5,
    subject: "Course clash in timetable (CS205 & EE102)",
    student: "Ayesha Malik",
    rollNo: "24K-3341",
    batch: "Batch 24",
    received: "20 hours ago",
    opened: false,
    status: "Not opened",
    statusClass: "unopened",
    statusIcon: "○",
    urgent: false,
    content: `Dear Academic Office,

In the newly issued timetable, Discrete Math (CS205) and Basic Electronics (EE102) are both scheduled on Wednesday at 10:00 AM in Room 5 and Room 12. Since EE102 is a prerequisite retake for me, this prevents me from attending lectures.

Could you please review the clash and advise if another section is open?

Thank you,
Ayesha Malik`
  },
  {
    id: 6,
    subject: "Urgent: Official transcript request for visa",
    student: "Usman Ghani",
    rollNo: "21K-5512",
    batch: "Batch 21",
    received: "2 hours ago",
    opened: true,
    status: "Opened, no reply",
    statusClass: "opened",
    statusIcon: "■",
    urgent: false,
    content: `Dear Staff,

I have my embassy appointment scheduled for next Tuesday and need an attested official academic transcript with the university seal. I have paid the express processing fee (Challan #98214 attached).

When may I collect the sealed envelope from Window 2?

Regards,
Usman Ghani`
  },
  {
    id: 7,
    subject: "Follow-up: Retake form submission deadline",
    student: "Sara Kamran",
    rollNo: "23K-4001",
    batch: "Batch 23",
    received: "Today, 9:15 AM",
    opened: false,
    status: "Follow-up (Not opened)",
    statusClass: "unopened",
    statusIcon: "○",
    urgent: true,
    followup: true,
    content: `Respected Sir,

This is a gentle follow-up to my inquiry sent 2 days ago regarding the retake form deadline. Has the portal deadline been extended till Friday as announced in the departmental WhatsApp notice?

Looking forward to confirmation.

Sara Kamran`
  },
  {
    id: 8,
    subject: "Lab section adjustment due to transport commute",
    student: "Mustafa Riaz",
    rollNo: "23K-7819",
    batch: "Batch 23",
    received: "Today, 10:30 AM",
    opened: false,
    status: "Not opened",
    statusClass: "unopened",
    statusIcon: "○",
    urgent: false,
    content: `Dear Sir,

My assigned lab session ends at 5:15 PM, but the university point bus for Route 14 leaves campus at 4:45 PM. Can I be shifted to the morning lab slot on Friday?

Thank you,
Mustafa Riaz`
  },
  {
    id: 9,
    subject: "Midterm attendance shortfall appeal",
    student: "Khadija Khan",
    rollNo: "22K-2309",
    batch: "Batch 22",
    received: "Today, 11:00 AM",
    opened: false,
    status: "Not opened",
    statusClass: "unopened",
    statusIcon: "○",
    urgent: false,
    content: `Respected Academic Coordinator,

I was hospitalized with dengue from Oct 12 to Oct 22 and submitted medical certificates to the clinic. My current attendance in AI stands at 73% (2% below the 75% exam threshold).

I request waiver of the shortfall in light of approved medical leave.

Regards,
Khadija Khan`
  },
  {
    id: 10,
    subject: "Need-based scholarship installment status",
    student: "Hamza Shafiq",
    rollNo: "21K-6731",
    batch: "Batch 21",
    received: "Today, 11:45 AM",
    opened: false,
    status: "Not opened",
    statusClass: "unopened",
    statusIcon: "○",
    urgent: false,
    content: `Dear Financial Aid / Academic Office,

I would like to inquire if the Fall installment of the HEC Need-Based Scholarship has been credited towards my semester tuition challan.

Kindly update me so I can finalize course enrollments.

Best,
Hamza Shafiq`
  },
  {
    id: 11,
    subject: "Elective course add/drop approval",
    student: "Maryam Siddiqui",
    rollNo: "24K-9021",
    batch: "Batch 24",
    received: "Today, 1:10 PM",
    opened: false,
    status: "Not opened",
    statusClass: "unopened",
    statusIcon: "○",
    urgent: false,
    content: `Hello,

I wish to drop 'Introduction to Management' and add 'Cyber Law' before the add/drop window closes. The faculty advisor has signed my form.

Form scan attached for processing.

Thanks,
Maryam Siddiqui`
  },
  {
    id: 12,
    subject: "Exam seating query for special accommodations",
    student: "Omer Saeed",
    rollNo: "22K-1198",
    batch: "Batch 22",
    received: "Today, 2:00 PM",
    opened: false,
    status: "Not opened",
    statusClass: "unopened",
    statusIcon: "○",
    urgent: false,
    content: `Dear Academic Office,

Due to my fractured right foot, I am currently on crutches. Could you please ensure my midterm exam seating is allocated on the Ground Floor (Seminar Hall or CS Labs) instead of 3rd Floor rooms?

Medical report attached.

Omer Saeed`
  }
];

const D4_FAQ = [
  "Sir when will registration start for Spring?",
  "Is the course registration portal opening this week?",
  "What is the exact registration date for Spring semester?",
  "When can we register courses on portal?",
  "Registration open date please?",
  "Has registration started yet for Batch 22?",
  "When does registration begin?",
  "Registration dates announcement?",
  "When will course registration open for seniors?"
];

const REASON_OPTIONS = [
  { value: "Outside university policy", label: "Outside university policy", hint: "Informs student this request violates official university regulations" },
  { value: "Please write from your official email", label: "Please write from your official university email", hint: "Protects security and privacy of student data" },
  { value: "Decided on the student portal", label: "Decided directly on the student portal", hint: "Directs student to automated self-service portal" },
  { value: "Known problem, being fixed", label: "Known system problem, currently being resolved", hint: "Student will be notified once the technical fix is deployed" }
];

/* ------------------------------------------------------------------
 * D5 STUDY SCENARIOS (added for the test build; not part of D4)
 * S1 (Task 1): 50 emails, 8 opened but not answered.
 * S2 (Task 2): 30 emails in total = 18 individual emails in the list
 *              + a grouped repeated question holding 12 emails
 *              (10 that ask what the announcement answers, 2 that do not).
 * S3 (Task 3): the D4 seed set, unchanged (attendance email = id 9).
 * S4 (Task 4): the D4 seed set, unchanged (student view = Hassan Ali).
 * All names and emails are made up.
 * ------------------------------------------------------------------ */

const STUDY_TASK = (function () {
  const t = parseInt(new URLSearchParams(window.location.search).get('task') || '1', 10);
  return (t >= 1 && t <= 4) ? t : 1;
})();

/* Rows: [subject, student, rollNo, body, kind]
   kind: 'O' = opened, no reply (a correct T1 answer)
         'D' = similar-looking decoy, not opened (used in the Form's T1 question)
         ''  = ordinary, not opened */
const S1_ROWS = [
  ["Fee challan not generated on portal", "Ali Raza", "23K-1044", "My Spring fee challan is not showing on the portal. Could you please generate it so I can pay before the due date?", ""],
  ["Request for character certificate", "Sana Iqbal", "21K-3381", "I need a character certificate for a scholarship application abroad. Please let me know the process and fee.", ""],
  ["Section change request: CS301 (Data Structures)", "Areeba Khan", "22K-5120", "I would like to move from Section C to Section A of CS301 because of a timing clash with my other course.", "D"],
  ["Section change request: CS210 (Computer Organization)", "Hamza Yousaf", "23K-2207", "I request a change from Section B to Section D in CS210. Both instructors have agreed if the office approves.", "O"],
  ["Library fine waiver request", "Noor Fatima", "24K-6610", "I was charged a library fine while I was on approved medical leave. Can the fine be waived?", ""],
  ["Bonafide letter for internship", "Zain Ul Abideen", "22K-7713", "My internship company needs a bonafide student letter by Friday. Please advise how to apply.", ""],
  ["Hostel room change request", "Talha Saeed", "23K-4402", "Due to a medical condition I need a ground-floor room. Medical certificate attached.", ""],
  ["Missing attendance in CS219 lab", "Iqra Javed", "23K-3019", "I was present in the CS219 lab last Thursday but I am marked absent on the portal.", "D"],
  ["Missing attendance in EE227 lab", "Mahnoor Asif", "22K-0815", "My attendance for two EE227 lab sessions is missing even though I signed the sheet both times.", "O"],
  ["Course withdrawal after deadline", "Hira Nadeem", "22K-6630", "Because of a family emergency I could not withdraw from MT224 before the deadline. Is a late withdrawal possible?", ""],
  ["Degree verification for employer", "Saad Mehmood", "20K-1192", "My new employer has asked the university to verify my degree. Whom should they contact?", ""],
  ["ID card replacement", "Laiba Shah", "24K-2276", "I lost my student ID card. How do I apply for a replacement?", ""],
  ["Scholarship disbursement delay for Spring", "Danish Ali", "21K-8803", "My Spring scholarship amount has not been adjusted in my challan yet. Could you check?", "D"],
  ["Scholarship renewal documents for Fall", "Fahad Iqbal", "22K-4471", "I have attached my renewal documents for the Fall merit scholarship. Please confirm they are complete.", "O"],
  ["Parking sticker for semester", "Usman Akram", "21K-0937", "How can I get a parking sticker for this semester? The online form is not working.", ""],
  ["Exam date clash: SS111 and CS118", "Ayeza Tariq", "24K-1158", "My SS111 and CS118 final exams are both on Monday at 9 AM. Which one should I attend?", "D"],
  ["Thesis submission format query", "Bushra Kamal", "20K-5521", "Is there a required template for the MS thesis submission, and where can I find it?", ""],
  ["Exam date clash: MT201 and CS211", "Usama Tariq", "23K-0561", "MT201 and CS211 finals are scheduled at the same time. Please advise on a make-up slot.", "O"],
  ["Club event room booking", "Maham Rizvi", "23K-6648", "Our society needs the auditorium on the 18th for a seminar. Who approves room bookings?", ""],
  ["Change of advisor request", "Shahzaib Khan", "21K-2290", "I would like to change my academic advisor. What is the procedure?", ""],
  ["Transcript request for higher studies", "Mariam Javed", "20K-3374", "I need three sealed transcripts for my Masters applications. What is the fee and time?", "D"],
  ["Lost exam admit card", "Ahsan Raza", "24K-9014", "I lost my admit card for the midterms. Can I get a duplicate before Monday?", ""],
  ["Transcript correction: wrong grade in MT101", "Ahmed Bilal", "22K-2018", "My transcript shows a C in MT101, but the portal and my result card show a B+.", "O"],
  ["Summer semester course offering", "Kinza Malik", "22K-1167", "Will CS302 be offered in the summer semester this year?", ""],
  ["Name spelling correction on records", "Muhammad Owais", "23K-5530", "My name is spelled 'Owes' instead of 'Owais' on the portal. CNIC copy attached.", ""],
  ["Request to retake quiz due to illness", "Anum Shahid", "24K-0442", "I missed Quiz 3 of CS118 because of fever. Can I retake it? Medical note attached.", ""],
  ["Refund of hostel security deposit", "Bilal Hussain", "20K-7709", "I left the hostel last semester and have not received my security deposit refund.", "D"],
  ["Internship credit transfer", "Rabia Aslam", "21K-4425", "Can my summer internship be counted as credit for the industrial training course?", ""],
  ["Refund of extra fee paid in October", "Faizan Ahmed", "22K-3306", "I accidentally paid my October challan twice. Please refund the extra amount.", "O"],
  ["Make-up exam schedule", "Sadia Noor", "23K-7781", "When will the make-up exams for the midterms be held?", ""],
  ["Course prerequisite waiver", "Junaid Iqbal", "22K-8840", "I want to take AI this semester. Can the prerequisite of CS301 be waived as I am taking it in parallel?", ""],
  ["Wi-Fi access not working in hostel", "Nimra Sohail", "24K-5527", "My hostel Wi-Fi login stopped working after the password reset. Whom should I contact?", ""],
  ["Late add of elective: Cyber Law", "Hamna Arif", "21K-6612", "I would like to add Cyber Law after the add/drop window. My advisor has signed the form.", "O"],
  ["Recommendation letter request", "Waleed Anwar", "20K-2283", "I need a recommendation letter from the department for a research program. How do I request one?", ""],
  ["Freeze semester request", "Aqsa Mehmood", "23K-1199", "I need to freeze my semester for personal reasons. What documents are required?", ""],
  ["Grade appeal for CS211 final", "Zohaib Hassan", "22K-9921", "I would like to appeal my CS211 final grade. Is there a deadline for appeals?", ""],
  ["Convocation registration query", "Sidra Batool", "20K-8834", "When does convocation registration open, and is there a fee for guests?", ""],
  ["Medical leave approval for midterms", "Arslan Ghani", "23K-3347", "I was admitted to hospital during midterm week. Please approve my medical leave. Reports attached.", "O"],
  ["Credit hours limit exceed request", "Mehwish Ali", "21K-1124", "Can I register for 21 credit hours this semester? My CGPA is above 3.5.", ""],
  ["Transport route change request", "Hassan Raza", "24K-6681", "I moved house and need to change my point bus route from Route 7 to Route 12.", ""],
  ["Lab report submission portal down", "Fiza Kanwal", "23K-2256", "The lab report submission link on the portal gives an error. Can the deadline be extended?", ""],
  ["Degree completion certificate", "Shoaib Akhtar", "20K-4419", "I have completed all my courses. When can I get the degree completion certificate?", ""],
  ["Elective seat not confirmed", "Amna Yousuf", "22K-7756", "I registered for HCI but my seat still shows as pending. Is it confirmed?", ""],
  ["Request for duplicate fee receipt", "Kashif Mehmood", "21K-5592", "I need a duplicate receipt for my Fall fee for tax purposes.", ""],
  ["Attendance shortfall in SS102", "Tayyaba Rafiq", "24K-3363", "My attendance in SS102 is 72%. I had a sports trip approved by the department. Can it be counted?", ""],
  ["Final year project group change", "Rehan Siddiqui", "20K-6627", "Can I move to a different FYP group? Both supervisors have agreed.", ""],
  ["Request for semester result card", "Hafsa Imran", "23K-8810", "I need a printed result card for last semester for a scholarship application.", ""],
  ["Online class recording access", "Moiz Ahmed", "22K-1053", "I cannot access the recordings of last week's online classes. Can access be restored?", ""],
  ["Course registration hold removal", "Esha Farooq", "24K-7718", "There is a hold on my registration because of a library book. I returned it last week.", ""],
  ["Exam seating plan not visible", "Taimoor Khan", "21K-3349", "The exam seating plan is not visible on my portal. Which room should I go to?", ""]
];

const S1_RECEIVED = (function () {
  // Oldest first, matching the D4 hub text ("Oldest first").
  const out = [];
  const labels = ["6 days ago", "5 days ago", "4 days ago", "3 days ago", "2 days ago", "Yesterday"];
  for (let i = 0; i < 50; i++) {
    if (i < 36) out.push(labels[Math.floor(i / 6)]);
    else {
      const mins = 9 * 60 + (i - 36) * 25;              // Today, 9:00 AM onwards
      const h = Math.floor(mins / 60), m = mins % 60;
      const h12 = ((h + 11) % 12) + 1, ap = h < 12 ? 'AM' : 'PM';
      out.push(`Today, ${h12}:${String(m).padStart(2, '0')} ${ap}`);
    }
  }
  return out;
})();

function studyEmail(id, row, received, urgent) {
  const [subject, student, rollNo, body, kind] = row;
  const opened = kind === 'O';
  return {
    id, subject, student, rollNo,
    batch: "Batch " + rollNo.slice(0, 2),
    received,
    opened,
    status: opened ? "Opened, no reply" : "Not opened",
    statusClass: opened ? "opened" : "unopened",
    statusIcon: opened ? "■" : "○",
    urgent: !!urgent,
    content: `Dear Academic Office,\n\n${body}\n\nRegards,\n${student} (${rollNo})`
  };
}

const S1_EMAILS = S1_ROWS.map((row, i) => studyEmail(101 + i, row, S1_RECEIVED[i], i < 12 && i % 4 === 1));

/* Answer key for Task 1 (used by the analysis script and the Form's T1 question). */
const S1_KEY = {
  correct: S1_ROWS.map((r, i) => r[4] === 'O' ? 101 + i : null).filter(Boolean),
  decoys: S1_ROWS.map((r, i) => r[4] === 'D' ? 101 + i : null).filter(Boolean)
};

/* S2: 18 individual emails (ordinary S1 rows) + 12 grouped questions. */
const S2_INDIVIDUAL = S1_ROWS.filter(r => r[4] === '').slice(0, 18)
  .map((row, i) => studyEmail(301 + i, row, S1_RECEIVED[i * 2], i % 5 === 2));

const S2_GROUP = [
  // [id, text, asks what the announcement answers?]
  [201, "Sir when will registration start for Spring?", true],
  [202, "Is the course registration portal opening this week?", true],
  [203, "What is the exact registration date for Spring semester?", true],
  [211, "Can I register for more than 18 credit hours in Spring?", false],
  [204, "When can we register courses on portal?", true],
  [205, "Registration open date please?", true],
  [206, "Has registration started yet for Batch 22?", true],
  [207, "When does registration begin?", true],
  [212, "The registration portal shows my fee as unpaid, what should I do?", false],
  [208, "Registration dates announcement?", true],
  [209, "When will course registration open for seniors?", true],
  [210, "Which day does Spring course registration open?", true]
];

const STUDY_ANNOUNCEMENT = "Posted Nov 2 by Registrar Office: “Course registration for Spring semester begins on Dec 1st on the Student Portal.”";

/* ---- Selected scenario, read by the unchanged D4 app.js ---- */
const SEED_EMAILS =
  STUDY_TASK === 1 ? S1_EMAILS :
  STUDY_TASK === 2 ? S2_INDIVIDUAL :
  D4_EMAILS;

const SEED_FAQ_MATCHES =
  STUDY_TASK === 2 ? S2_GROUP.map(g => g[1]) : D4_FAQ;
