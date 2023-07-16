# [Your Project Name]
![build-status](https://img.shields.io/badge/build-passing-brightgreen)
![version](https://img.shields.io/badge/version-1.0.0-blue)
![license](https://img.shields.io/badge/license-MIT-green)

## Table of Contents
- [About](#about)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contributing](#contributing)
  - [Commit Guidelines](#commit-guidelines)
- [License](#license)
- [Contact](#contact)

## About
Scraper-BO is a back office React application that helps set up different web scraping projects. This application is aimed at simplifying the process of setting up and monitoring your scraping projects.

## Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/)

### Installation
1. Clone this repo:
\```bash
git clone https://github.com/thomasguillaux/scraper-bo.git
\```
2. Navigate to the project directory:
\```bash
cd scraper-bo
\```
3. Install NPM packages:
\```bash
npm install
\```
4. Run the app in the development mode:
\```bash
npm start
\```
## Contributing
Scraper-BO uses Husky and commitlint to ensure a clean, consistent commit history. Husky enables us to easily use git hooks, running scripts before every commit to ensure that only valid commits are made. commitlint is used to ensure commits adhere to a given format. This helps with versioning, maintaining the changelog, and navigating the project history.

### Commit Guidelines
We follow the conventional commits specification. Here are some examples:

* `fix(server): fix caching issue` - this indicates a bug fix in the server part of the code.
* `feat(auth): add login via Google` - this indicates the creation of a new feature.
* `docs(readme): add installation section` - this indicates that the documentation has been updated.
* `chore(deps): update dependency` - this is used for updating a project dependency.

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
Thomas Guillaux - thomasguillaux@gmail.com - https://www.linkedin.com/in/thomasguillaux/