# Product Requirements Document (PRD)
## Project Name: Plant SOS


---

## 1. Project Overview

**Plant SOS** is a simple, beginner-friendly website that helps people identify possible problems with plant leaves from a photo and learn how to take care of them.

When a user takes a photo of an unhealthy plant leaf and uploads it to the website, a real Machine Learning (ML) model running in the background will examine the image. The website will then tell the user what condition or disease the leaf might have, show a confidence score (how certain the model is), and provide easy, practical tips to help save the plant.

---

## 2. Problem Statement

Many people who grow plants at home—like balcony gardeners or students with desk plants—run into common problems:

- **Leaves change color or get spots:** Leaves turn yellow, develop brown patches, or wilt, but beginners do not know why.
- **Online searches are confusing:** Searching on Google often shows complicated scientific terms, dense biology papers, or contradictory forum advice.
- **Wrong actions make things worse:** Without knowing the real issue, beginners often overwater, add too much fertilizer, or use harsh chemicals that can harm the plant.

Plant SOS solves this by giving users a quick, visual estimate of the leaf's condition along with easy-to-understand care instructions.

---

## 3. Main Objectives

1. **Build a simple website:** Create an easy-to-use web page where anyone can upload a photo of a plant leaf.
2. **Train a real AI/ML model:** Use Python to train a genuine image classification model on a small, focused group of plant leaf images.
3. **Connect the website to the model:** Enable the web page to send the user's photo to the Python model and display the result.
4. **Provide helpful care tips:** Display clear, plain-English advice for each detected condition so the user knows what steps to take next.
5. **Be honest and clear:** Always remind users that the result is an educated estimate, not a guaranteed botanical diagnosis.

---

## 4. Target Users

- **Beginner Home Gardeners:** People who keep plants at home, in balconies, or in small gardens and need quick, simple guidance.
- **Students & Hobbyists:** Anyone taking care of house plants who wants to understand leaf issues without reading complex textbooks.


---

## 5. Core Features (Version 1)

These are the primary features that will be built for the first working version:

### 1. Leaf Photo Upload & Preview
- The user can select a photo (`.jpg` or `.png`) from their computer or phone.
- A live preview shows the selected photo on the screen before they submit it so they know it is the right picture.

### 2. Genuine AI/ML Leaf Classification
- A real machine learning model will inspect the image.
- **What is Image Classification?** It means teaching a computer to look at patterns in an image (like spots, color, and leaf shapes) and match them to known categories.
- The model will return:
  - The predicted plant and condition (for example: *Tomato Leaf - Early Blight* or *Tomato Leaf - Healthy*).
  - A **Confidence Score** (for example: *82%*), showing how certain the model feels about its prediction.
  - A clear **Disclaimer** stating that this is an automated estimate and not a 100% botanical guarantee.
- *Note:* The model has not been trained yet. It will be trained on real data later in the project.

### 3. Simple Plant-Care Suggestions
- Each supported condition will display 2 to 3 easy, practical steps in plain language (e.g., *"Snip off badly damaged lower leaves with clean scissors"*, *"Water near the roots, not on the leaves"*).
- The advice will focus on safe, gentle actions rather than dangerous chemical sprays.

### 4. Website pages (Version 1 structure)
- **Landing page (`frontend/index.html`):** the first page visitors see. It shows a welcoming hero with the Plant SOS name, a short tagline, and an Explore button that scrolls down to three feature cards: **Analyze a Leaf** (available; opens `analyze.html`), **Plant Rescue Tracker** ("Coming soon"), and **Plant Waste Reuse Guide** ("Coming soon"). The two Coming-soon cards are labels only; they do not link anywhere or open unfinished pages.
- **Leaf analyzer page (`frontend/analyze.html`):** where the Version 1 analysis flow happens (photo upload, preview, analysis, results). It links back to the landing page and shares the same visual style.

---

## 6. Future Features (To Build Later)

These features are planned for future versions after the core features work reliably:

1. **Plant Waste Reuse Guide:**
   - A guide explaining how to reuse healthy fallen leaves and garden trimmings for composting or soil mulch.
   - A safety warning explaining why infected or diseased leaves should not be added to home compost heaps (to prevent spreading spores).

2. **Plant Rescue Tracker:**
   - An option for users to record photo updates over a few weeks to see if their plant is recovering.

---

## 7. Technology Stack


- **HTML (HyperText Markup Language):** Builds the basic structure of the website (headings, upload button, image preview box, and text areas).
- **CSS (Cascading Style Sheets):** Makes the website look clean, modern, and pleasant to use on both mobile phones and laptops.
- **JavaScript (Vanilla JS):** Handles user actions on the page—showing the image preview when a photo is picked, sending the photo to the Python program, and displaying the results.
- **Python:** The programming language used to build and run the AI/ML model.
  - A simple Python server (using a lightweight library like **Flask**) will act as an **API** (a bridge that lets JavaScript talk to Python).
  - A machine learning library (such as **PyTorch** or **TensorFlow**) will be used to train and run the image classifier.

---

## 8. Basic User Journey

Here is how a person will interact with the website:

1. **Open the Website:** The user visits the Plant SOS landing page.
2. **Open the Analyzer:** The user selects the "Analyze a Leaf" feature card, which opens the analyzer page.
3. **Choose a Photo:** The user clicks the upload button and selects a photo of their plant leaf.
4. **Check the Preview:** The website displays the selected photo immediately so the user can verify it is clear and right side up.
5. **Click "Analyze Leaf":** The user clicks the button. A simple loading message appears while the Python model processes the image.
6. **Read the Results:** The page displays:
   - What the model thinks the condition is.
   - The confidence score.
   - The disclaimer reminding them it is an estimate.
   - 2–3 easy care steps they can follow right away.

---

## 9. Project Scope: What is Included and What is Left Out

### What We Will Build First (In-Scope for Version 1):
- A two-page experience - an inviting landing page plus a focused leaf analyzer page - responsive (HTML, CSS, JavaScript).
- A photo upload box with an instant image preview.
- A genuine Python machine learning model supporting a small, practical set of leaf conditions (e.g., 3 to 5 conditions).
- A simple local connection between the website and Python.
- Easy-to-read care suggestions and a clear disclaimer.

### What We Will Leave for Later (Out-of-Scope):
- **No user accounts or logins:** Users will not need to sign up or remember passwords.
- **No databases:** We will not store personal user data or history in a database for the first version.
- **No cloud hosting or servers:** The project will run locally on the student's computer.
- **No hundreds of plant types:** We will focus only on a few common conditions first to keep training simple and accurate.


---
*End of PRD.*
