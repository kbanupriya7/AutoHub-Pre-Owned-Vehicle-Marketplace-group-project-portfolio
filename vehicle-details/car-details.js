// AutoHub shared detail-page renderer and thumbnail gallery.
document.addEventListener('DOMContentLoaded', () => {
  const type = document.body.dataset.vehicleType;
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || (type === 'car' ? 'car1' : 'bike1');
  const vehicle = (window.vehicles || []).find(item => item.id === id && item.id.startsWith(type));
  const $ = (selector) => document.querySelector(selector);
  const setText = (selector, value) => { const node = $(selector); if (node) node.textContent = value || 'Not provided'; };

  if (!vehicle) {
    setText('#vehicleTitle', 'Vehicle not found');
    setText('#vehicleVariant', 'Please check the listing link.');
    const gallery = $('#mainPhoto'); if (gallery) gallery.innerHTML = '<div class="vehicle-image-fallback">Vehicle listing not found.</div>';
    return;
  }

  document.title = `${vehicle.year} ${vehicle.name} | AutoHub`;
  setText('#vehicleTitle', `${vehicle.year} ${vehicle.name}`);
  setText('#breadcrumbName', vehicle.name);
  setText('#vehicleVariant', vehicle.variant);
  setText('#vehiclePrice', vehicle.price);
  setText('#vehicleKm', vehicle.km);
  setText('#vehicleFuel', vehicle.fuel);
  setText('#vehicleTransmission', vehicle.transmission);
  setText('#vehicleRegistration', vehicle.registration);
  setText('#vehicleLocation', vehicle.location);

  const images = vehicle.images || [];
  const mainImage = $('#galleryMainImage');
  const thumbs = $('#thumbnailRow');
  const counter = $('#photoCounter');
  if (mainImage && thumbs) {
    thumbs.innerHTML = '';
    images.forEach((src, index) => {
      const button = document.createElement('button');
      button.type = 'button'; button.className = `thumbnail${index === 0 ? ' is-active' : ''}`;
      button.setAttribute('aria-label', `Show vehicle photo ${index + 1}`);
      const img = document.createElement('img'); img.src = src; img.alt = `${vehicle.name} photo ${index + 1}`;
      img.onerror = () => { img.style.visibility = 'hidden'; button.classList.add('image-missing'); };
      button.appendChild(img);
      button.addEventListener('click', () => showImage(index));
      thumbs.appendChild(button);
    });
    function showImage(index) {
      mainImage.src = images[index]; mainImage.alt = `${vehicle.name} photo ${index + 1}`;
      if (counter) counter.textContent = `${index + 1} / ${images.length}`;
      [...thumbs.children].forEach((item, i) => item.classList.toggle('is-active', i === index));
    }
    if (images.length) { showImage(0); mainImage.onerror = () => { mainImage.replaceWith(Object.assign(document.createElement('div'), { className: 'vehicle-image-fallback', textContent: `Add photo: ${images[0]}` })); }; }
  }

  const highlights = [ [vehicle.km, 'Odometer reading', '↗'], [vehicle.fuel, 'Fuel type', '⛽'], [vehicle.transmission, 'Transmission', '⚙'], [vehicle.registration, 'Registration', '▣'] ];
  const highlightGrid = $('#highlightGrid');
  if (highlightGrid) highlights.forEach(([value, label, icon]) => {
    const item = document.createElement('article'); item.className = 'highlight-item';
    item.innerHTML = `<span class="highlight-icon"></span><div><strong></strong><span></span></div>`;
    item.querySelector('.highlight-icon').textContent = icon; item.querySelector('strong').textContent = value || 'Not provided'; item.querySelector('div span').textContent = label; highlightGrid.appendChild(item);
  });

  const overview = [ ['Make year', vehicle.year], ['Registration year', vehicle.registrationYear], ['Fuel type', vehicle.fuel], ['Km driven', vehicle.km], ['Transmission', vehicle.transmission], ['Number of owners', vehicle.owner], ['Insurance validity', vehicle.insuranceValidity], ['Insurance type', vehicle.insuranceType], ['RTO', vehicle.rto], [type === 'car' ? 'Car location' : 'Bike location', vehicle.location] ];
  const overviewGrid = $('#overviewGrid');
  if (overviewGrid) overview.forEach(([label, value], index) => {
    const row = document.createElement('div'); row.className = `overview-row${index === 9 ? ' overview-location' : ''}`;
    const name = document.createElement('span'); name.textContent = label; const val = document.createElement('strong'); val.textContent = value || 'Not provided'; row.append(name, val); overviewGrid.appendChild(row);
  });

  const quality = $('#qualityPoints');
  if (quality) (vehicle.quality || []).forEach(text => { const item = document.createElement('span'); item.textContent = `• ${text}`; quality.appendChild(item); });
  const features = $('#featureList');
  if (features) (vehicle.features || []).forEach(text => { const item = document.createElement('span'); item.textContent = text; features.appendChild(item); });

  const sourceNote = document.querySelector('.fine-print');
  if (sourceNote && vehicle.listingUrl) {
    sourceNote.textContent = 'Listing details captured from the linked seller page. Prices and availability may change; verify before publishing.';
    const sourceLink = document.createElement('a');
    sourceLink.href = vehicle.listingUrl; sourceLink.target = '_blank'; sourceLink.rel = 'noopener noreferrer';
    sourceLink.textContent = ' View original listing'; sourceLink.className = 'source-listing-link';
    sourceNote.appendChild(sourceLink);
  }
  const dataNote = document.querySelector('.data-note');
  if (dataNote) dataNote.textContent = 'Vehicle details are transcribed from the linked listing. Any field marked Not provided was not shown in the source.';
  const qualityNote = document.querySelector('#quality .section-description');
  if (qualityNote) qualityNote.textContent = type === 'car' ? 'Quality details below reflect the Spinny listing report where available.' : 'A formal inspection score was not provided in the linked BikeWale listing.';
  const featureNote = document.querySelector('#features .section-description');
  if (featureNote) featureNote.textContent = 'Features and specifications shown here are limited to details visible in the linked listing.';
});
