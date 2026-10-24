// Site settings read by tools/build.js. Courses, guides, quizzes and checkout are shared with the
// sister sites; this file and assets/style.css give HazwoperOSHA.us its own identity.
module.exports = {
  url: 'https://lj-web-management.github.io/hazwoperosha.us',
  brand: 'HazwoperOSHA.us',
  legalName: 'HAZWOPER OSHA Training LLC',
  orderFrom: 'hazwoperosha-us',
  themeColor: '#15171c',
  shareImage: 'assets/share.png',
  sameAs: ['https://hazwoper-osha.com/'],
  headExtra: '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    + '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600;700&display=swap">\n',
  logo: () => `<span class="wm"><svg class="wm-mark" viewBox="0 0 40 36" width="40" height="36" aria-hidden="true"><path d="M20 2 38 34H2Z" fill="#ff5a1f" stroke="#15171c" stroke-width="2.5" stroke-linejoin="round"/><path d="M20 12v11" stroke="#15171c" stroke-width="4" stroke-linecap="round"/><circle cx="20" cy="28.5" r="2.4" fill="#15171c"/></svg><span class="wm-text">HAZWOPER<b>OSHA</b><small>.US</small></span></span>`,
};
