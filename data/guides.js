// HazwoperOSHA.us employer resources. Rendered by tools/build.js into guides/<slug>/.
// Body is HTML. Link tokens are checked at build time:
//   {{course:slug}} {{course:slug|text}} {{guide:slug|text}} {{page:slug|text}} {{price:slug}}
// Every <h2> becomes a table-of-contents entry.
module.exports = [
  {
    slug: 'hazwoper-training-by-industry',
    title: 'HAZWOPER Training by Industry: Which Courses Each Crew Needs',
    short: 'Training by industry',
    desc: 'Which HAZWOPER, emergency response and RCRA courses employers in remediation, construction, oil and gas, utilities, manufacturing, waste management, healthcare and logistics typically buy for their crews.',
    related: ['osha-40-hour-hazwoper-training', 'osha-8-hour-hazwoper-refresher-training', 'osha-8-hour-hazwoper-supervisor-training'],
    body: `
<p>HAZWOPER isn't one course. It's a set of training levels matched to what each worker does. Here's the course mix employers in common industries usually need. Use it as a starting point, then check each role against your own site safety and health plan and emergency response plan. To turn it into an order, use the {{page:crew-training-planner|crew training planner}}.</p>

<h2>Environmental consulting and remediation</h2>
<ul>
<li>Field technicians, samplers, drillers and remediation crews: {{course:osha-40-hour-hazwoper-for-environmental-remediation}} or the standard {{course:osha-40-hour-hazwoper-training}}</li>
<li>Surveyors and staff on site briefly for limited tasks: {{course:osha-24-hour-hazwoper-training}}</li>
<li>Project managers and site leads: add {{course:osha-8-hour-hazwoper-supervisor-training}}</li>
<li>Everyone, every year: {{course:osha-8-hour-hazwoper-refresher-training}}</li>
</ul>

<h2>Construction on contaminated sites</h2>
<ul>
<li>Laborers, equipment operators and demolition crews on cleanup sites (29 CFR 1926.65): {{course:osha-40-hour-hazwoper-for-construction-contaminated-sites}}</li>
<li>Trades that visit occasionally, in characterized low-exposure areas: {{course:osha-24-hour-hazwoper-training}}</li>
<li>Superintendents and foremen: {{course:osha-8-hour-hazwoper-supervisor-training}}</li>
</ul>

<h2>Oil and gas, and spill response contractors</h2>
<ul>
<li>Spill response technicians: {{course:osha-40-hour-hazwoper-for-oil-and-gas-spill-response}}</li>
<li>Crews who deploy containment equipment: {{course:spill-response-equipment-absorbent-and-containment-booms}} and {{course:osha-spill-prevention-and-response-safety-training}}</li>
<li>Response leaders: {{course:osha-8-hour-hazwoper-q-incident-command-training}}</li>
</ul>

<h2>Utilities and pipelines</h2>
<ul>
<li>Emergency response crews: {{course:osha-40-hour-hazwoper-for-utility-pipeline-emergency-response}}</li>
<li>Field staff who may discover a leak and must report it: {{course:osha-4-hour-hazwoper-first-responder-awareness-level-training}}</li>
<li>Gas detection: {{course:osha-air-monitoring-and-gas-detection-training}}</li>
</ul>

<h2>Manufacturing and chemical plants</h2>
<ul>
<li>Plant emergency response team members: {{course:manufacturing-emergency-response-team-ert-training}}</li>
<li>All other employees who could witness a release: {{course:osha-4-hour-hazwoper-first-responder-awareness-level-training}}</li>
<li>Ammonia refrigeration sites: {{course:osha-8-hour-hazwoper-and-safe-ammonia-handling-refresher-training}}</li>
<li>Waste accumulation staff: {{course:rcra-hazardous-waste-generator-training}}</li>
</ul>
<p>If the plan is to evacuate and call outside responders, rather than have employees respond, an emergency action plan under 1910.38 may apply instead of HAZWOPER paragraph (q). See {{guide:building-a-hazwoper-training-program|building a training program}}.</p>

<h2>Waste management and TSD facilities</h2>
<ul>
<li>Operators at permitted treatment, storage and disposal facilities: {{course:osha-24-hour-hazwoper-rcra-tsd-operations-training}}, then {{course:osha-8-hour-hazwoper-annual-refresher-rcra-tsd-operations-training}} every year</li>
<li>Staff who sign manifests: {{course:hazardous-waste-manifest-training}}. DOT hazmat training is also needed at least every three years</li>
<li>Technicians handling a range of wastes: {{course:osha-hazwoper-and-rcra-hazardous-waste-management-technician-safety-training}}</li>
</ul>

<h2>Hospitals, laboratories and universities</h2>
<ul>
<li>Lab and facilities staff who manage waste: {{course:rcra-hazardous-waste-generator-training}} and {{course:hazardous-waste-satellite-accumulation-area-training}}</li>
<li>Battery, lamp and mercury equipment handlers: {{course:rcra-universal-waste-handler-training}}</li>
<li>Large quantity generator emergency coordinators: {{course:hazardous-waste-contingency-plan-and-emergency-coordinator-training}}</li>
</ul>

<h2>Fire departments and HAZMAT teams</h2>
<ul>
<li>HAZMAT team members: {{course:osha-40-hour-hazwoper-for-emergency-response-fire-hazmat-teams}}</li>
<li>Incident commanders: {{course:osha-8-hour-hazwoper-q-incident-command-training}} and the combined {{course:8-hour-hazwoper-and-incident-command-refresher-training}}</li>
<li>Public-sector employers should also read {{guide:hazwoper-for-public-employees-and-volunteers|HAZWOPER for public employees and volunteers}}</li>
</ul>

<h2>Warehousing, distribution and logistics</h2>
<ul>
<li>Workers who may find leaking packages: {{course:osha-4-hour-hazwoper-first-responder-awareness-level-training}}</li>
<li>Spill kit users: {{course:spill-response-equipment-spill-kit-selection-and-use}}</li>
<li>Staff who ship hazardous waste: {{course:epa-rcra-dot-combined-hazardous-materials-compliance-training}}</li>
</ul>
`,
    faq: [
      ['Do all employees at a chemical plant need HAZWOPER?', 'Not the full 40 hours. Employees who could witness or discover a release usually need first responder awareness training; emergency response team members need training for their response level; and plants that evacuate and rely on outside responders may follow an emergency action plan instead.'],
      ['Which HAZWOPER course do environmental consultants need?', 'Field staff working on cleanup sites generally need 40 hours plus supervised field experience, project leads add the 8 hour supervisor course, and everyone takes the 8 hour refresher every year.'],
      ['Do hospitals and labs need HAZWOPER?', 'Usually they need EPA RCRA hazardous waste training for waste handlers, and HAZWOPER awareness or emergency response training only if employees are expected to respond to releases.'],
    ],
  },

  {
    slug: 'osha-state-plans-and-hazwoper',
    title: 'OSHA State Plans and HAZWOPER: Which Rules Apply to Your Crew',
    short: 'State plans & HAZWOPER',
    desc: 'Which HAZWOPER rules apply in each state: federal OSHA states, state plans covering private employers, public-employee-only plans, California\'s 8 CCR 5192, and multi-state crews.',
    related: ['8-hour-hazwoper-refresher-state-plan-versions-available', 'cal-osha-40-hour-hazwoper-training', 'cal-osha-8-hour-hazwoper-refresher-training'],
    body: `
<p>The OSH Act lets states run their own occupational safety and health programs, called <strong>state plans</strong>, as long as they are at least as effective as federal OSHA. Where you send a crew decides which agency enforces HAZWOPER and which version of the rule applies.</p>

<h2>Three situations</h2>
<div class="table-wrap"><table>
<thead><tr><th>Situation</th><th>Private employers</th><th>State and local government employees</th></tr></thead>
<tbody>
<tr><td>Federal OSHA state</td><td>Federal OSHA, 29 CFR 1910.120 / 1926.65</td><td>Not covered by OSHA; EPA's 40 CFR Part 311 applies HAZWOPER to them</td></tr>
<tr><td>State plan covering private and public employers</td><td>State agency enforces the state's HAZWOPER rule</td><td>State agency</td></tr>
<tr><td>Public-employee-only state plan</td><td>Federal OSHA</td><td>State agency</td></tr>
</tbody></table></div>

<h2>States with plans covering private employers</h2>
<p>Alaska, Arizona, California, Hawaii, Indiana, Iowa, Kentucky, Maryland, Michigan, Minnesota, Nevada, New Mexico, North Carolina, Oregon, Puerto Rico, South Carolina, Tennessee, Utah, Vermont, Virginia, Washington and Wyoming run plans that cover most private-sector workplaces as well as public employers. Plans can change, so check OSHA's state plan page before relying on this list.</p>

<h2>Public-employee-only plans</h2>
<p>Several states and territories, including Connecticut, Illinois, Maine, New Jersey, New York and the U.S. Virgin Islands, run plans that cover only state and local government workers. Private employers there fall under federal OSHA.</p>

<h2>How different are state HAZWOPER rules?</h2>
<p>Most state plans adopt HAZWOPER word for word or with minor changes, so the training content is the same. The differences that matter most to employers:</p>
<ul>
<li><strong>California</strong> enforces Title 8 CCR 5192 through Cal/OSHA, and California clients and agencies often ask for Cal/OSHA-labeled certificates: {{course:cal-osha-40-hour-hazwoper-training}}, {{course:cal-osha-24-hour-hazwoper-training}} and {{course:cal-osha-8-hour-hazwoper-refresher-training}}.</li>
<li><strong>Washington, Oregon, Michigan and others</strong> publish their own rule numbers and sometimes add requirements. A {{course:8-hour-hazwoper-refresher-state-plan-versions-available|state-plan refresher}} is available.</li>
<li>Some states have <strong>related rules</strong> that affect HAZWOPER work, such as state heat illness standards or California's Injury and Illness Prevention Program requirement.</li>
</ul>

<h2>Crews that work in more than one state</h2>
<ul>
<li>Train to the federal standard as the baseline. Add the state version for states where clients or regulators expect it, most often California.</li>
<li>Check each client's contract: many specify the certificate type they'll accept.</li>
<li>Keep one training record per worker that shows every course and its regulatory basis. See {{guide:hazwoper-training-records-for-employers|training records for employers}}.</li>
</ul>
`,
    faq: [
      ['Which states have OSHA state plans?', 'Plans covering private employers include Alaska, Arizona, California, Hawaii, Indiana, Iowa, Kentucky, Maryland, Michigan, Minnesota, Nevada, New Mexico, North Carolina, Oregon, Puerto Rico, South Carolina, Tennessee, Utah, Vermont, Virginia, Washington and Wyoming. Several others cover public employees only. Check OSHA\'s state plan page for the current list.'],
      ['Is federal HAZWOPER training accepted in state-plan states?', 'Usually the content is the same, since state rules must be at least as effective as federal OSHA. California crews and clients often require Cal/OSHA-specific certificates.'],
      ['Who enforces HAZWOPER for city and county workers in federal OSHA states?', 'EPA\'s 40 CFR Part 311 applies the HAZWOPER standard to state and local government employees in states without an OSHA-approved state plan.'],
    ],
  },

  {
    slug: 'hazwoper-for-public-employees-and-volunteers',
    title: 'HAZWOPER for Public Employees and Volunteers (EPA 40 CFR Part 311)',
    short: 'Public employees & volunteers',
    desc: 'How HAZWOPER applies to state and local government employees and volunteer responders: EPA 40 CFR Part 311, public-sector state plans, fire departments, public works and training levels.',
    related: ['osha-40-hour-hazwoper-for-emergency-response-fire-hazmat-teams', 'osha-4-hour-hazwoper-first-responder-awareness-level-training', 'osha-8-hour-hazwoper-q-incident-command-training'],
    body: `
<p>Federal OSHA covers private employers and federal agencies, but not state and local governments. That leaves a gap for city fire departments, county public works crews and other public employees who respond to chemical releases or work on contaminated sites. Two rules fill it.</p>

<h2>In states with a state plan</h2>
<p>Every OSHA-approved state plan covers state and local government employees, including the public-employee-only plans. In those states the state agency enforces its HAZWOPER rule for public employers.</p>

<h2>In federal OSHA states: EPA 40 CFR Part 311</h2>
<p>In states without an approved plan, EPA's <strong>Worker Protection</strong> rule at 40 CFR Part 311 applies the requirements of OSHA's HAZWOPER standard (29 CFR 1910.120) to state and local government employees engaged in hazardous waste operations and emergency response. EPA's definition of employee includes non-compensated workers, so volunteer firefighters and other volunteer responders are covered.</p>

<h2>Which public employees are affected</h2>
<ul>
<li>Fire department personnel who respond to hazardous materials incidents, career and volunteer</li>
<li>Police and sheriff's deputies who may be first on scene at a release</li>
<li>Public works, highway and sanitation crews who handle spills or clean up dumped drums</li>
<li>Water and wastewater utility staff who may respond to chemical releases at plants</li>
<li>Emergency management staff who take incident command roles</li>
<li>Employees at publicly owned waste facilities</li>
</ul>

<h2>Matching training to the role</h2>
<div class="table-wrap"><table>
<thead><tr><th>Role</th><th>Typical training</th></tr></thead>
<tbody>
<tr><td>Police officers and public works staff who may arrive first, isolate and call for help</td><td>{{course:osha-4-hour-hazwoper-first-responder-awareness-level-training}}</td></tr>
<tr><td>Firefighters who take defensive action (operations level, at least 8 hours)</td><td>Operations-level training, often delivered within fire service programs</td></tr>
<tr><td>HAZMAT team members (technician level, at least 24 hours)</td><td>{{course:osha-40-hour-hazwoper-for-emergency-response-fire-hazmat-teams}}</td></tr>
<tr><td>Incident commanders</td><td>{{course:osha-8-hour-hazwoper-q-incident-command-training}} on top of at least operations-level training</td></tr>
<tr><td>Crews cleaning up contaminated sites</td><td>{{course:osha-40-hour-hazwoper-training}} or {{course:osha-24-hour-hazwoper-training}} by exposure</td></tr>
</tbody></table></div>

<h2>Practical steps for public employers</h2>
<ol>
<li>Confirm whether your state has a plan covering public employees, or whether EPA's Part 311 applies.</li>
<li>List every role that could respond to a release, including volunteers.</li>
<li>Assign each role a response level and the matching training. The {{page:crew-training-planner|crew training planner}} turns headcounts into an order.</li>
<li>Write or update the emergency response plan and incident command procedures required by paragraph (q).</li>
<li>Set up annual refresher training or competency checks, and keep records for every responder.</li>
</ol>
`,
    faq: [
      ['Does OSHA HAZWOPER apply to city and county employees?', 'Federal OSHA does not cover state and local governments. In states with an OSHA-approved plan the state agency covers them; in other states EPA\'s 40 CFR Part 311 applies the HAZWOPER standard to them.'],
      ['Are volunteer firefighters covered by HAZWOPER?', 'In states without a state plan, EPA\'s 40 CFR Part 311 defines employees to include non-compensated workers, so volunteer responders are covered. State plans set their own coverage for volunteers.'],
      ['What training do police officers need for hazmat incidents?', 'Officers who may be first on scene and are expected only to recognize, isolate and notify generally need first responder awareness level training.'],
    ],
  },

  {
    slug: 'building-a-hazwoper-training-program',
    title: 'How to Build a HAZWOPER Training Program for Your Company',
    short: 'Building a training program',
    desc: 'Step-by-step guide for employers: deciding whether HAZWOPER applies, assigning training levels by role, field experience, refresher scheduling, trainers, site-specific training and budgeting.',
    related: ['osha-8-hour-hazwoper-supervisor-training', 'hazwoper-train-the-trainer-certification', 'osha-40-hour-hazwoper-training'],
    body: `
<p>A HAZWOPER training program is more than buying courses. It's a repeatable system that puts the right training in front of each worker before they need it, and proves you did. Here's how to build one.</p>

<h2>Step 1: Decide whether and how HAZWOPER applies</h2>
<ul>
<li>Do employees work on cleanup sites, RCRA corrective actions or voluntary cleanups recognized by a government body? Then the site-worker rules in paragraph (e) apply.</li>
<li>Do they work at a permitted treatment, storage or disposal facility? Paragraph (p) applies.</li>
<li>Will employees respond to releases anywhere? Paragraph (q) applies, unless you evacuate and rely entirely on outside responders under an emergency action plan.</li>
<li>Check whether a state plan or EPA's Part 311 applies: see {{guide:osha-state-plans-and-hazwoper|state plans and HAZWOPER}}.</li>
</ul>

<h2>Step 2: Build a role-to-training matrix</h2>
<p>List every job title and decide its training from its duties and likely exposure. A simple matrix:</p>
<div class="table-wrap"><table>
<thead><tr><th>Role</th><th>Initial</th><th>Field experience</th><th>Annual</th></tr></thead>
<tbody>
<tr><td>General site worker</td><td>{{course:osha-40-hour-hazwoper-training|40 Hour}}</td><td>3 days supervised</td><td>{{course:osha-8-hour-hazwoper-refresher-training|8 Hour Refresher}}</td></tr>
<tr><td>Occasional site worker</td><td>{{course:osha-24-hour-hazwoper-training|24 Hour}}</td><td>1 day supervised</td><td>8 Hour Refresher</td></tr>
<tr><td>Site supervisor</td><td>40 Hour + {{course:osha-8-hour-hazwoper-supervisor-training|8 Hour Supervisor}}</td><td>3 days supervised</td><td>{{course:osha-8-hour-hazwoper-supervisor-refresher-training|Supervisor Refresher}}</td></tr>
<tr><td>Employee who may discover a release</td><td>{{course:osha-4-hour-hazwoper-first-responder-awareness-level-training|First Responder Awareness}}</td><td>None</td><td>Refresher or competency check</td></tr>
<tr><td>TSDF operator</td><td>{{course:osha-24-hour-hazwoper-rcra-tsd-operations-training|24 Hour TSD}}</td><td>Per facility plan</td><td>{{course:osha-8-hour-hazwoper-annual-refresher-rcra-tsd-operations-training|8 Hour TSD Refresher}}</td></tr>
</tbody></table></div>
<p>The {{page:crew-training-planner|crew training planner}} does this math for you and builds the order.</p>

<h2>Step 3: Plan field experience and site-specific training</h2>
<p>Online courses cover the classroom portion. You still need to arrange supervised field days with a trained, experienced supervisor, and site-specific training before anyone enters a new site: the hazards, the site safety and health plan, work zones, decon and emergency procedures. Record both.</p>

<h2>Step 4: Choose who trains</h2>
<p>Trainers must be qualified by training or by academic credentials and instructional experience (1910.120(e)(5)). Most employers combine online courses for the classroom hours with in-house supervisors for field and site-specific training. Companies with steady hiring often certify an internal instructor with {{course:hazwoper-train-the-trainer-certification}}.</p>

<h2>Step 5: Put refreshers on a calendar</h2>
<p>Track each worker's last training date and schedule the refresher a month before the anniversary. Ordering refreshers for a whole crew at once keeps everyone on the same cycle.</p>

<h2>Step 6: Connect the other programs</h2>
<p>Training sits alongside medical surveillance, respiratory protection (medical evaluation and annual fit testing) and the site safety and health plan. Line their schedules up so workers aren't pulled off the job three separate times.</p>

<h2>Step 7: Budget and document</h2>
<p>See {{guide:budgeting-for-hazwoper-training|budgeting for HAZWOPER training}} for a worked example, and {{guide:hazwoper-training-records-for-employers|training records for employers}} for what to keep.</p>
`,
    faq: [
      ['What should a HAZWOPER training program include?', 'A role-to-training matrix, initial training, supervised field experience, site-specific training, annual refreshers, qualified trainers, and records for every worker, coordinated with medical surveillance and respiratory protection.'],
      ['Can online courses satisfy HAZWOPER training?', 'Online courses can cover the classroom portion. Employers still provide supervised field experience, hands-on practice with site equipment and site-specific training.'],
      ['Who can be a HAZWOPER trainer?', 'Someone qualified by completing a training program for the subjects they teach, or by academic credentials and instructional experience, under 29 CFR 1910.120(e)(5).'],
    ],
  },

  {
    slug: 'hazwoper-training-records-for-employers',
    title: 'HAZWOPER Training Records: What Employers Must Keep and for How Long',
    short: 'Training records',
    desc: 'The records employers keep for HAZWOPER: training certificates, field experience, refreshers, medical and exposure records, respirator fit tests, RCRA training files, and an audit-ready file layout.',
    related: ['osha-8-hour-hazwoper-supervisor-training', 'rcra-hazardous-waste-generator-training', 'osha-8-hour-hazwoper-refresher-training'],
    body: `
<p>When an OSHA inspector, a client's safety auditor or a prime contractor asks for proof of training, you need to produce it quickly for every worker on site. Here's what to keep.</p>

<h2>Records and how long to keep them</h2>
<div class="table-wrap"><table>
<thead><tr><th>Record</th><th>Rule</th><th>Keep</th></tr></thead>
<tbody>
<tr><td>HAZWOPER training certificates (initial and refresher)</td><td>1910.120(e)(7) requires a written certificate</td><td>No set period; keep for at least the length of employment</td></tr>
<tr><td>Supervised field experience</td><td>1910.120(e)(3)</td><td>With the training certificate</td></tr>
<tr><td>Documentation of equivalent prior training</td><td>1910.120(e)(9)</td><td>With the training file; give the worker a copy on request</td></tr>
<tr><td>Medical surveillance records</td><td>1910.120(f) and 1910.1020</td><td>Duration of employment plus 30 years</td></tr>
<tr><td>Exposure monitoring records</td><td>1910.1020</td><td>30 years</td></tr>
<tr><td>Respirator fit test records</td><td>1910.134(m)</td><td>Until the next fit test</td></tr>
<tr><td>Respirator medical evaluations</td><td>1910.134(m) and 1910.1020</td><td>Duration of employment plus 30 years</td></tr>
<tr><td>RCRA personnel training (LQGs and TSDFs)</td><td>40 CFR 262.17(a)(7), 264.16 / 265.16</td><td>Current employees until closure; former employees 3 years</td></tr>
<tr><td>DOT hazmat employee training</td><td>49 CFR 172.704</td><td>Preceding 3 years, plus 90 days after employment ends</td></tr>
</tbody></table></div>
<p>Medical records are confidential. Keep them separate from personnel and training files.</p>

<h2>What a good certificate shows</h2>
<ul>
<li>Worker's full name</li>
<li>Course title and training level (for example, 40 Hour HAZWOPER)</li>
<li>Regulatory basis (29 CFR 1910.120, 8 CCR 5192 and so on)</li>
<li>Completion date and hours</li>
<li>Training provider name and contact details</li>
</ul>

<h2>An audit-ready file for each worker</h2>
<ol>
<li>Training matrix row: role, required courses and due dates</li>
<li>Initial certificate and field experience sign-off</li>
<li>Every refresher certificate, newest first</li>
<li>Site-specific training sign-ins for each site</li>
<li>Respirator fit test (current)</li>
<li>Cross-reference to the separate, confidential medical file</li>
</ol>

<h2>Tracking due dates</h2>
<p>A spreadsheet works for small crews: one row per worker, with columns for last initial training, last refresher, next refresher due, last fit test and next medical exam. Highlight anything due within 60 days. Larger employers use a learning management or EHS system that sends reminders.</p>

<h2>When a worker leaves</h2>
<p>Give the worker copies of their training certificates; they'll need them for their next job. Keep your copies, the medical file (employment plus 30 years) and exposure records as required.</p>
`,
    faq: [
      ['How long must HAZWOPER training records be kept?', 'HAZWOPER does not set a retention period for training certificates, so keep them at least for the length of employment. Medical records are kept for employment plus 30 years and exposure records for 30 years.'],
      ['How long are respirator fit test records kept?', 'Until the next fit test is administered, under 29 CFR 1910.134(m).'],
      ['Do workers get copies of their HAZWOPER certificates?', 'Yes. Workers receive a written certificate when they complete training, and employers should give copies when the worker leaves.'],
    ],
  },

  {
    slug: 'onboarding-new-hires-with-prior-hazwoper-training',
    title: 'Onboarding New Hires With Prior HAZWOPER Training',
    short: 'Onboarding new hires',
    desc: 'How employers verify and accept a new hire\'s prior HAZWOPER training under 1910.120(e)(9), handle lapsed refreshers, and complete site-specific training, field experience, medical and fit testing.',
    related: ['osha-8-hour-hazwoper-refresher-training', 'osha-40-hour-hazwoper-training', 'osha-24-hour-hazwoper-training'],
    body: `
<p>Experienced hires often arrive with a HAZWOPER certificate from a previous employer or training provider. You don't have to retrain them from scratch, but you do have to check what they bring and fill the gaps.</p>

<h2>Accepting prior training</h2>
<p>Under 29 CFR 1910.120(e)(9), an employer who can show by documentation or certification that a worker's experience or training is equivalent to the required initial training doesn't have to repeat that initial training. Two conditions stay:</p>
<ul>
<li>Keep the documentation and give the worker a copy on request.</li>
<li>Workers new to a site still need <strong>site-specific training before entry</strong> and appropriate <strong>supervised field experience at the new site</strong>.</li>
</ul>

<h2>Verification checklist</h2>
<ol>
<li><strong>Certificate</strong>: name, level, hours, regulatory basis, completion date and provider.</li>
<li><strong>Level matches the job</strong>: a 24-hour certificate doesn't cover a general site worker role; they need the additional 16 hours and 2 days, or the full {{course:osha-40-hour-hazwoper-training|40 hour course}}.</li>
<li><strong>Refresher is current</strong>: within the last 12 months.</li>
<li><strong>Supervisor training</strong> if they'll supervise: {{course:osha-8-hour-hazwoper-supervisor-training}}.</li>
<li><strong>State version</strong> if needed, for example Cal/OSHA for California work.</li>
<li><strong>Provider check</strong>: contact the issuer if anything looks off.</li>
</ol>

<h2>If the refresher has lapsed</h2>
<p>OSHA doesn't set a grace period. For a short lapse, most employers have the worker take the {{course:osha-8-hour-hazwoper-refresher-training|8 hour refresher}} before site work and record the employer's judgment that their initial skills are current. For a long lapse, or where skills can't be shown to be current, retake the initial course. Write your policy down and apply it the same way to everyone.</p>

<h2>First-week onboarding plan</h2>
<div class="table-wrap"><table>
<thead><tr><th>When</th><th>Task</th></tr></thead>
<tbody>
<tr><td>Before day 1</td><td>Collect and verify certificates; order any refresher or upgrade course</td></tr>
<tr><td>Day 1</td><td>Company safety orientation; medical surveillance enrollment if their role requires it</td></tr>
<tr><td>Day 1-2</td><td>Respirator medical evaluation and fit test on your models</td></tr>
<tr><td>Before site entry</td><td>Site-specific training: hazards, site plan, work zones, decon, emergency procedures</td></tr>
<tr><td>First site days</td><td>Supervised field experience with a buddy; sign-off by the supervisor</td></tr>
<tr><td>End of week</td><td>Training file complete; refresher due date in the tracking system</td></tr>
</tbody></table></div>

<h2>Hiring several people at once</h2>
<p>Put every refresher, upgrade and new-hire course for the group in one cart. The {{page:crew-training-planner|crew training planner}} builds the order by role.</p>
`,
    faq: [
      ['Do I have to retrain a new hire who already has HAZWOPER?', 'Not the initial training, if you have documentation showing equivalent training under 1910.120(e)(9). They still need site-specific training and supervised field experience at your site, and a current annual refresher.'],
      ['What if a new hire\'s HAZWOPER refresher has expired?', 'Have them complete the 8 hour refresher before site work and document your judgment that their skills are current. After a long lapse, consider retaking the initial course.'],
      ['Is a 24 hour certificate enough for a general site worker?', 'No. General site workers need 40 hours. A 24-hour worker can upgrade with the additional 16 hours and 2 days of field experience, or take the full 40 hour course.'],
    ],
  },

  {
    slug: 'budgeting-for-hazwoper-training',
    title: 'Budgeting for HAZWOPER Training: A Worked Example for a 10-Person Crew',
    short: 'Budgeting for training',
    desc: 'How to budget HAZWOPER training for a crew: first-year and ongoing costs, a worked example for a 10-person remediation crew, hidden costs like field days and wages, and ways to plan ahead.',
    related: ['osha-40-hour-hazwoper-training', 'osha-8-hour-hazwoper-refresher-training', 'osha-8-hour-hazwoper-supervisor-training'],
    body: `
<p>HAZWOPER training costs come in two waves: a larger first-year spend for initial training and a smaller, predictable yearly spend for refreshers. Here's how to plan both, using our list prices. Every seat is billed at the list price, whatever the crew size.</p>

<h2>Worked example: a 10-person remediation crew</h2>
<p>A crew of 8 general site workers, 1 site supervisor and 1 project manager who visits occasionally:</p>
<div class="table-wrap"><table>
<thead><tr><th>Course</th><th>Seats</th><th>Price per seat</th></tr></thead>
<tbody>
<tr><td>{{course:osha-40-hour-hazwoper-training}}</td><td>9 (8 workers + supervisor)</td><td>{{price:osha-40-hour-hazwoper-training}}</td></tr>
<tr><td>{{course:osha-8-hour-hazwoper-supervisor-training}}</td><td>1</td><td>{{price:osha-8-hour-hazwoper-supervisor-training}}</td></tr>
<tr><td>{{course:osha-24-hour-hazwoper-training}}</td><td>1 (project manager)</td><td>{{price:osha-24-hour-hazwoper-training}}</td></tr>
</tbody></table></div>
<p>In later years the crew needs 9 seats of the {{course:osha-8-hour-hazwoper-refresher-training|8 hour refresher}} ({{price:osha-8-hour-hazwoper-refresher-training}} each) and 1 {{course:osha-8-hour-hazwoper-supervisor-refresher-training|supervisor refresher}} ({{price:osha-8-hour-hazwoper-supervisor-refresher-training}}). Multiply seats by price for each line, or let the {{page:crew-training-planner|crew training planner}} add it up and build the order.</p>

<h2>Costs beyond the course fee</h2>
<ul>
<li><strong>Paid training time</strong>: a 40-hour course is a full work week per person. Budget wages for it.</li>
<li><strong>Field experience</strong>: 3 days (40-hour) or 1 day (24-hour) on site under a trained supervisor, usually less productive time.</li>
<li><strong>Medical surveillance</strong>: baseline and annual exams for workers who need them.</li>
<li><strong>Respiratory protection</strong>: medical evaluations, annual fit tests and respirators.</li>
<li><strong>Site-specific training</strong>: a few hours at each new site.</li>
<li><strong>Turnover</strong>: new hires without certificates need initial training. Budget for your typical hiring rate.</li>
</ul>

<h2>Ways to keep costs predictable</h2>
<ul>
<li><strong>Put the whole crew on one refresher cycle</strong> and order everyone's seats in one cart once a year.</li>
<li><strong>Check prior training</strong> before buying initial courses for experienced hires: see {{guide:onboarding-new-hires-with-prior-hazwoper-training|onboarding new hires}}.</li>
<li><strong>Match the level to the job</strong>: don't buy 40-hour seats for people who only need awareness training, and don't under-train people who need 40 hours.</li>
<li><strong>Self-paced online training</strong> lets workers train in slow periods instead of losing a block of days to a classroom course.</li>
<li><strong>Consider train-the-trainer</strong> if you hire often: {{course:hazwoper-train-the-trainer-certification}} ({{price:hazwoper-train-the-trainer-certification}}).</li>
</ul>

<h2>Paying</h2>
<p>Pay by card at checkout for every course and seat at once, or call for purchase-order billing.</p>
`,
    faq: [
      ['How much does HAZWOPER training cost per worker?', 'It depends on the level: the 40 hour course, 24 hour course and 8 hour refresher each have a fixed per-seat list price on this site. Budget wages for training time, field experience, medical surveillance and respirator fit testing on top.'],
      ['Is there a discount for training a whole crew?', 'Every seat is billed at the list price shown, whatever the crew size, so budgets and quotes are simple. Purchase-order billing is available by phone.'],
      ['What ongoing HAZWOPER costs should employers expect?', 'An 8 hour refresher for every 40-hour and 24-hour trained worker each year, supervisor refreshers, annual medical exams and fit tests where required, and initial training for new hires.'],
    ],
  },

  {
    slug: 'contractors-and-multi-employer-hazwoper-sites',
    title: 'Contractors, Subcontractors and Multi-Employer HAZWOPER Sites',
    short: 'Contractors & multi-employer sites',
    desc: 'HAZWOPER duties when several employers share a site: informing contractors under 1910.120(b), OSHA\'s multi-employer citation policy, verifying subcontractor training and prequalification checklists.',
    related: ['osha-8-hour-hazwoper-supervisor-training', 'osha-40-hour-hazwoper-training', 'osha-8-hour-hazwoper-refresher-training'],
    body: `
<p>Cleanup sites are rarely one-company jobs. A prime contractor may manage drillers, excavation subs, a lab, waste haulers and specialty contractors at the same time. HAZWOPER and OSHA's enforcement policy both address who is responsible for what.</p>

<h2>What HAZWOPER requires</h2>
<ul>
<li><strong>Share the safety and health program.</strong> The written program must be made available to any contractor or subcontractor involved in the hazardous waste operation (1910.120(b)(1)(iv)).</li>
<li><strong>Tell contractors about hazards.</strong> Employers who hire contractors must inform them of the site emergency response procedures and any known fire, explosion, health, safety or other hazards (1910.120(b)(1)(v)).</li>
<li><strong>One site safety and health plan</strong> governs work on the site, and everyone on site follows it.</li>
</ul>

<h2>OSHA's multi-employer citation policy</h2>
<p>On multi-employer worksites, OSHA can cite more than one employer for the same hazard. Its policy describes four roles:</p>
<div class="table-wrap"><table>
<thead><tr><th>Role</th><th>Who it is</th></tr></thead>
<tbody>
<tr><td>Creating employer</td><td>Caused the hazardous condition</td></tr>
<tr><td>Exposing employer</td><td>Its own employees are exposed to the hazard</td></tr>
<tr><td>Correcting employer</td><td>Responsible for fixing the hazard, such as the sub hired to maintain decon or ventilation</td></tr>
<tr><td>Controlling employer</td><td>Has general supervisory authority over the site, including the power to correct hazards or require others to</td></tr>
</tbody></table></div>
<p>A prime contractor or site owner acting as controlling employer is expected to use reasonable care to prevent and detect violations, which includes checking that subcontractor workers are trained.</p>

<h2>Prequalifying subcontractors</h2>
<ul>
<li>Training certificates for every worker who'll be on site, at the right level, with refreshers within 12 months</li>
<li>Supervisor training for their on-site lead</li>
<li>Medical surveillance and respirator fit test confirmation for workers who need them</li>
<li>Their safety and health program and recent safety performance (for example, OSHA 300A summaries and citation history)</li>
<li>Agreement to follow the site safety and health plan and attend pre-entry briefings</li>
</ul>

<h2>On site</h2>
<ul>
<li>Check training at the access control point before badging workers in.</li>
<li>Include subcontractor crews in pre-entry briefings and site-specific training.</li>
<li>Use one emergency response plan and one communication system for everyone.</li>
</ul>

<h2>Helping subcontractors get compliant</h2>
<p>When a sub's crew is short on training, they can buy every course and seat they need in one order and start right away. Point them to the {{page:crew-training-planner|crew training planner}}.</p>
`,
    faq: [
      ['Does the prime contractor have to verify subcontractor HAZWOPER training?', 'Under OSHA\'s multi-employer citation policy, a controlling employer must use reasonable care to prevent and detect violations, which in practice includes checking subcontractor workers\' training before they go on site.'],
      ['What must a hiring employer tell contractors under HAZWOPER?', 'The site emergency response procedures and any known fire, explosion, health, safety or other hazards, and make the written safety and health program available to them.'],
      ['What are the four employer types in OSHA\'s multi-employer policy?', 'Creating, exposing, correcting and controlling employers.'],
    ],
  },

  {
    slug: 'training-spanish-speaking-and-multilingual-crews',
    title: 'HAZWOPER Training for Spanish-Speaking and Multilingual Crews',
    short: 'Spanish-speaking crews',
    desc: 'OSHA expects training in a language and vocabulary workers understand. How employers train Spanish-speaking and multilingual HAZWOPER crews, check comprehension and handle site communication.',
    related: ['osha-40-hour-hazwoper-training-spanish', 'osha-40-hour-hazwoper-training', 'osha-8-hour-hazwoper-refresher-training'],
    body: `
<p>Training only counts if workers understand it. OSHA has long said that employers must present safety training in a manner employees can understand, which means in a language and vocabulary they understand. For crews with Spanish-speaking or multilingual members, that shapes how you choose and deliver HAZWOPER training.</p>

<h2>What OSHA expects</h2>
<p>In a 2010 enforcement memorandum, OSHA directed inspectors to check that training required by its standards is presented in a way employees can understand. If a worker can't read or understand the language of the course, the training doesn't meet the requirement, even if they sat through it.</p>

<h2>Options for Spanish-speaking crews</h2>
<ul>
<li><strong>Spanish-language course</strong>: {{course:osha-40-hour-hazwoper-training-spanish}} ({{price:osha-40-hour-hazwoper-training-spanish}}) covers the full 40 hours in Spanish.</li>
<li><strong>Bilingual supervisors</strong> for field experience, site-specific training and briefings.</li>
<li><strong>Translated site documents</strong>: key parts of the site safety and health plan, emergency procedures and decon steps.</li>
</ul>

<h2>Checking comprehension</h2>
<ul>
<li>Ask workers to explain or demonstrate key procedures in their own words: donning and doffing PPE, decon steps, evacuation signals.</li>
<li>Use the final exam in the worker's language, and review missed topics one to one.</li>
<li>Watch the first field days closely and correct misunderstandings on the spot.</li>
</ul>

<h2>Site communication for mixed-language crews</h2>
<ul>
<li>Use pictogram-based signs and labels, and point to GHS pictograms during briefings.</li>
<li>Agree on simple hand signals for exclusion zone work, where respirators make speech hard.</li>
<li>Pair workers in the buddy system so each pair can communicate.</li>
<li>Make sure emergency alarms and evacuation signals are understood by everyone, regardless of language.</li>
</ul>

<h2>Literacy, not only language</h2>
<p>Some workers speak a language fluently but read it with difficulty. Mix written material with demonstrations, visuals and hands-on practice, and give extra time where needed.</p>

<h2>Ordering for a mixed crew</h2>
<p>Add Spanish and English 40-hour seats to the same cart, along with refreshers and supervisor courses, and check out once. The {{page:crew-training-planner|crew training planner}} has a separate line for Spanish-speaking workers.</p>
`,
    faq: [
      ['Does OSHA require training in Spanish for Spanish-speaking workers?', 'OSHA requires training to be presented in a language and vocabulary workers understand. For workers who understand Spanish better than English, that means Spanish-language training or effective interpretation.'],
      ['Is the 40 hour HAZWOPER course available in Spanish?', 'Yes. The OSHA 40-Hour HAZWOPER Training is available in a full Spanish-language version.'],
      ['How can employers confirm workers understood the training?', 'Have workers explain or demonstrate key procedures, review missed exam topics, and watch closely during supervised field experience.'],
    ],
  },
];
