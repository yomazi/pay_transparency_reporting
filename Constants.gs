const SheetIds = {
  PAY_ZONE_REFERENCE_SHEET_ID: "1-OMLoI-28zm5gvkUhp6nLpKUycOJpXeEGpBAeKxThKk",
  SALARY_MAP_REFERENCE_SHEET_ID: "1hXoHI9gj2J7I1WhlpvltNIy8WLqo0U7-mwCLytSYFGQ"
};

const Strings = {
  UNITED_STATES: "United States",
  FROM_JOB_REQUISITION: "From Job Requisition",
  USA: "USA",
  YES: "yes",
  NO: "no",
  NA: "n/a",
  NOT_FOUND: "not found",
  NEEDS_UPDATED_LOCATION: "needs updated location",
  PAY_TRANSPARENCY_NOT_YET_UPDATED: "Pay Transparency not yet updated"
};

const SANDBOX_BOARDS = [
  { name: "Sony PlayStation Workday Sandbox", id: "4005624004", token: "sonyplaystationworkdaysandbox"}  
]
BOARDS = [  
  { name: "PlayStation Global", id: "4000158004", token: "sonyinteractiveentertainmentglobal"},
  { name: "PlayStation Studios Creative Arts", id: "4008785004", token: "creativearts"},
  { name: "Bluepoint Games", id: "4008931004", token: "bluepointgames"},
  { name: "Firesprite", id: "4009148004", token: "firesprite"},
  { name: "Insomniac Games", id: "4006123004", token: "insomniac"},
  { name: "PixelOpus", id: "4008858004", token: "pixelopus"}
];

const DEFAULTS = {
  boards: { 
    value: BOARDS, 
    description: "all boards to query" 
  },
  sandboxBoards: { 
    value: SANDBOX_BOARDS, 
    description: "all boards to query" 
  },
  reportFolderId: { 
    value: "17S9lCNFO3RsIolcdWPKpa30fFPbaAk3g", 
    description: "id of the folder to write reports into" 
  },
  greenhouseEnvironment: { 
    value: "production", 
    description: "greenhouse environment to query (sandbox or production)" 
  }
}

const CANNED_CONTENT = "&lt;p&gt;a&lt;/p&gt;&lt;div class=&quot;content-pay-transparency&quot;&gt;&lt;div class=&quot;pay-input&quot;&gt;&lt;div class=&quot;description&quot;&gt;Jordan&#39;s test description&lt;/div&gt;&lt;div class=&quot;title&quot;&gt;Jordan&#39;s Pay Transparency Rule (Test)&lt;/div&gt;&lt;div class=&quot;pay-range&quot;&gt;&lt;span&gt;$50,000&lt;/span&gt;&lt;span class=&quot;divider&quot;&gt;&amp;mdash;&lt;/span&gt;&lt;span&gt;$60,000 USD&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;";

const BIG_CONTENT_NO_PAY = "&lt;p&gt;&lt;b&gt;&lt;span&gt;Sr. &lt;/span&gt;&lt;span&gt;IT System Analyst&lt;/span&gt;&lt;span&gt; (Contract)&lt;/span&gt;&lt;/b&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;/p&gt;&lt;p&gt;&lt;span&gt;&lt;span&gt;&lt;i&gt;This contracted position is OK for remote but location &lt;span&gt;near a PlayStation office is preferred. &lt;/span&gt;&lt;/i&gt;&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;/p&gt;&lt;p&gt;&lt;span&gt;&lt;span&gt;The SIE Enterprise Applications Team is looking &lt;/span&gt;&lt;span&gt;&lt;span&gt;for a&lt;/span&gt; &lt;span&gt;Sr.&lt;/span&gt;&lt;span&gt; IT Systems Analyst&lt;/span&gt;&lt;span&gt; that is&lt;/span&gt;&lt;/span&gt;&lt;span&gt;&lt;span&gt; passionate about improving the experience of o&lt;/span&gt;&lt;span&gt;ur internal user community through the enhancement, promotion, and implementation of collaboration applications that boost productivity and help teams work together more efficiently.&amp;nbsp;&lt;/span&gt;&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;/p&gt;&lt;p&gt;&lt;span&gt;&lt;span&gt;You will work with partners and SIE users to understand requirements and&lt;span&gt; encourage use of currently supported applications or find solutions that meet their needs. This includes building, configuring, and integrating applications based on tools such as ServiceNow, Confluence, JIRA, Office 365, Google Apps for Work, Slack, Miro&lt;/span&gt;&lt;span&gt;, Box and other SaaS and PaaS applications. The position will have ownership of requirements gathering, systems and application analysis, and functional design while working as part of an Agile Scrum team. Support user expectations, scope/risk management a&lt;/span&gt;&lt;span&gt;nd coordination with global and regional teams; as well as working with other groups to evaluate new and existing collaboration tools.&amp;nbsp;&lt;/span&gt;&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;/p&gt;&lt;p&gt;&lt;span&gt;&lt;span&gt;The ideal candidate will flourish in a constantly evolving playing field and will have the courage to turn ambiguous opp&lt;span&gt;ortunities into useful delivery. They will be adept at seeing the opportunity in change and feel at home as a member of a hard-working forward-thinking team.&amp;nbsp;&lt;/span&gt;&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&lt;/p&gt;&lt;p&gt;&lt;/p&gt;&lt;p&gt;&lt;span&gt;&lt;span&gt;&lt;b&gt;Key&lt;/b&gt;&lt;/span&gt;&lt;/span&gt;&lt;span&gt;&lt;span&gt; &lt;b&gt;&lt;span&gt;&lt;span&gt;Responsibilities:&lt;/span&gt;&lt;/span&gt;&lt;/b&gt;&amp;nbsp;&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;&lt;span&gt;This role is responsible for enhancing the quality of IT products and serv&lt;span&gt;ices, analyzing data to advise business &lt;/span&gt;&lt;span&gt;decisions,&lt;/span&gt;&lt;span&gt; and finding technological solutions to business needs, among other duties.&amp;nbsp;&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;span&gt;Improve the way the applications team internally promotes and evangelizes the applications they support to improve user adoption&amp;nbsp;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;span&gt;Work with product owners and user community on application usage and gap analysis to proactively improve offerings or find new apps in the marketplace that meet the evolving needs of the business.&amp;nbsp;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;span&gt;Conduct requirements analysis and prepare proposals for mo&lt;span&gt;dification or replacement systems while serving as an interface between our internal business users and the IT Team.&amp;nbsp;&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;/ul&gt;&lt;ul&gt;&lt;li&gt;&lt;span&gt;When required, determine comparable products and &lt;span&gt;solutions,&lt;/span&gt;&lt;span&gt; and develop score sheets to be used in evaluating IT Applications.&amp;nbsp;&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;span&gt;Stay ahead &lt;span&gt;of new product offerings &lt;/span&gt;&lt;span&gt;to&lt;/span&gt;&lt;span&gt; support and recommend improvements for product roadmap. Work with Vendors and/or external parties to determine the best solution.&amp;nbsp;&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;span&gt;Work with development teams to determine LOE based on requirements and identify options &lt;span&gt;for potential solutions while assessing them for both technical and business suitability and alignment to all Security policies&amp;nbsp;&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;span&gt;Support scrum team to develop features and add stories to the relevant Sprint, work on roll out plan for releases and identify &lt;span&gt;what needs to be communicated to users.&amp;nbsp;&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;span&gt;As the role is global a flexible approach to working hours to support global business operations is required&amp;nbsp;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;/ul&gt;&lt;ul&gt;&lt;li&gt;&lt;span&gt;Other duties as assigned&amp;nbsp;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;&lt;/p&gt;&lt;p&gt;&lt;span&gt;&lt;span&gt;&lt;b&gt;Qualifications&lt;/b&gt;&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&amp;nbsp;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;&lt;span&gt;5+ years relevant working experience as an IT System/Business A&lt;span&gt;nalysis with the following skills:&amp;nbsp;&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;span&gt;You possess excellent analytical and problem-solving skills, are highly motivated, solutions focused, and team oriented. You have experience working independently in an organized, methodical, and detailed oriented &lt;span&gt;manner.&lt;/span&gt;&amp;nbsp;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;span&gt;Must be self-motivated in the discovery and research of IT information using internal and external resources.&amp;nbsp;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;/ul&gt;&lt;ul&gt;&lt;li&gt;&lt;span&gt;Solid understanding&lt;span&gt; of ServiceNow, Confluence, JIRA, Office 365, Google Apps for Work, Slack, Miro, &lt;/span&gt;&lt;span&gt;Box,&lt;/span&gt;&lt;span&gt; or similar applications.&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;span&gt;Fluent in Japanese – highly desirable&amp;nbsp;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;span&gt;Experience with Tableau and/or integration methodologies a plus&amp;nbsp;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;span&gt;Consistent track record of project management, developing, documenting, &lt;span&gt;communicating,&lt;/span&gt;&lt;span&gt; and implementing functional requirements leading to the implementation of new business processes across multipl&lt;/span&gt;&lt;span&gt;e departments in an organization.&amp;nbsp;&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;span&gt;Confirmed analytical skills to identify and solve problems. Capable of analyzing and evaluating requirements and making solution recommendations.&amp;nbsp;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;/ul&gt;&lt;ul&gt;&lt;li&gt;&lt;span&gt;Customer/User expectation management. Ability to champion a positive and c&lt;span&gt;onstructive relationship with internal business partners as well as software vendors, developers, management, and IT personnel in onshore/offshore teams.&amp;nbsp;&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;span&gt;Talent for remaining current on new and emerging technologies while possessing a solid proficiency to&lt;span&gt;wards innovative systems&amp;nbsp;&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;&lt;/p&gt;&lt;p&gt;&lt;span&gt;&lt;span&gt;&lt;b&gt;Education:&lt;/b&gt;&lt;/span&gt;&lt;/span&gt;&amp;nbsp;&amp;nbsp;&lt;/p&gt;&lt;ul&gt;&lt;li&gt;&lt;span&gt;Bachelor’s (Business, Information Technology or CS)&amp;nbsp;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;li&gt;&lt;span&gt;PMP certification or Agile/Scrum is plus&amp;nbsp;&lt;/span&gt;&amp;nbsp;&lt;/li&gt;&lt;/ul&gt;";

const HAS_PAY_RANGE = "&lt;p&gt;This is some other text that should be left.&amp;nbsp;&lt;/p&gt;\n&lt;div class=&quot;content-pay-transparency&quot;&gt;&lt;div class=&quot;pay-input&quot;&gt;&lt;div class=&quot;description&quot;&gt;&lt;p&gt;At SIE, we follow a market-based approach to establish our compensation practices, including salary range development. Salary ranges are developed for each job, informed by our competitive benchmark data and geographic location.&lt;u&gt;&lt;strong&gt; &lt;/strong&gt;&lt;/u&gt;&lt;/p&gt;&lt;/div&gt;&lt;div class=&quot;title&quot;&gt;In-office pay range based on this location is listed below. This range may vary in line with our hybrid working policy. &lt;/div&gt;&lt;div class=&quot;pay-range&quot;&gt;&lt;span&gt;$100,000&lt;/span&gt;&lt;span class=&quot;divider&quot;&gt;&amp;mdash;&lt;/span&gt;&lt;span&gt;$200,000 USD&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;";