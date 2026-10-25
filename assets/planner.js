// Crew training planner: sums seats per course from the role inputs ([data-role], [data-courses]),
// prices them from HZ_ITEMS (assets/config.js) and adds them to the cart (assets/cart.js).
document.addEventListener('DOMContentLoaded', function () {
  var inputs = Array.prototype.slice.call(document.querySelectorAll('input[data-role]'));
  if (!inputs.length) return;
  var rows = document.getElementById('planRows');
  var totalEl = document.getElementById('planTotal');
  var wrap = document.getElementById('planTableWrap');
  var empty = document.getElementById('planEmpty');
  var addBtn = document.getElementById('planAdd');
  var checkout = document.getElementById('planCheckout');
  var plan = [];

  var compute = function () {
    var seats = {};
    var order = [];
    inputs.forEach(function (input) {
      var n = parseInt(input.value, 10);
      if (!(n > 0)) return;
      input.getAttribute('data-courses').split(',').forEach(function (slug) {
        if (!findHzItem(slug)) { console.warn('planner: unknown course ' + slug); return; }
        if (!seats[slug]) { seats[slug] = 0; order.push(slug); }
        seats[slug] += n;
      });
    });
    return order.map(function (slug) {
      var item = findHzItem(slug);
      return { slug: slug, item: item, qty: seats[slug], amount: Math.round(item.price * seats[slug] * 100) / 100 };
    });
  };

  var render = function () {
    plan = compute();
    rows.textContent = '';
    var total = 0;
    plan.forEach(function (l) {
      total += l.amount;
      var tr = document.createElement('tr');
      [l.item.name, String(l.qty), '$' + formatMoney(l.item.price), '$' + formatMoney(l.amount)].forEach(function (text) {
        var td = document.createElement('td');
        td.textContent = text;
        tr.appendChild(td);
      });
      rows.appendChild(tr);
    });
    totalEl.textContent = '$' + formatMoney(Math.round(total * 100) / 100);
    wrap.hidden = !plan.length;
    empty.hidden = plan.length > 0;
    addBtn.disabled = !plan.length;
    addBtn.textContent = 'Add all to cart';
    checkout.hidden = true;
  };

  inputs.forEach(function (input) { input.addEventListener('input', render); });

  // Adds the planned seats on top of anything already in the cart.
  addBtn.addEventListener('click', function () {
    plan.forEach(function (l) {
      var existing = HZCart.items().filter(function (c) { return c.slug === l.slug; })[0];
      HZCart.add(l.slug, l.qty);
      if (existing) HZCart.setQty(l.slug, existing.qty + l.qty);
    });
    addBtn.disabled = true;
    addBtn.textContent = 'Added to cart';
    checkout.hidden = false;
    if (typeof window.gtag === 'function') window.gtag('event', 'add_to_cart', { items: plan.map(function (l) { return { item_id: l.slug, quantity: l.qty }; }) });
  });

  render();
});
