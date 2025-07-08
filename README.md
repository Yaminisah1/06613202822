# 🔧 **React URL Shortener – Design Document**

## 📌 Overview

This document outlines the architectural and design decisions made while developing a **React-based URL Shortener Web Application**. The application enables users to shorten URLs, optionally assign custom shortcodes, and track usage analytics — all while maintaining high-quality, scalable, and maintainable client-side code.

---

## 🏗️ 1. Architecture & Component Design

### 1.1. **Frontend Architecture (SPA)**

* **Framework**: React 18
* **Type**: Single Page Application (SPA)
* **State Management**: Local state (`useState`, `useEffect`), optionally scalable to `useReducer` or `Context API`
* **Routing**: React Router DOM
* **UI/UX**: Material UI 5
* **Logging Middleware**: Custom `logEvent()` logger (no `console.log` used)

### 1.2. **Component-Based Breakdown**

| Component   | Responsibility                                               |
| ----------- | ------------------------------------------------------------ |
| `AppRouter` | Handles routing across `/`, `/stats`, `/redirect/:shortcode` |
| `URLForm`   | Captures and validates long URLs, validity, custom shortcode |
| `URLList`   | Displays active shortened URLs with expiry                   |
| `Stats`     | Lists analytics on clicks (time, source, shortcode used)     |
| `Redirect`  | Looks up shortcode → long URL, logs click, redirects         |
| `logger.js` | Middleware for structured, persistent log events             |

---

## 📂 2. Folder Structure

```
src/
├── components/       # Reusable UI components
├── context/          # (Optional) Context providers for state
├── middleware/       # Custom logger middleware
├── pages/            # Route-based screen components
├── router/           # Centralized routing setup
├── utils/            # Helper functions (e.g., shortcode generator)
├── App.jsx           # Root component
├── index.js          # Entry point
```

---

## 📊 3. Client-Side Data Modeling

All data is **stored in `localStorage`** to simulate persistence.

### 3.1. **Shortened URL Object**

```json
{
  "longUrl": "https://example.com",
  "shortcode": "abc123",
  "shortUrl": "http://localhost:3000/redirect/abc123",
  "created": "2025-07-08T10:00:00Z",
  "expiry": "2025-07-08T10:30:00Z",
  "clicks": []
}
```

### 3.2. **Click Event Object (within logs)**

```json
{
  "event": "URL_CLICKED",
  "timestamp": "2025-07-08T10:10:00Z",
  "data": {
    "shortUrl": "http://localhost:3000/redirect/abc123",
    "source": "http://localhost:3000/stats"
  }
}
```

### 3.3. **Persistence Keys in `localStorage`**

* `"logs"`: All log events (including `URL_CREATED`, `URL_CLICKED`)
* `"shortUrls"`: All created shortened URL objects (optional for future scalability)

---

## 🧠 4. Key Design Decisions

### ✅ Material UI (MUI)

Chosen for:

* Modern design patterns
* Prebuilt, responsive components
* Accessibility support

### ✅ Custom Logging Middleware

* Replaces `console.log`
* Logs structured data to `localStorage` for audit + debug

### ✅ No Backend API

* Entire system is **frontend-only**
* Assumes user is pre-authorized (as per requirements)

---

## 🔀 5. Routing Strategy

### **React Router** with following paths:

| Route                  | Purpose                    |
| ---------------------- | -------------------------- |
| `/`                    | URL shortening form        |
| `/stats`               | Show analytics of clicks   |
| `/redirect/:shortcode` | Redirect and log the visit |

### 📌 Redirection Logic:

* On visiting `/redirect/:shortcode`

  * Lookup shortcode in `logs` (or `shortUrls`)
  * If valid + not expired:

    * Log `URL_CLICKED`
    * Redirect using `window.location.href = longUrl`
  * Else:

    * Show error (invalid/expired link)

---

## 🔐 6. Validation & Error Handling

* **URL format**: Validated with RegExp
* **Shortcode**: Must be alphanumeric + unique
* **Validity**: Must be integer ≥ 1 or default to 30 min
* **User feedback**: Snackbar or inline messages

---

## ⚙️ 7. Assumptions

| Assumption                                 | Justification                      |
| ------------------------------------------ | ---------------------------------- |
| No login/authentication required           | As stated in prompt                |
| Users can shorten up to 5 URLs per session | Enforced in UI                     |
| Data is only session-persistent            | `localStorage` used                |
| Custom shortcodes are optional             | Fallback to generated shortcodes   |
| All redirects are handled client-side      | Required by evaluation constraints |

---

## 🚀 8. Future Scalability

| Area        | Upgrade Option                               |
| ----------- | -------------------------------------------- |
| Persistence | Integrate Firebase, Supabase, or backend API |
| Auth        | Add user sessions, JWT, OAuth                |
| Analytics   | Use IP + geo-location APIs for richer logs   |
| Styling     | Add theming, dark mode                       |
| Testing     | Integrate Jest + React Testing Library       |

---

## ✅ 9. Tech Stack Summary

| Category          | Library/Tool       | Why Used                              |
| ----------------- | ------------------ | ------------------------------------- |
| Frontend          | React              | SPA with routing & state management   |
| UI Framework      | Material UI        | Clean UI components & responsive grid |
| Routing           | React Router DOM   | Declarative routing + parameters      |
| State Persistence | localStorage       | Simulates backend state               |
| Analytics         | Custom logging     | Structured middleware for logging     |
| Validation        | JavaScript + RegEx | Inline validation logic               |

---

## 📘 10. Summary

This design ensures:

* Clean separation of concerns
* Client-only functionality
* Structured logging
* Clean, modern UI
* Maintainable, scalable code architecture

---
