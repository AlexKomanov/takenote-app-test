# TakeNote Application Test Automation Project

This project contains automated tests for the TakeNote application using Playwright, Artillery for load testing, and Allure for reporting.

## GitHub Repository

https://github.com/AlexKomanov/takenote-app-test

## Prerequisites

Before running the tests, make sure you have the following installed:

1. Node.js (Latest LTS version)
2. Java (Required for Allure reporting)
3. Allure Command Line Tool:
   ```bash
   npm install -g allure-commandline
   ```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AlexKomanov/takenote-app-test.git
   cd takenote-app-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests

### Playwright Tests

The project includes several test suites that can be run using different commands:

- Run all tests:
  ```bash
  npm test
  ```

- Run tests in headed mode (with browser visible):
  ```bash
  npm run test:headed
  ```

- Run tests in debug mode:
  ```bash
  npm run test:debug
  ```

### Test Categories

- Smoke Tests:
  ```bash
  npm run test:smoke
  ```

- Regression Tests:
  ```bash
  npm run test:regression
  ```

- Sanity Tests:
  ```bash
  npm run test:sanity
  ```

### Specific Feature Tests

- Editor Tests:
  ```bash
  npm run test:editor
  ```

- Note Tests:
  ```bash
  npm run test:note
  ```

- Category Tests:
  ```bash
  npm run test:category
  ```

- Settings Tests:
  ```bash
  npm run test:settings
  ```

## Load Testing with Artillery

Artillery is used for performance and load testing of the application. It helps simulate multiple users accessing the application simultaneously to test its performance under load.

- Run Artillery tests locally:
  ```bash
  artillery run tests/load-testing/add-note.ts
  ```

You can view the Artillery test results at [Artillery.io Dashboard](https://app.artillery.io/share/sh_ae456781bed86d44e40a22d746050448463275a9ec6d0e6f5bdc0114728ec6c8)

## Test Reports

### Playwright Report
To view the Playwright HTML report:
```bash
npm run report
```

### Allure Report
1. Generate Allure report:
   ```bash
   npm run allure:generate
   ```

2. Open Allure report:
   ```bash
   npm run allure:open
   ```

3. Or serve Allure report directly:
   ```bash
   npm run allure:serve
   ```

Example of Allure Report:

![Allure Report](https://github.com/user-attachments/assets/ea4d21be-c39d-43e1-bee6-618f94ec28b0)


You can also view the latest Allure report on GitHub Pages:
[GitHub Pages Allure Report](https://alexkomanov.github.io/takenote-app-test/4/index.html)

## GitHub Actions

The project uses GitHub Actions for continuous integration. You can view the CI/CD pipeline and test results at:
[GitHub Actions Dashboard](https://github.com/AlexKomanov/takenote-app-test/actions)

The CI pipeline runs automated tests on every push and pull request to ensure code quality and functionality.

## Project Structure

- `/tests/e2e/` - End-to-end test files
- `/tests/helpers/` - Helper functions and utilities
- `/tests/load-testing/` - Artillery load test configurations
- `/allure-results/` - Raw test results for Allure reporting
- `/playwright-report/` - Playwright HTML test reports
