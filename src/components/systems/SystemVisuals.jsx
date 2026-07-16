function VisualFrame({ variant, children }) {
  return (
    <div
      className={`systems-visual systems-visual--${variant}`}
      aria-hidden="true"
    >
      <span className="systems-visual-glow" />
      <span className="systems-visual-grid" />
      <div className="systems-visual-stage">{children}</div>
    </div>
  );
}

function WindowBar({ label, accent = false }) {
  return (
    <div className="systems-window-bar">
      <span className="systems-window-controls">
        <i className="systems-window-dot" />
        <i className="systems-window-dot" />
        <i className="systems-window-dot" />
      </span>
      <span className="systems-window-address">
        <i
          className={`systems-window-secure${accent ? " systems-window-secure--accent" : ""}`}
        />
        {label}
      </span>
      <span className="systems-window-action" />
    </div>
  );
}

function MiniSparkline({ points, variant }) {
  return (
    <svg
      className={`systems-sparkline systems-sparkline--${variant}`}
      viewBox="0 0 140 42"
      focusable="false"
    >
      <path className="systems-sparkline-area" d={`${points} L140 42 L0 42Z`} />
      <path className="systems-sparkline-line" d={points} />
      <circle className="systems-sparkline-point" cx="140" cy="8" r="3" />
    </svg>
  );
}

export function LawnexVisual() {
  return (
    <VisualFrame variant="lawnex">
      <div className="systems-lawnex-orbit systems-lawnex-orbit--one" />
      <div className="systems-lawnex-orbit systems-lawnex-orbit--two" />

      <div className="systems-app-window systems-lawnex-window">
        <WindowBar label="Legal intelligence workspace" accent />

        <div className="systems-lawnex-shell">
          <aside className="systems-lawnex-sidebar">
            <span className="systems-lawnex-brand">
              <i className="systems-lawnex-brand-mark">N</i>
              <i className="systems-lawnex-brand-line" />
            </span>
            <span className="systems-lawnex-nav systems-lawnex-nav--active">
              <i className="systems-lawnex-nav-icon" />
              Workspace
            </span>
            <span className="systems-lawnex-nav">
              <i className="systems-lawnex-nav-icon" />
              Library
            </span>
            <span className="systems-lawnex-nav">
              <i className="systems-lawnex-nav-icon" />
              Sources
            </span>
            <span className="systems-lawnex-side-rule" />
            <span className="systems-lawnex-side-label">Recent</span>
            <span className="systems-lawnex-file" />
            <span className="systems-lawnex-file systems-lawnex-file--short" />
          </aside>

          <div className="systems-lawnex-main">
            <div className="systems-lawnex-heading">
              <span>
                <i className="systems-lawnex-kicker">Research</i>
                <b className="systems-lawnex-title">Legal workspace</b>
              </span>
              <span className="systems-lawnex-status">
                <i className="systems-lawnex-status-dot" />
                Sources connected
              </span>
            </div>

            <div className="systems-lawnex-query">
              <span className="systems-lawnex-query-mark">⌁</span>
              <span className="systems-lawnex-query-lines">
                <i />
                <i />
              </span>
              <span className="systems-lawnex-query-button">Search</span>
            </div>

            <div className="systems-lawnex-answer">
              <div className="systems-lawnex-answer-head">
                <span className="systems-lawnex-ai-mark">AI</span>
                <span className="systems-lawnex-answer-label">Structured answer</span>
                <span className="systems-lawnex-answer-tools">•••</span>
              </div>
              <span className="systems-lawnex-copy systems-lawnex-copy--long" />
              <span className="systems-lawnex-copy" />
              <span className="systems-lawnex-copy systems-lawnex-copy--medium" />
              <div className="systems-lawnex-citations">
                <span className="systems-lawnex-citation">
                  <i>01</i> Source
                </span>
                <span className="systems-lawnex-citation">
                  <i>02</i> Reference
                </span>
              </div>
            </div>
          </div>

          <aside className="systems-lawnex-evidence">
            <span className="systems-lawnex-evidence-title">Evidence map</span>
            <svg
              className="systems-lawnex-graph"
              viewBox="0 0 210 210"
              focusable="false"
            >
              <defs>
                <radialGradient id="systems-lawnex-core" cx="50%" cy="45%" r="62%">
                  <stop offset="0%" stopColor="#ffe6a7" />
                  <stop offset="45%" stopColor="#e6aa42" />
                  <stop offset="100%" stopColor="#9c6419" />
                </radialGradient>
              </defs>
              <g className="systems-lawnex-edges">
                <path d="M28 38 99 93M181 34 111 94M183 151 115 107M35 175 101 111" />
                <path d="M28 38 65 27 99 93 145 61 181 34M35 175 71 149 101 111 149 135 183 151" />
              </g>
              <g className="systems-lawnex-nodes">
                <circle cx="28" cy="38" r="8" />
                <circle cx="65" cy="27" r="5" />
                <circle cx="181" cy="34" r="8" />
                <circle cx="145" cy="61" r="5" />
                <circle cx="183" cy="151" r="8" />
                <circle cx="149" cy="135" r="5" />
                <circle cx="35" cy="175" r="8" />
                <circle cx="71" cy="149" r="5" />
              </g>
              <circle
                className="systems-lawnex-core-ring"
                cx="106"
                cy="101"
                r="35"
              />
              <circle
                className="systems-lawnex-core"
                cx="106"
                cy="101"
                r="22"
                fill="url(#systems-lawnex-core)"
              />
              <path
                className="systems-lawnex-core-glyph"
                d="m97 108 8-18 6 12 5-8"
              />
            </svg>
            <span className="systems-lawnex-evidence-meta">
              <i />
              Indexed source
            </span>
            <span className="systems-lawnex-evidence-meta">
              <i />
              Related reference
            </span>
          </aside>
        </div>
      </div>

      <span className="systems-lawnex-data-node systems-lawnex-data-node--one">
        <i /> Corpus
      </span>
      <span className="systems-lawnex-data-node systems-lawnex-data-node--two">
        <i /> Retrieval
      </span>
      <span className="systems-lawnex-data-node systems-lawnex-data-node--three">
        <i /> Citation
      </span>
    </VisualFrame>
  );
}

export function BerkatVisual() {
  const branches = ["01", "02", "03", "04", "05"];

  return (
    <VisualFrame variant="berkat">
      <div className="systems-app-window systems-berkat-window">
        <WindowBar label="Operations workspace" />

        <div className="systems-berkat-shell">
          <aside className="systems-berkat-sidebar">
            <span className="systems-berkat-logo">B</span>
            <span className="systems-berkat-side-icon systems-berkat-side-icon--active" />
            <span className="systems-berkat-side-icon" />
            <span className="systems-berkat-side-icon" />
            <span className="systems-berkat-side-icon" />
            <span className="systems-berkat-avatar" />
          </aside>

          <div className="systems-berkat-main">
            <div className="systems-berkat-header">
              <span>
                <i className="systems-berkat-eyebrow">Overview</i>
                <b className="systems-berkat-title">Operations hub</b>
              </span>
              <span className="systems-berkat-filter">All branches⌄</span>
            </div>

            <div className="systems-berkat-metrics">
              <div className="systems-berkat-metric systems-berkat-metric--accent">
                <span className="systems-berkat-metric-label">Workflow</span>
                <span className="systems-berkat-metric-value">Live</span>
                <MiniSparkline
                  variant="berkat"
                  points="M0 34 C16 31 19 19 33 22 S50 37 66 25 83 27 101 12 112 19 128 12 140 8"
                />
              </div>
              <div className="systems-berkat-metric">
                <span className="systems-berkat-metric-label">Requests</span>
                <span className="systems-berkat-metric-dial">
                  <i />
                </span>
              </div>
              <div className="systems-berkat-metric">
                <span className="systems-berkat-metric-label">Approvals</span>
                <span className="systems-berkat-bars">
                  <i />
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            </div>

            <div className="systems-berkat-board">
              <div className="systems-berkat-branch-map">
                <span className="systems-berkat-panel-title">Branch network</span>
                <svg
                  className="systems-berkat-map-lines"
                  viewBox="0 0 270 145"
                  focusable="false"
                >
                  <path d="M134 72 38 31M134 72 55 118M134 72 134 17M134 72 225 31M134 72 225 115" />
                  <circle cx="134" cy="72" r="18" />
                  <circle cx="38" cy="31" r="7" />
                  <circle cx="55" cy="118" r="7" />
                  <circle cx="134" cy="17" r="7" />
                  <circle cx="225" cy="31" r="7" />
                  <circle cx="225" cy="115" r="7" />
                </svg>
                <span className="systems-berkat-core">HQ</span>
                <div className="systems-berkat-branch-list">
                  {branches.map((branch) => (
                    <span className="systems-berkat-branch" key={branch}>
                      <i /> Branch {branch}
                    </span>
                  ))}
                </div>
              </div>

              <div className="systems-berkat-workflow">
                <span className="systems-berkat-panel-title">Approval flow</span>
                <div className="systems-berkat-flow-row">
                  <span className="systems-berkat-flow-avatar">A</span>
                  <span className="systems-berkat-flow-copy">
                    <i />
                    <i />
                  </span>
                  <span className="systems-berkat-flow-state">Review</span>
                </div>
                <div className="systems-berkat-flow-row">
                  <span className="systems-berkat-flow-avatar">B</span>
                  <span className="systems-berkat-flow-copy">
                    <i />
                    <i />
                  </span>
                  <span className="systems-berkat-flow-state systems-berkat-flow-state--done">
                    Approved
                  </span>
                </div>
                <div className="systems-berkat-flow-row">
                  <span className="systems-berkat-flow-avatar">C</span>
                  <span className="systems-berkat-flow-copy">
                    <i />
                    <i />
                  </span>
                  <span className="systems-berkat-flow-state">Queued</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

export function YallahVisual() {
  return (
    <VisualFrame variant="yallah">
      <div className="systems-yallah-map">
        <svg
          className="systems-yallah-route"
          viewBox="0 0 520 330"
          focusable="false"
        >
          <defs>
            <linearGradient id="systems-yallah-route-gradient" x1="0" x2="1">
              <stop offset="0%" stopColor="#83d7ff" />
              <stop offset="100%" stopColor="#c9ff65" />
            </linearGradient>
          </defs>
          <path
            className="systems-yallah-map-road"
            d="M-20 247C74 215 119 269 177 221c55-46 84-163 171-132 49 18 81 80 193 49"
          />
          <path
            className="systems-yallah-map-road systems-yallah-map-road--thin"
            d="M31 50c98 64 174-1 263 48 77 42 95 121 220 124M131-15c3 89 37 145 8 221-18 46-37 81-29 141M411-18c-35 79-45 123-20 192 17 47 2 107-25 176"
          />
          <path
            className="systems-yallah-route-line"
            d="M55 264C114 232 148 256 190 216c56-53 68-149 149-136 50 8 75 56 127 48"
            stroke="url(#systems-yallah-route-gradient)"
          />
          <g className="systems-yallah-route-pins">
            <circle cx="55" cy="264" r="13" />
            <circle cx="339" cy="80" r="13" />
            <circle cx="466" cy="128" r="13" />
          </g>
        </svg>
        <span className="systems-yallah-location systems-yallah-location--pickup">
          <i /> Pickup
        </span>
        <span className="systems-yallah-location systems-yallah-location--airport">
          <i /> Airport
        </span>
        <span className="systems-yallah-location systems-yallah-location--delivery">
          <i /> Delivery
        </span>
      </div>

      <div className="systems-yallah-phone">
        <span className="systems-yallah-phone-speaker" />
        <div className="systems-yallah-phone-screen">
          <div className="systems-yallah-phone-head">
            <span className="systems-yallah-phone-logo">Y</span>
            <span className="systems-yallah-phone-user" />
          </div>
          <span className="systems-yallah-phone-kicker">Track baggage</span>
          <span className="systems-yallah-phone-title">On the way</span>
          <div className="systems-yallah-phone-card">
            <span className="systems-yallah-bag">
              <i />
            </span>
            <span className="systems-yallah-phone-copy">
              <b>Active route</b>
              <i />
            </span>
            <span className="systems-yallah-phone-arrow">›</span>
          </div>
          <div className="systems-yallah-progress">
            <span className="systems-yallah-progress-line" />
            <span className="systems-yallah-progress-stop systems-yallah-progress-stop--done">
              <i /> Collected
            </span>
            <span className="systems-yallah-progress-stop systems-yallah-progress-stop--active">
              <i /> In transit
            </span>
            <span className="systems-yallah-progress-stop">
              <i /> Delivered
            </span>
          </div>
        </div>
      </div>

      <span className="systems-yallah-flight-path">✦</span>
    </VisualFrame>
  );
}

export function ArabicaVisual() {
  return (
    <VisualFrame variant="arabica">
      <div className="systems-app-window systems-arabica-window">
        <WindowBar label="arabica" />
        <div className="systems-arabica-page">
          <nav className="systems-arabica-nav">
            <span className="systems-arabica-wordmark">Arabica</span>
            <span className="systems-arabica-links">
              <i>Story</i>
              <i>Menu</i>
              <i>Visit</i>
            </span>
            <span className="systems-arabica-book">Discover</span>
          </nav>

          <div className="systems-arabica-hero">
            <div className="systems-arabica-copy">
              <span className="systems-arabica-overline">Dining · Editorial experience</span>
              <b className="systems-arabica-display">A table of<br />warm stories.</b>
              <span className="systems-arabica-description">
                <i />
                <i />
                <i />
              </span>
              <span className="systems-arabica-cta">Explore the menu <i>↗</i></span>
            </div>

            <div className="systems-arabica-photo">
              <span className="systems-arabica-sun" />
              <span className="systems-arabica-plate">
                <i className="systems-arabica-plate-ring" />
                <i className="systems-arabica-food systems-arabica-food--one" />
                <i className="systems-arabica-food systems-arabica-food--two" />
                <i className="systems-arabica-food systems-arabica-food--three" />
                <i className="systems-arabica-food systems-arabica-food--four" />
              </span>
              <span className="systems-arabica-leaf systems-arabica-leaf--one" />
              <span className="systems-arabica-leaf systems-arabica-leaf--two" />
              <span className="systems-arabica-photo-caption">Seasonal selection</span>
            </div>
          </div>

          <div className="systems-arabica-footerline">
            <span>Scroll to discover</span>
            <span className="systems-arabica-scroll"><i /></span>
            <span>KL · MY</span>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

export function AboZeedVisual() {
  const lessons = [
    { index: "01", title: "محتوى مرئي", tone: "amber" },
    { index: "02", title: "مسار تعليمي", tone: "cyan" },
    { index: "03", title: "مكتبة المعرفة", tone: "violet" },
  ];

  return (
    <VisualFrame variant="abozeed">
      <div className="systems-app-window systems-abozeed-window" dir="rtl">
        <WindowBar label="منصة المحتوى" />
        <div className="systems-abozeed-page">
          <aside className="systems-abozeed-sidebar">
            <span className="systems-abozeed-logo">ز</span>
            <span className="systems-abozeed-side-link systems-abozeed-side-link--active">
              <i /> الرئيسية
            </span>
            <span className="systems-abozeed-side-link">
              <i /> المسارات
            </span>
            <span className="systems-abozeed-side-link">
              <i /> المكتبة
            </span>
            <span className="systems-abozeed-side-link">
              <i /> المحفوظات
            </span>
          </aside>

          <div className="systems-abozeed-main">
            <div className="systems-abozeed-heading">
              <span>
                <i className="systems-abozeed-greeting">مرحباً بك</i>
                <b className="systems-abozeed-title">استكشف المحتوى</b>
              </span>
              <span className="systems-abozeed-search">بحث <i>⌕</i></span>
            </div>

            <div className="systems-abozeed-feature">
              <div className="systems-abozeed-feature-copy">
                <span className="systems-abozeed-pill">مقترح لك</span>
                <b>رحلة معرفية<br />بتجربة هادئة</b>
                <span className="systems-abozeed-feature-lines">
                  <i />
                  <i />
                </span>
                <span className="systems-abozeed-play">ابدأ الآن <i>←</i></span>
              </div>
              <div className="systems-abozeed-feature-art">
                <span className="systems-abozeed-orb systems-abozeed-orb--one" />
                <span className="systems-abozeed-orb systems-abozeed-orb--two" />
                <span className="systems-abozeed-book">
                  <i />
                </span>
              </div>
            </div>

            <div className="systems-abozeed-lessons">
              {lessons.map((lesson) => (
                <div
                  className={`systems-abozeed-lesson systems-abozeed-lesson--${lesson.tone}`}
                  key={lesson.index}
                >
                  <span className="systems-abozeed-lesson-art">
                    <i>{lesson.index}</i>
                  </span>
                  <b>{lesson.title}</b>
                  <span className="systems-abozeed-lesson-meta">
                    <i />
                    <i />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}

export function DatesVisual() {
  return (
    <VisualFrame variant="dates">
      <div className="systems-dates-campaign">
        <div className="systems-dates-landing">
          <nav className="systems-dates-nav">
            <span className="systems-dates-wordmark">Dates</span>
            <span className="systems-dates-navlinks">
              <i>Collection</i>
              <i>Story</i>
            </span>
            <span className="systems-dates-bag">Bag · 0</span>
          </nav>

          <div className="systems-dates-hero">
            <div className="systems-dates-copy">
              <span className="systems-dates-kicker">Curated collection</span>
              <b className="systems-dates-title">Naturally<br />remarkable.</b>
              <span className="systems-dates-lines">
                <i />
                <i />
                <i />
              </span>
              <span className="systems-dates-shop">Explore collection <i>→</i></span>
            </div>

            <div className="systems-dates-product">
              <span className="systems-dates-halo" />
              <span className="systems-dates-palm systems-dates-palm--one" />
              <span className="systems-dates-palm systems-dates-palm--two" />
              <span className="systems-dates-box">
                <i className="systems-dates-box-mark">D</i>
                <i className="systems-dates-box-line" />
                <i className="systems-dates-box-line systems-dates-box-line--short" />
              </span>
              <span className="systems-dates-fruit systems-dates-fruit--one" />
              <span className="systems-dates-fruit systems-dates-fruit--two" />
              <span className="systems-dates-fruit systems-dates-fruit--three" />
            </div>
          </div>
        </div>

        <div className="systems-dates-analytics">
          <div className="systems-dates-analytics-head">
            <span>
              <i>Campaign flow</i>
              <b>Audience journey</b>
            </span>
            <span className="systems-dates-live"><i /> Active</span>
          </div>
          <div className="systems-dates-stats">
            <span className="systems-dates-stat">
              <i>Entry</i>
              <b>Ad</b>
            </span>
            <span className="systems-dates-stat">
              <i>Action</i>
              <b>Shop</b>
            </span>
          </div>
          <div className="systems-dates-chart">
            <span className="systems-dates-chart-label">Journey path</span>
            <svg viewBox="0 0 290 105" focusable="false">
              <defs>
                <linearGradient id="systems-dates-chart-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#eebd68" stopOpacity=".35" />
                  <stop offset="100%" stopColor="#eebd68" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className="systems-dates-chart-grid"
                d="M0 23h290M0 52h290M0 81h290"
              />
              <path
                className="systems-dates-chart-area"
                d="M0 88C22 85 27 66 48 70s32 15 50 5 25-35 47-28 29 25 46 15 23-30 45-25 28 17 54 2v66H0Z"
                fill="url(#systems-dates-chart-fill)"
              />
              <path
                className="systems-dates-chart-line"
                d="M0 88C22 85 27 66 48 70s32 15 50 5 25-35 47-28 29 25 46 15 23-30 45-25 28 17 54 2"
              />
            </svg>
          </div>
          <div className="systems-dates-channels">
            <span><i /> Search</span>
            <span><i /> Landing</span>
            <span><i /> Shop</span>
          </div>
        </div>
      </div>
    </VisualFrame>
  );
}
