# User Flows

This document outlines the primary user journeys within the AI Content Suite.

## Flow 1: Onboarding and Creating a Digital Twin

This is the critical first step for a new user to personalize their content.

**Objective:** User successfully trains a new Digital Twin model.

**Steps:**
1.  **User signs up / logs in.**
2.  **System displays the main dashboard.** A prominent Call-to-Action (CTA) reads "Create Your First Twin".
3.  **User clicks the CTA.**
4.  **System navigates to the Twin creation page.** This page explains the requirements (e.g., "Upload 10-20 high-quality photos of the same subject").
5.  **User clicks "Upload Photos" and selects files from their device.**
6.  **System displays thumbnails of the selected photos.** User can remove individual photos.
7.  **User provides a name for the Twin (e.g., "Aria").**
8.  **User clicks "Start Training".**
9.  **System validates the inputs and deducts the required credits.** It then shows a confirmation message: "Your Twin 'Aria' is now in the training queue. We'll notify you when it's ready!"
10. **User is redirected to the dashboard.** The new Twin appears in their list with a "Training" status.

---

## Flow 2: Generating an Image with a Digital Twin

This is the core content creation loop.

**Objective:** User generates a new image based on their Twin.

**Steps:**
1.  **User navigates to the "Image Generator" page.**
2.  **System displays the generation interface.**
3.  **User selects their trained Twin (e.g., "Aria") from a dropdown menu.** The dropdown shows a thumbnail and the name of the Twin.
4.  **User writes a detailed prompt** in the text area. E.g., "photo of [twin_name] on a beach at sunset, wearing a white dress". The `[twin_name]` is a placeholder that injects the Twin's data.
5.  **User selects generation options:**
    *   Style: Photorealistic
    *   Aspect Ratio: 2:3 (Portrait)
    *   NSFW Filter: Off
6.  **User clicks the "Generate" button.**
7.  **System deducts credits and displays a loading/progress indicator.** The UI is disabled to prevent multiple submissions.
8.  **After 30-60 seconds, the system displays the generated image.**
9.  **User can now choose to:**
    *   Download the image.
    *   Generate another variation.
    *   Delete the image.
    *   Start a new generation.
10. **The generated image is automatically saved to the user's Gallery.**

---

## Flow 3: Generating a Video

This flow is similar to image generation but for a different content type.

**Objective:** User creates a short video clip.

**Steps:**
1.  **User navigates to the "Video Generator" page.**
2.  **User selects their trained Twin (e.g., "Aria").**
3.  **User writes a prompt describing the action.** E.g., "[twin_name] winking at the camera, slight smile".
4.  **User clicks "Generate Video".**
5.  **System displays a loading indicator, noting that video generation may take longer.**
6.  **The generated video appears and autoplays on a loop.**
7.  **User can download the video (as MP4) or delete it.**
8.  **The video is automatically saved to the Gallery.**
