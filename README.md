# Mylene — Developer Portfolio

Responsive personal developer portfolio built with semantic HTML5, CSS3, and vanilla JavaScript.

## Project structure

```text
mylene-portfolio/
├── index.html
├── css/style.css
├── js/script.js
├── assets/
│   ├── images/
│   ├── projects/
│   ├── certificates/
│   ├── credentials/
│   └── documents/resume.pdf
└── README.md
```

## Run locally
Open `index.html` in a browser, or use VS Code with Live Server. No build step or package installation is required.

## Resume PDF
Export your final resume and save it as `assets/documents/resume.pdf`. The Download Resume button points to that exact path. Replace bracketed placeholders in the on-page resume. The Print Resume button prints only the resume section.

## Certificates
Place certificate images in `assets/certificates/`. In `js/script.js`, find `const certificates = []` and add an object using the commented example. Category values: `programming`, `web-development`, `networking`, `cybersecurity`, `other`. Include accurate title, issuer, date, description, and image. Add a verification URL when available. No certificates are pre-populated because none were supplied.

## Achievements and credentials
Find `const credentials = []` in `js/script.js` and add only verified awards, seminars, workshops, academic achievements, memberships, volunteer work, or leadership experience.

## Projects and screenshots
The three project entries were retained from the original starter portfolio. The original README described them as sample entries, so verify each project's actual implementation, status, technologies, screenshots, and URLs before using this portfolio in applications.

Put screenshots in `assets/projects/`. To add an image preview inside a project card, use:

```html
<button class="project-preview gallery-trigger" type="button"
        data-gallery-title="Project name — screenshot">
  <img src="assets/projects/project-home.png"
       alt="Screenshot of the project home page" loading="lazy">
</button>
```

Add more gallery trigger buttons within the same project card for additional screenshots. The modal behavior is already wired. Set `data-project-category` on each project card to `web`, `ui`, or both.

## Personal information
Replace all bracketed resume fields. Confirm the email address, social links, education, project descriptions, and links before publishing. The source portfolio uses `futurestack22@gmail.com`; verify that this is the correct public contact address.

## Accessibility and behavior
- Semantic sections, skip link, keyboard-operable controls, and accessible preview dialog.
- Responsive layouts and reduced-motion support.
- Print layout outputs only the resume.
- Contact form opens an email draft; it does not send to a server.


## Added certificates

The Certificates & Training gallery now contains the two supplied certificates:
- Thesis Preparation with the Use of Trending Tools and Industry Practices — October 6–7, 2025 (Biliran Province State University).
- Less Hassle, More Hustle — Integrated OS — November 21, 2025 (Integrated Office Solutions, Inc.).

The gallery uses a PNG preview generated from the supplied PDF and the supplied JPG. The original PDF is also included so visitors can open the full certificate. Both entries are categorized under Other Training.
