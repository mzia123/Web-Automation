# GoLogin Puppeteer Automation

This project demonstrates how to connect to a [GoLogin](https://gologin.com) cloud browser profile using **Puppeteer Core**, run automated tasks, and cleanly stop the profile afterward.  
Currently, it includes a sample test: **navigateAndTakeScreenshot**.

---

## 🚀 Features
- Connects to a GoLogin cloud browser profile via WebSocket.
- Runs automation tasks with Puppeteer.
- Example test: navigate to a site and take a screenshot.
- Cleans up by stopping the profile via GoLogin API.
- Supports running multiple tests by passing their names as CLI arguments.

---

## 📦 Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- A GoLogin account with an API token and profile ID

---

## ⚙️ Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
