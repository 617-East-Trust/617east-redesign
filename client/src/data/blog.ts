/*
 * 617 EAST TRUST — BLOG POST DATA
 * Full content for all 4 targeted blog posts.
 * Each post includes: SEO metadata, full body sections, FAQ schema.
 */

export interface BlogSection {
  heading: string;
  body: string; // HTML-safe string, paragraphs separated by \n\n
}

export interface BlogFaq {
  q: string;
  a: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  canonical: string;
  h1: string;
  category: string;
  readTime: string;
  publishDate: string;
  intro: string;
  sections: BlogSection[];
  faqs: BlogFaq[];
  ctaHeading: string;
  ctaBody: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-form-an-llc-in-north-carolina",
    title: "How to Form an LLC in North Carolina (2026 Step-by-Step Guide)",
    seoTitle: "How to Form an LLC in North Carolina (2026) | 617 East Trust",
    metaDescription: "Step-by-step guide to forming an LLC in North Carolina in 2026. State fees, filing requirements, operating agreement, EIN, BOI report, and what to do after formation.",
    canonical: "https://617east.com/blog/how-to-form-an-llc-in-north-carolina",
    h1: "How to Form an LLC in North Carolina (2026 Step-by-Step Guide)",
    category: "Business Formation",
    readTime: "12 min read",
    publishDate: "July 2026",
    intro: "Forming an LLC in North Carolina costs $125 in state fees and takes 5–10 business days through standard processing. But the filing is the easy part. What most guides don't tell you is what happens before you file — choosing the right structure for your situation — and what happens after, when most new LLCs quietly lose their liability protection because no one told them what to do next. This guide covers all of it.",
    sections: [
      {
        heading: "Step 1: Decide If an LLC Is the Right Structure",
        body: "Before you file anything, you need to answer one question: is an LLC actually the right structure for your business? For most small businesses in North Carolina, the answer is yes — but not always. A sole proprietorship has zero formation cost and less administrative overhead. An S-Corp election can reduce self-employment taxes for businesses generating over $50,000 in net profit. A C-Corp is rarely the right choice for a small business but may be appropriate if you're raising venture capital.\n\nAn LLC makes sense when you need liability protection, want flexibility in how you're taxed, have a business partner, or are building something you plan to sell or scale. If you're a solo freelancer generating under $30,000 per year, the cost and administrative burden of an LLC may not be justified. This is the conversation most online filing services skip — because they get paid when you file, not when you make the right decision."
      },
      {
        heading: "Step 2: Choose a Name for Your LLC",
        body: "Your LLC name must include \"Limited Liability Company,\" \"LLC,\" or \"L.L.C.\" It cannot be the same as — or deceptively similar to — any existing business name registered with the NC Secretary of State. You can search existing business names at the NC Secretary of State's business search portal.\n\nA few practical rules: avoid names that imply a government affiliation (words like \"federal,\" \"state,\" or \"national\" require additional approval). Avoid names that are too generic to trademark later. And check whether the corresponding domain name is available before you commit — you'll want your business name and web address to match.\n\nIf you want to reserve a name before you're ready to file, you can file a Name Reservation with the NC Secretary of State for $30, which holds the name for 120 days."
      },
      {
        heading: "Step 3: Choose a Registered Agent",
        body: "Every LLC in North Carolina must designate a registered agent — a person or entity with a physical North Carolina address who is available during normal business hours to receive legal documents and official state correspondence on behalf of your LLC.\n\nYou can serve as your own registered agent if you have a physical NC address (not a P.O. box) and are reliably available during business hours. The risk: your registered agent's address becomes part of the public record, and you'll receive service of process — lawsuits — at that address. Many business owners prefer to use a registered agent service for privacy and reliability. 617 East Trust provides registered agent service as part of our LLC formation package."
      },
      {
        heading: "Step 4: File Articles of Organization",
        body: "The Articles of Organization is the document that officially creates your LLC in North Carolina. You file it with the NC Secretary of State, either online or by mail. The filing fee is $125.\n\nThe form requires: your LLC name, the principal office address, the registered agent's name and address, and the organizer's name and signature. That's it — the Articles of Organization is a short document. Standard processing takes 5–10 business days. Expedited processing (add $200) takes 1–3 business days.\n\nOne important note: the Articles of Organization does not include your operating agreement, ownership percentages, or management structure. Those belong in a separate document — your operating agreement."
      },
      {
        heading: "Step 5: Create an Operating Agreement",
        body: "North Carolina does not legally require an LLC to have an operating agreement. You should have one anyway.\n\nWithout an operating agreement, your LLC is governed by North Carolina's default LLC statutes — which may not reflect your intentions at all. The default rules assume equal ownership among all members, require unanimous consent for major decisions, and provide no guidance on what happens if a member wants to leave, dies, or becomes incapacitated. If you have a business partner and no operating agreement, you are one disagreement away from a very expensive legal dispute.\n\nA well-drafted operating agreement covers: ownership percentages and capital contributions, how profits and losses are distributed, how decisions are made and what requires unanimous consent, what happens when a member wants to sell their interest, and what happens to the LLC if a member dies or becomes disabled. This document is between you and your members — it does not need to be filed with the state."
      },
      {
        heading: "Step 6: Get Your EIN",
        body: "An Employer Identification Number (EIN) is your LLC's federal tax identification number — the business equivalent of a Social Security Number. You need it to open a business bank account, hire employees, file federal taxes, and apply for most business credit.\n\nYou apply for an EIN through the IRS website at no cost. The process takes about 10 minutes and you receive your EIN immediately upon completion. If your LLC has more than one member, you are required to have an EIN. Single-member LLCs can use the owner's Social Security Number for some purposes, but getting an EIN is still strongly recommended for liability and privacy reasons."
      },
      {
        heading: "Step 7: File Your BOI Report",
        body: "The Corporate Transparency Act, which took effect in 2024, requires most LLCs to file a Beneficial Ownership Information (BOI) report with the Financial Crimes Enforcement Network (FinCEN). This report discloses the identities of the people who own or control the LLC.\n\nLLCs formed in 2024 or later must file within 90 days of formation. LLCs formed before 2024 had a deadline of January 1, 2025. The penalty for non-compliance can reach $500 per day. Most small business owners are unaware of this requirement — which is exactly why it's included in every formation we handle."
      },
      {
        heading: "Step 8: Open a Business Bank Account",
        body: "This step is not optional if you want your liability protection to hold up. The entire point of an LLC is to separate your personal assets from your business liabilities. If you commingle personal and business funds — running business income through your personal account, paying personal expenses from the business account — a court can \"pierce the corporate veil\" and hold you personally liable for business debts.\n\nTo open a business bank account, you will need your EIN, your Articles of Organization (or a certified copy), and your operating agreement. Some banks also require a business license or a resolution authorizing the account opening."
      },
      {
        heading: "Step 9: File Your Annual Report",
        body: "North Carolina LLCs are required to file an Annual Report with the Secretary of State each year. The filing fee is $200 for LLCs. The report is due by April 15 of each year following the year of formation.\n\nThe Annual Report is not a financial report — it simply confirms your registered agent, principal office address, and member/manager information is current. Failure to file results in administrative dissolution of your LLC, which means the state considers your LLC to no longer exist. We send annual report reminders to all clients we've formed."
      }
    ],
    faqs: [
      { q: "How much does it cost to form an LLC in North Carolina in 2026?", a: "The NC Secretary of State charges $125 to file Articles of Organization. Expedited processing costs an additional $200. If you use a formation service like 617 East Trust, our fee is $499 total, which includes the state fee, registered agent service for the first year, operating agreement, EIN, and BOI report." },
      { q: "How long does it take to form an LLC in North Carolina?", a: "Standard processing takes 5–10 business days from the date the Secretary of State receives your Articles of Organization. Expedited processing (add $200) takes 1–3 business days." },
      { q: "Do I need an operating agreement for my North Carolina LLC?", a: "North Carolina does not legally require an operating agreement, but you should have one. Without it, your LLC is governed by default state statutes that may not reflect your intentions — especially if you have a business partner." },
      { q: "What is a BOI report and do I need to file one?", a: "The Beneficial Ownership Information (BOI) report is required by the Corporate Transparency Act. Most LLCs must file it with FinCEN. LLCs formed in 2024 or later must file within 90 days of formation. The penalty for non-compliance can reach $500 per day." },
      { q: "Can I be my own registered agent in North Carolina?", a: "Yes, if you have a physical North Carolina address (not a P.O. box) and are reliably available during normal business hours. Your registered agent's address becomes part of the public record, so many business owners prefer to use a registered agent service for privacy." },
      { q: "What happens if I don't file my North Carolina LLC annual report?", a: "The Secretary of State will administratively dissolve your LLC — meaning the state considers your LLC to no longer legally exist. You can apply for reinstatement, but it involves additional fees and paperwork. The annual report is due by April 15 each year and costs $200." }
    ],
    ctaHeading: "Ready to form your North Carolina LLC?",
    ctaBody: "We handle the filing, operating agreement, EIN, BOI report, and registered agent service — and we'll tell you upfront if an LLC is actually the right structure for your situation."
  },
  {
    slug: "sba-7a-vs-504-loans-north-carolina",
    title: "SBA 7(a) vs 504 Loans in North Carolina: Which Fits Your Business?",
    seoTitle: "SBA 7(a) vs 504 Loans NC: Which Is Right for Your Business? | 617 East Trust",
    metaDescription: "SBA 7(a) vs 504 loans explained for North Carolina small businesses. Eligibility, use cases, rates, and how to know which program fits your situation.",
    canonical: "https://617east.com/blog/sba-7a-vs-504-loans-north-carolina",
    h1: "SBA 7(a) vs 504 Loans in North Carolina: Which Fits Your Business?",
    category: "SBA Loans",
    readTime: "10 min read",
    publishDate: "July 2026",
    intro: "The SBA does not lend money directly. It guarantees a portion of loans made by approved lenders — banks, credit unions, and non-bank lenders — which reduces the lender's risk and makes financing more accessible for small businesses that might not qualify for conventional loans. The two most common SBA loan programs are the 7(a) and the 504. They serve different purposes, have different structures, and are appropriate for different situations. Most business owners apply for the wrong one.",
    sections: [
      {
        heading: "What Is an SBA 7(a) Loan?",
        body: "The SBA 7(a) is the most flexible and widely used SBA loan program. It can be used for almost any legitimate business purpose: working capital, equipment purchases, inventory, real estate acquisition, business acquisition, refinancing existing debt, and more. The maximum loan amount is $5 million.\n\nThe SBA guarantees up to 85% of loans up to $150,000 and up to 75% of loans above $150,000. This guarantee is what makes lenders willing to extend credit to businesses that wouldn't qualify for conventional financing. Interest rates are negotiated between the borrower and lender, subject to SBA maximums — typically Prime plus 2.25% to 4.75% depending on loan size and term.\n\nRepayment terms depend on the use of proceeds: up to 10 years for working capital and equipment, up to 25 years for real estate. The SBA 7(a) is the right program when you need flexibility — when your financing needs don't fit neatly into a single category, or when you're acquiring a business."
      },
      {
        heading: "What Is an SBA 504 Loan?",
        body: "The SBA 504 loan is specifically designed for major fixed asset purchases — commercial real estate and large equipment. It is not appropriate for working capital, inventory, or business acquisition. If you're buying a building, expanding a facility, or purchasing heavy manufacturing equipment, the 504 is often the better choice.\n\nThe 504 loan has a unique three-party structure: a conventional lender (typically a bank) provides 50% of the project cost, a Certified Development Company (CDC) — a nonprofit intermediary certified by the SBA — provides 40% backed by a 100% SBA-guaranteed debenture, and the borrower contributes 10% as a down payment (sometimes 15–20% for special-purpose properties or startups). The maximum SBA debenture is $5.5 million for most projects.\n\nThe 504 typically offers lower interest rates than the 7(a) for real estate because the CDC portion is funded through bond markets at fixed rates. If you're buying commercial property in North Carolina and plan to occupy at least 51% of it, the 504 is almost always worth evaluating."
      },
      {
        heading: "Key Differences: 7(a) vs 504",
        body: "The most important distinction is use of proceeds. The 7(a) is flexible — it can fund almost anything. The 504 is restricted to fixed assets (real estate and major equipment). If you need working capital, you cannot use a 504 loan.\n\nThe second key difference is structure. A 7(a) loan is a single loan from a single lender. A 504 loan involves two loans from two lenders (the bank and the CDC) plus your down payment. This makes the 504 more complex to close but often results in better terms for real estate.\n\nDown payment requirements also differ. The 7(a) typically requires 10–20% down depending on the project and lender. The 504 requires a minimum 10% from the borrower, with the bank and CDC covering the rest — which means you can acquire commercial real estate with less cash out of pocket than a conventional loan would require.\n\nFinally, interest rates: 7(a) rates are variable (tied to Prime), while the CDC portion of a 504 loan is fixed for the life of the loan. For long-term real estate financing, the fixed rate of the 504 can be a significant advantage."
      },
      {
        heading: "SBA Loan Eligibility Requirements",
        body: "Both programs share the same basic SBA eligibility requirements. Your business must be for-profit, operate in the United States, meet the SBA's size standards for your industry (generally under 500 employees for manufacturing and under $7.5 million in average annual receipts for most service businesses), and have exhausted or be unable to obtain financing on reasonable terms from non-government sources.\n\nBeyond SBA eligibility, individual lenders apply their own credit criteria. Most SBA lenders want to see a personal credit score of at least 650–680, two or more years in business (though startup loans are available under some programs), sufficient cash flow to service the debt, and collateral when available. The SBA does not require full collateral coverage, but lenders are required to take available collateral.\n\nOne factor many applicants overlook: your personal financial history matters as much as your business's. SBA loans require a personal guarantee from all owners with 20% or more ownership. Your personal tax returns, personal financial statement, and personal credit history will all be reviewed."
      },
      {
        heading: "The Honest Assessment: Are You Ready to Apply?",
        body: "The SBA loan process is not fast, and it is not forgiving of incomplete applications. A typical 7(a) loan takes 60–90 days from application to funding. A 504 loan can take 90–120 days. During that time, you will be asked for two to three years of business and personal tax returns, year-to-date financial statements, a business plan with financial projections, a list of business debt, and a personal financial statement.\n\nThe most common reason SBA loan applications fail is not credit — it's preparation. Applicants submit incomplete documentation, projections that don't reconcile with historical performance, or applications for loan amounts that the business's cash flow cannot support.\n\nBefore you apply, you need to know: what your debt service coverage ratio looks like (most lenders want 1.25x or better), whether your personal credit is in the range lenders require, whether your tax returns reflect the income you're claiming, and whether the loan amount you're requesting is supportable by your financials. This is the assessment we do before we recommend that any client apply for anything."
      },
      {
        heading: "SBA Express and Other 7(a) Variants",
        body: "Within the 7(a) program, there are several specialized loan types worth knowing about. The SBA Express loan offers a faster turnaround — the SBA commits to responding to applications within 36 hours — but the maximum loan amount is $500,000 and the SBA guarantee is only 50% (versus 75–85% for standard 7(a)). Express loans are appropriate for smaller, time-sensitive financing needs.\n\nThe SBA Community Advantage program targets underserved markets and is offered by mission-based lenders, including some CDFIs (Community Development Financial Institutions). If your business is in a rural area, a low-income community, or you are a veteran, woman, or minority business owner, Community Advantage lenders may be more accessible than traditional banks.\n\nThe SBA Microloan program provides loans up to $50,000 through nonprofit intermediaries. It is designed for very small businesses and startups that need smaller amounts of capital and may not qualify for traditional SBA programs."
      }
    ],
    faqs: [
      { q: "What is the difference between an SBA 7(a) and 504 loan?", a: "The SBA 7(a) is flexible and can be used for almost any business purpose including working capital, equipment, and real estate. The SBA 504 is restricted to major fixed assets — commercial real estate and large equipment — but typically offers better terms for those purposes, including a fixed interest rate on the CDC portion." },
      { q: "What credit score do I need for an SBA loan in North Carolina?", a: "Most SBA lenders in North Carolina want to see a personal credit score of at least 650–680. However, credit score is one factor among many. Business revenue, time in business, cash flow, collateral, and industry all affect the decision. A strong business with a 640 score may be approved while a weak business with a 720 score may not." },
      { q: "How long does an SBA loan take to close in North Carolina?", a: "A standard SBA 7(a) loan typically takes 60–90 days from application to funding. SBA Express loans can close in 30–45 days. SBA 504 loans typically take 90–120 days due to the additional complexity of the CDC structure." },
      { q: "Can a startup get an SBA loan in North Carolina?", a: "Yes, but it is more difficult. Most SBA lenders prefer two or more years of business history. Startups can qualify, but typically need stronger personal credit, more collateral, a well-documented business plan, and sometimes a larger down payment. The SBA Microloan program is often more accessible for early-stage businesses." },
      { q: "Do I need a business plan for an SBA loan?", a: "For most SBA loans, yes. Lenders want to see a business plan with financial projections that demonstrate your ability to repay the loan. The projections need to be realistic and reconcile with your historical financial performance. A business plan that projects 300% revenue growth with no supporting rationale will hurt your application." }
    ],
    ctaHeading: "Not sure if you qualify for an SBA loan?",
    ctaBody: "Start with an honest assessment. We review your financials, credit, and business profile before recommending you apply for anything — because an unsuccessful application can damage your relationship with lenders."
  },
  {
    slug: "credit-repair-timeline-north-carolina",
    title: "Credit Repair Timeline in NC: What to Expect Month by Month",
    seoTitle: "Credit Repair Timeline North Carolina: Month-by-Month Guide | 617 East Trust",
    metaDescription: "What actually happens during credit repair in North Carolina, month by month. Realistic timelines, what changes and what doesn't, and what you need to do on your end.",
    canonical: "https://617east.com/blog/credit-repair-timeline-north-carolina",
    h1: "Credit Repair Timeline in North Carolina: What to Expect Month by Month",
    category: "Credit Repair",
    readTime: "8 min read",
    publishDate: "July 2026",
    intro: "The credit repair industry has a credibility problem — because too many companies promise specific score increases in specific timeframes that they cannot legally or realistically deliver. This guide does the opposite. It tells you exactly what happens during credit repair, what the realistic timeline looks like, what you can expect to change and what you cannot, and what you need to do on your end to get the best possible outcome.",
    sections: [
      {
        heading: "What Credit Repair Actually Is (and Isn't)",
        body: "Credit repair is the process of identifying and disputing inaccurate, incomplete, or unverifiable information on your credit report under the Fair Credit Reporting Act (FCRA). That's it. It is not a process for removing accurate negative information — accurate, verifiable negative items cannot be legally removed from your credit report, regardless of what any company tells you.\n\nThe FCRA gives you the right to dispute any item on your credit report that you believe is inaccurate or incomplete. When you file a dispute, the credit bureau is required to investigate within 30 days and either verify the item, correct it, or delete it. If the furnisher (the creditor or collection agency) cannot verify the item within the investigation window, the bureau must delete it.\n\nThis is the legal mechanism that makes credit repair work. It is not a loophole. It is your right under federal law."
      },
      {
        heading: "Month 1: Full Review and First Disputes",
        body: "The first month begins with a comprehensive review of all three credit reports — Equifax, Experian, and TransUnion. Each bureau maintains its own database, and the same account may appear differently across all three. An item that is accurate on one bureau may be inaccurate on another.\n\nDuring the review, we identify every item that is potentially disputable: accounts with incorrect balances, incorrect payment history, duplicate accounts, accounts that don't belong to you, outdated negative items (most negative items must be removed after 7 years), and collection accounts with procedural violations.\n\nFirst-round dispute letters are drafted and submitted to the relevant bureaus. The bureaus have 30 days to investigate and respond. You will not see score changes in Month 1 — you are waiting for the investigation window to close."
      },
      {
        heading: "Month 2: First Results and Second Round",
        body: "By the end of Month 2, you should have responses from the bureaus on your first-round disputes. Results fall into three categories: verified (the furnisher confirmed the item is accurate), updated (the item was corrected but not deleted), or deleted (the item was removed from your report).\n\nDeleted items typically produce the most immediate score impact, particularly if they were collection accounts or late payment entries. Updated items — where a balance was corrected or a payment status was changed — also produce score movement, though usually less dramatic.\n\nFor items that were verified, we evaluate whether to escalate. Escalation options include: requesting the method of verification from the bureau, sending a debt validation letter directly to the furnisher, filing a complaint with the Consumer Financial Protection Bureau (CFPB), or — in cases of clear FCRA violations — referring to a consumer protection attorney.\n\nSecond-round disputes are filed for any items that warrant further challenge."
      },
      {
        heading: "Month 3: Score Movement and Strategy Adjustment",
        body: "Month 3 is typically when clients see the first meaningful score movement. The amount of movement depends on what was deleted or updated in Months 1 and 2, and on the scoring model being used. FICO 8 — the most widely used model — weights recent negative information heavily, so removing a recent collection account will have more impact than removing a 6-year-old late payment.\n\nAt this point, we also begin focusing on the positive side of your credit profile. Disputes address the negative — but your score is also determined by your credit utilization (how much of your available revolving credit you're using), your payment history going forward, and the age of your accounts. If your utilization is high, reducing it can produce faster score movement than additional disputes. If you have no open positive accounts, we discuss options for building positive history."
      },
      {
        heading: "Months 4–6: Continued Disputes and Credit Building",
        body: "Most clients see the majority of their disputable negative items resolved within 4–6 months. The remaining disputes in this period tend to be the more complex cases: accounts with multiple furnishers, items that have been verified but contain procedural errors, and items that require escalation beyond the standard dispute process.\n\nCredit building becomes increasingly important in this phase. A credit score is not just the absence of negative items — it is the presence of positive ones. Clients who open a secured credit card, become an authorized user on a family member's account, or take out a credit-builder loan during this period typically see faster and more sustained score improvement than clients who focus exclusively on dispute removal.\n\nBy Month 6, most clients with a moderate number of disputable items have seen meaningful improvement. 'Meaningful' is intentionally vague — because the outcome depends entirely on what was on your report to begin with, how the furnishers respond to disputes, and what positive steps you've taken."
      },
      {
        heading: "What You Need to Do on Your End",
        body: "Credit repair is not a passive process. The disputes we file are only one input into your credit score. Your behavior during the repair period matters equally.\n\nThe most important things you can do: pay every current account on time, every month, without exception. Payment history is 35% of your FICO score — one missed payment during a credit repair engagement can offset months of dispute work. Keep your credit card balances below 30% of your credit limit (below 10% is better). Do not open multiple new accounts in a short period — each application generates a hard inquiry, and multiple inquiries signal credit-seeking behavior to scoring models. Do not close old accounts — account age matters, and closing an old account reduces your average account age and your total available credit.\n\nWe tell every client the same thing at the start of an engagement: we can fix what's behind you. You have to manage what's in front of you."
      }
    ],
    faqs: [
      { q: "How long does credit repair take in North Carolina?", a: "Most clients see meaningful improvement within 3–6 months. The timeline depends on the number and type of negative items, how quickly the bureaus and furnishers respond to disputes, and what positive steps you take during the process. Complex cases with many disputed items or escalation requirements may take longer." },
      { q: "Can credit repair remove accurate negative items from my credit report?", a: "No. Accurate, verifiable negative information cannot be legally removed from your credit report. Credit repair disputes inaccurate, incomplete, or unverifiable items under the Fair Credit Reporting Act. Anyone who promises to remove accurate negative items is misleading you." },
      { q: "How much will my credit score increase with credit repair?", a: "No one can legally promise a specific score increase. The improvement depends on what negative items are removed, what scoring model is used, and what positive activity you add to your profile. We tell clients what is disputable and what the realistic range of outcomes looks like — not a guaranteed number." },
      { q: "What is the Fair Credit Reporting Act (FCRA)?", a: "The FCRA is the federal law that governs credit reporting. It gives you the right to dispute inaccurate information on your credit report, requires credit bureaus to investigate disputes within 30 days, and mandates that unverifiable items be removed. It also limits how long most negative items can remain on your report (generally 7 years, 10 years for bankruptcy)." },
      { q: "Do I need a credit repair company, or can I dispute items myself?", a: "You can dispute items yourself for free — the process is the same. A credit repair company provides value through experience (knowing which disputes are worth filing and how to escalate), volume (managing multiple disputes across three bureaus simultaneously), and follow-through (monitoring responses and filing second-round disputes). Whether that value is worth the cost depends on your situation." }
    ],
    ctaHeading: "Ready to start the credit repair process?",
    ctaBody: "We begin with a full review of all three credit reports and tell you exactly what is disputable, what the realistic outcome looks like, and what you need to do on your end. No guarantees — just honest, legal, effective work."
  },
  {
    slug: "fractional-cfo-vs-bookkeeper-north-carolina",
    title: "Fractional CFO vs Bookkeeper: When to Hire Which (NC Small Business Guide)",
    seoTitle: "Fractional CFO vs Bookkeeper NC: When to Hire Which | 617 East Trust",
    metaDescription: "The difference between a bookkeeper, accountant, and fractional CFO for North Carolina small businesses. How to know when you've outgrown your current financial support.",
    canonical: "https://617east.com/blog/fractional-cfo-vs-bookkeeper-north-carolina",
    h1: "Fractional CFO vs Bookkeeper: When to Hire Which (NC Small Business Guide)",
    category: "Financial Advisory",
    readTime: "9 min read",
    publishDate: "July 2026",
    intro: "Most small business owners understand that they need a bookkeeper. Fewer understand what a bookkeeper actually does — and almost none understand where a bookkeeper's role ends and a CFO's begins. This matters because the financial support your business needs changes as it grows, and staying with the wrong level of support at the wrong stage of your business is one of the most common and most expensive mistakes we see.",
    sections: [
      {
        heading: "The Financial Support Stack: Bookkeeper, Accountant, CFO",
        body: "These three roles are often confused, but they serve distinct functions at different levels of financial complexity.\n\nA bookkeeper records and categorizes financial transactions. They reconcile your bank accounts, track accounts payable and receivable, and produce the monthly financial statements — the Profit & Loss and Balance Sheet — that tell you where your money went. A bookkeeper works in the past: they are recording what already happened. Good bookkeeping is the foundation of everything else. Without clean books, you cannot make informed decisions, get an SBA loan, or work effectively with any other financial professional.\n\nAn accountant (or CPA) works primarily at tax time. They use your bookkeeper's work to prepare your business and personal tax returns, advise on tax strategy, and produce financial statements for lenders or investors. Some accountants also provide ongoing advisory services, but most small business CPAs are primarily focused on compliance — making sure you file correctly and on time.\n\nA CFO provides strategic financial leadership. They interpret the numbers, forecast future performance, manage cash flow, advise on major financial decisions, and build the financial infrastructure the business needs to grow. A full-time CFO commands a salary of $150,000–$250,000 per year. A Fractional CFO provides the same strategic function on a part-time basis, at a fraction of the cost."
      },
      {
        heading: "What a Bookkeeper Does (and Doesn't Do)",
        body: "A bookkeeper's job is to keep your financial records accurate and current. In practice, this means: categorizing every transaction in your accounting software (typically QuickBooks Online), reconciling your bank and credit card accounts monthly, tracking what you owe (accounts payable) and what you're owed (accounts receivable), and producing your monthly Profit & Loss statement and Balance Sheet.\n\nWhat a bookkeeper does not do: they do not prepare your tax returns (that's your CPA), they do not advise you on whether to take on debt or make a major purchase (that's a CFO function), and they do not tell you whether your business is financially healthy — they record the numbers, but interpreting them strategically is a different skill.\n\nA good bookkeeper is invaluable. Messy books are one of the most common reasons SBA loan applications fail — lenders cannot evaluate a business whose financials don't reconcile. They are also the reason many business owners don't know they're losing money until it's too late."
      },
      {
        heading: "What a Fractional CFO Does",
        body: "A Fractional CFO is a senior financial executive who works with your business on a part-time or project basis. The engagement is typically structured as a monthly retainer for a defined number of hours per month, with a scope that is agreed upon at the start of the engagement.\n\nThe work a Fractional CFO does includes: reviewing your monthly financial statements and identifying trends, risks, and opportunities; building cash flow forecasts so you know what your cash position will look like 90, 180, and 365 days out; developing annual budgets and tracking variance against actual performance; advising on major financial decisions — whether to take on debt, hire a key employee, expand into a new market, or make a capital investment; supporting SBA loan applications and investor due diligence; and building the KPI dashboards and reporting infrastructure that let you manage the business by the numbers rather than by feel.\n\nThe Fractional CFO does not replace your bookkeeper or your CPA — they work alongside them, using the bookkeeper's records and the CPA's tax work as inputs into their strategic analysis."
      },
      {
        heading: "When You Need a Bookkeeper",
        body: "You need a bookkeeper from the moment your business starts generating revenue. If you are running a business without a bookkeeper, you are either doing the bookkeeping yourself (which costs you time that should be spent on your business) or you are not doing it at all (which means you are flying blind).\n\nThe threshold for outsourcing bookkeeping is lower than most business owners think. If your business generates more than $3,000–$5,000 per month in revenue, the cost of professional bookkeeping ($150–$300 per month for most small businesses) is almost certainly justified by the time it saves you and the decisions it enables.\n\nSigns you need a bookkeeper now: your books are more than two months behind, you don't know your current profit margin, you've been declined for a business loan because your financials were incomplete, or you're spending more than two hours per month on your own bookkeeping."
      },
      {
        heading: "When You Need a Fractional CFO",
        body: "Most businesses don't need a Fractional CFO until they reach a certain level of financial complexity. The typical threshold is somewhere between $500,000 and $1,000,000 in annual revenue — though the right trigger is less about revenue and more about the decisions you're facing.\n\nYou need a Fractional CFO when: you're preparing to apply for a significant SBA loan or line of credit and need your financials to tell a compelling story; your cash flow is unpredictable and you don't know why; you're considering a major investment — a new location, a piece of equipment, a key hire — and you don't have a financial model to evaluate it; you're growing faster than your financial infrastructure can support; or you're preparing to sell the business and need clean, well-documented financials for due diligence.\n\nThe question to ask yourself: are the financial decisions I'm making based on data, or based on gut feel? If the answer is gut feel — and your business is generating meaningful revenue — you probably need a Fractional CFO."
      },
      {
        heading: "The Cost Comparison",
        body: "A full-time CFO with the experience to add real value to a growing small business costs $150,000–$250,000 per year in salary, plus benefits, payroll taxes, and the management overhead of a full-time executive hire. For most small businesses, this is not a realistic option.\n\nA Fractional CFO engagement at 617 East Trust starts at $1,200 per month — which covers a defined scope of monthly financial review, cash flow analysis, and strategic advisory. For a business generating $750,000 per year, that's less than 2% of revenue for CFO-level financial leadership.\n\nA bookkeeper at 617 East Trust starts at $199 per month for up to 150 transactions. For most small businesses under $500,000 in annual revenue, bookkeeping plus a CPA for tax preparation is the right financial support stack. As the business grows and the decisions become more complex, adding a Fractional CFO is the logical next step."
      }
    ],
    faqs: [
      { q: "What is the difference between a bookkeeper and a CFO?", a: "A bookkeeper records and categorizes financial transactions and produces monthly financial statements. A CFO provides strategic financial leadership — interpreting the numbers, forecasting, managing cash flow, and advising on major financial decisions. A Fractional CFO does CFO-level work on a part-time basis." },
      { q: "When does a small business need a Fractional CFO?", a: "Typically when revenue exceeds $500K–$1M annually, when you're preparing for a significant loan or investment, when cash flow is unpredictable, or when you're making major financial decisions without a clear picture of your numbers. The trigger is less about revenue and more about the complexity of the decisions you're facing." },
      { q: "Can a bookkeeper do what a CFO does?", a: "No. A bookkeeper records what happened. A CFO advises on what to do next. These are fundamentally different functions. A bookkeeper can tell you your current profit margin. A CFO can tell you whether your current profit margin is sustainable, what's driving it, and what you need to change to improve it." },
      { q: "Do I need both a bookkeeper and a Fractional CFO?", a: "Yes — they serve different functions and are not interchangeable. A Fractional CFO uses your bookkeeper's records as the foundation for strategic analysis. Without clean, current books, a Fractional CFO cannot do their job effectively. The two roles work together, not in place of each other." },
      { q: "How much does a Fractional CFO cost in North Carolina?", a: "617 East Trust's Fractional CFO engagements start at $1,200 per month. The scope and hours are defined at the start of the engagement. For context, a full-time CFO with comparable experience costs $150,000–$250,000 per year in salary plus benefits." }
    ],
    ctaHeading: "Not sure which financial support your business needs?",
    ctaBody: "Start with a free consultation. We'll assess your current financial infrastructure and tell you exactly what level of support makes sense for your business — and what it will cost."
  },
  // ── Wave 3 posts ─────────────────────────────────────────────────────────────
  {
    slug: "north-carolina-llc-annual-report-guide",
    title: "North Carolina LLC Annual Report: What It Is, When It's Due, and What Happens If You Miss It",
    seoTitle: "NC LLC Annual Report 2026: Due Date, Cost & How to File | 617 East Trust",
    metaDescription: "North Carolina LLC annual report guide: $200 fee, April 15 deadline, and what happens if you miss it. How to file and how to avoid administrative dissolution.",
    canonical: "https://617east.com/blog/north-carolina-llc-annual-report-guide",
    h1: "North Carolina LLC Annual Report: Complete Guide for 2026",
    category: "LLC Formation",
    readTime: "6 min read",
    publishDate: "2026-07-15",
    intro: "Every North Carolina LLC must file an Annual Report with the Secretary of State each year. It is not a financial report. It does not require an accountant. But if you miss it, the state can administratively dissolve your LLC — meaning your business legally ceases to exist until you pay to reinstate it. This guide explains what the Annual Report is, when it is due, how to file it, and what to do if you have already missed a deadline.",
    sections: [
      { heading: "What Is the NC LLC Annual Report?", body: "The North Carolina LLC Annual Report is a filing required by the NC Secretary of State under N.C. Gen. Stat. \u00a7 57D-2-24. It is not a financial report — you do not submit income statements, balance sheets, or tax information. The Annual Report simply confirms that your LLC's registered agent, principal office address, and member or manager information is current.\n\nThink of it as the state's way of keeping its business registry accurate. If your information has not changed since last year, the filing takes about five minutes." },
      { heading: "When Is the NC LLC Annual Report Due?", body: "The Annual Report is due by April 15 of each year following the calendar year of formation. The filing fee is $200 for LLCs. There is no grace period — the deadline is April 15. The Secretary of State does not send reminders.\n\nAt 617 East Trust, we send annual report reminders to every LLC we have formed. If you formed your LLC elsewhere, add April 15 to your calendar now." },
      { heading: "How to File the NC LLC Annual Report", body: "The easiest way to file is online through the NC Secretary of State's website at sosnc.gov. You will need your LLC's name or SOS ID number, your registered agent's name and address, your principal office address, and the names and addresses of your members or managers.\n\nThe process: (1) Go to sosnc.gov and search for your LLC. (2) Select 'File Annual Report.' (3) Confirm or update your information. (4) Pay the $200 fee. (5) Save your confirmation number." },
      { heading: "What Happens If You Miss the NC LLC Annual Report Deadline?", body: "If you do not file by April 15, the Secretary of State will send a notice of delinquency. If you still do not file, the state will administratively dissolve your LLC.\n\nAdministrative dissolution means the state considers your LLC to no longer legally exist. You lose your liability protection. Your business name becomes available for others to register.\n\nTo reinstate a dissolved LLC in North Carolina, you must file an Application for Reinstatement, pay all past-due Annual Report fees ($200 per missed year), and pay a $100 reinstatement fee." },
      { heading: "Common Annual Report Mistakes to Avoid", body: "The most common mistake is simply forgetting to file. The Secretary of State does not send reminders.\n\nThe second most common mistake is filing with outdated information. If your registered agent has changed or your principal office has moved, update that information in the Annual Report.\n\nThe third mistake is confusing the Annual Report with a tax filing. The Annual Report is filed with the Secretary of State, not the Department of Revenue." }
    ],
    faqs: [
      { q: "How much does the NC LLC Annual Report cost?", a: "$200 per year, due by April 15. There is no late fee — instead, the state administratively dissolves your LLC if you do not file." },
      { q: "Can I file the NC Annual Report online?", a: "Yes. Online filing is available at sosnc.gov and is the fastest method. You will receive immediate confirmation of your filing." },
      { q: "What happens if my NC LLC is administratively dissolved?", a: "You lose your liability protection and your business name becomes available to others. To reinstate, you must pay all past-due Annual Report fees ($200 per missed year) and a $100 reinstatement fee." },
      { q: "Does 617 East Trust file annual reports for clients?", a: "Yes. For LLCs we have formed, we send annual report reminders and can file on your behalf. Contact us at info@617east.com." }
    ],
    ctaHeading: "Did 617 East Trust form your LLC?",
    ctaBody: "We send annual report reminders to every LLC we form. If you need help filing your Annual Report or want us to manage it going forward, contact us."
  },
  {
    slug: "what-is-a-registered-agent-north-carolina",
    title: "What Is a Registered Agent in North Carolina? Do You Need One?",
    seoTitle: "Registered Agent North Carolina: What It Is & Why You Need One | 617 East Trust",
    metaDescription: "What is a registered agent in North Carolina? Requirements, costs, and whether you can be your own. Complete guide for NC LLC owners.",
    canonical: "https://617east.com/blog/what-is-a-registered-agent-north-carolina",
    h1: "What Is a Registered Agent in North Carolina?",
    category: "LLC Formation",
    readTime: "5 min read",
    publishDate: "2026-07-10",
    intro: "Every North Carolina LLC and corporation is required by law to maintain a registered agent. This is not optional. If you do not have a registered agent, the state can administratively dissolve your business. This guide explains what a registered agent is, what they do, whether you can be your own, and when it makes sense to use a professional service.",
    sections: [
      { heading: "What Is a Registered Agent?", body: "A registered agent is a person or business entity designated to receive official legal and government documents on behalf of your LLC. This includes: service of process (lawsuits), notices from the NC Secretary of State, and tax notices from the NC Department of Revenue.\n\nThe registered agent must have a physical street address in North Carolina (not a P.O. box) and must be available during normal business hours. The registered agent's address becomes part of the public record." },
      { heading: "NC Registered Agent Requirements", body: "Under N.C. Gen. Stat. \u00a7 57D-2-22, every North Carolina LLC must continuously maintain a registered agent in the state. The registered agent must be a North Carolina resident or a business entity authorized to do business in NC.\n\nThe registered agent must have a physical street address in NC — a P.O. box is not sufficient." },
      { heading: "Can You Be Your Own Registered Agent in NC?", body: "Yes, if you meet the requirements: you must be a North Carolina resident, have a physical NC street address, and be reliably available at that address during normal business hours.\n\nThe practical problem: your registered agent's address is public record. If you use your home address, it becomes searchable in the Secretary of State's database. For these reasons, most business owners use a professional registered agent service." },
      { heading: "How Much Does a Registered Agent Cost in NC?", body: "Professional registered agent services in North Carolina typically cost $50–$300 per year. LegalZoom charges $299 per year after the first year. Northwest Registered Agent charges $125 per year. 617 East Trust includes registered agent service for the first year in our $499 LLC formation package." }
    ],
    faqs: [
      { q: "Can I use a P.O. box as my registered agent address in NC?", a: "No. North Carolina requires a physical street address for your registered agent." },
      { q: "Can I change my registered agent in NC?", a: "Yes. You can change your registered agent by filing a Statement of Change of Registered Agent with the NC Secretary of State. The filing fee is $5 online or $10 by mail." },
      { q: "Does 617 East Trust provide registered agent service?", a: "Yes. Registered agent service for the first year is included in our $499 LLC formation package. Annual renewal is available after the first year." },
      { q: "What happens if I miss service of process at my registered agent address?", a: "If you miss a legal notice, you may miss the deadline to respond to a lawsuit. This is why reliability and a professional service matter." }
    ],
    ctaHeading: "Need a registered agent for your North Carolina LLC?",
    ctaBody: "Registered agent service is included in our $499 LLC formation package. If you already have an LLC and need to change your registered agent, we can help with that too."
  },
  {
    slug: "sba-loan-requirements-north-carolina-2026",
    title: "SBA Loan Requirements in North Carolina (2026): What Lenders Actually Look For",
    seoTitle: "SBA Loan Requirements NC 2026: What Lenders Look For | 617 East Trust",
    metaDescription: "SBA loan requirements in North Carolina for 2026. Credit score, time in business, revenue, collateral, and the real reasons applications get denied.",
    canonical: "https://617east.com/blog/sba-loan-requirements-north-carolina-2026",
    h1: "SBA Loan Requirements in North Carolina (2026)",
    category: "SBA Loans",
    readTime: "8 min read",
    publishDate: "2026-07-05",
    intro: "SBA loan requirements are frequently misunderstood. Most business owners focus on the credit score minimum and miss the factors that actually determine approval. This guide explains what North Carolina SBA lenders look for in 2026, why applications get denied, and what you can do to improve your chances before you apply.",
    sections: [
      { heading: "The Basic SBA Eligibility Requirements", body: "To be eligible for an SBA loan, your business must: be a for-profit business operating in the United States, meet the SBA's size standards for your industry, have reasonable owner equity invested, have exhausted other financing options, and not be in a prohibited industry.\n\nThese are the baseline requirements. Meeting them does not mean you will be approved." },
      { heading: "Credit Score Requirements for SBA Loans in NC", body: "Most SBA 7(a) lenders in North Carolina want to see a personal credit score of at least 650–680. Some SBA Express lenders will go as low as 640. SBA Microloans through CDFIs may have more flexible requirements.\n\nYour personal credit score matters even if your business has been operating for years. SBA lenders view the owner's personal credit history as a proxy for how they manage financial obligations." },
      { heading: "Time in Business and Revenue Requirements", body: "Most SBA 7(a) lenders want to see at least 2 years in business. Revenue requirements vary by loan size and lender. For a $250,000 SBA 7(a) loan, most lenders want to see annual revenue of at least $300,000–$500,000 with positive cash flow.\n\nThe debt service coverage ratio — your net operating income divided by your total annual debt payments — should be at least 1.25." },
      { heading: "Why SBA Loan Applications Get Denied in NC", body: "The most common reasons for denial: (1) Insufficient cash flow. (2) Poor personal credit. (3) Insufficient collateral. (4) Inadequate equity injection. (5) Incomplete documentation.\n\nThe most preventable reason for denial is applying before you are ready. An unsuccessful SBA application can damage your relationship with that lender. We assess your eligibility honestly before recommending you apply." }
    ],
    faqs: [
      { q: "What is the minimum credit score for an SBA loan in North Carolina?", a: "Most SBA 7(a) lenders want to see a personal credit score of at least 650–680. Some SBA Express lenders will consider scores as low as 640." },
      { q: "How long does my business need to be operating to qualify for an SBA loan?", a: "Most lenders want at least 2 years of operating history. Startups can access SBA loans but face stricter requirements." },
      { q: "Can I get an SBA loan with bad credit?", a: "It is difficult but not impossible. SBA Microloans through CDFIs have more flexible credit requirements. We assess your complete picture before recommending a path." },
      { q: "What documents do I need for an SBA loan application?", a: "Typically: 3 years of personal and business tax returns, year-to-date financial statements, business bank statements, and a personal financial statement. Requirements vary by lender and loan type." }
    ],
    ctaHeading: "Not sure if you qualify for an SBA loan in NC?",
    ctaBody: "We assess your eligibility honestly before recommending you apply. An unsuccessful application can damage your relationship with lenders. Start with a free assessment."
  },
  {
    slug: "how-to-build-business-credit-north-carolina",
    title: "How to Build Business Credit in North Carolina: A Step-by-Step Guide",
    seoTitle: "How to Build Business Credit NC: Step-by-Step Guide 2026 | 617 East Trust",
    metaDescription: "How to build business credit in North Carolina. EIN, DUNS number, business bank account, net-30 accounts, and business credit cards. A practical step-by-step guide.",
    canonical: "https://617east.com/blog/how-to-build-business-credit-north-carolina",
    h1: "How to Build Business Credit in North Carolina",
    category: "Credit",
    readTime: "7 min read",
    publishDate: "2026-06-28",
    intro: "Business credit is separate from personal credit. Building it correctly protects your personal credit score, improves your chances of SBA loan approval, and allows your business to access financing without a personal guarantee. This guide explains how to build business credit in North Carolina from scratch.",
    sections: [
      { heading: "Step 1: Establish Your Business as a Separate Legal Entity", body: "You cannot build business credit as a sole proprietor. Business credit is tied to your LLC or corporation. If you have not yet formed an LLC, that is the first step.\n\nOnce your LLC is formed, you need an Employer Identification Number (EIN) from the IRS. Your EIN is required to open a business bank account and establish your business credit profile." },
      { heading: "Step 2: Open a Business Bank Account", body: "Open a dedicated business checking account in your LLC's name using your EIN. Do not commingle personal and business funds.\n\nMake sure your business has a consistent address, phone number, and email address that match across all filings. Inconsistencies can prevent your business credit profile from building correctly." },
      { heading: "Step 3: Register with Business Credit Bureaus", body: "The three major business credit bureaus are Dun & Bradstreet (D&B), Experian Business, and Equifax Business. Dun & Bradstreet is the most important for SBA lending.\n\nTo establish a D&B profile, you need a DUNS number. You can request one for free at dnb.com. The process takes 30 business days." },
      { heading: "Step 4: Open Net-30 Vendor Accounts", body: "Net-30 accounts are trade credit accounts where you purchase goods or services and pay the invoice within 30 days. Many vendors report payment history to business credit bureaus.\n\nStart with vendors that report to D&B: Uline, Grainger, Quill, and Crown Office Supplies. Pay every invoice on time or early." }
    ],
    faqs: [
      { q: "How long does it take to build business credit?", a: "With consistent on-time payments, you can establish a basic business credit profile in 3–6 months. A strong score that satisfies SBA lenders typically takes 12–24 months." },
      { q: "Does forming an LLC automatically create business credit?", a: "No. Forming an LLC creates the legal entity, but you must actively establish your profile by getting a DUNS number and building a payment history." },
      { q: "Can I build business credit with bad personal credit?", a: "Yes. Business credit is separate from personal credit. Building strong business credit over time reduces your reliance on personal credit for business financing." },
      { q: "Do I need an LLC to build business credit?", a: "You need a separate legal entity (LLC or corporation) to build business credit that is truly separate from your personal credit." }
    ],
    ctaHeading: "Ready to start building your business credit?",
    ctaBody: "We help North Carolina business owners form LLCs, establish their business identity, and build the financial foundation for SBA loan eligibility. Start with a free consultation."
  },
  {
    slug: "bookkeeping-mistakes-small-business-north-carolina",
    title: "5 Bookkeeping Mistakes That Cost North Carolina Small Businesses Money",
    seoTitle: "5 Bookkeeping Mistakes NC Small Businesses Make | 617 East Trust",
    metaDescription: "The 5 most common bookkeeping mistakes North Carolina small businesses make — and how to fix them before they cost you an SBA loan or a tax penalty.",
    canonical: "https://617east.com/blog/bookkeeping-mistakes-small-business-north-carolina",
    h1: "5 Bookkeeping Mistakes That Cost NC Small Businesses Money",
    category: "Bookkeeping",
    readTime: "6 min read",
    publishDate: "2026-06-20",
    intro: "Most small business bookkeeping problems are not discovered until they cause a larger problem — a failed SBA loan application, a surprise tax bill, or a cash flow crisis that could have been avoided. These are the five most common bookkeeping mistakes we see in North Carolina small businesses, and what to do about each one.",
    sections: [
      { heading: "Mistake 1: Commingling Personal and Business Funds", body: "When you run personal expenses through your business account, you undermine your LLC's liability protection, make accurate bookkeeping impossible, and create tax problems.\n\nFix: Open a dedicated business checking account and use it exclusively for business transactions." },
      { heading: "Mistake 2: Not Reconciling Bank Accounts Monthly", body: "Bank reconciliation catches errors, identifies fraud, and ensures your financial statements are accurate. When you apply for an SBA loan and the lender asks for your financial statements, inaccurate books can kill the application.\n\nFix: Reconcile your bank and credit card accounts at the end of every month." },
      { heading: "Mistake 3: Misclassifying Expenses", body: "Expense classification determines how your financial statements look and which expenses are tax-deductible. Common misclassifications include putting owner draws in the wrong account and mixing cost of goods sold with operating expenses.\n\nFix: Use a consistent chart of accounts and review your expense categories quarterly." },
      { heading: "Mistake 4: Falling Behind on Bookkeeping", body: "When your books are 3–6 months behind, you cannot make informed business decisions or apply for financing. Catch-up bookkeeping is significantly more expensive than staying current.\n\nFix: Treat bookkeeping as a monthly non-negotiable. At $199/month, professional bookkeeping costs less than one hour of your time." },
      { heading: "Mistake 5: Not Keeping Receipts and Documentation", body: "The IRS requires documentation for business expense deductions. A bank statement showing a charge is not sufficient — you need a receipt showing what was purchased and the business purpose.\n\nFix: Use a receipt scanning app (Dext, Hubdoc, or QuickBooks Online) to capture receipts immediately." }
    ],
    faqs: [
      { q: "How often should I reconcile my business bank account?", a: "Monthly, at minimum. The longer you wait, the harder it is to identify and correct errors." },
      { q: "What accounting software should I use for my NC small business?", a: "QuickBooks Online is the most widely used. Xero is a strong alternative. We work with both for all client bookkeeping." },
      { q: "How do I catch up on bookkeeping that is months behind?", a: "Catch-up bookkeeping involves reconciling all past periods and producing accurate financial statements. We offer catch-up bookkeeping services — contact us for a quote." },
      { q: "Can messy bookkeeping prevent me from getting an SBA loan?", a: "Yes. SBA lenders require current financial statements. If your books are inaccurate or incomplete, the lender cannot verify your income and will deny the application." }
    ],
    ctaHeading: "Is your bookkeeping holding your business back?",
    ctaBody: "We provide clean, accurate monthly bookkeeping for North Carolina small businesses starting at $199/month. Catch-up bookkeeping available for prior periods."
  },
  {
    slug: "credit-score-needed-for-sba-loan-north-carolina",
    title: "What Credit Score Do You Need for an SBA Loan in North Carolina?",
    seoTitle: "Credit Score for SBA Loan NC: Minimums & How to Improve | 617 East Trust",
    metaDescription: "What credit score do you need for an SBA loan in North Carolina? Minimums by loan type, what else lenders look at, and how to improve your score before applying.",
    canonical: "https://617east.com/blog/credit-score-needed-for-sba-loan-north-carolina",
    h1: "What Credit Score Do You Need for an SBA Loan in North Carolina?",
    category: "SBA Loans",
    readTime: "6 min read",
    publishDate: "2026-06-15",
    intro: "Credit score is one of the most common questions we get about SBA loans. The honest answer is that there is no single minimum — it depends on the loan type, the lender, and the rest of your application. This guide explains what scores different SBA programs require, what else lenders look at, and how to improve your score before you apply.",
    sections: [
      { heading: "Credit Score Minimums by SBA Loan Type", body: "SBA 7(a) Standard Loans: Most lenders want a personal credit score of 650–680.\n\nSBA 7(a) Express Loans: Minimum credit score is typically 650.\n\nSBA 504 Loans: Minimum credit score is typically 680.\n\nSBA Microloans: More flexible credit requirements — some intermediaries will work with scores below 600 with strong mitigating factors." },
      { heading: "What Else SBA Lenders Look At Beyond Credit Score", body: "Credit score is one factor in a multi-factor evaluation. SBA lenders also look at: time in business, annual revenue and cash flow, debt service coverage ratio (minimum 1.25), collateral, owner equity injection, and the purpose of the loan.\n\nA business with a 660 credit score, 5 years of history, and strong cash flow may be more attractive than a business with a 700 score and 1 year of history." },
      { heading: "How to Improve Your Credit Score Before Applying", body: "The right move is to improve your score before applying — not to apply and get denied. A denial can affect your relationship with that lender.\n\nThe most impactful steps: (1) Pay down revolving credit balances to below 30% of your credit limit. (2) Dispute inaccurate negative items on your credit report under the FCRA. (3) Do not open new credit accounts in the 6–12 months before applying. (4) Make every payment on time." },
      { heading: "The Connection Between Credit Repair and SBA Loan Eligibility", body: "Many of our clients come to us for credit repair specifically because they want to qualify for an SBA loan. If your credit score is 620 and you need 650 to qualify, targeted credit repair can close that gap in 3–6 months.\n\nWe do not guarantee specific score increases. But we can tell you honestly what is disputable on your report and what timeline to expect." }
    ],
    faqs: [
      { q: "Can I get an SBA loan with a 600 credit score?", a: "It is difficult but not impossible. SBA Microloans may be accessible with a 600 score. For standard SBA 7(a) loans, most lenders want 650+. Credit repair before applying is a better strategy than applying and getting denied." },
      { q: "Does applying for an SBA loan hurt my credit score?", a: "SBA lenders typically pull a hard credit inquiry, which can lower your score by a few points. Multiple hard inquiries within 14–45 days are typically counted as a single inquiry." },
      { q: "How long does it take to improve a credit score for SBA loan eligibility?", a: "With targeted credit repair and utilization reduction, many clients see meaningful improvement in 3–6 months." },
      { q: "Does 617 East Trust offer both credit repair and SBA loan consulting?", a: "Yes. We often work with clients on both simultaneously — repairing credit to reach the SBA loan eligibility threshold while preparing the rest of the application." }
    ],
    ctaHeading: "Need to improve your credit score for an SBA loan?",
    ctaBody: "We offer both credit repair and SBA loan consulting. We'll assess your credit profile and tell you exactly what needs to change to reach your target score — and how long it will realistically take."
  },
  {
    slug: "north-carolina-business-formation-guide-2026",
    title: "North Carolina Business Formation Guide 2026: LLC vs S-Corp vs C-Corp",
    seoTitle: "NC Business Formation 2026: LLC vs S-Corp vs C-Corp | 617 East Trust",
    metaDescription: "North Carolina business formation guide for 2026. Compare LLC, S-Corp, and C-Corp structures. Costs, taxes, liability, and which is right for your situation.",
    canonical: "https://617east.com/blog/north-carolina-business-formation-guide-2026",
    h1: "North Carolina Business Formation Guide 2026: LLC vs S-Corp vs C-Corp",
    category: "LLC Formation",
    readTime: "9 min read",
    publishDate: "2026-06-10",
    intro: "Choosing the right business structure is the most important decision you will make when starting a business in North Carolina. It affects your taxes, your liability protection, your ability to raise capital, and the administrative burden you take on. This guide compares the three most common structures — LLC, S-Corp, and C-Corp.",
    sections: [
      { heading: "The North Carolina LLC: The Default Choice for Most Small Businesses", body: "An LLC provides personal liability protection, flexible management structure, and pass-through taxation. Forming an LLC in NC costs $125 in state filing fees. 617 East Trust handles the complete formation for $499 total.\n\nAn LLC is the right choice for: solo entrepreneurs and small partnerships, businesses that want liability protection without corporate formalities, and most service businesses, consultants, and contractors." },
      { heading: "The S-Corporation: When It Makes Sense", body: "An S-Corporation is a tax election, not a separate entity. The primary advantage is the ability to split income between salary and distributions, potentially reducing self-employment tax.\n\nThe S-Corp election comes with additional complexity: you must run payroll and file quarterly payroll tax returns. Our honest advice: do not elect S-Corp status until your CPA confirms the tax savings exceed the administrative costs." },
      { heading: "The C-Corporation: When You Need It", body: "A C-Corporation pays corporate income tax on its profits, and shareholders pay personal income tax on dividends. This double taxation is the primary disadvantage for small businesses.\n\nThe C-Corp is the right structure when you plan to raise venture capital, issue multiple classes of stock, or take the company public. For most NC small businesses, a C-Corp is not the right choice." },
      { heading: "The Honest Advice: Start with an LLC", body: "The most common mistake we see is over-engineering the business structure at formation. The right structure for most North Carolina small businesses at formation is an LLC.\n\nYou can always change your structure later. What we tell every client: tell us about your business, your revenue expectations, and your plans for the next 3 years. We will tell you which structure actually fits your situation." }
    ],
    faqs: [
      { q: "Should I form an LLC or S-Corp in North Carolina?", a: "For most new businesses, start with an LLC. You can elect S-Corp taxation later when your net profit exceeds $80,000–$100,000 per year and the tax savings justify the additional administrative costs." },
      { q: "How much does it cost to form a business in North Carolina?", a: "An LLC costs $125 in state filing fees. 617 East Trust's complete LLC formation package is $499 total, including the state fee, registered agent service, operating agreement, EIN, and BOI report." },
      { q: "Can a single-member LLC elect S-Corp status in NC?", a: "Yes. A single-member LLC can elect S-Corp taxation by filing IRS Form 2553 within 75 days of the start of the tax year." },
      { q: "What is the difference between an LLC and a sole proprietorship in NC?", a: "A sole proprietorship has no liability protection. An LLC provides a legal separation between you and your business." }
    ],
    ctaHeading: "Not sure which business structure is right for you?",
    ctaBody: "We tell you what structure fits your situation — including if you do not need to form a business entity yet. Start with a free consultation."
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}
