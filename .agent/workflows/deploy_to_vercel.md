---
description: How to deploy the KGF Premium Landing Page to Vercel for free.
---

# Deploying to Vercel (Recommended)

Vercel is the best platform for React/Vite apps because it offers the fastest global CDN, automatic image optimization, and zero configuration.

### Option 1: Git Integration (Best for "10/10" Production)
Since you already have this project connected to GitHub, this is the most robust method.

1.  **Push your latest changes**:
    ```powershell
    git add .
    git commit -m "Final 10/10 Polish"
    git push
    ```
2.  Go to [Vercel.com](https://vercel.com) and Sign Up/Login.
3.  Click **"Add New..."** -> **"Project"**.
4.  Select your GitHub repository (`kgf-clone`).
5.  **Configure Project**:
    - **Framework Preset**: Vite (should be detected automatically).
    - **Root Directory**: `./` (default).
    - **Build Command**: `npm run build` (default).
    - **Output Directory**: `dist` (default).
6.  Click **Deploy**.

### Option 2: Command Line (Quickest)
You can deploy directly from your terminal anytime.

1.  Run the Vercel CLI:
    ```powershell
    npx vercel
    ```
2.  Follow the prompts:
    - Set up and deploy? [Y]
    - Which scope? [Select your account]
    - Link to existing project? [N]
    - Project Name? [kgf-chapter2]
    - In which directory? [./]
    - Want to modify settings? [N]
3.  Wait for the "Production: [link]" URL.

### Other Options
- **Netlify**: Similar to Vercel. Drag and drop your `dist` folder or connect Git.
- **GitHub Pages**: Requires slightly more config for React Router, but free. Vercel is generally faster for this type of detailed UI.
