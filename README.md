# Interactive Developer Portfolio

This is a modern, responsive, and interactive personal portfolio website designed to showcase my skills, projects, experience, and certifications. Built with cutting-edge frontend technologies, it aims to provide a highly engaging and visually appealing user experience.
# Interactive Developer Portfolio

✨ [View Live Demo](http://static-website-vrishank.s3-website.eu-north-1.amazonaws.com/)

This is a modern, responsive, and interactive personal portfolio website...
## ✨ Features

* **Responsive Design:** Optimized for seamless viewing across desktops, tablets, and mobile devices.
* **Dynamic Dark/Light Mode:** Toggle between dark and light themes with preference persistence (saved in local storage).
* **Animated Scroll Effects:** Smooth fade-in and slide-up animations for sections as they come into view, powered by Framer Motion.
* **Interactive Skills Chart:** A visual radar chart representing proficiency levels across various technical skills.
* **Project Carousel:** An auto-playing and responsive carousel for easily showcasing multiple projects, each with expandable details.
* **Subtle Background Animation:** A continuous, non-distracting particle animation in the background using Particles.js.
* **Interactive Cards:** Engaging hover effects on experience, education, certification, and individual skill cards provide visual feedback.
* **Resume Download:** A direct link to download the resume in PDF format.

## 🚀 Technologies Used

* **Frontend Framework:** React.js
* **Styling:** Tailwind CSS
* **Animations:** Framer Motion
* **Background Particles:** Particles.js (`react-particles`, `tsparticles-slim`)
* **Charting:** Chart.js (`react-chartjs-2`)
* **Carousel:** React Slick (`slick-carousel`)
* **Icons:** Lucide React
* **Hosting:** Amazon S3 (Static Website Hosting)
* **CDN & SSL:** Amazon CloudFront
* **Certificate Management:** AWS Certificate Manager (ACM)

## 📦 Installation & Local Setup

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (LTS version recommended)
* npm (Node Package Manager) or Yarn

### Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-portfolio-repo.git](https://github.com/your-username/your-portfolio-repo.git)
    cd your-portfolio-repo
    ```
    *(Replace `your-username` and `your-portfolio-repo` with your actual GitHub details)*

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
    This will install all the necessary packages, including `react-chartjs-2`, `chart.js`, `react-slick`, `slick-carousel`, `react-particles`, `tsparticles-slim`, `lucide-react`, and `framer-motion`.

3.  **Place your resume PDF:**
    * Ensure your resume PDF file is named `resume.pdf`.
    * Place it directly into the `public/` directory of your project.

4.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    This will start the application in development mode. Open your browser and navigate to `http://localhost:3000` (or the port indicated in your terminal) to view it.

## 🌐 Deployment to AWS S3 & CloudFront

This project is designed for efficient static site hosting on AWS.

1.  **Build the project for production:**
    ```bash
    npm run build
    # or
    yarn build
    ```
    This command compiles your React application into static files (HTML, CSS, JavaScript, images) in the `build/` (or `dist/`) directory, optimized for production.

2.  **AWS S3 Setup:**
    * Create an S3 bucket in your AWS account (e.g., `yourname-portfolio-website`).
    * **Crucially, enable "Static website hosting"** in the bucket's Properties, setting `index.html` as both the Index and Error document.
    * **Set a Bucket Policy** in the Permissions tab to allow public `s3:GetObject` access to all objects within the bucket.
    * **Upload the *contents* of your local `build/` folder** (not the `build` folder itself) directly into the root of this S3 bucket.

3.  **AWS Certificate Manager (ACM) for SSL:**
    * In the `US East (N. Virginia) - us-east-1` region, request a public SSL/TLS certificate for your custom domain (e.g., `yourportfolio.com` and `*.yourportfolio.com`).
    * Validate the certificate, preferably via DNS validation by adding CNAME records to your domain's DNS provider.

4.  **AWS CloudFront Distribution:**
    * Create a new CloudFront distribution.
    * Set the **Origin Domain** to your S3 bucket (select the plain bucket name, not the S3 website endpoint).
    * Choose **"Yes, use OAC (recommended)"** for S3 bucket access and create a new OAC. CloudFront will provide a specific bucket policy; **copy this policy.**
    * Set **Viewer Protocol Policy** to "Redirect HTTP to HTTPS."
    * In **Alternate Domain Names (CNAMEs)**, add your custom domain(s) (e.g., `yourportfolio.com`, `www.yourportfolio.com`).
    * Select the ACM SSL certificate you just issued.
    * Set the **Default Root Object** to `index.html`.
    * **Go back to your S3 bucket's Permissions tab** and **replace the existing bucket policy** with the new policy provided by CloudFront's OAC. This secures your S3 bucket, allowing only CloudFront to access it.

5.  **Update DNS Records:**
    * In your domain's DNS management (e.g., AWS Route 53 or your domain registrar), create/modify A records (for root domain) and/or CNAME records (for `www` subdomain) to point to your CloudFront distribution's domain name (e.g., `d123abc456def.cloudfront.net`).

After these steps, your portfolio will be accessible via `https://yourportfolio.com` (or your chosen custom domain), served globally with high performance and security.

## 🤝 Contributing

Feel free to fork this repository and adapt it for your own portfolio. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
