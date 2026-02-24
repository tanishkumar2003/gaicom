#!/usr/bin/env python3
"""
GAICOM System Documentation PDF Generator - Version 2.0
Converts the markdown documentation into a professionally styled PDF.
Fixed: diagram placement, page breaks, section handling, checkbox rendering
"""

import markdown
import re
import subprocess
import os
import sys

# -------------------------------------------------------------------
# Configuration
# -------------------------------------------------------------------
MD_FILE = os.path.join(os.path.dirname(__file__), "GAICOM-SYSTEM-DOCUMENTATION.md")
HTML_FILE = os.path.join(os.path.dirname(__file__), "_doc_intermediate.html")
PDF_FILE = os.path.join(os.path.dirname(__file__), "GAICOM-SYSTEM-DOCUMENTATION.pdf")
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# -------------------------------------------------------------------
# CSS - Enhanced with better page handling and typography
# -------------------------------------------------------------------
CSS = r"""
/* ============================================================
   PRINT + SCREEN STYLES - Enhanced Version 2.0
   ============================================================ */

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
    --navy: #0F172A;
    --navy-light: #1E293B;
    --slate-700: #334155;
    --slate-500: #64748B;
    --slate-400: #94A3B8;
    --slate-200: #E2E8F0;
    --slate-100: #F1F5F9;
    --slate-50: #F8FAFC;
    --accent: #3B82F6;
    --accent-dark: #2563EB;
    --accent-light: #DBEAFE;
    --success: #10B981;
    --success-light: #D1FAE5;
    --warning: #F59E0B;
    --warning-light: #FEF3C7;
    --danger: #EF4444;
    --danger-light: #FEE2E2;
    --white: #FFFFFF;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html {
    font-size: 10pt;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.65;
    color: var(--navy);
    background: var(--white);
}

/* ============================================================
   PAGE RULES - Enhanced for proper page breaks
   ============================================================ */
@page {
    size: letter;
    margin: 0.9in 0.85in 1in 0.85in;
    
    @bottom-center {
        content: counter(page);
        font-family: 'Inter', sans-serif;
        font-size: 9pt;
        color: var(--slate-500);
    }
}

@page :first {
    margin: 0;
    @bottom-center { content: none; }
}

/* Second page is TOC - no page number */
@page :nth(2) {
    @bottom-center { content: none; }
}

/* ============================================================
   COVER PAGE
   ============================================================ */
.cover-page {
    page-break-after: always;
    width: 100vw;
    height: 100vh;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(145deg, var(--navy) 0%, #1a2744 50%, #0d1f3c 100%);
    color: white;
    text-align: center;
    padding: 2in;
    position: relative;
    overflow: hidden;
}

.cover-page::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -30%;
    width: 80%;
    height: 180%;
    background: radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%);
    pointer-events: none;
}

.cover-page::after {
    content: '';
    position: absolute;
    bottom: -40%;
    left: -20%;
    width: 70%;
    height: 140%;
    background: radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%);
    pointer-events: none;
}

.cover-accent-line {
    width: 80px;
    height: 4px;
    background: var(--accent);
    border-radius: 2px;
    margin: 0 auto 40px;
}

.cover-org {
    font-size: 14pt;
    font-weight: 600;
    letter-spacing: 6px;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 16px;
}

.cover-title {
    font-size: 38pt;
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 12px;
    letter-spacing: -0.5px;
}

.cover-subtitle {
    font-size: 17pt;
    font-weight: 300;
    color: var(--slate-400);
    margin-bottom: 48px;
}

.cover-tagline {
    font-size: 11pt;
    font-weight: 400;
    color: var(--slate-400);
    line-height: 1.7;
    max-width: 480px;
    margin: 0 auto 60px;
}

.cover-meta {
    font-size: 9.5pt;
    color: var(--slate-500);
    line-height: 2;
}

.cover-meta strong {
    color: var(--slate-400);
    font-weight: 500;
}

/* ============================================================
   TABLE OF CONTENTS
   ============================================================ */
.toc-page {
    page-break-after: always;
    padding: 0.5in 0;
}

.toc-page h2 {
    font-size: 22pt;
    font-weight: 800;
    color: var(--navy);
    margin-bottom: 8px;
    letter-spacing: -0.3px;
}

.toc-page .toc-underline {
    width: 60px;
    height: 4px;
    background: var(--accent);
    border-radius: 2px;
    margin-bottom: 32px;
}

.toc-columns {
    column-count: 2;
    column-gap: 40px;
}

.toc-section {
    margin-bottom: 3px;
    break-inside: avoid;
}

.toc-section a {
    display: block;
    text-decoration: none;
    color: var(--navy);
    padding: 6px 0;
    border-bottom: 1px solid var(--slate-100);
    transition: color 0.15s;
}

.toc-section a:hover {
    color: var(--accent);
}

.toc-section.level-1 a {
    font-size: 11pt;
    font-weight: 700;
    color: var(--navy);
    padding-top: 14px;
    border-bottom-color: var(--slate-200);
}

.toc-section.level-2 a {
    font-size: 9.5pt;
    font-weight: 500;
    color: var(--slate-700);
    padding-left: 16px;
}

.toc-section.level-3 a {
    font-size: 9pt;
    font-weight: 400;
    color: var(--slate-500);
    padding-left: 32px;
    border-bottom-color: transparent;
}

/* ============================================================
   MAJOR SECTION HEADER (for starting each chapter on new page)
   ============================================================ */
.section-start {
    page-break-before: always;
    padding-top: 0.5in;
}

/* ============================================================
   SECTION HEADERS
   ============================================================ */
.doc-content h1 {
    display: none; /* Hide the redundant H1 since we have cover page */
}

.doc-content h2 {
    font-size: 22pt;
    font-weight: 800;
    color: var(--navy);
    margin-top: 0;
    margin-bottom: 6px;
    letter-spacing: -0.3px;
    page-break-after: avoid;
}

.doc-content h2 .section-number {
    color: var(--accent);
    margin-right: 8px;
}

.section-rule {
    width: 60px;
    height: 4px;
    background: var(--accent);
    border-radius: 2px;
    margin-bottom: 28px;
    border: none;
}

.doc-content h3 {
    font-size: 14pt;
    font-weight: 700;
    color: var(--navy);
    margin-top: 32px;
    margin-bottom: 12px;
    page-break-after: avoid;
    border-bottom: 2px solid var(--slate-100);
    padding-bottom: 8px;
}

.doc-content h4 {
    font-size: 11.5pt;
    font-weight: 700;
    color: var(--slate-700);
    margin-top: 24px;
    margin-bottom: 10px;
    page-break-after: avoid;
}

/* ============================================================
   PARAGRAPHS & TEXT
   ============================================================ */
.doc-content p {
    margin-bottom: 12px;
    font-size: 10pt;
    line-height: 1.7;
    color: var(--slate-700);
    orphans: 3;
    widows: 3;
}

.doc-content strong {
    font-weight: 600;
    color: var(--navy);
}

.doc-content em {
    font-style: italic;
}

.doc-content a {
    color: var(--accent-dark);
    text-decoration: none;
    font-weight: 500;
}

/* ============================================================
   LISTS
   ============================================================ */
.doc-content ul, .doc-content ol {
    margin-bottom: 14px;
    padding-left: 24px;
}

.doc-content li {
    font-size: 10pt;
    line-height: 1.7;
    color: var(--slate-700);
    margin-bottom: 5px;
}

.doc-content li > ul, .doc-content li > ol {
    margin-top: 5px;
    margin-bottom: 5px;
}

/* Checkboxes - Enhanced styling */
.checkbox-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 8px;
    padding-left: 0;
}

.checkbox-box {
    display: inline-block;
    width: 14px;
    height: 14px;
    min-width: 14px;
    border: 2px solid var(--accent);
    border-radius: 3px;
    margin-right: 10px;
    margin-top: 3px;
    background: var(--white);
}

.checkbox-box.checked {
    background: var(--accent);
    position: relative;
}

.checkbox-box.checked::after {
    content: '✓';
    color: white;
    font-size: 10px;
    position: absolute;
    top: -2px;
    left: 1px;
}

/* ============================================================
   TABLES - Enhanced
   ============================================================ */
.doc-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0 20px 0;
    font-size: 9pt;
    page-break-inside: auto;
    border: 1px solid var(--slate-200);
    border-radius: 8px;
    overflow: hidden;
}

.doc-content thead th {
    background: var(--navy);
    color: var(--white);
    font-weight: 600;
    text-align: left;
    padding: 10px 12px;
    font-size: 8.5pt;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    border: none;
}

.doc-content thead th:first-child {
    border-radius: 0;
}

.doc-content thead th:last-child {
    border-radius: 0;
}

.doc-content tbody td {
    padding: 9px 12px;
    border-bottom: 1px solid var(--slate-200);
    vertical-align: top;
    line-height: 1.55;
}

.doc-content tbody tr:nth-child(even) {
    background: var(--slate-50);
}

.doc-content tbody tr:nth-child(odd) {
    background: var(--white);
}

.doc-content tbody tr:last-child td {
    border-bottom: none;
}

/* ============================================================
   CODE BLOCKS - Enhanced with language labels
   ============================================================ */
.doc-content pre {
    background: var(--navy);
    color: #E2E8F0;
    border-radius: 8px;
    padding: 16px 18px;
    margin: 14px 0 18px 0;
    overflow-x: auto;
    font-size: 8.5pt;
    line-height: 1.65;
    page-break-inside: avoid;
    border-left: 4px solid var(--accent);
    position: relative;
}

.doc-content pre code {
    font-family: 'JetBrains Mono', 'Consolas', 'Monaco', monospace;
    font-size: 8.5pt;
    background: none;
    padding: 0;
    border: none;
    color: inherit;
}

.doc-content code {
    font-family: 'JetBrains Mono', 'Consolas', 'Monaco', monospace;
    font-size: 9pt;
    background: var(--slate-100);
    color: var(--accent-dark);
    padding: 2px 6px;
    border-radius: 4px;
    border: 1px solid var(--slate-200);
}

/* Code language label */
.code-lang {
    position: absolute;
    top: 0;
    right: 0;
    background: var(--accent);
    color: white;
    font-size: 7pt;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 0 8px 0 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

/* ============================================================
   BLOCKQUOTES / CALLOUTS
   ============================================================ */
.doc-content blockquote {
    border-left: 4px solid var(--accent);
    background: var(--accent-light);
    padding: 14px 18px;
    margin: 14px 0;
    border-radius: 0 8px 8px 0;
    font-size: 10pt;
    color: var(--slate-700);
}

/* ============================================================
   CALLOUT BOXES
   ============================================================ */
.callout {
    border-radius: 8px;
    padding: 14px 18px;
    margin: 16px 0;
    font-size: 9.5pt;
    line-height: 1.65;
    page-break-inside: avoid;
}

.callout-label {
    font-weight: 700;
    font-size: 8.5pt;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
    display: flex;
    align-items: center;
}

.callout-label::before {
    display: inline-block;
    margin-right: 8px;
    font-size: 14pt;
}

.callout-important {
    background: var(--warning-light);
    border-left: 4px solid var(--warning);
}

.callout-important .callout-label { color: #92400E; }
.callout-important .callout-label::before { content: '⚠'; }

.callout-note {
    background: var(--accent-light);
    border-left: 4px solid var(--accent);
}

.callout-note .callout-label { color: var(--accent-dark); }
.callout-note .callout-label::before { content: 'ℹ'; }

.callout-warning {
    background: var(--danger-light);
    border-left: 4px solid var(--danger);
}

.callout-warning .callout-label { color: #991B1B; }
.callout-warning .callout-label::before { content: '⛔'; }

.callout-tip {
    background: var(--success-light);
    border-left: 4px solid var(--success);
}

.callout-tip .callout-label { color: #065F46; }
.callout-tip .callout-label::before { content: '💡'; }

/* ============================================================
   HORIZONTAL RULES (section dividers) - Fixed page breaks
   ============================================================ */
.doc-content hr {
    border: none;
    height: 0;
    margin: 0;
    visibility: hidden;
}

/* Section break - forces new page before the next major section */
.section-break {
    page-break-before: always;
    margin-top: 0.5in;
}

/* ============================================================
   MERMAID / DIAGRAM BOXES
   ============================================================ */
.diagram-container {
    page-break-inside: avoid;
    margin: 20px 0;
}

.flow-diagram {
    background: linear-gradient(135deg, var(--slate-50) 0%, var(--white) 100%);
    border: 2px solid var(--slate-200);
    border-radius: 12px;
    padding: 24px;
    margin: 20px 0;
    page-break-inside: avoid;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.flow-diagram h4 {
    font-size: 10pt;
    font-weight: 700;
    color: var(--navy);
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 18px;
    text-align: center;
    padding-bottom: 12px;
    border-bottom: 2px solid var(--slate-200);
}

.flow-row {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
    flex-wrap: wrap;
    gap: 8px;
}

.flow-box {
    background: var(--white);
    border: 2px solid var(--slate-300);
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 9pt;
    font-weight: 600;
    color: var(--navy);
    text-align: center;
    min-width: 110px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.flow-box small {
    display: block;
    font-size: 7.5pt;
    font-weight: 400;
    color: var(--slate-500);
    margin-top: 2px;
}

.flow-box.primary { 
    border-color: var(--accent); 
    background: linear-gradient(135deg, var(--accent-light) 0%, #EFF6FF 100%);
}
.flow-box.cloud { 
    border-color: #818CF8; 
    background: linear-gradient(135deg, #EEF2FF 0%, #F5F5FF 100%);
}
.flow-box.lambda { 
    border-color: #F97316; 
    background: linear-gradient(135deg, #FFF7ED 0%, #FFFAF5 100%);
}
.flow-box.ext { 
    border-color: var(--success); 
    background: linear-gradient(135deg, #ECFDF5 0%, #F5FFFA 100%);
}

.flow-arrow {
    font-size: 16pt;
    color: var(--slate-400);
    font-weight: 400;
}

.flow-arrow-down {
    display: block;
    text-align: center;
    font-size: 16pt;
    color: var(--slate-400);
    font-weight: 400;
    margin: 6px 0;
}

.diagram-legend {
    margin-top: 16px;
    text-align: center;
    font-size: 8pt;
    color: var(--slate-500);
    padding-top: 12px;
    border-top: 1px solid var(--slate-200);
}

.legend-item {
    display: inline-flex;
    align-items: center;
    margin: 0 12px;
}

.legend-box {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 3px;
    margin-right: 5px;
    border: 1.5px solid;
}

/* ============================================================
   STEP-BY-STEP GUIDES - Enhanced
   ============================================================ */
.step-guide {
    background: var(--slate-50);
    border: 1px solid var(--slate-200);
    border-radius: 8px;
    padding: 16px;
    margin: 14px 0;
}

.step-guide ol {
    counter-reset: step-counter;
    list-style: none;
    padding-left: 0;
}

.step-guide li {
    counter-increment: step-counter;
    position: relative;
    padding-left: 36px;
    margin-bottom: 12px;
}

.step-guide li::before {
    content: counter(step-counter);
    position: absolute;
    left: 0;
    top: 0;
    width: 24px;
    height: 24px;
    background: var(--accent);
    color: white;
    border-radius: 50%;
    font-size: 11pt;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* ============================================================
   PAGE BREAKS - Explicit control
   ============================================================ */
.page-break { 
    page-break-before: always; 
    margin: 0;
    padding: 0;
    height: 0;
}
.no-break { page-break-inside: avoid; }

/* Keep headings with following content */
h2, h3, h4, h5, h6 {
    page-break-after: avoid;
}

/* ============================================================
   PRINT SPECIFICS
   ============================================================ */
@media print {
    body { 
        -webkit-print-color-adjust: exact !important; 
        print-color-adjust: exact !important; 
    }
    .cover-page { 
        height: 100vh; 
        min-height: 100vh;
    }
    a { 
        color: var(--accent-dark) !important; 
    }
    .page-break {
        page-break-before: always;
    }
}
"""

# -------------------------------------------------------------------
# Architecture diagram as styled HTML boxes
# -------------------------------------------------------------------
ARCHITECTURE_DIAGRAM = """
<div class="diagram-container">
<div class="flow-diagram">
    <h4>System Architecture Overview</h4>

    <div class="flow-row">
        <div class="flow-box primary">User / Browser</div>
    </div>
    <div class="flow-arrow-down">↓</div>

    <div class="flow-row">
        <div class="flow-box primary">AWS S3<br><small>Static Website — React SPA</small></div>
        <span class="flow-arrow">←→</span>
        <div class="flow-box cloud">Sanity Content API<br><small>CDN-backed GROQ</small></div>
    </div>
    <div class="flow-arrow-down">↓ POST requests</div>

    <div class="flow-row">
        <div class="flow-box lambda">AWS Lambda<br><small>Node.js 20.x Function URL</small></div>
    </div>
    <div class="flow-arrow-down">↓</div>

    <div class="flow-row">
        <div class="flow-box ext">Stripe API<br><small>Checkout Sessions</small></div>
        <div class="flow-box ext">Stripe Webhooks<br><small>Payment Events</small></div>
        <div class="flow-box ext">Google Sheets<br><small>Newsletter Storage</small></div>
    </div>

    <div class="diagram-legend">
        <span class="legend-item"><span class="legend-box" style="background:#DBEAFE; border-color:#3B82F6;"></span>Frontend</span>
        <span class="legend-item"><span class="legend-box" style="background:#EEF2FF; border-color:#818CF8;"></span>CMS</span>
        <span class="legend-item"><span class="legend-box" style="background:#FFF7ED; border-color:#F97316;"></span>Serverless</span>
        <span class="legend-item"><span class="legend-box" style="background:#ECFDF5; border-color:#10B981;"></span>External Services</span>
    </div>
</div>
</div>
"""

PAYMENT_FLOW_DIAGRAM = """
<div class="diagram-container">
<div class="flow-diagram">
    <h4>Donation Payment Flow</h4>
    <div class="flow-row">
        <div class="flow-box primary">1. User selects amount<br><small>/donate page</small></div>
        <span class="flow-arrow">→</span>
        <div class="flow-box lambda">2. Create checkout session<br><small>Lambda validates amount</small></div>
        <span class="flow-arrow">→</span>
        <div class="flow-box ext">3. Stripe Checkout<br><small>Hosted payment page</small></div>
    </div>
    <div class="flow-arrow-down">↓ On success</div>
    <div class="flow-row">
        <div class="flow-box primary">4. Success redirect<br><small>/donate/success</small></div>
        <span class="flow-arrow">&nbsp;&nbsp;&nbsp;</span>
        <div class="flow-box ext">5. Webhook → Lambda<br><small>Logs to CloudWatch</small></div>
    </div>
</div>
</div>
"""

NEWSLETTER_FLOW_DIAGRAM = """
<div class="diagram-container">
<div class="flow-diagram">
    <h4>Newsletter Signup Flow</h4>
    <div class="flow-row">
        <div class="flow-box primary">1. User fills form<br><small>Name + Email</small></div>
        <span class="flow-arrow">→</span>
        <div class="flow-box lambda">2. POST /newsletter<br><small>Lambda validates</small></div>
        <span class="flow-arrow">→</span>
        <div class="flow-box ext">3. Google Sheets API<br><small>Appends row</small></div>
    </div>
    <div class="flow-arrow-down">↓</div>
    <div class="flow-row">
        <div class="flow-box primary">4. Success message<br><small>"Thank you for subscribing!"</small></div>
    </div>
</div>
</div>
"""

CONTENT_FLOW_DIAGRAM = """
<div class="diagram-container">
<div class="flow-diagram">
    <h4>CMS Content Flow</h4>
    <div class="flow-row">
        <div class="flow-box cloud">1. Admin edits<br><small>Sanity Studio</small></div>
        <span class="flow-arrow">→</span>
        <div class="flow-box cloud">2. Publish<br><small>→ Sanity CDN</small></div>
        <span class="flow-arrow">→</span>
        <div class="flow-box primary">3. Browser fetches<br><small>GROQ query</small></div>
        <span class="flow-arrow">→</span>
        <div class="flow-box primary">4. React renders<br><small>or fallback</small></div>
    </div>
</div>
</div>
"""


def read_markdown(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()


def convert_md_to_html(md_text):
    """Convert markdown to HTML using python-markdown."""
    extensions = [
        "markdown.extensions.tables",
        "markdown.extensions.fenced_code",
        "markdown.extensions.codehilite",
        "markdown.extensions.toc",
        "markdown.extensions.attr_list",
        "markdown.extensions.md_in_html",
    ]
    ext_configs = {
        "markdown.extensions.toc": {"permalink": False, "toc_depth": "2-4"},
        "markdown.extensions.codehilite": {"use_pygments": False},
    }
    html = markdown.markdown(md_text, extensions=extensions, extension_configs=ext_configs)
    return html


def build_toc_from_md(md_text):
    """Extract headings from markdown for the table of contents."""
    toc_items = []
    for line in md_text.split("\n"):
        m = re.match(r"^(#{2,3})\s+(.+)", line)
        if m:
            level = len(m.group(1))
            title = m.group(2).strip()
            # Create an id from the title
            slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")
            toc_items.append((level, title, slug))
    return toc_items


def build_toc_html(toc_items):
    """Build the TOC page HTML with two columns."""
    html = '<div class="toc-page">\n'
    html += '  <h2>Table of Contents</h2>\n'
    html += '  <div class="toc-underline"></div>\n'
    html += '  <div class="toc-columns">\n'

    for level, title, slug in toc_items:
        css_class = f"level-{level - 1}"
        html += f'    <div class="toc-section {css_class}"><a href="#{slug}">{title}</a></div>\n'

    html += '  </div>\n'
    html += "</div>\n"
    return html


def inject_architecture_diagram(html):
    """Replace mermaid code block with our styled architecture diagram."""
    # Find the mermaid code block and replace with our styled diagram
    # The mermaid block starts with ```mermaid and ends with ```
    pattern = r"<pre><code[^>]*>graph TD.*?</code></pre>"
    html = re.sub(pattern, ARCHITECTURE_DIAGRAM, html, flags=re.DOTALL)
    return html


def inject_flow_diagrams(html):
    """Inject flow diagrams at appropriate section locations."""
    
    # Content flow - inject after "C. Content Flow" section, specifically after the paragraph about CDN refresh
    # Look for the paragraph ending with "within seconds."
    content_marker = "typically within seconds.</p>"
    idx = html.find(content_marker)
    if idx != -1:
        insert_pos = idx + len(content_marker)
        html = html[:insert_pos] + "\n" + CONTENT_FLOW_DIAGRAM + "\n" + html[insert_pos:]
    
    # Payment flow - inject before "E. Newsletter Flow" section (after payment section ends)
    # Find the H3 for newsletter flow and insert before it
    payment_end_marker = '<h3 id="e-newsletter-flow">'
    idx = html.find(payment_end_marker)
    if idx != -1:
        html = html[:idx] + PAYMENT_FLOW_DIAGRAM + "\n" + html[idx:]
    
    # Newsletter flow - inject before "F. Local vs Production" section
    newsletter_end_marker = '<h3 id="f-local-vs-production-behavior">'
    idx = html.find(newsletter_end_marker)
    if idx != -1:
        html = html[:idx] + NEWSLETTER_FLOW_DIAGRAM + "\n" + html[idx:]
    
    return html


def add_callout_boxes(html):
    """Convert Important/Note paragraphs into styled callout boxes."""
    # Convert **Important:** paragraphs
    html = re.sub(
        r"<p><strong>Important:</strong>\s*(.*?)</p>",
        r'<div class="callout callout-important"><div class="callout-label">Important</div><p>\1</p></div>',
        html,
        flags=re.DOTALL,
    )
    # Convert **Note:** paragraphs
    html = re.sub(
        r"<p><strong>Note:</strong>\s*(.*?)</p>",
        r'<div class="callout callout-note"><div class="callout-label">Note</div><p>\1</p></div>',
        html,
        flags=re.DOTALL,
    )
    # Convert **Decision:** paragraphs
    html = re.sub(
        r"<p><strong>Decision:</strong>\s*(.*?)</p>",
        r'<div class="callout callout-note"><div class="callout-label">Decision</div><p>\1</p></div>',
        html,
        flags=re.DOTALL,
    )
    return html


def convert_checkbox_lists(html):
    """Convert checkbox list items into styled checkboxes."""
    # Convert [ ] into unchecked checkbox
    html = html.replace(
        "[ ]", 
        '<span class="checkbox-box"></span>'
    )
    # Convert [x] into checked checkbox
    html = html.replace(
        "[x]", 
        '<span class="checkbox-box checked"></span>'
    )
    html = html.replace(
        "[X]", 
        '<span class="checkbox-box checked"></span>'
    )
    return html


def add_section_numbers_and_rules(html):
    """Add colored section numbers and horizontal accent rules after h2 tags."""
    def replace_h2(match):
        attrs = match.group(1) or ""
        content = match.group(2)
        # Extract section number if present
        num_match = re.match(r"(\d+)\.\s*(.*)", content)
        if num_match:
            num = num_match.group(1)
            rest = num_match.group(2)
            return f'<div class="section-break"></div><h2{attrs}><span class="section-number">{num}.</span> {rest}</h2>\n<hr class="section-rule">'
        return f"<h2{attrs}>{content}</h2>\n" + '<hr class="section-rule">'

    html = re.sub(r"<h2([^>]*)>(.*?)</h2>", replace_h2, html)
    return html


def add_code_language_labels(html):
    """Add language labels to code blocks."""
    # Find code blocks with language classes and add labels
    def add_label(match):
        lang = match.group(1) if match.group(1) else ""
        code_content = match.group(2)
        
        lang_display = {
            "jsx": "JSX",
            "javascript": "JavaScript", 
            "js": "JavaScript",
            "json": "JSON",
            "bash": "Bash",
            "shell": "Shell",
            "groq": "GROQ",
            "typescript": "TypeScript",
            "ts": "TypeScript",
            "python": "Python",
            "html": "HTML",
            "css": "CSS",
        }
        
        label = lang_display.get(lang.lower(), lang.upper()) if lang else ""
        label_html = f'<span class="code-lang">{label}</span>' if label else ""
        
        return f'<pre>{label_html}<code class="language-{lang}">{code_content}</code></pre>'
    
    # Match pre>code blocks with language class
    html = re.sub(
        r'<pre><code class="language-(\w+)">(.*?)</code></pre>',
        add_label,
        html,
        flags=re.DOTALL
    )
    
    return html


def remove_first_h1(html):
    """Remove the first H1 tag (GAICOM SYSTEM DOCUMENTATION) since we have a cover page."""
    # Remove the first h1 and the hr that follows it
    html = re.sub(r'<h1[^>]*>GAICOM SYSTEM DOCUMENTATION</h1>\s*<hr\s*/?\s*>', '', html, count=1)
    return html


def build_cover_page():
    """Build the cover page HTML."""
    return """
<div class="cover-page">
    <div class="cover-accent-line"></div>
    <div class="cover-org">GAICOM</div>
    <div class="cover-title">System &amp; CMS<br>Documentation</div>
    <div class="cover-subtitle">Technical Reference &amp; Operations Guide</div>
    <div class="cover-tagline">
        Comprehensive documentation for the GAICOM web platform —
        architecture, frontend, backend, CMS operations, deployment,
        and maintenance procedures.
    </div>
    <div class="cover-meta">
        <strong>Created by:</strong> Tanish Kumar<br>
        <strong>Organization:</strong> Generative AI Community (GAICOM)<br>
        <strong>Version:</strong> 1.0<br>
        <strong>Date:</strong> February 2026
    </div>
</div>
"""


def build_full_html(cover_html, toc_html, content_html):
    """Assemble the full HTML document."""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GAICOM System Documentation</title>
    <style>{CSS}</style>
</head>
<body>
    {cover_html}
    {toc_html}
    <div class="doc-content">
        {content_html}
    </div>
</body>
</html>
"""


def html_to_pdf_chrome(html_path, pdf_path, chrome_path):
    """Use Chrome headless to convert HTML to PDF."""
    abs_html = os.path.abspath(html_path)
    abs_pdf = os.path.abspath(pdf_path)

    file_url = "file:///" + abs_html.replace("\\", "/")

    cmd = [
        chrome_path,
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--run-all-compositor-stages-before-draw",
        "--print-to-pdf=" + abs_pdf,
        "--print-to-pdf-no-header",
        "--no-pdf-header-footer",
        file_url,
    ]

    print(f"  Running Chrome headless...")
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)

    if result.returncode != 0:
        print(f"  Chrome stderr: {result.stderr[:500]}")

    return os.path.exists(abs_pdf)


def main():
    print("=" * 60)
    print("GAICOM Documentation PDF Generator - Version 2.0")
    print("=" * 60)

    # 1. Read markdown
    print("\n[1/7] Reading markdown file...")
    md_text = read_markdown(MD_FILE)
    print(f"  ✓ Read {len(md_text):,} characters")

    # 2. Generate TOC
    print("\n[2/7] Building table of contents...")
    toc_items = build_toc_from_md(md_text)
    toc_html = build_toc_html(toc_items)
    print(f"  ✓ Found {len(toc_items)} sections")

    # 3. Convert markdown to HTML
    print("\n[3/7] Converting markdown to HTML...")
    content_html = convert_md_to_html(md_text)
    print(f"  ✓ Generated {len(content_html):,} characters of HTML")

    # 4. Post-process HTML
    print("\n[4/7] Enhancing HTML with professional styling...")
    
    print("    - Removing redundant H1 heading...")
    content_html = remove_first_h1(content_html)
    
    print("    - Injecting architecture diagram...")
    content_html = inject_architecture_diagram(content_html)
    
    print("    - Injecting flow diagrams...")
    content_html = inject_flow_diagrams(content_html)
    
    print("    - Adding callout boxes...")
    content_html = add_callout_boxes(content_html)
    
    print("    - Converting checkbox lists...")
    content_html = convert_checkbox_lists(content_html)
    
    print("    - Adding section numbers and rules...")
    content_html = add_section_numbers_and_rules(content_html)
    
    print("    - Adding code language labels...")
    content_html = add_code_language_labels(content_html)
    
    print("  ✓ HTML enhancement complete")

    # 5. Build cover page
    print("\n[5/7] Building cover page...")
    cover_html = build_cover_page()
    print("  ✓ Cover page created")

    # 6. Assemble full HTML
    print("\n[6/7] Assembling final HTML document...")
    full_html = build_full_html(cover_html, toc_html, content_html)

    # Write intermediate HTML
    with open(HTML_FILE, "w", encoding="utf-8") as f:
        f.write(full_html)
    print(f"  ✓ Wrote intermediate HTML: {HTML_FILE}")

    # 7. Convert to PDF
    print("\n[7/7] Converting to PDF via Chrome headless...")
    success = html_to_pdf_chrome(HTML_FILE, PDF_FILE, CHROME_PATH)

    print("\n" + "=" * 60)
    if success and os.path.exists(PDF_FILE):
        size_mb = os.path.getsize(PDF_FILE) / (1024 * 1024)
        print("✓ PDF GENERATED SUCCESSFULLY!")
        print(f"  Output: {PDF_FILE}")
        print(f"  Size: {size_mb:.2f} MB")
    else:
        print("⚠ PDF generation may have issues. Checking...")
        if os.path.exists(PDF_FILE):
            size_mb = os.path.getsize(PDF_FILE) / (1024 * 1024)
            print(f"  PDF exists at: {PDF_FILE} ({size_mb:.2f} MB)")
        else:
            print(f"  ERROR: PDF was not created at {PDF_FILE}")
            print("  Try opening the HTML file directly in Chrome and printing to PDF:")
            print(f"  {HTML_FILE}")
            sys.exit(1)

    print(f"\n  Intermediate HTML kept at: {HTML_FILE}")
    print("  (You can delete it after verifying the PDF)")
    print("=" * 60)


if __name__ == "__main__":
    main()
