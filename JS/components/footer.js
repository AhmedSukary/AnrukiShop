export function Footer() {
    const Footer = document.getElementById("footer");
    Footer.innerHTML = `
    <footer class="footer">     
        <h2 class="logo">AnrukiShop<i class="fa-solid fa-bag-shopping"></i></h2>
        <p class="footer-text">
            Connect with us and feel free to reach out anytime
        </p>
        <div class="social-links">
            <a href="https://www.linkedin.com/in/ahmed-sukary/" target="_blank"><i class="fa-brands fa-linkedin"></i> LinkedIn</a>
            <a href="https://github.com/AhmedSukary" target="_blank"><i class="fa-brands fa-github"></i> GitHub</a>
        </div>
        <p class="copyright">
            © 2026 All Rights Reserved
        </p>
    </footer>`;
}