// HazwoperOSHA.us wording: HAZWOPER training for employers and crews. tools/build.js uses these in place
// of its default (catalog-site) copy. HTML strings may use link tokens: {{course:slug}}, {{guide:slug|text}},
// {{page:slug|text}}, {{price:slug}}, {{enroll:slug|classes}}, {{cart:slug|classes}}, {{cards:guides}}.
module.exports = ({ BRAND, PHONE, PHONE_HREF, EMAIL, money }) => {
  const lengthText = c => {
    const m = /^(\d+)\s*(Hour|Min)/i.exec(c.duration);
    return m ? `${m[1]}-${/min/i.test(m[2]) ? 'minute' : 'hour'}` : 'self-paced';
  };
  // Crew training planner roles: [id, role, note, course slugs]. assets/planner.js reads the slugs from the page.
  const ROLES = [
    ['new-site-worker', 'New general site worker', 'Hands-on cleanup work with possible exposure above limits or respirator use', ['osha-40-hour-hazwoper-training']],
    ['new-site-worker-es', 'New general site worker (Spanish)', 'Same role, trained in Spanish', ['osha-40-hour-hazwoper-training-spanish']],
    ['occasional-worker', 'New occasional site worker', 'Limited tasks on site with low exposure, no respirator', ['osha-24-hour-hazwoper-training']],
    ['new-supervisor', 'New site supervisor (no prior HAZWOPER)', 'Needs worker-level training plus supervisor hours', ['osha-40-hour-hazwoper-training', 'osha-8-hour-hazwoper-supervisor-training']],
    ['trained-supervisor', 'Trained supervisor, initial supervisor course', 'Already has 40 hours; adds the 8 supervisor hours', ['osha-8-hour-hazwoper-supervisor-training']],
    ['refresher', 'Trained worker due for annual refresher', '40 or 24 hour trained, last training about a year ago', ['osha-8-hour-hazwoper-refresher-training']],
    ['supervisor-refresher', 'Supervisor due for annual refresher', 'Refresher with supervisor content', ['osha-8-hour-hazwoper-supervisor-refresher-training']],
    ['awareness', 'Employee who may discover a release', 'Recognize, isolate and notify; no response duties', ['osha-4-hour-hazwoper-first-responder-awareness-level-training']],
    ['incident-commander', 'Incident commander', 'Takes command of releases; needs operations-level training first', ['osha-8-hour-hazwoper-q-incident-command-training']],
    ['ert', 'Plant emergency response team member', 'Manufacturing or chemical plant ERT', ['manufacturing-emergency-response-team-ert-training']],
    ['tsdf', 'New TSD facility operator', 'Permitted treatment, storage or disposal facility', ['osha-24-hour-hazwoper-rcra-tsd-operations-training']],
    ['tsdf-refresher', 'TSD facility operator due for refresher', 'Annual TSD refresher', ['osha-8-hour-hazwoper-annual-refresher-rcra-tsd-operations-training']],
    ['ca-site-worker', 'New California general site worker', 'Cal/OSHA 8 CCR 5192 version', ['cal-osha-40-hour-hazwoper-training']],
    ['ca-refresher', 'California worker due for refresher', 'Cal/OSHA annual refresher', ['cal-osha-8-hour-hazwoper-refresher-training']],
    ['waste-handler', 'Hazardous waste generator staff', 'Accumulation areas, labeling, manifests at generator sites', ['rcra-hazardous-waste-generator-training']],
  ];
  // Courses employers commonly order alongside each course group.
  const PAIRS = {
    core: ['osha-8-hour-hazwoper-refresher-training', 'osha-8-hour-hazwoper-supervisor-training'],
    industry: ['osha-8-hour-hazwoper-supervisor-training', 'osha-8-hour-hazwoper-refresher-training'],
    refresher: ['osha-40-hour-hazwoper-training', 'osha-4-hour-hazwoper-first-responder-awareness-level-training'],
    state: ['cal-osha-8-hour-hazwoper-refresher-training', 'osha-8-hour-hazwoper-supervisor-training'],
    rcra: ['hazardous-waste-manifest-training', 'hazardous-waste-satellite-accumulation-area-training'],
    spill: ['osha-40-hour-hazwoper-training', 'osha-spill-prevention-and-response-safety-training'],
    trainer: ['osha-8-hour-hazwoper-supervisor-training', 'osha-40-hour-hazwoper-training'],
  };

  return {
    describe: c => `${c.name} is a ${lengthText(c)} online course that meets ${c.citation}, for individual workers or whole crews.${c.audience ? ` Typical learners: ${c.audience.charAt(0).toLowerCase() + c.audience.slice(1)}.` : ''} Order one seat or a seat for every worker in a single checkout. Each learner trains at their own pace and gets a certificate and wallet card on passing.`,
    metaDesc: c => `${c.name} for employers and crews: ${c.duration}, ${money(c.price)} per seat, meets ${c.citation}. Order seats for your whole team in one checkout. ${BRAND}.`,

    faq: [
      ['Can I buy training for my whole crew in one order?', 'Yes. Add every course your crew needs to the cart, set the number of seats for each course, and check out once. The crew training planner builds the cart for you from roles and headcounts.'],
      ['Can we pay by purchase order or invoice?', `Yes. Call ${PHONE} or email ${EMAIL} for purchase-order billing. Card payments are taken securely at checkout.`],
      ['Do I need every learner\'s name at checkout?', 'No. Check out with the buyer\'s details and the number of seats. Learner names and emails can be sent after the order is confirmed.'],
      ['Is there a volume discount?', 'Every seat is billed at the list price shown, whatever the crew size, so quotes and budgets are simple to work out.'],
      ['Will OSHA accept online HAZWOPER training for my workers?', 'Online training can cover the classroom portion. You still provide supervised field experience, hands-on practice with your equipment and site-specific training.'],
      ['Our new hires trained elsewhere. Do they have to retrain?', 'Not necessarily. Under 1910.120(e)(9) you can accept documented equivalent training, but new hires still need site-specific training, field experience at your site and a current annual refresher.'],
      ['Do you have training for Spanish-speaking crews?', 'Yes. The OSHA 40-Hour HAZWOPER course is available in Spanish, and Spanish and English seats can go in the same order.'],
      ['Which courses do California crews need?', 'California work falls under Cal/OSHA 8 CCR 5192. Cal/OSHA 40 hour, 24 hour and 8 hour refresher courses are available, along with TSDF versions.'],
    ],

    groups: {
      core: { title: 'Core Crew Training: 40, 24 & 4 Hour', blurb: 'The base HAZWOPER levels most employers order first.' },
      industry: { title: '40-Hour Courses by Industry', blurb: 'Full 40-hour HAZWOPER built around your crew\'s industry.' },
      refresher: { title: 'Annual Refreshers, Supervisors & Incident Command', blurb: 'Keep the whole crew current each year, and train the people who lead them.' },
      state: { title: 'Cal/OSHA & State-Plan Versions', blurb: 'For crews working in California and other state-plan states.' },
      rcra: { title: 'Hazardous Waste Staff (RCRA & TSDF)', blurb: 'For generator, shipping and TSD facility staff.' },
      spill: { title: 'Spill, Monitoring & PPE Modules', blurb: 'Short add-on modules for specific crew skills.' },
      trainer: { title: 'Train Your Own Instructors', blurb: 'For companies that train new hires in-house.' },
    },

    nav: [['Courses', '#courses'], ['Crew planner', 'crew-training-planner/'], ['Employer resources', 'guides/'], ['FAQ', '#faq']],
    searchPlaceholder: 'Search courses & guides...',
    searchExamples: 'Try: supervisor, refresher, state plan, Spanish, records, TSDF...',
    footerBlurb: 'Online OSHA HAZWOPER training for employers and crews: every course and seat in one order, with certificates for every worker.',
    footerResourcesTitle: 'For employers',
    llmsSummary: `${BRAND} provides online OSHA HAZWOPER training for employers, contractors and public agencies who train crews, with a crew training planner that turns roles and headcounts into one order, and employer resources on training by industry, OSHA state plans, public employees and volunteers (EPA 40 CFR 311), building a training program, recordkeeping, onboarding experienced hires, budgeting, multi-employer sites and Spanish-speaking crews.`,

    home: {
      title: `HAZWOPER Training for Employers: Train Your Whole Crew Online | ${BRAND}`,
      desc: 'Order online OSHA HAZWOPER training for your whole crew in one checkout: 40 hour, 24 hour, refreshers, supervisor, incident command, Cal/OSHA and Spanish, plus a free crew training planner.',
      eyebrow: 'For employers, contractors and safety managers',
      h1: 'HAZWOPER Training for Your Whole Crew, in One Order',
      lead: 'Tell us who is on your crew and what they do. We will show you the HAZWOPER courses each role needs, and you can order every seat in a single checkout. Workers train online at their own pace.',
      ctas: `<a class="btn btn-lg" href="crew-training-planner/">Plan your crew's training</a>
        <a class="btn btn-ghost btn-lg" href="#courses">Browse courses</a>
        <a class="btn btn-ghost btn-lg" href="${PHONE_HREF}">Call ${PHONE}</a>`,
      trust: ['Every course and seat in one checkout', 'Purchase orders by phone', 'Certificate and wallet card for every worker', 'Spanish 40-hour course for mixed crews'],
      quickTitle: 'Crew favorites',
      quick: ['osha-40-hour-hazwoper-training', 'osha-8-hour-hazwoper-refresher-training', 'osha-8-hour-hazwoper-supervisor-training', 'osha-4-hour-hazwoper-first-responder-awareness-level-training'],
      quickNote: 'Not sure what each role needs? Use the {{page:crew-training-planner|crew training planner}}.',
      middle: `<section class="wrap which" id="industries" aria-labelledby="h-industries">
  <h2 id="h-industries">HAZWOPER training by industry</h2>
  <div class="table-wrap">
  <table>
    <thead><tr><th>Industry</th><th>Courses most crews need</th></tr></thead>
    <tbody>
      <tr><td>Environmental consulting &amp; remediation</td><td>{{course:osha-40-hour-hazwoper-for-environmental-remediation|40 Hour (Remediation)}}, {{course:osha-8-hour-hazwoper-supervisor-training|8 Hour Supervisor}}, {{course:osha-8-hour-hazwoper-refresher-training|8 Hour Refresher}}</td></tr>
      <tr><td>Construction on contaminated sites</td><td>{{course:osha-40-hour-hazwoper-for-construction-contaminated-sites|40 Hour (Construction)}}, {{course:osha-24-hour-hazwoper-training|24 Hour}} for occasional trades</td></tr>
      <tr><td>Oil &amp; gas and spill response</td><td>{{course:osha-40-hour-hazwoper-for-oil-and-gas-spill-response|40 Hour (Oil &amp; Gas Spill Response)}}, {{course:osha-8-hour-hazwoper-q-incident-command-training|Incident Command}}</td></tr>
      <tr><td>Utilities &amp; pipelines</td><td>{{course:osha-40-hour-hazwoper-for-utility-pipeline-emergency-response|40 Hour (Utility/Pipeline)}}, {{course:osha-4-hour-hazwoper-first-responder-awareness-level-training|First Responder Awareness}}</td></tr>
      <tr><td>Manufacturing &amp; chemical plants</td><td>{{course:manufacturing-emergency-response-team-ert-training|ERT Training}}, First Responder Awareness for all staff</td></tr>
      <tr><td>Waste management &amp; TSDFs</td><td>{{course:osha-24-hour-hazwoper-rcra-tsd-operations-training|24 Hour TSD}}, {{course:hazardous-waste-manifest-training|Manifest Training}}</td></tr>
      <tr><td>Hospitals, labs &amp; universities</td><td>{{course:rcra-hazardous-waste-generator-training|RCRA Generator}}, {{course:hazardous-waste-satellite-accumulation-area-training|Satellite Accumulation}}</td></tr>
    </tbody>
  </table>
  </div>
  <p class="group-blurb">Full breakdown by role: {{guide:hazwoper-training-by-industry|HAZWOPER training by industry}}.</p>
</section>`,
      coursesTitle: 'Courses for Your Crew',
      after: `<section class="wrap resources" id="employer-resources" aria-labelledby="h-res">
  <h2 id="h-res">Employer resources</h2>
  <p class="group-blurb">Practical guides for the people who plan, buy and track HAZWOPER training.</p>
  {{cards:guides}}
</section>

<section class="wrap about" aria-labelledby="h-about">
  <h2 id="h-about">Why employers order here</h2>
  <div class="cols">
    <div>
      <h3>Simple ordering</h3>
      <ul class="checks">
        <li>One cart and one checkout for every course and seat</li>
        <li>Learner names can be sent after the order</li>
        <li>Card at checkout, or purchase order by phone</li>
        <li>The same list price per seat for any crew size</li>
      </ul>
    </div>
    <div>
      <h3>Training that fits the job</h3>
      <ul class="checks">
        <li>Every HAZWOPER level, plus RCRA, TSDF and emergency response courses</li>
        <li>Federal OSHA, Cal/OSHA and state-plan versions</li>
        <li>Spanish-language 40-hour course</li>
        <li>Self-paced, so workers can train around shifts</li>
      </ul>
    </div>
  </div>
</section>`,
      faqTitle: 'Employer FAQ',
      ctaTitle: 'Get your crew trained this week',
      ctaButtons: `<a class="btn btn-lg btn-dark" href="crew-training-planner/">Open the crew planner</a> <a class="btn btn-ghost btn-lg" href="${PHONE_HREF}">Call ${PHONE}</a>`,
    },

    course: {
      whoTitle: 'Who on your crew needs this course',
      extra: c => `<h2>Planning for a crew?</h2>
  <p>Employers ordering this course often add ${(PAIRS[c.group] || PAIRS.core).filter(s => s !== c.slug).map(s => `{{course:${s}}} ({{price:${s}}})`).join(' and ')}. Use the {{page:crew-training-planner|crew training planner}} to build an order for every role on your team.</p>`,
      howTitle: 'How ordering works',
      howSteps: ['Add seats for everyone who needs this course, plus any other courses, to one cart.', 'Check out once by card, or call for purchase-order billing.', 'Send learner names after the order. Each worker trains at their own pace and downloads a certificate and wallet card on passing.'],
      buyChecks: ['One order for the whole crew', 'Same price per seat at any crew size', 'Certificate and wallet card for each worker'],
      resourcesTitle: 'Employer resources for this course',
      relatedTitle: 'Other courses crews order',
    },

    guides: {
      label: 'Employer Resources',
      allLink: 'All employer resources',
      cardLabel: 'Employer guide',
      readLink: 'Read the guide',
      eyebrow: 'Employer guide',
      sideCourses: 'Courses for this crew',
      moreTitle: 'More employer resources',
      hubName: `${BRAND} employer resources`,
      hubTitle: `HAZWOPER Employer Resources: Programs, Records, State Plans & Budgets | ${BRAND}`,
      hubDesc: 'Guides for employers who train HAZWOPER crews: training by industry, OSHA state plans, public employees and volunteers, building a program, records, onboarding, budgeting, contractors and Spanish-speaking crews.',
      hubH1: 'HAZWOPER Employer Resources',
      hubLead: 'Practical guides for safety managers, owners and HR teams who plan, buy and track HAZWOPER training for crews.',
    },

    pages: [{
      slug: 'crew-training-planner',
      title: 'HAZWOPER Crew Training Planner',
      short: 'Crew training planner',
      desc: 'Free HAZWOPER crew training planner: enter how many workers you have in each role and get the courses, seats and total, then add everything to your cart in one click.',
      h1: 'HAZWOPER Crew Training Planner',
      scripts: ['planner.js'],
      body: `<p class="lead">Enter how many people you have in each role. The planner lists the courses they need, adds up the seats and total at list price, and puts everything in your cart in one click.</p>
  <form class="planner" id="planner" onsubmit="return false">
    <div class="table-wrap">
    <table>
      <thead><tr><th>Role</th><th>Course(s)</th><th>Workers</th></tr></thead>
      <tbody>
        ${ROLES.map(([id, role, note, slugs]) => `<tr>
          <td><strong>${role}</strong><br><span class="muted small">${note}</span></td>
          <td>${slugs.map(s => `{{course:${s}}} <span class="muted small">{{price:${s}}}</span>`).join('<br>')}</td>
          <td><label class="sr" for="r-${id}">Workers: ${role}</label><input class="form-control plan-qty" id="r-${id}" type="number" min="0" max="10000" step="1" value="0" inputmode="numeric" data-role="${id}" data-courses="${slugs.join(',')}"></td>
        </tr>`).join('\n        ')}
      </tbody>
    </table>
    </div>
  </form>
  <div class="plan-summary" id="planSummary" aria-live="polite">
    <h2>Your crew's order</h2>
    <p id="planEmpty" class="muted">Enter worker counts above to see the courses and total.</p>
    <div class="table-wrap" id="planTableWrap" hidden>
      <table>
        <thead><tr><th>Course</th><th>Seats</th><th>Price per seat</th><th>Line total</th></tr></thead>
        <tbody id="planRows"></tbody>
        <tfoot><tr><th colspan="3">Total</th><th id="planTotal">$0.00</th></tr></tfoot>
      </table>
    </div>
    <p class="plan-actions"><button type="button" class="btn btn-lg" id="planAdd" disabled>Add all to cart</button> <a class="btn btn-ghost btn-lg" href="../checkout.html" id="planCheckout" hidden>Go to checkout</a></p>
    <p class="hint">Every seat is billed at list price. Workers who supervise also need worker-level training; incident commanders need at least operations-level training before the incident command course. Check each role against your site safety and health plan. Purchase orders: <a href="${PHONE_HREF}">${PHONE}</a>.</p>
  </div>
  <h2>How to use the results</h2>
  <ul class="checks">
    <li>Count each worker once, in the role that matches their main duties.</li>
    <li>For workers who already have training, use the refresher rows. See {{guide:onboarding-new-hires-with-prior-hazwoper-training|onboarding new hires}} for accepting prior training.</li>
    <li>Supervised field experience and site-specific training happen on your site after the online courses.</li>
    <li>Not sure which role fits? Read {{guide:hazwoper-training-by-industry|training by industry}} or call us.</li>
  </ul>`,
      faq: [
        ['Does the planner place an order?', 'No. It adds the courses and seats to your cart. You review everything and pay at checkout.'],
        ['Are the prices in the planner final?', 'Yes. The planner uses the same list price per seat as checkout, with no volume discount, so the total matches your cart.'],
        ['What if a role is missing?', `Choose the closest role, or call ${PHONE} and we will help you match training to the job.`],
      ],
    }],
  };
};
