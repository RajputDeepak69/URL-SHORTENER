# 🚀 MINI-URL: Serverless URL Shortener (My Learning + Showcase Project)

> *"This repo is a collection of my blood, sweat, and coffee ☕ in learning AWS + DevOps. This project might not change the world… but it’s changed me as a cloud engineer-in-the-making 💀."*  
\- Deepak

---

## ✨ What is MINI-URL?

A fully **serverless Bitly-style URL shortener** I built to showcase my **DevOps + AWS cloud learning**.  
It’s not just a pet project 👶 — it’s me putting **theory → into practice** and fighting real‑world AWS monsters 👹 like permissions, time sync, SDK versions, and nasty CORS dragons 🐲.

---

## 🛠️ Tech Stack

**Frontend**  
- HTML5, CSS3, JavaScript (vanilla to keep 100% control)  

**Backend**  
- AWS Lambda (Node.js 18.x)  
- AWS DynamoDB  
- Lambda Function URLs (instead of API Gateway → lean + free-tier safe)  

**Mindset / DevOps vibes**  
- IAM roles & policies (learned the hard way 😂)  
- Free-tier billing safety ☕  
- Monitoring/future CI/CD Infrastructure as Code planned  

---

## 🚀 Features

- Paste any long URL → get a short one instantly  
- Redirect instantly with serverless Lambda  
- Tracks clicks & created timestamp  
- Copy-to-clipboard link + clickable anchor  
- Auto-refreshing analytics every 5s  
- 100% AWS serverless, 100% free-tier friendly 💸  

---

## 🧮 Cost Safety 💸 (important as a broke student 🥲)

This project is designed to be **student-proof** against surprise AWS bills:

- **AWS Lambda**: 1M free invocations/month  
- **DynamoDB**: 25GB storage + 25 RCU/WCUs always free  
- **Function URL**: no extra cost  

👉 Even if someone spammed my shortener 100,000 times… **it’s still $0.00.**  
*(my heart rate = stable ❤️)*  

**Lesson learned:** Always add *AWS Budgets Alerts* when experimenting. Safety first 🔒.

---

## 📂 Project Structure
MINI-URL/
├── frontend/
│ ├── index.html # main UI
│ ├── css/style.css # styles
│ └── js/main.js # logic connecting UI ⇆ Lambda
│
├── backend/
│ ├── lambda/
│ │ ├── create-url/ # Lambda to generate short code
│ │ │ └── index.js
│ │ ├── redirect-url/ # Lambda to redirect visitors
│ │ │ └── index.js
│ │ └── get-stats/ # Lambda for analytics
│ │ └── index.js
│ └── .gitignore # ignoring node_modules, zips, etc.
│
└── README.md # this epic documentation

---

## 🔥 How It Works (Step by Step)

1. User pastes a long URL (e.g., `https://linkedin.com/in/thakur-deepak29`)  
2. Frontend sends API call → `create-url` Lambda  
3. Lambda generates a short code (e.g., `d80991d5`) and saves:
   {
"short_url": "d80991d5",
"long_url": "https://linkedin.com/in/thakur-deepak29",
"clicks": 0,
"created_at": "2025-10-03T15:56:00Z"
}

4. DynamoDB stores it safely  
5. User receives this final short link:
   https://<redirect-lambda-url>/d80991d5

6. When clicked:  
   - `redirect-url` Lambda fetches from DynamoDB  
   - Increments `clicks`  
   - Issues **301 HTTP Redirect**  
   - You land at the original URL 🎯  

7. Analytics UI calls `get-stats`, shows:  
   - Clicks so far  
   - Created At date  

---

## 🎨 Frontend Demo

- Paste any long URL → click **Shorten**  
- Instantly see:  
  - a text input with URL (copy!)  
  - a clickable hyperlink (open in new tab 🔗)  
  - stats counters below  

Yes — it looks simple, but that’s exactly what makes it clean & dev‑friendly. 🖤

---

## ⚠️ Disclaimer (READ FIRST)

This repo is:  
- ✅ **For learning purposes only**  
- ✅ Built to **practice AWS + DevOps skills**  
- ❌ Not a production‑ready SaaS  
- ❌ Not meant for enterprise-scale usage  

Mistakes, shortcuts, or security trade-offs **are intentional to accelerate my learning curve**.  

👉 If you spot something that looks risky for production — you’re right.  
Please feel free to suggest patches or improvements! I want feedback 👂.  

---

## 📈 Future Roadmap

- [ ] Host frontend as static site in S3 + CloudFront  
- [ ] Add custom domain (like `dpak.ly/xxxx`)  
- [ ] Add Auth using Cognito (so users have accounts/login)  
- [ ] CI/CD with GitHub Actions (infrastructure-as-code + auto deploy)  
- [ ] Refactor backend with Terraform IaC  
- [ ] Add monitoring (CloudWatch dashboards, alerts)  

---

## 🏆 Lessons I Learned

- AWS Lambda default runtime quirks (Node.js v18 uses modular SDK)  
- How IAM permissions blow up in your face 😅 if not set properly  
- CORS dragons 🐉 — why duplicating `Access-Control-Allow-Origin` breaks everything  
- How important **clock synchronization** is (signature expired error nearly made me cry)  
- Always tear down AWS resources after testing (so your wallet doesn’t cry 💸)  

---

## 📢 Final Words (from me, Deepak 🤘)

This project may look “mini”…  
But for me, it was a **big milestone** in leveling up my skills 🚀.  
I fought AWS monsters and came out alive.  

So if you’re an engineer reading this:  
- treat this code as a **sandbox of learning**  
- roast my mistakes, correct me 😅  
- give suggestions → I’ll love it ❤️  

Because in the end, this is my DevOps journey — and you’re welcome to learn with me!  

---

## 👨‍💻 About Me

**Deepak Thakur**  
- 🧑‍💻 Aspiring Cloud/DevOps Engineer  
- 🌐 [LinkedIn](https://www.linkedin.com/in/thakur-deepak29)  
- 💡 Passionate about learning by actually building & failing fast  

---

✨ Thanks for checking this out. May your Lambda always return 200 OK ✌️
