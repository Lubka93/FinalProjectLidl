# FinalProjectLidl

## 🛒 Project Overview

FinalProjectLidl is an end-to-end testing project built using [Playwright](https://playwright.dev/) for automating and validating features of the Lidl e-commerce platform.  
It includes tests for login, discount verification, sorting, UI elements, and more.

---

## ⚙️ Installation & Setup

Follow the steps below to get the project up and running locally:

### 1. Clone the Repository

```bash
git clone https://github.com/Lubka93/FinalProjectLidl.git
```

### 2. Navigate into the Project Directory

```bash
cd FinalProjectLidl
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create a `.env` File in the Root Directory

Include your credentials for login automation:

```
LOGIN_EMAIL=your_email@example.com
LOGIN_PASSWORD=your_password
```

### 5. Run Tests

To start running the test suite, use:

```bash
npx playwright test
```
### Important: 
- In calculation of percentage I used Math.floor() in order to match the values on lidl.sk page. However, originally I used Math.round(), in that case some of percentage values were failing (correctly), I don't know the bussines requirement for the calculation, so I used Math.floor() in order to have passing tests.  
### Problems:
- I had to use static waits for login and finding the elements (product cards), I know that is not good practise, but without them the test were too flaky and were failing. 
- I wanted to use this patern for tags - { tags: ['@API', '@smoke', '@fast'] }. But It didn't work, I had to use tags inside description test in order to run -g/--grep flag. I don't know why I had the problem. Tags in description text worked just fine. 


