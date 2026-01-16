/**
 * Landing Page Profile - JavaScript
 * 
 * Mục đích:
 * - Đọc dữ liệu từ file data.json
 * - Render động toàn bộ nội dung lên giao diện
 * - Xử lý sự kiện hamburger menu cho mobile
 * 
 * Cấu trúc:
 * 1. Đọc file JSON bằng Fetch API
 * 2. Render từng section: Header, Hero, Skills, Projects, Footer
 * 3. Xử lý sự kiện tương tác
 */

// ===== HÀM CHÍNH: Khởi động ứng dụng =====
async function khoiDong() {
    try {
        // Đọc dữ liệu từ file JSON
        const duLieu = await docFileJSON();
        
        // Render từng phần của trang
        renderHeader(duLieu.navigation);
        renderHero(duLieu.hero);
        renderSkills(duLieu.skills);
        renderProjects(duLieu.projects);
        renderFooter(duLieu.footer);
        
        // Xử lý sự kiện
        xuLySuKien();
        
    } catch (loi) {
        console.error('Lỗi khi tải dữ liệu:', loi);
    }
}

// ===== ĐỌC FILE JSON =====
async function docFileJSON() {
    const response = await fetch('data.json');
    if (!response.ok) {
        throw new Error('Không thể đọc file data.json');
    }
    return await response.json();
}

// ===== RENDER HEADER / NAVBAR =====
function renderHeader(navigation) {
    // Render logo dạng ảnh
    const logoElement = document.getElementById('logo');
    logoElement.innerHTML = `
        <a href="#hero">
            <img src="${navigation.logo}" alt="${navigation.logoAlt}" class="logo-img">
        </a>
    `;
    
    // Render menu
    const navMenuElement = document.getElementById('navMenu');
    navMenuElement.innerHTML = navigation.menu.map(item => `
        <li><a href="${item.link}">${item.ten}</a></li>
    `).join('');
}

// ===== RENDER HERO SECTION =====
function renderHero(hero) {
    const heroElement = document.getElementById('heroNoidung');
    heroElement.innerHTML = `
        <img src="${hero.avatar}" alt="${hero.ten}" class="hero-avatar">
        <h1 class="hero-ten">${hero.ten}</h1>
        <p class="hero-chuc-danh">${hero.chucDanh}</p>
        <p class="hero-mo-ta">${hero.moTa}</p>
        <div class="hero-buttons">
            <a href="${hero.cvLink}" class="btn btn-primary" download>
                📥 ${hero.cvText}
            </a>
            <a href="#footer" class="btn btn-secondary">
                ✉️ ${hero.contactText}
            </a>
        </div>
    `;
}

// ===== RENDER SKILLS SECTION =====
function renderSkills(skills) {
    const skillsGridElement = document.getElementById('skillsGrid');
    skillsGridElement.innerHTML = skills.map(skill => `
        <div class="skill-item">
            <div class="skill-icon">${skill.icon}</div>
            <h3 class="skill-ten">${skill.ten}</h3>
            <p class="skill-mo-ta">${skill.moTa}</p>
        </div>
    `).join('');
}

// ===== RENDER PROJECTS SECTION =====
function renderProjects(projects) {
    const projectsListElement = document.getElementById('projectsList');
    projectsListElement.innerHTML = projects.map(project => `
        <div class="project-item">
            <div class="project-noidung">
                <h3 class="project-ten">${project.ten}</h3>
                <p class="project-mo-ta">${project.moTa}</p>
                <div class="project-links">
                    ${project.demo ? `<a href="${project.demo}" target="_blank" class="project-link">🔗 Demo</a>` : ''}
                    ${project.github ? `<a href="${project.github}" target="_blank" class="project-link">💻 GitHub</a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// ===== RENDER FOOTER =====
function renderFooter(footer) {
    const footerElement = document.getElementById('footerNoidung');
    footerElement.innerHTML = `
        <h3>${footer.tieuDe}</h3>
        <p>${footer.moTa}</p>
        <div class="social-links">
            ${footer.social.map(item => `
                <a href="${item.link}" target="_blank" class="social-link" title="${item.ten}">
                    ${item.icon}
                </a>
            `).join('')}
        </div>
        <p class="footer-copyright">${footer.copyright}</p>
    `;
}

// ===== XỬ LÝ SỰ KIỆN =====
function xuLySuKien() {
    // Xử lý hamburger menu cho mobile
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Đóng menu khi click vào link (mobile)
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll cho các anchor link
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== KHỞI ĐỘNG KHI DOM ĐÃ TẢI XONG =====
document.addEventListener('DOMContentLoaded', khoiDong);
