import './footer.scss';

const navigation = ['Menu', 'Our Story', 'Reservations', 'Private Dining', 'Gift Vouchers'];

const locationIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21s6-5.686 6-11a6 6 0 1 0-12 0c0 5.314 6 11 6 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const phoneIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.09 4.18 2 2 0 0 1 5.1 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L9 9.91a16 16 0 0 0 6.09 6.09l1.45-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
  </svg>
);

const clockIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5v5l3.5 2" />
  </svg>
);

const contactItems = [
  {
    label: '42 Flinders Lane\nMelbourne VIC 3000',
    icon: locationIcon,
  },
  {
    label: '(03) 9654 2211',
    icon: phoneIcon,
  },
  {
    label: 'Wed-Sun · Lunch & Dinner',
    icon: clockIcon,
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <h3>Red Earth Kitchen</h3>
            <p>
              Modern Australian cuisine rooted in country.
              <br />
              Seasonal. Honest. Unmistakably ours.
            </p>
          </div>

          <div className="site-footer__nav">
            <h4>Navigate</h4>
            <ul>
              {navigation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="site-footer__find">
            <h4>Find Us</h4>
            <ul>
              {contactItems.map((item) => (
                <li key={item.label}>
                  <span className="site-footer__icon">{item.icon}</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <div className="site-footer__copyright">
            © 2026 Red Earth Kitchen Pty Ltd • Melbourne, Australia
          </div>

          <div className="site-footer__socials" aria-label="Social media links">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">TripAdvisor</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
