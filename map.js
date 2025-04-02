import { locations } from './locations.js';

// Initialize map centered on Chiromo Campus
const map = L.map('map', {
    center: [-1.272815, 36.806817], // Chiromo Campus coordinates
    zoom: 17, // Adjusted zoom level to show the campus area
    zoomControl: false,
    minZoom: 14,
    maxZoom: 21,
    preferCanvas: true
});

// Add loading indicator
const loadingIndicator = document.createElement('div');
loadingIndicator.className = 'loading-indicator';
loadingIndicator.textContent = 'Loading map...';
document.getElementById('map').appendChild(loadingIndicator);

// Base layers with default OpenStreetMap style
const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 21
});

const satelliteLayer = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    attribution: '© Google',
    maxZoom: 21,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

// Add default layer and ensure it's loaded
osmLayer.addTo(map);

// Remove loading indicator when base layer loads
osmLayer.on('load', () => {
    loadingIndicator.remove();
});

// Error handling for tile loading
osmLayer.on('tileerror', (error) => {
    console.error('Tile loading error:', error);
});

// Layer groups for different categories
const layerGroups = {
    departments: L.layerGroup(),
    offices: L.layerGroup(),
    'lecture-halls': L.layerGroup(),
    residences: L.layerGroup(),
    labs: L.layerGroup(),
    dining: L.layerGroup(),
    parking: L.layerGroup(),
    shops: L.layerGroup(),
    library: L.layerGroup(),
    transport: L.layerGroup()
};

// Icon configuration for different categories
const iconConfig = {
    departments: { icon: 'building', color: '#00A0DC' },
    offices: { icon: 'briefcase', color: '#4A90E2' },
    'lecture-halls': { icon: 'chalkboard-teacher', color: '#9B59B6' },
    residences: { icon: 'home', color: '#2ECC71' },
    labs: { icon: 'flask', color: '#E74C3C' },
    dining: { icon: 'utensils', color: '#F1C40F' },
    parking: { icon: 'parking', color: '#95A5A6' },
    shops: { icon: 'store', color: '#E67E22' },
    library: { icon: 'book', color: '#8E44AD' },
    transport: { icon: 'bus', color: '#3498DB' }
};

// Create marker icon
function createIcon(category) {
    const config = iconConfig[category] || { icon: 'map-marker-alt', color: '#00A0DC' };
    return L.divIcon({
        className: 'custom-icon',
        html: `
            <div class="icon-container" style="border-color: ${config.color}">
                <i class="fas fa-${config.icon}" style="color: ${config.color}"></i>
                <span class="icon-label">${category}</span>
            </div>
        `,
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
    });
}

// Add detailed information for buildings
const buildingInfo = {
    // Academic Departments
    'school-of-biological-sciences': {
        name: 'School of Biological Sciences',
        department: 'Department of Biological Sciences',
        contact: 'Phone: +254 20 444 4441\nEmail: biological.sciences@uon.ac.ke',
        description: 'Main building for biological sciences studies',
        rooms: 'Room Numbers: 101-305',
        image: 'https://example.com/biological-sciences.jpg'
    },
    'centre-of-biotechnology-bioinformatics': {
        name: 'Centre of Biotechnology & Bioinformatics',
        department: 'Department of Biotechnology',
        contact: 'Phone: +254 20 444 4442\nEmail: biotechnology@uon.ac.ke',
        description: 'Research center for biotechnology and bioinformatics',
        rooms: 'Room Numbers: 201-405',
        image: 'https://example.com/biotechnology.jpg'
    },
    'meteorology-department': {
        name: 'Meteorology Department',
        department: 'Department of Meteorology',
        contact: 'Phone: +254 20 444 4443\nEmail: meteorology@uon.ac.ke',
        description: 'Department of Meteorology and Climate Studies',
        rooms: 'Room Numbers: 301-505',
        image: 'https://example.com/meteorology.jpg'
    },
    'department-of-mathematics': {
        name: 'Department of Mathematics',
        department: 'Department of Mathematics',
        contact: 'Phone: +254 20 444 4444\nEmail: mathematics@uon.ac.ke',
        description: 'Mathematics and Statistics Department',
        rooms: 'Room Numbers: 401-605',
        image: 'https://example.com/mathematics.jpg'
    },
    'physics-department': {
        name: 'Physics Department',
        department: 'Department of Physics',
        contact: 'Phone: +254 20 444 4445\nEmail: physics@uon.ac.ke',
        description: 'The Department of Physics and Space Science is a leading academic institution dedicated to advancing knowledge in physics, astronomy, and space sciences. The department features state-of-the-art research facilities, advanced laboratories, and specialized equipment for both theoretical and experimental physics studies.',
        rooms: 'Room Numbers: 501-705',
        image: 'https://example.com/physics.jpg'
    },
    'department-of-earth-and-climate-sciences': {
        name: 'Department of Earth and Climate Sciences',
        department: 'Department of Earth and Climate Sciences',
        contact: 'Phone: +254 20 444 4446\nEmail: earth.sciences@uon.ac.ke',
        description: 'The Department of Earth and Climate Sciences is a premier academic institution focused on understanding Earth\'s systems and climate dynamics. The department features advanced research facilities, specialized laboratories, and comprehensive equipment for geological and climate studies.',
        rooms: 'Room Numbers: 601-805',
        image: 'https://example.com/earth-sciences.jpg'
    },
    'school-of-physical-sciences': {
        name: 'School Of Physical Sciences',
        department: 'School of Physical Sciences',
        contact: 'Phone: +254 20 444 4447\nEmail: physical.sciences@uon.ac.ke',
        description: 'The School of Physical Sciences serves as the central hub for advanced scientific research and education. The facility houses cutting-edge laboratories, research centers, and specialized equipment for comprehensive scientific studies across multiple disciplines.',
        rooms: 'Room Numbers: 701-905',
        image: 'https://example.com/physical-sciences.jpg'
    },
    'uon-chemistry-department': {
        name: 'UoN Chemistry Department',
        department: 'Department of Chemistry',
        contact: 'Phone: +254 20 444 4448\nEmail: chemistry@uon.ac.ke',
        description: 'The Department of Chemistry is a distinguished academic institution dedicated to advancing chemical sciences. The department features modern research laboratories, specialized equipment, and comprehensive facilities for both theoretical and practical chemistry studies.',
        rooms: 'Room Numbers: 801-1005',
        image: 'https://example.com/chemistry.jpg'
    },
    'department-of-computing-and-informatics': {
        name: 'Department Of Computing And Informatics',
        department: 'School of Computing and Informatics',
        contact: 'Phone: +254 20 444 4449\nEmail: computing@uon.ac.ke',
        description: 'The School of Computing and Informatics is a leading academic institution focused on advancing technology and information sciences. The facility houses state-of-the-art computer laboratories, research centers, and specialized equipment for comprehensive computing studies.',
        rooms: 'Room Numbers: 901-1105',
        image: 'https://example.com/computing.jpg'
    },
    'department-of-veterinary-anatomy-physiology': {
        name: 'Department of Veterinary Anatomy & Physiology',
        department: 'Department of Veterinary Anatomy & Physiology',
        contact: 'Phone: +254 20 444 4450\nEmail: veterinary@uon.ac.ke',
        description: 'The Department of Veterinary Anatomy & Physiology is a specialized academic institution dedicated to advancing veterinary medical sciences. The department features advanced research facilities, specialized laboratories, and comprehensive equipment for veterinary studies and research.',
        rooms: 'Room Numbers: 1001-1205',
        image: 'https://example.com/veterinary.jpg'
    },

    // Administrative Buildings
    'principal-cbps-office': {
        name: 'Principal CBPS Office',
        department: 'Office of the Principal',
        contact: 'Phone: +254 20 444 4451\nEmail: principal.cbps@uon.ac.ke',
        description: 'Principal\'s office and Registry',
        rooms: 'Room Numbers: 201-305',
        image: 'https://example.com/principal-office.jpg'
    },
    'procurement-offices': {
        name: 'Procurement Offices',
        department: 'Procurement Department',
        contact: 'Phone: +254 20 444 4452\nEmail: procurement@uon.ac.ke',
        description: 'University procurement department',
        rooms: 'Room Numbers: 301-405',
        image: 'https://example.com/procurement.jpg'
    },
    'internal-auditor': {
        name: 'Internal Auditor',
        department: 'Internal Audit Office',
        contact: 'Phone: +254 20 444 4453\nEmail: internal.audit@uon.ac.ke',
        description: 'Internal audit office',
        rooms: 'Room Numbers: 401-505',
        image: 'https://example.com/internal-auditor.jpg'
    },
    'college-registrar': {
        name: 'College Registrar',
        department: 'Registrar\'s Office',
        contact: 'Phone: +254 20 444 4454\nEmail: registrar@uon.ac.ke',
        description: 'Registrar\'s office',
        rooms: 'Room Numbers: 501-605',
        image: 'https://example.com/registrar.jpg'
    },

    // Lecture Halls
    'prg4-cq8-lecture-theaters': {
        name: 'PRG4+CQ8 Lecture Theaters',
        department: 'Lecture Halls',
        contact: 'Phone: +254 20 444 4455\nEmail: lecture.halls@uon.ac.ke',
        description: 'SWS & LLT lecture theaters',
        rooms: 'Theater Numbers: 1-4',
        image: 'https://example.com/lecture-theaters.jpg'
    },
    'millennium-hall-1': {
        name: 'Millennium Hall 1',
        department: 'Lecture Halls',
        contact: 'Phone: +254 20 444 4456\nEmail: millennium.hall1@uon.ac.ke',
        description: 'Main lecture theater',
        rooms: 'Theater Numbers: 1-2',
        image: 'https://example.com/millennium-hall-1.jpg'
    },
    'millennium-hall-2': {
        name: 'Millennium Hall 2',
        department: 'Lecture Halls',
        contact: 'Phone: +254 20 444 4457\nEmail: millennium.hall2@uon.ac.ke',
        description: 'Secondary lecture theater',
        rooms: 'Theater Numbers: 3-4',
        image: 'https://example.com/millennium-hall-2.jpg'
    },

    // Student Residences
    'qejani-student-residences': {
        name: 'Qejani Student Residences',
        department: 'Student Accommodation',
        contact: 'Phone: +254 20 444 4457\nEmail: qejani.residences@uon.ac.ke',
        description: 'Qejani Student Residences is a modern accommodation facility designed to provide comfortable and conducive living spaces for students. The facility features a combination of single and shared rooms, each equipped with essential furnishings and study areas. Common amenities include high-speed internet connectivity, 24/7 security surveillance, and dedicated study zones. The residence is strategically located within walking distance to academic buildings and campus facilities.\n\nFacilities:\n- Individual and Shared Accommodation Units\n- High-Speed Internet Access\n- 24/7 Security System\n- Common Study Areas\n- Recreational Spaces\n- Laundry Facilities\n- CCTV Surveillance',
        rooms: 'Total Capacity: 200 Students\nSingle Rooms: 80 Units\nShared Rooms: 120 Units\nCommon Areas: 4\nStudy Rooms: 3',
        image: 'https://example.com/qejani-residences.jpg'
    },
    'qwetu-student-residences': {
        name: 'Qwetu Student Residences',
        department: 'Student Accommodation',
        contact: 'Phone: +254 20 444 4458\nEmail: qwetu.residences@uon.ac.ke',
        description: 'Qwetu Student Residences represents premium student housing with contemporary design and comprehensive amenities. The facility offers a mix of studio apartments and shared units, all fully furnished to international standards. Residents benefit from high-speed WiFi connectivity, modern fitness facilities, dedicated study spaces, and recreational areas. The residence features advanced security systems including card access control and comprehensive CCTV surveillance.\n\nFacilities:\n- Premium Studio Apartments\n- Shared Accommodation Units\n- Modern Fitness Center\n- Dedicated Study Areas\n- Recreational Facilities\n- High-Speed WiFi Network\n- Advanced Security Systems',
        rooms: 'Total Capacity: 300 Students\nStudio Apartments: 150 Units\nShared Units: 150 Units\nStudy Rooms: 6\nRecreational Areas: 3',
        image: 'https://example.com/qwetu-residences.jpg'
    },
    'chiromo-hostel-block-a': {
        name: 'Chiromo Hostel Block A',
        department: 'Student Accommodation',
        contact: 'Phone: +254 20 444 4459\nEmail: hostel.a@uon.ac.ke',
        description: 'Chiromo Hostel Block A provides traditional student accommodation with a focus on community living and academic support. The facility features shared rooms with comfortable furnishings, communal study areas, and well-equipped kitchens. Regular maintenance and cleaning services ensure a hygienic living environment. The hostel is conveniently located near campus amenities and academic buildings.\n\nFacilities:\n- Shared Accommodation Units\n- Communal Study Areas\n- Shared Kitchen Facilities\n- Laundry Services\n- Regular Maintenance\n- Security Services\n- Common Room',
        rooms: 'Total Capacity: 150 Students\nDouble Rooms: 100 Units\nTriple Rooms: 50 Units\nStudy Areas: 3\nKitchen Facilities: 2',
        image: 'https://example.com/hostel-block-a.jpg'
    },
    'chiromo-hostel-block-b': {
        name: 'Chiromo Hostel Block B',
        department: 'Student Accommodation',
        contact: 'Phone: +254 20 444 4460\nEmail: hostel.b@uon.ac.ke',
        description: 'Chiromo Hostel Block B offers a balanced accommodation solution with a mix of single and shared rooms. The facility includes dedicated study spaces, common rooms for social interaction, and shared kitchen facilities. Regular maintenance and security services ensure a safe and comfortable living environment. The hostel is situated near campus recreational facilities and academic buildings.\n\nFacilities:\n- Mixed Accommodation Options\n- Dedicated Study Spaces\n- Common Social Areas\n- Shared Kitchen Facilities\n- Recreational Zones\n- Security Services\n- Maintenance Support',
        rooms: 'Total Capacity: 160 Students\nSingle Rooms: 60 Units\nShared Rooms: 100 Units\nCommon Areas: 4\nStudy Spaces: 3',
        image: 'https://example.com/hostel-block-b.jpg'
    },
    'chiromo-hostel-block-c': {
        name: 'Chiromo Hostel Block C',
        department: 'Student Accommodation',
        contact: 'Phone: +254 20 444 4461\nEmail: hostel.c@uon.ac.ke',
        description: 'Chiromo Hostel Block C features modern student accommodation with recently renovated facilities. The residence provides dedicated study spaces, comprehensive WiFi coverage, and secure access systems. Its strategic location near campus dining facilities offers convenient access to meals. The facility maintains high standards of cleanliness and security through regular maintenance and surveillance.\n\nFacilities:\n- Modern Accommodation Units\n- Dedicated Study Areas\n- WiFi Coverage\n- Secure Access Systems\n- Proximity to Dining\n- Regular Maintenance\n- Security Services',
        rooms: 'Total Capacity: 140 Students\nDouble Rooms: 90 Units\nTriple Rooms: 50 Units\nStudy Rooms: 3\nCommon Areas: 2',
        image: 'https://example.com/hostel-block-c.jpg'
    },

    // Laboratories
    'science-and-physics-labs': {
        name: 'Science and Physics Labs',
        department: 'Science Laboratories',
        contact: 'Phone: +254 20 444 4463\nEmail: science.labs@uon.ac.ke',
        description: 'State-of-the-art physics and general science laboratories featuring advanced research equipment and specialized facilities. Includes dedicated areas for mechanics experiments, optical physics research, electronics testing, quantum physics studies, and general physics practical work. Houses modern measurement instruments and data acquisition systems.',
        rooms: 'Lab Numbers: 101-305',
        image: 'https://example.com/science-labs.jpg'
    },
    'human-anatomy-laboratory': {
        name: 'Human Anatomy Laboratory',
        department: 'Anatomy Department',
        contact: 'Phone: +254 20 444 4464\nEmail: anatomy.lab@uon.ac.ke',
        description: 'Advanced human anatomy research facility featuring state-of-the-art equipment for anatomical studies. Includes specialized dissection rooms, digital imaging systems, 3D visualization tools, microscopy stations, and specimen storage facilities. Equipped with modern teaching aids and virtual anatomy resources for enhanced learning.',
        rooms: 'Lab Numbers: 201-405',
        image: 'https://example.com/anatomy-lab.jpg'
    },
    'nairobi-surgical-skills-center': {
        name: 'Nairobi Surgical Skills Center',
        department: 'Surgery Department',
        contact: 'Phone: +254 20 444 4465\nEmail: surgical.center@uon.ac.ke',
        description: 'Cutting-edge surgical training facility featuring high-fidelity simulation labs and practice operating rooms. Equipped with laparoscopic training systems, surgical simulators, advanced medical imaging equipment, and specialized training tools. Includes debriefing rooms, skills assessment areas, and modern surgical equipment for comprehensive medical training.',
        rooms: 'Training Rooms: 301-405',
        image: 'https://example.com/surgical-center.jpg'
    },
    'histology-lab': {
        name: 'Histology Lab',
        department: 'Histology Department',
        contact: 'Phone: +254 20 444 4466\nEmail: histology.lab@uon.ac.ke',
        description: 'Specialized laboratory for tissue research and microscopic anatomy studies. Features high-powered microscopes, tissue processing equipment, and dedicated research spaces.',
        rooms: 'Lab Numbers: 401-405',
        image: 'https://example.com/histology-lab.jpg'
    },
    'biochemistry-lab': {
        name: 'Biochemistry Laboratory',
        department: 'Department of Biochemistry',
        contact: 'Phone: +254 20 444 4475\nEmail: biochem.lab@uon.ac.ke',
        description: 'Advanced biochemistry research facility equipped with molecular biology equipment, spectrophotometers, and specialized areas for enzyme kinetics and protein analysis.',
        rooms: 'Lab Numbers: 501-605',
        image: 'https://example.com/biochemistry-lab.jpg'
    },
    'microbiology-lab': {
        name: 'Microbiology Laboratory',
        department: 'Department of Microbiology',
        contact: 'Phone: +254 20 444 4476\nEmail: micro.lab@uon.ac.ke',
        description: 'Comprehensive microbiology facility with sterile workspaces, incubators, and advanced microscopy equipment. Includes specialized areas for bacterial culture and viral research.',
        rooms: 'Lab Numbers: 601-705',
        image: 'https://example.com/microbiology-lab.jpg'
    },

    // Dining Facilities
    'swa-cafe': {
        name: 'SWA Cafe',
        department: 'Student Welfare Association',
        contact: 'Phone: +254 20 444 4467\nEmail: swa.cafe@uon.ac.ke',
        description: 'Popular student-run café offering affordable meals and snacks. Serves breakfast, lunch, and dinner with a varied menu of local and international dishes. Features indoor and outdoor seating areas.\n\nOpening Hours:\nMonday to Friday: 7:00 AM - 9:00 PM\nSaturday: 8:00 AM - 6:00 PM\nSunday: Closed',
        rooms: 'Seating Capacity: 200\nOutdoor Tables: 10\nIndoor Tables: 30',
        image: 'https://example.com/swa-cafe.jpg'
    },
    'chiromo-campus-club-cafe': {
        name: 'Chiromo Campus Club Cafe',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4470\nEmail: campus.club@uon.ac.ke',
        description: 'Casual dining venue popular among students and staff. Serves quick meals, snacks, and beverages in a relaxed atmosphere. Includes outdoor seating area.\n\nOpening Hours:\nMonday to Friday: 7:30 AM - 7:00 PM\nSaturday: 8:00 AM - 4:00 PM\nSunday: Closed',
        rooms: 'Seating Capacity: 100\nIndoor Tables: 20\nOutdoor Tables: 10',
        image: 'https://example.com/campus-club.jpg'
    },
    'connect-coffee-roasters': {
        name: 'Connect Coffee Roasters',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4468\nEmail: connect.coffee@uon.ac.ke',
        description: 'Modern coffee shop serving premium coffee, tea, and light refreshments. Features comfortable seating and free WiFi, perfect for studying or casual meetings.\n\nOpening Hours:\nMonday to Friday: 7:30 AM - 8:00 PM\nSaturday: 8:00 AM - 5:00 PM\nSunday: 9:00 AM - 3:00 PM',
        rooms: 'Seating Capacity: 50\nStudy Tables: 8\nLounge Area: 1',
        image: 'https://example.com/connect-coffee.jpg'
    },
    'arziki-restaurant': {
        name: 'Arziki Restaurant',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4469\nEmail: arziki.restaurant@uon.ac.ke',
        description: 'Full-service restaurant offering a diverse menu of African and international cuisine. Features daily specials, vegetarian options, and catering services.\n\nOpening Hours:\nMonday to Friday: 8:00 AM - 9:00 PM\nSaturday: 9:00 AM - 7:00 PM\nSunday: 10:00 AM - 4:00 PM',
        rooms: 'Seating Capacity: 150\nPrivate Dining Room: 1\nOutdoor Terrace: 1',
        image: 'https://example.com/arziki-restaurant.jpg'
    },

    // Library
    'chiromo-campus-library': {
        name: 'Chiromo Campus Library',
        department: 'Library Services',
        contact: 'Phone: +254 20 444 4471\nEmail: library@uon.ac.ke',
        description: 'The main campus library serves as a central hub for academic resources and study spaces. Features include individual study carrels, group study rooms, computer workstations, printing facilities, and extensive collections of scientific journals and academic publications. The library provides access to both physical and digital resources, with specialized sections for different academic disciplines.\n\nOpening Hours:\nMonday to Friday: 8:00 AM - 10:00 PM\nSaturday: 10:00 AM - 3:00 PM\nSunday: Closed',
        rooms: 'Floor Numbers: 1-3\nSeating Capacity: 500\nStudy Rooms: 10\nComputer Labs: 2',
        image: 'https://example.com/library.jpg'
    },

    // Parking Areas
    'main-parking': {
        name: 'Main Parking Lot',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4472\nEmail: parking@uon.ac.ke',
        description: 'The Main Parking Lot is a comprehensive parking facility designed to accommodate various campus visitors. Features include designated spaces for different vehicle types, security surveillance, and convenient access to major campus buildings.',
        rooms: 'Capacity: 200 vehicles',
        image: 'https://example.com/main-parking.jpg'
    },
    'staff-parking': {
        name: 'Staff Parking Lot',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4473\nEmail: staff.parking@uon.ac.ke',
        description: 'The Staff Parking Lot provides dedicated parking facilities for university staff members. The facility features secure parking spaces, proximity to administrative buildings, and controlled access for authorized personnel.',
        rooms: 'Capacity: 100 vehicles',
        image: 'https://example.com/staff-parking.jpg'
    },
    'chemistry-parking': {
        name: 'Chemistry Department Parking',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4474\nEmail: chemistry.parking@uon.ac.ke',
        description: 'The Chemistry Department Parking facility offers dedicated parking spaces for department staff and visitors. The facility provides convenient access to the Chemistry Department and features designated areas for different vehicle types.',
        rooms: 'Capacity: 50 vehicles',
        image: 'https://example.com/chemistry-parking.jpg'
    },

    // Other Facilities
    'healthit-corporate-office': {
        name: 'HealthIT Corporate Office',
        department: 'Health Information Technology',
        contact: 'Phone: +254 20 444 4480\nEmail: healthit@uon.ac.ke',
        description: 'The HealthIT Corporate Office serves as the central hub for health information technology services and innovation. Features modern workspaces, meeting rooms, and specialized IT infrastructure for healthcare systems development and support.',
        rooms: 'Office Numbers: 101-110\nMeeting Rooms: 3\nTech Lab: 1',
        image: 'https://example.com/healthit.jpg'
    },

    // Shops and Services
    'jirani-shop': {
        name: 'JIRANI SHOP',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4481\nEmail: jirani.shop@uon.ac.ke',
        description: 'Convenient campus store offering everyday essentials, snacks, beverages, and basic stationery. Stocks student supplies and personal care items.\n\nOpening Hours:\nMonday to Friday: 7:00 AM - 9:00 PM\nSaturday: 8:00 AM - 6:00 PM\nSunday: 9:00 AM - 3:00 PM',
        rooms: 'Shop Area: 1\nStorage Room: 1',
        image: 'https://example.com/jirani-shop.jpg'
    },
    'noor-photocopy': {
        name: 'Noor Photocopy',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4482\nEmail: noor.copy@uon.ac.ke',
        description: 'Professional printing and photocopying service center. Offers printing, scanning, binding, and lamination services. Specializes in academic document preparation.\n\nOpening Hours:\nMonday to Friday: 8:00 AM - 8:00 PM\nSaturday: 9:00 AM - 5:00 PM\nSunday: Closed',
        rooms: 'Service Counter: 1\nPrinting Area: 1\nBinding Station: 1',
        image: 'https://example.com/noor-photocopy.jpg'
    },
    'onuss-cyber': {
        name: 'ONUSS Cyber Cafe',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4483\nEmail: onuss.cyber@uon.ac.ke',
        description: 'Modern cyber café providing computer and internet services. Features high-speed internet, printing facilities, and technical support. Offers document processing and online research assistance.\n\nOpening Hours:\nMonday to Friday: 8:00 AM - 9:00 PM\nSaturday: 9:00 AM - 6:00 PM\nSunday: Closed',
        rooms: 'Computer Stations: 30\nPrinting Area: 1\nTechnical Support Desk: 1',
        image: 'https://example.com/onuss-cyber.jpg'
    },

    // Additional Dining Facilities
    'smoothie-dj-chiromo': {
        name: 'Smoothie DJ Chiromo',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4476\nEmail: smoothie.dj@uon.ac.ke',
        description: 'Fresh juice and smoothie bar offering healthy beverages and snacks. Features a variety of fruit combinations and nutritional supplements.\n\nOpening Hours:\nMonday to Friday: 8:00 AM - 8:00 PM\nSaturday: 9:00 AM - 5:00 PM\nSunday: Closed',
        rooms: 'Service Counter: 1\nSeating Area: 1',
        image: 'https://example.com/smoothie-dj.jpg'
    },
    'the-spot-cafe': {
        name: 'The Spot Cafe',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4477\nEmail: spot.cafe@uon.ac.ke',
        description: 'Popular student hangout serving coffee, snacks, and light meals. Features comfortable seating and study areas.\n\nOpening Hours:\nMonday to Friday: 7:00 AM - 9:00 PM\nSaturday: 8:00 AM - 6:00 PM\nSunday: 9:00 AM - 3:00 PM',
        rooms: 'Seating Capacity: 100\nStudy Tables: 10\nOutdoor Seating: 1',
        image: 'https://example.com/spot-cafe.jpg'
    },
    'spot-pub': {
        name: 'Spot Pub',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4478\nEmail: spot.pub@uon.ac.ke',
        description: 'Campus pub offering beverages and light snacks. Features entertainment area and outdoor seating.\n\nOpening Hours:\nMonday to Friday: 4:00 PM - 11:00 PM\nSaturday: 2:00 PM - 11:00 PM\nSunday: Closed',
        rooms: 'Indoor Seating: 50\nOutdoor Seating: 30\nBar Area: 1',
        image: 'https://example.com/spot-pub.jpg'
    },
    'uon-chiromo-mess': {
        name: 'UON Chiromo Mess',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4479\nEmail: chiromo.mess@uon.ac.ke',
        description: 'Main student dining hall serving breakfast, lunch, and dinner. Offers a variety of local and international dishes.\n\nOpening Hours:\nMonday to Friday: 7:00 AM - 8:00 PM\nSaturday: 8:00 AM - 6:00 PM\nSunday: 9:00 AM - 3:00 PM',
        rooms: 'Seating Capacity: 500\nFood Service Area: 1\nKitchen: 1',
        image: 'https://example.com/chiromo-mess.jpg'
    },
    'uon-smocha-restaurant': {
        name: 'UON SMOCHA RESTAURANT',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4480\nEmail: smocha.restaurant@uon.ac.ke',
        description: 'Full-service restaurant offering a diverse menu of local and international cuisine. Features daily specials and catering services.\n\nOpening Hours:\nMonday to Friday: 8:00 AM - 9:00 PM\nSaturday: 9:00 AM - 7:00 PM\nSunday: 10:00 AM - 4:00 PM',
        rooms: 'Seating Capacity: 150\nPrivate Dining Room: 1\nOutdoor Terrace: 1',
        image: 'https://example.com/smocha-restaurant.jpg'
    },

    // Additional Parking Areas
    'general-parking-space': {
        name: 'General Parking Space',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4481\nEmail: parking@uon.ac.ke',
        description: 'The General Parking Space is a versatile parking facility designed to accommodate various campus visitors and students. Features include designated spaces for different vehicle types, security surveillance, and convenient access to campus facilities.',
        rooms: 'Capacity: 100 vehicles\nVisitor Spaces: 20\nHandicap Spaces: 5',
        image: 'https://example.com/general-parking.jpg'
    },
    'chs-parking': {
        name: 'CHS Parking',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4482\nEmail: chs.parking@uon.ac.ke',
        description: 'The CHS Parking facility provides dedicated parking spaces for College of Health Sciences staff and students. The facility features secure parking areas, proximity to medical facilities, and designated spaces for different vehicle types.',
        rooms: 'Capacity: 50 vehicles\nStaff Spaces: 30\nStudent Spaces: 20',
        image: 'https://example.com/chs-parking.jpg'
    },
    'cbps-parking-lot': {
        name: 'CBPS Parking Lot',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4483\nEmail: cbps.parking@uon.ac.ke',
        description: 'Parking facility for College of Biological and Physical Sciences staff and students.',
        rooms: 'Capacity: 75 vehicles\nStaff Spaces: 40\nStudent Spaces: 35',
        image: 'https://example.com/cbps-parking.jpg'
    },

    // Additional Transport Facilities
    'chiromo-campus-flyover-bus-stop': {
        name: 'Chiromo Campus Flyover Bus Stop',
        department: 'Transport Services',
        contact: 'Phone: +254 20 444 4484\nEmail: transport@uon.ac.ke',
        description: 'Main campus bus stop located near the flyover. Serves multiple bus routes connecting to various parts of the city.',
        rooms: 'Waiting Area: 1\nShelter: 1',
        image: 'https://example.com/flyover-bus-stop.jpg'
    },
    'chiromo-flyover-bus-stop': {
        name: 'Chiromo Flyover Bus Stop',
        department: 'Transport Services',
        contact: 'Phone: +254 20 444 4485\nEmail: transport@uon.ac.ke',
        description: 'Secondary bus stop near the flyover. Provides additional transport options for students and staff.',
        rooms: 'Waiting Area: 1\nShelter: 1',
        image: 'https://example.com/flyover-bus-stop-2.jpg'
    },
    'chiromo-mortuary-bus-stop': {
        name: 'Chiromo Mortuary Bus Stop',
        department: 'Transport Services',
        contact: 'Phone: +254 20 444 4486\nEmail: transport@uon.ac.ke',
        description: 'Bus stop located near the mortuary. Serves specific routes connecting to nearby facilities.',
        rooms: 'Waiting Area: 1\nShelter: 1',
        image: 'https://example.com/mortuary-bus-stop.jpg'
    },
    'chiromo-bus-station': {
        name: 'Chiromo Bus Station',
        department: 'Transport Services',
        contact: 'Phone: +254 20 444 4487\nEmail: transport@uon.ac.ke',
        description: 'Main bus station serving the campus area. Features multiple bus bays and waiting areas.',
        rooms: 'Bus Bays: 5\nWaiting Area: 1\nTicket Office: 1',
        image: 'https://example.com/chiromo-bus-station.jpg'
    },
};

// Function to normalize building IDs
function normalizeBuildingId(name) {
    // Convert to lowercase and replace special characters with hyphens
    const normalized = name.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace special chars with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
    
    // Log the normalization for debugging
    console.log('Original name:', name);
    console.log('Normalized ID:', normalized);
    console.log('Building info available:', !!buildingInfo[normalized]);
    if (buildingInfo[normalized]) {
        console.log('Building info:', buildingInfo[normalized]);
    }
    
    return normalized;
}

// Function to create detailed popup content
function createDetailedPopup(location) {
    const buildingId = normalizeBuildingId(location.name);
    const info = buildingInfo[buildingId];
    
    if (info) {
        return `
            <div class="popup-content">
                ${info.image ? `
                    <div class="popup-image" style="margin-bottom: 10px;">
                        <img src="${info.image}" alt="${info.name}" style="width: 100%; max-height: 150px; object-fit: cover; border-radius: 4px;">
                    </div>
                ` : ''}
                <h3 style="margin: 0 0 10px 0; color: #1a237e;">${info.name}</h3>
                <p style="margin: 5px 0;"><strong>Department:</strong> ${info.department}</p>
                <p style="margin: 5px 0;"><strong>Description:</strong> ${info.description}</p>
                <p style="margin: 5px 0;"><strong>Contact:</strong><br>${info.contact}</p>
                ${info.rooms ? `<p style="margin: 5px 0;"><strong>Rooms:</strong> ${info.rooms}</p>` : ''}
            </div>
        `;
    } else {
        // Fallback to basic information if detailed info is not available
        return `
            <div class="popup-content">
                <h3 style="margin: 0 0 10px 0; color: #1a237e;">${location.name}</h3>
                <p style="margin: 5px 0;">${location.description || 'No description available.'}</p>
            </div>
        `;
    }
}

// Create markers for locations
locations.forEach(location => {
    if (location.coordinates) {
        const marker = L.marker(location.coordinates, {
            icon: createIcon(location.category)
        });
        
        // Create popup content with debugging
        const buildingId = normalizeBuildingId(location.name);
        console.log('Creating marker for:', location.name);
        console.log('Normalized building ID:', buildingId);
        console.log('Category:', location.category);
        console.log('Building info available:', !!buildingInfo[buildingId]);
        
        const popupContent = createDetailedPopup(location);
        marker.bindPopup(popupContent, {
            maxWidth: 400, // Increased max width for better readability
            className: 'custom-popup' // Added custom class for styling
        });
        
        // Add marker to the appropriate layer
        if (layerGroups[location.category]) {
            console.log('Adding to layer:', location.category);
            layerGroups[location.category].addLayer(marker);
        } else {
            console.log('Layer not found for category:', location.category);
        }
    }
});

// Initialize layers but don't add them to the map
Object.values(layerGroups).forEach(group => {
    group.eachLayer(marker => {
        marker.closePopup(); // Ensure popups are closed initially
    });
    // Don't add layers to map initially
});

// Handle checkbox changes
document.querySelectorAll('.checkbox-item input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
    
    checkbox.addEventListener('change', function() {
        const layerName = this.dataset.layer;
        if (layerGroups[layerName]) {
            if (this.checked) {
                map.addLayer(layerGroups[layerName]);
            } else {
                map.removeLayer(layerGroups[layerName]);
            }
        }
    });
});

// View toggle buttons
const viewButtons = document.querySelectorAll('.view-button');
viewButtons.forEach(button => {
    button.addEventListener('click', () => {
        viewButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const view = button.dataset.view;
        if (view === 'campus') {
            map.addLayer(osmLayer);
            map.removeLayer(satelliteLayer);
        } else {
            map.addLayer(satelliteLayer);
            map.removeLayer(osmLayer);
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const mainContent = document.querySelector('.main-content');
        sidebar.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
            mainContent.style.marginLeft = 'var(--sidebar-width)';
            mainContent.style.width = 'calc(100% - var(--sidebar-width))';
        } else {
            mainContent.style.marginLeft = '0';
            mainContent.style.width = '100%';
        }
        map.invalidateSize();
    });
}

// Click outside sidebar to close on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target) && 
        sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});

// Search functionality
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
let activeMarker = null;

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
    }

    const filteredLocations = locations.filter(location => {
        const nameMatch = location.name.toLowerCase().includes(query);
        const descMatch = location.description?.toLowerCase().includes(query);
        return nameMatch || descMatch;
    }).slice(0, 5); // Limit to top 5 results

    displaySearchResults(filteredLocations);
});

function displaySearchResults(results) {
    if (results.length === 0) {
        searchResults.style.display = 'none';
        return;
    }

    searchResults.innerHTML = '';
    results.forEach(location => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        
        // Get the icon based on category
        const icon = iconConfig[location.category]?.icon || 'fa-map-marker-alt';
        
        resultItem.innerHTML = `
            <i class="fas ${icon}"></i>
            <div class="result-content">
                <strong>${location.name}</strong>
                <small>${location.description || ''}</small>
            </div>
        `;

        resultItem.addEventListener('click', () => {
            // Clear previous active marker
            if (activeMarker) {
                const icon = activeMarker.getIcon();
                icon.options.className = icon.options.className.replace(' active', '');
                activeMarker.setIcon(icon);
            }

            // Find and activate the corresponding marker
            const marker = findMarker(location);
            if (marker) {
                // Make the layer visible if it's not
                const layerGroup = layerGroups[location.category];
                if (layerGroup && !map.hasLayer(layerGroup)) {
                    layerGroup.addTo(map);
                    // Update checkbox state
                    const checkbox = document.querySelector(`input[data-category="${location.category}"]`);
                    if (checkbox) checkbox.checked = true;
                }

                // Update marker style
                const icon = marker.getIcon();
                icon.options.className += ' active';
                marker.setIcon(icon);
                activeMarker = marker;

                // Center map on location with animation
                map.flyTo(location.coordinates, 19, {
                    duration: 1
                });
                marker.openPopup();
            }

            // Clear search
            searchInput.value = '';
            searchResults.style.display = 'none';
        });

        searchResults.appendChild(resultItem);
    });

    searchResults.style.display = 'block';
}

function findMarker(location) {
    const layerGroup = layerGroups[location.category];
    if (!layerGroup) return null;

    let foundMarker = null;
    layerGroup.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            const markerLatLng = layer.getLatLng();
            const locationLatLng = L.latLng(location.coordinates);
            if (markerLatLng.equals(locationLatLng)) {
                foundMarker = layer;
            }
        }
    });
    return foundMarker;
}

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.style.display = 'none';
    }
});

function getIconClass(type) {
    const iconMap = {
        building: 'building',
        parking: 'parking',
        dining: 'utensils',
        lab: 'flask',
        restroom: 'restroom',
        emergency: 'phone-volume',
        transport: 'bus',
        accessibility: 'wheelchair'
    };
    return iconMap[type] || 'map-marker-alt';
}

// Add event listeners for map control buttons

document.getElementById('resetMapBtn').addEventListener('click', () => {
    map.setView([-1.2725913419167534, 36.80674683855068], 17);
});

document.getElementById('printMapBtn').addEventListener('click', () => {
    window.print();
});

document.getElementById('emailMapBtn').addEventListener('click', () => {
    const mailtoLink = `mailto:?subject=Chiromo Campus Map&body=Check out this map: ${window.location.href}`;
    window.location.href = mailtoLink;
});

document.getElementById('shareMapBtn').addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: 'Chiromo Campus Map',
            url: window.location.href
        }).catch(console.error);
    } else {
        alert('Share not supported on this browser.');
    }
});

document.getElementById('fullscreenMapBtn').addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});

document.getElementById('zoomInBtn').addEventListener('click', () => {
    map.zoomIn();
});

document.getElementById('zoomOutBtn').addEventListener('click', () => {
    map.zoomOut();
});

document.getElementById('menuToggle').addEventListener('click', () => {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    sidebar.classList.toggle('active');
    if (sidebar.classList.contains('active')) {
        mainContent.style.marginLeft = 'var(--sidebar-width)';
        mainContent.style.width = 'calc(100% - var(--sidebar-width))';
    } else {
        mainContent.style.marginLeft = '0';
        mainContent.style.width = '100%';
    }
    map.invalidateSize();
});

// Example GeoJSON data for campus and hostel boundaries
const campusBoundary = {
    "type": "Feature",
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [36.807654, -1.271830],
                [36.807214, -1.271122],
                [36.803716, -1.272719],
                [36.803287, -1.274220],
                [36.803555, -1.274672],
                [36.804221, -1.275240],
                [36.805476, -1.275208],
                [36.809027, -1.275155],
                [36.809703, -1.275165],
                [36.809800, -1.273632],
                [36.808416, -1.272442],
                [36.807654, -1.271830]
            ]
        ]
    }
};

const hostelBoundary = {
    "type": "Feature",
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [36.803156, -1.271466],
                [36.803674, -1.272431],
                [36.804089, -1.272241],
                [36.804736, -1.272011],
                [36.804121, -1.271152],
                [36.803883, -1.270898],
                [36.803156, -1.271466]
            ]
        ]
    }
};


// Add campus boundary to the map
L.geoJSON(campusBoundary, {
    style: {
        color: "blue",
        weight: 2,
        opacity: 0.5,
        fillOpacity: 0
    }
}).addTo(map);

// Add hostel boundary to the map
L.geoJSON(hostelBoundary, {
    style: {
        color: "blue",
        weight: 2,
        opacity: 0.5,
        fillOpacity: 0
    }
}).addTo(map);

// Calculate the center of the campus boundary
const campusCoordinates = campusBoundary.geometry.coordinates[0];
const centerLat = campusCoordinates.reduce((sum, coord) => sum + coord[1], 0) / campusCoordinates.length;
const centerLng = campusCoordinates.reduce((sum, coord) => sum + coord[0], 0) / campusCoordinates.length;

// Create a custom label for the campus name
const campusLabel = L.marker([centerLat, centerLng], {
    icon: L.divIcon({
        className: 'campus-label',
        html: '<div style="font-size: 16px; color: #1a237e; font-weight: bold; text-shadow: 1px 1px 2px rgba(255,255,255,0.8); background-color: rgba(255,255,255,0.8); padding: 5px 10px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">University of Nairobi Chiromo Campus</div>',
        iconSize: [250, 30],
        iconAnchor: [125, 15]
    })
});

// Function to toggle label visibility based on zoom level
function toggleCampusLabel() {
    const currentZoom = map.getZoom();
    console.log('Current Zoom Level:', currentZoom); // Debugging log
    if (currentZoom <= 17) { // Changed from < 16 to <= 17 to show at default zoom
        if (!map.hasLayer(campusLabel)) {
            map.addLayer(campusLabel);
            console.log('Label added to map'); // Debugging log
        }
    } else {
        if (map.hasLayer(campusLabel)) {
            map.removeLayer(campusLabel);
            console.log('Label removed from map'); // Debugging log
        }
    }
}

// Add event listener for zoom changes
map.on('zoomend', toggleCampusLabel);

// Initial check to set label visibility
toggleCampusLabel();

// Create a custom control position for bottom center
L.Control.BottomCenter = L.Control.extend({
    options: {
        position: 'bottomleft'  // Changed from bottomcenter to bottomleft
    },

    onAdd: function (map) {
        const div = L.DomUtil.create('div', 'info legend');
        const categories = Object.entries(iconConfig);
        
        div.innerHTML = `
            <div class="legend-content">
                ${categories.map(([category, config]) => `
                    <div class="legend-item">
                        <div class="legend-icon">
                            <i class="fas fa-${config.icon}" style="color: ${config.color}"></i>
                        </div>
                        <span class="legend-label">${category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}</span>
                    </div>
                `).join('')}
            </div>
        `;
        
        return div;
    }
});

// Remove previous legend if it exists
map.eachLayer((layer) => {
    if (layer instanceof L.Control.BottomCenter) {
        map.removeLayer(layer);
    }
});

// Add the legend to the map
const legend = new L.Control.BottomCenter();
map.addControl(legend);


