// Site settings read by tools/build.js. Courses, guides, quizzes and checkout are shared with the
// sister sites; this file and assets/style.css give HazwoperOSHA.us its own identity.
module.exports = {
  url: 'https://www.hazwoperosha.us',
  brand: 'HazwoperOSHA.us',
  legalName: 'HAZWOPER OSHA Training LLC',
  orderFrom: 'hazwoperosha-us',
  themeColor: '#15171c',
  shareImage: 'assets/share.png',
  sameAs: ['https://hazwoper-osha.com/'],
  headExtra: `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-N2Q1952P02"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-N2Q1952P02');
</script>
`
    + '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    + '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@400;500;600;700&display=swap">\n',
  logo: () => `<span class="wm"><svg class="wm-mark" viewBox="0 5 40 30" width="40" height="30" aria-hidden="true"><path d="M6.5 25.5C6.5 15.6 12.4 8.5 20 8.5s13.5 7.1 13.5 17Z" fill="#ff5a1f"/><path d="M16.6 9.2C17.6 8.8 18.8 8.5 20 8.5s2.4.3 3.4.7V25.5h-6.8Z" fill="#15171c" opacity=".28"/><path d="M11.8 13.6c-1.6 2.6-2.5 6.3-2.6 11.9M28.2 13.6c1.6 2.6 2.5 6.3 2.6 11.9" stroke="#15171c" stroke-opacity=".28" stroke-width="1.6" fill="none" stroke-linecap="round"/><rect x="1.5" y="25" width="37" height="6.5" rx="3.25" fill="#ff5a1f"/><rect x="5" y="25" width="30" height="1.8" fill="#15171c" opacity=".35"/></svg><span class="wm-text">HAZWOPER<b>OSHA</b><small>.US</small></span></span>`,
};
