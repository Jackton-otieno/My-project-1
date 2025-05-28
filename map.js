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
    transport: L.layerGroup(),
    'chill-spots': L.layerGroup(),
    emergency: L.layerGroup()
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
    transport: { icon: 'bus', color: '#3498DB' },
    'chill-spots': { icon: 'tree', color: '#27AE60' },
    emergency: { icon: 'exclamation-triangle', color: '#E74C3C' }
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
export const buildingInfo = {
    // Academic Departments
    'school-of-biological-sciences': {
        name: 'School of Biological Sciences',
        department: 'Department of Biological Sciences',
        contact: 'Phone: +254 20 444 4441\nEmail: biological.sciences@uon.ac.ke',
        description: 'Main building for biological sciences studies',
        rooms: 'Room Numbers: 101-305',
        image: 'images/image 21.jpg',
        floors: [
            {
                name: 'Ground Floor',
                image: 'images/first floor .jpeg',
                rooms: [
                    { number: '101', x: 100, y: 200, description: 'Biology Lab 1 - General Biology Laboratory' },
                    { number: '102', x: 200, y: 200, description: 'Biology Lab 2 - Microbiology Laboratory' },
                    { number: '103', x: 300, y: 200, description: 'Research Lab - Advanced Research Facility' },
                    { number: '104', x: 400, y: 200, description: 'Staff Room - Faculty Office' },
                    { number: '105', x: 500, y: 200, description: 'Storage - Equipment and Supplies' },
                    { number: '106', x: 100, y: 300, description: 'Lecture Room 1 - Capacity: 50 students' },
                    { number: '107', x: 200, y: 300, description: 'Lecture Room 2 - Capacity: 50 students' },
                    { number: '108', x: 300, y: 300, description: 'Lecture Room 3 - Capacity: 50 students' },
                    { number: '109', x: 400, y: 300, description: 'Conference Room - Meeting Space' },
                    { number: '110', x: 500, y: 300, description: 'Admin Office - Department Administration' },
                    { number: '111', x: 600, y: 300, description: 'Equipment Room - Specialized Equipment Storage' }
                ]
            },
            {
                name: 'First Floor',
                image: 'images/biological-sciences-first-floor.jpg',
                rooms: [
                    { number: '201', x: 100, y: 200, description: 'Research Lab 1 - Molecular Biology' },
                    { number: '202', x: 200, y: 200, description: 'Research Lab 2 - Genetics' },
                    { number: '203', x: 300, y: 200, description: 'Graduate Studies - Research Office' },
                    { number: '204', x: 400, y: 200, description: 'Faculty Office - Professors Office' },
                    { number: '205', x: 500, y: 200, description: 'Meeting Room - Small Conference Space' }
                ]
            }
        ]
    },
    'centre-of-biotechnology-bioinformatics': {
        name: 'Centre of Biotechnology & Bioinformatics',
        department: 'Department of Biotechnology',
        contact: 'Phone: +254 20 444 4442\nEmail: biotechnology@uon.ac.ke',
        description: 'Research center for biotechnology and bioinformatics',
        rooms: 'Room Numbers: 201-405',
        image: 'images/Amity University Campus with Prominent Content.jpeg'
    },
    'meteorology-department': {
        name: 'Meteorology Department',
        department: 'Department of Meteorology',
        contact: 'Phone: +254 20 444 4443\nEmail: meteorology@uon.ac.ke',
        description: 'Department of Meteorology and Climate Studies',
        rooms: 'Room Numbers: 301-505',
        image: 'images/Amity University Campus with Prominent Content.jpeg'
    },
    'department-of-mathematics': {
        name: 'Department of Mathematics',
        department: 'Department of Mathematics',
        contact: 'Phone: +254 20 444 4444\nEmail: mathematics@uon.ac.ke',
        description: 'Mathematics and Statistics Department',
        rooms: 'Room Numbers: 401-605',
        image: 'images/Amity University Campus with Prominent Content.jpeg'
    },
    'physics-department': {
        name: 'Physics Department',
        department: 'Department of Physics',
        contact: 'Phone: +254 20 444 4445\nEmail: physics@uon.ac.ke',
        description: 'The Department of Physics and Space Science is a leading academic institution dedicated to advancing knowledge in physics, astronomy, and space sciences. The department features state-of-the-art research facilities, advanced laboratories, and specialized equipment for both theoretical and experimental physics studies.',
        rooms: 'Room Numbers: 501-705',
        image: 'images/Amity University Campus with Prominent Content.jpeg'
    },
    'department-of-earth-and-climate-sciences': {
        name: 'Department of Earth and Climate Sciences',
        department: 'Department of Earth and Climate Sciences',
        contact: 'Phone: +254 20 444 4446\nEmail: earth.sciences@uon.ac.ke',
        description: 'The Department of Earth and Climate Sciences is a premier academic institution focused on understanding Earth\'s systems and climate dynamics. The department features advanced research facilities, specialized laboratories, and comprehensive equipment for geological and climate studies.',
        rooms: 'Room Numbers: 601-805',
        image: 'images/Amity University Campus with Prominent Content.jpeg'
    },
    'school-of-physical-sciences': {
        name: 'School Of Physical Sciences',
        department: 'School of Physical Sciences',
        contact: 'Phone: +254 20 444 4447 /n Email: physical.sciences@uon.ac.ke',
        description: 'The School of Physical Sciences serves as the central hub for advanced scientific research and education. The facility houses cutting-edge laboratories, research centers, and specialized equipment for comprehensive scientific studies across multiple disciplines.',
        rooms: 'Room Numbers: 701-905',
        image: 'images/Amity University Campus with Prominent Content.jpeg'
    },
    'uon-chemistry-department': {
        name: 'UoN Chemistry Department',
        department: 'Department of Chemistry',
        contact: 'Phone: +254 20 444 4448\nEmail: chemistry@uon.ac.ke',
        description: 'The Department of Chemistry is a distinguished academic institution dedicated to advancing chemical sciences. The department features modern research laboratories, specialized equipment, and comprehensive facilities for both theoretical and practical chemistry studies.',
        rooms: 'Room Numbers: 801-1005',
        image: 'images/image 36.jpg'
    },
    'department-of-computing-and-informatics': {
        name: 'Department Of Computing And Informatics',
        department: 'School of Computing and Informatics',
        contact: 'Phone: +254 20 444 4449\nEmail: computing@uon.ac.ke',
        description: 'The School of Computing and Informatics is a leading academic institution focused on advancing technology and information sciences. The facility houses state-of-the-art computer laboratories, research centers, and specialized equipment for comprehensive computing studies.',
        rooms: 'Room Numbers: 901-1105',
        image: 'images/image 9.jpg'
    },
    'department-of-veterinary-anatomy-physiology': {
        name: 'Department of Veterinary Anatomy & Physiology',
        department: 'Department of Veterinary Anatomy & Physiology',
        contact: 'Phone: +254 20 444 4450\nEmail: veterinary.anatomy@uon.ac.ke',
        description: 'The Department of Veterinary Anatomy & Physiology is a premier institution for veterinary medical education and research. The department features specialized laboratories, research facilities, and comprehensive equipment for veterinary studies.',
        rooms: 'Room Numbers: 1001-1205',
        image: 'images/image 27.jpg'
    },
    'chiromo-campus-gardens': {
        name: 'Chiromo Campus Gardens',
        department: 'Student Chill Spots',
        contact: 'Open 24/7',
        description: 'The Chiromo Campus Gardens provide a serene and peaceful environment for students to relax, study, and socialize. These beautifully maintained green spaces feature lush lawns, shaded seating areas, and scenic views, making them perfect spots for both individual study sessions and group gatherings.',
        rooms: 'Outdoor Areas',
        image: 'images/Amity University Campus with Prominent Content.jpeg'
    },

    // Administrative Buildings
    'principal-cbps-office': {
        name: 'Principal CBPS Office',
        department: 'Office of the Principal',
        contact: 'Phone: +254 20 444 4451\nEmail: principal.cbps@uon.ac.ke',
        description: 'Principal\'s office and Registry',
        rooms: 'Room Numbers: 201-305',
        image: 'images/image 14.jpg'
    },
    'procurement-offices': {
        name: 'Procurement Offices',
        department: 'Procurement Department',
        contact: 'Phone: +254 20 444 4452\nEmail: procurement@uon.ac.ke',
        description: 'University procurement department',
        rooms: 'Room Numbers: 301-405',
        image: 'images/image 13.jpg'
    },
    'internal-auditor': {
        name: 'Internal Auditor',
        department: 'Internal Audit Office',
        contact: 'Phone: +254 20 444 4453\nEmail: internal.audit@uon.ac.ke',
        description: 'Internal audit office',
        rooms: 'Room Numbers: 401-505',
        image: 'images/image 16.jpg'
    },
    'college-registrar': {
        name: 'College Registrar',
        department: 'Registrar\'s Office',
        contact: 'Phone: +254 20 444 4454\nEmail: registrar@uon.ac.ke',
        description: 'Registrar\'s office',
        rooms: 'Room Numbers: 501-605',
        image: 'images/image 16.jpg'
    },

    // Lecture Halls
    'prg4-cq8-lecture-theaters': {
        name: 'PRG4+CQ8 Lecture Theaters',
        department: 'Lecture Halls',
        contact: 'Phone: +254 20 444 4455\nEmail: lecture.halls@uon.ac.ke',
        description: 'SWS & LLT lecture theaters',
        rooms: 'Theater Numbers: 1-4',
        image: 'images/image 32.jpg'
    },
    'millennium-hall-1': {
        name: 'Millennium Hall 1',
        department: 'Lecture Halls',
        contact: 'Phone: +254 20 444 4456\nEmail: millennium.hall1@uon.ac.ke',
        description: 'Main lecture theater',
        rooms: 'Theater Numbers: 1-2',
        image: 'images/image 5.jpg'
    },
    'millennium-hall-2': {
        name: 'Millennium Hall 2',
        department: 'Lecture Halls',
        contact: 'Phone: +254 20 444 4457\nEmail: millennium.hall2@uon.ac.ke',
        description: 'Secondary lecture theater',
        rooms: 'Theater Numbers: 3-4',
        image: 'images/image 8.jpg'
    },

    // Student Residences
    'qejani-student-residences': {
        name: 'Qejani Student Residences',
        department: 'Student Accommodation',
        contact: 'Phone: +254 20 444 4457\nEmail: qejani.residences@uon.ac.ke',
        description: 'Qejani Student Residences is a modern accommodation facility designed to provide comfortable and conducive living spaces for students. The facility features a combination of single and shared rooms, each equipped with essential furnishings and study areas. Common amenities include high-speed internet connectivity, 24/7 security surveillance, and dedicated study zones. The residence is strategically located within walking distance to academic buildings and campus facilities.\n\nFacilities:\n- Individual and Shared Accommodation Units\n- High-Speed Internet Access\n- 24/7 Security System\n- Common Study Areas\n- Recreational Spaces\n- Laundry Facilities\n- CCTV Surveillance',
        rooms: 'Total Capacity: 200 Students\nSingle Rooms: 80 Units\nShared Rooms: 120 Units\nCommon Areas: 4\nStudy Rooms: 3',
        image: 'images/qejani-karen.57721f1b.jpg'
    },
    'qwetu-student-residences': {
        name: 'Qwetu Student Residences',
        department: 'Student Accommodation',
        contact: 'Phone: +254 20 444 4458\nEmail: qwetu.residences@uon.ac.ke',
        description: 'Qwetu Student Residences represents premium student housing with contemporary design and comprehensive amenities. The facility offers a mix of studio apartments and shared units, all fully furnished to international standards. Residents benefit from high-speed WiFi connectivity, modern fitness facilities, dedicated study spaces, and recreational areas. The residence features advanced security systems including card access control and comprehensive CCTV surveillance.\n\nFacilities:\n- Premium Studio Apartments\n- Shared Accommodation Units\n- Modern Fitness Center\n- Dedicated Study Areas\n- Recreational Facilities\n- High-Speed WiFi Network\n- Advanced Security Systems',
        rooms: 'Total Capacity: 300 Students\nStudio Apartments: 150 Units\nShared Units: 150 Units\nStudy Rooms: 6\nRecreational Areas: 3',
        image: 'images/qejani-karen.57721f1b.jpg'
    },
    'chiromo-hostel-block-a': {
        name: 'Chiromo Hostel Block A',
        department: 'Student Accommodation',
        contact: 'Phone: +254 20 444 4459\nEmail: hostel.a@uon.ac.ke',
        description: 'Chiromo Hostel Block A provides traditional student accommodation with a focus on community living and academic support. The facility features shared rooms with comfortable furnishings, communal study areas, and well-equipped kitchens. Regular maintenance and cleaning services ensure a hygienic living environment. The hostel is conveniently located near campus amenities and academic buildings.\n\nFacilities:\n- Shared Accommodation Units\n- Communal Study Areas\n- Shared Kitchen Facilities\n- Laundry Services\n- Regular Maintenance\n- Security Services\n- Common Room',
        rooms: 'Total Capacity: 150 Students\nDouble Rooms: 100 Units\nTriple Rooms: 50 Units\nStudy Areas: 3\nKitchen Facilities: 2',
        image: 'images/Hostel.jpg'
    },
    'chiromo-hostel-block-b': {
        name: 'Chiromo Hostel Block B',
        department: 'Student Accommodation',
        contact: 'Phone: +254 20 444 4460\nEmail: hostel.b@uon.ac.ke',
        description: 'Chiromo Hostel Block B offers a balanced accommodation solution with a mix of single and shared rooms. The facility includes dedicated study spaces, common rooms for social interaction, and shared kitchen facilities. Regular maintenance and security services ensure a safe and comfortable living environment. The hostel is situated near campus recreational facilities and academic buildings.\n\nFacilities:\n- Mixed Accommodation Options\n- Dedicated Study Spaces\n- Common Social Areas\n- Shared Kitchen Facilities\n- Recreational Zones\n- Security Services\n- Maintenance Support',
        rooms: 'Total Capacity: 160 Students\nSingle Rooms: 60 Units\nShared Rooms: 100 Units\nCommon Areas: 4\nStudy Spaces: 3',
        image: 'images/Hostel.jpg'
    },
    'chiromo-hostel-block-c': {
        name: 'Chiromo Hostel Block C',
        department: 'Student Accommodation',
        contact: 'Phone: +254 20 444 4461\nEmail: hostel.c@uon.ac.ke',
        description: 'Chiromo Hostel Block C features modern student accommodation with recently renovated facilities. The residence provides dedicated study spaces, comprehensive WiFi coverage, and secure access systems. Its strategic location near campus dining facilities offers convenient access to meals. The facility maintains high standards of cleanliness and security through regular maintenance and surveillance.\n\nFacilities:\n- Modern Accommodation Units\n- Dedicated Study Areas\n- WiFi Coverage\n- Secure Access Systems\n- Proximity to Dining\n- Regular Maintenance\n- Security Services',
        rooms: 'Total Capacity: 140 Students\nDouble Rooms: 90 Units\nTriple Rooms: 50 Units\nStudy Rooms: 3\nCommon Areas: 2',
        image: 'images/Hostel.jpg'
    },

    // Laboratories
    'science-and-physics-labs': {
        name: 'Science and Physics Labs',
        department: 'Science Laboratories',
        contact: 'Phone: +254 20 444 4463\nEmail: science.labs@uon.ac.ke',
        description: 'State-of-the-art physics and general science laboratories featuring advanced research equipment and specialized facilities. Includes dedicated areas for mechanics experiments, optical physics research, electronics testing, quantum physics studies, and general physics practical work. Houses modern measurement instruments and data acquisition systems.',
        rooms: 'Lab Numbers: 101-305',
        image: 'images/image 1.jpg'
    },
    'human-anatomy-laboratory': {
        name: 'Human Anatomy Laboratory',
        department: 'Anatomy Department',
        contact: 'Phone: +254 20 444 4464\nEmail: anatomy.lab@uon.ac.ke',
        description: 'Advanced human anatomy research facility featuring state-of-the-art equipment for anatomical studies. Includes specialized dissection rooms, digital imaging systems, 3D visualization tools, microscopy stations, and specimen storage facilities. Equipped with modern teaching aids and virtual anatomy resources for enhanced learning.',
        rooms: 'Lab Numbers: 201-405',
        image: 'images/image 27.jpg'
    },
    'nairobi-surgical-skills-center': {
        name: 'Nairobi Surgical Skills Center',
        department: 'Surgery Department',
        contact: 'Phone: +254 20 444 4465\nEmail: surgical.center@uon.ac.ke',
        description: 'Cutting-edge surgical training facility featuring high-fidelity simulation labs and practice operating rooms. Equipped with laparoscopic training systems, surgical simulators, advanced medical imaging equipment, and specialized training tools. Includes debriefing rooms, skills assessment areas, and modern surgical equipment for comprehensive medical training.',
        rooms: 'Training Rooms: 301-405',
        image: 'images/image 36.jpg'
    },
    'histology-lab': {
        name: 'Histology Lab',
        department: 'Histology Department',
        contact: 'Phone: +254 20 444 4466\nEmail: histology.lab@uon.ac.ke',
        description: 'Specialized laboratory for tissue research and microscopic anatomy studies. Features high-powered microscopes, tissue processing equipment, and dedicated research spaces.',
        rooms: 'Lab Numbers: 401-405',
        image: 'images/image 21.jpg'
    },
    'biochemistry-lab': {
        name: 'Biochemistry Laboratory',
        department: 'Department of Biochemistry',
        contact: 'Phone: +254 20 444 4475\nEmail: biochem.lab@uon.ac.ke',
        description: 'Advanced biochemistry research facility equipped with molecular biology equipment, spectrophotometers, and specialized areas for enzyme kinetics and protein analysis.',
        rooms: 'Lab Numbers: 501-605',
        image: 'images/image 9.jpg'
    },
    'microbiology-lab': {
        name: 'Microbiology Laboratory',
        department: 'Department of Microbiology',
        contact: 'Phone: +254 20 444 4476\nEmail: micro.lab@uon.ac.ke',
        description: 'Comprehensive microbiology facility with sterile workspaces, incubators, and advanced microscopy equipment. Includes specialized areas for bacterial culture and viral research.',
        rooms: 'Lab Numbers: 601-705',
        image: 'images/image 1.jpg'
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
        image: 'images/connectcoffes.jpg'
    },
    'arziki-restaurant': {
        name: 'Arziki Restaurant',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4469\nEmail: arziki.restaurant@uon.ac.ke',
        description: 'Full-service restaurant offering a diverse menu of African and international cuisine. Features daily specials, vegetarian options, and catering services.\n\nOpening Hours:\nMonday to Friday: 8:00 AM - 9:00 PM\nSaturday: 9:00 AM - 7:00 PM\nSunday: 10:00 AM - 4:00 PM',
        rooms: 'Seating Capacity: 150\nPrivate Dining Room: 1\nOutdoor Terrace: 1',
        image: 'images/image 25.jpg'
    },

    // Library
    'chiromo-campus-library': {
        name: 'Chiromo Campus Library',
        department: 'Library Services',
        contact: 'Phone: +254 20 444 4471\nEmail: library@uon.ac.ke',
        description: 'The main campus library serves as a central hub for academic resources and study spaces. Features include individual study carrels, group study rooms, computer workstations, printing facilities, and extensive collections of scientific journals and academic publications. The library provides access to both physical and digital resources, with specialized sections for different academic disciplines.\n\nOpening Hours:\nMonday to Friday: 8:00 AM - 10:00 PM\nSaturday: 10:00 AM - 3:00 PM\nSunday: Closed',
        rooms: 'Floor Numbers: 1-3\nSeating Capacity: 500\nStudy Rooms: 10\nComputer Labs: 2',
        image: 'images/image 26.jpg'
    },

    // Parking Areas
    'main-parking-lot': {
        name: 'Main Parking Lot',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4472\nEmail: parking@uon.ac.ke',
        description: 'The Main Parking Lot is a comprehensive parking facility designed to accommodate various campus visitors. Features include designated spaces for different vehicle types, security surveillance, and convenient access to major campus buildings. The facility is well-lit, monitored by CCTV cameras, and has dedicated security personnel for enhanced safety.',
        rooms: 'Capacity: 200 vehicles\nVisitor Spaces: 50\nStaff Spaces: 100\nStudent Spaces: 50\nHandicap Spaces: 10',
        image: 'images/image 20.jpg'
    },
    'staff-parking-lot': {
        name: 'Staff Parking Lot',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4473\nEmail: staff.parking@uon.ac.ke',
        description: 'The Staff Parking Lot provides dedicated parking facilities for university staff members. The facility features secure parking spaces, proximity to administrative buildings, and controlled access for authorized personnel. Includes 24/7 security surveillance, well-marked parking bays, and convenient access to staff offices.',
        rooms: 'Capacity: 100 vehicles\nStaff Spaces: 80\nVisitor Spaces: 20\nHandicap Spaces: 5',
        image: 'images/image 37.jpg'
    },
    'chemistry-department-parking': {
        name: 'Chemistry Department Parking',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4474\nEmail: chemistry.parking@uon.ac.ke',
        description: 'The Chemistry Department Parking facility offers dedicated parking spaces for department staff and visitors. The facility provides convenient access to the Chemistry Department and features designated areas for different vehicle types. Includes security surveillance and well-marked parking bays.',
        rooms: 'Capacity: 50 vehicles\nStaff Spaces: 30\nStudent Spaces: 15\nVisitor Spaces: 5',
        image: 'images/image 30.jpg'
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
        image: 'images/Onusscafe.jpg'
    },
    'noor-photocopy': {
        name: 'Noor Photocopy',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4482\nEmail: noor.copy@uon.ac.ke',
        description: 'Professional printing and photocopying service center. Offers printing, scanning, binding, and lamination services. Specializes in academic document preparation.\n\nOpening Hours:\nMonday to Friday: 8:00 AM - 8:00 PM\nSaturday: 9:00 AM - 5:00 PM\nSunday: Closed',
        rooms: 'Service Counter: 1\nPrinting Area: 1\nBinding Station: 1',
        image: 'images/Onusscafe.jpg'
    },
    'onuss-cyber': {
        name: 'ONUSS Cyber Cafe',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4483\nEmail: onuss.cyber@uon.ac.ke',
        description: 'Modern cyber café providing computer and internet services. Features high-speed internet, printing facilities, and technical support. Offers document processing and online research assistance.\n\nOpening Hours:\nMonday to Friday: 8:00 AM - 9:00 PM\nSaturday: 9:00 AM - 6:00 PM\nSunday: Closed',
        rooms: 'Computer Stations: 30\nPrinting Area: 1\nTechnical Support Desk: 1',
        image: 'images/Onusscafe.jpg'
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
        rooms: 'Seating Capacity: 100/nStudy Tables: 10/nOutdoor Seating: 1',
        image: 'https://example.com/spot-cafe.jpg'
    },
    'spot-pub': {
        name: 'Spot Pub',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4478\nEmail: spot.pub@uon.ac.ke',
        description: 'Campus pub offering beverages and light snacks. Features entertainment area and outdoor seating.\n\nOpening Hours:\nMonday to Friday: 4:00 PM - 11:00 PM\nSaturday: 2:00 PM - 11:00 PM\nSunday: Closed',
        rooms: 'Indoor Seating: 50\nOutdoor Seating: 30\nBar Area: 1',
        image: 'images/mess.jpg'
    },
    'uon-chiromo-mess': {
        name: 'UON Chiromo Mess',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4479\nEmail: chiromo.mess@uon.ac.ke',
        description: 'Main student dining hall serving breakfast, lunch, and dinner. Offers a variety of local and international dishes.\n\nOpening Hours:\nMonday to Friday: 7:00 AM - 8:00 PM\nSaturday: 8:00 AM - 6:00 PM\nSunday: 9:00 AM - 3:00 PM',
        rooms: 'Seating Capacity: 500\nFood Service Area: 1\nKitchen: 1',
        image: 'images/mess.jpg'
    },
    'uon-smocha-restaurant': {
        name: 'UON SMOCHA RESTAURANT',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4480\nEmail: smocha.restaurant@uon.ac.ke',
        description: 'Full-service restaurant offering a diverse menu of local and international cuisine. Features daily specials and catering services.\n\nOpening Hours:\nMonday to Friday: 8:00 AM - 9:00 PM\nSaturday: 9:00 AM - 7:00 PM\nSunday: 10:00 AM - 4:00 PM',
        rooms: 'Seating Capacity: 150\nPrivate Dining Room: 1\nOutdoor Terrace: 1',
        image: 'images/smocha.jpeg'
    },

    // Additional Parking Areas
    'general-parking-space': {
        name: 'General Parking Space',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4481\nEmail: parking@uon.ac.ke',
        description: 'The General Parking Space is a versatile parking facility designed to accommodate various campus visitors and students. Features include designated spaces for different vehicle types, security surveillance, and convenient access to campus facilities.',
        rooms: 'Capacity: 100 vehicles\nVisitor Spaces: 20\nHandicap Spaces: 5',
        image: 'images/image 11.jpg'
    },
    'chs-parking': {
        name: 'CHS Parking',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4482\nEmail: chs.parking@uon.ac.ke',
        description: 'The CHS Parking facility provides dedicated parking spaces for College of Health Sciences staff and students. The facility features secure parking areas, proximity to medical facilities, and designated spaces for different vehicle types.',
        rooms: 'Capacity: 50 vehicles\nStaff Spaces: 30\nStudent Spaces: 20',
        image: 'images/image 15.jpg'
    },
    'cbps-parking-lot': {
        name: 'CBPS Parking Lot',
        department: 'Campus Services',
        contact: 'Phone: +254 20 444 4483\nEmail: cbps.parking@uon.ac.ke',
        description: 'Parking facility for College of Biological and Physical Sciences staff and students.',
        rooms: 'Capacity: 75 vehicles\nStaff Spaces: 40\nStudent Spaces: 35',
        image: 'images/image 12.jpg'
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
    'chiromo-campus-jevanjee-gardens': {
        name: 'Chiromo Campus Jevanjee Gardens',
        department: 'Campus Recreation',
        contact: 'Open 24/7',
        description: 'A peaceful garden area for students to relax and study. The gardens feature well-maintained lawns, comfortable benches, and shaded areas perfect for outdoor studying or relaxation. The serene environment provides an ideal escape from academic stress.',
        rooms: 'Outdoor Space\nBenches: Multiple\nShaded Areas: Available',
        image: 'images/image 25.jpg'
    },
    'chiromo-campus-gardens-1': {
        name: 'Chiromo Campus Gardens 1',
        department: 'Campus Recreation',
        contact: 'Open 24/7',
        description: 'Scenic garden area with benches for student relaxation. This beautiful space features landscaped gardens, comfortable seating areas, and peaceful surroundings perfect for studying, socializing, or simply enjoying nature.',
        rooms: 'Outdoor Space\nBenches: Multiple\nLandscaped Areas: Available',
        image: 'images/image 40 .jpg'
    },
    'chiromo-campus-garden-2': {
        name: 'Chiromo Campus Garden 2',
        department: 'Campus Recreation',
        contact: 'Open 24/7',
        description: 'Quiet garden space for students to unwind. This tranquil area offers a peaceful retreat with natural surroundings, making it ideal for meditation, quiet study sessions, or small group discussions.',
        rooms: 'Outdoor Space\nSeating Areas: Multiple\nQuiet Zones: Available',
        image: 'images/image 50.jpg'
    },
    'chiromo-campus-garden-3': {
        name: 'Chiromo Campus Garden 3',
        department: 'Campus Recreation',
        contact: 'Open 24/7',
        description: 'Beautiful garden area perfect for study breaks. Features well-maintained green spaces, comfortable seating, and a relaxing atmosphere. The garden provides an excellent environment for outdoor activities, casual meetings, or peaceful relaxation.',
        rooms: 'Outdoor Space\nSeating Areas: Multiple\nRecreational Spaces: Available',
        image: 'images/image 2.jpg'
    },

    // Emergency Assembly Points
    'assembly-point-1': {
        name: 'Assembly Point 1',
        department: 'Emergency Services',
        contact: 'Emergency Contact: 911',
        description: 'Primary emergency assembly point for campus-wide evacuations. This designated area provides a safe gathering space during emergencies, with clear visibility and easy access for emergency responders.',
        rooms: 'Open Space\nCapacity: 500+ people',
        image: 'images/Amity University Campus with Prominent Content.jpeg'
    },
    'assembly-point-2': {
        name: 'Assembly Point 2',
        department: 'Emergency Services',
        contact: 'Emergency Contact: 911',
        description: 'Secondary emergency assembly point strategically located for quick access during campus evacuations. Features clear signage and adequate space for emergency response coordination.',
        rooms: 'Open Space\nCapacity: 500+ people',
        image: 'images/Amity University Campus with Prominent Content.jpeg'
    },
    'assembly-point-3': {
        name: 'Assembly Point 3',
        department: 'Emergency Services',
        contact: 'Emergency Contact: 911',
        description: 'Emergency assembly point near main entrance, providing a safe gathering area during campus evacuations. Features clear visibility and easy access for emergency services.',
        rooms: 'Open Space\nCapacity: 500+ people',
        image: 'images/Amity University Campus with Prominent Content.jpeg'
    },
    'assembly-point-4': {
        name: 'Assembly Point 4',
        department: 'Emergency Services',
        contact: 'Emergency Contact: 911',
        description: 'Emergency assembly point near academic block, designed for quick evacuation and safe gathering during emergencies. Features clear signage and adequate space for emergency response.',
        rooms: 'Open Space\nCapacity: 500+ people',
        image: 'images/Amity University Campus with Prominent Content.jpeg'
    },
    'assembly-point-5': {
        name: 'Assembly Point 5',
        department: 'Emergency Services',
        contact: 'Emergency Contact: 911',
        description: 'Emergency assembly point near student center, providing a safe gathering space during campus evacuations. Features clear visibility and easy access for emergency responders.',
        rooms: 'Open Space\nCapacity: 500+ people',
        image: 'images/Amity University Campus with Prominent Content.jpeg'
    },
    'assembly-point-6': {
        name: 'Assembly Point 6',
        department: 'Emergency Services',
        contact: 'Emergency Contact: 911',
        description: 'Emergency assembly point near sports complex, strategically located for quick access during campus evacuations. Features clear signage and adequate space for emergency response.',
        rooms: 'Open Space\nCapacity: 500+ people',
        image: 'images/Amity University Campus with Prominent Content.jpeg'
    },
    'assembly-point-7': {
        name: 'Assembly Point 7',
        department: 'Emergency Services',
        contact: 'Emergency Contact: 911',
        description: 'Emergency assembly point near sports complex, providing a safe gathering area during campus evacuations. Features clear visibility and easy access for emergency services.',
        rooms: 'Open Space\nCapacity: 500+ people',
        image: 'images/Amity University Campus with Prominent Content.jpeg'
    }
};

// Add indoor map data for all buildings
const indoorMaps = {
    'school-of-biological-sciences': {
        floors: [
            {
                name: 'Ground Floor',
                rooms: [
                    { number: '101', x: 100, y: 150, description: 'Biology Lab 1 - General Biology Laboratory' },
                    { number: '102', x: 200, y: 150, description: 'Biology Lab 2 - Microbiology Laboratory' },
                    { number: '103', x: 300, y: 150, description: 'Research Lab - Advanced Research Facility' },
                    { number: '104', x: 400, y: 150, description: 'Staff Room - Faculty Office' },
                    { number: '105', x: 500, y: 150, description: 'Storage - Equipment and Supplies' },
                    { number: '113', x: 600, y: 150, description: 'Research Office 1 - Graduate Studies' },
                    { number: '114', x: 700, y: 150, description: 'Research Office 2 - Postgraduate Studies' },
                    { number: '106', x: 100, y: 350, description: 'Lecture Room 1 - Capacity: 50 students' },
                    { number: '107', x: 200, y: 350, description: 'Lecture Room 2 - Capacity: 50 students' },
                    { number: '108', x: 300, y: 350, description: 'Lecture Room 3 - Capacity: 50 students' },
                    { number: '109', x: 400, y: 350, description: 'Conference Room - Meeting Space' },
                    { number: '110', x: 500, y: 350, description: 'Admin Office - Department Administration' },
                    { number: '111', x: 600, y: 350, description: 'Equipment Room - Specialized Equipment Storage' },
                    { number: '112', x: 700, y: 350, description: 'Student Lounge - Common Area' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'First Floor' }
                ]
            },
            {
                name: 'First Floor',
                rooms: [
                    { number: '201', x: 100, y: 150, description: 'Research Lab 1 - Molecular Biology' },
                    { number: '202', x: 200, y: 150, description: 'Research Lab 2 - Genetics' },
                    { number: '203', x: 300, y: 150, description: 'Graduate Studies - Research Office' },
                    { number: '204', x: 400, y: 150, description: 'Faculty Office - Professors Office' },
                    { number: '205', x: 500, y: 150, description: 'Meeting Room - Small Conference Space' },
                    { number: '213', x: 600, y: 150, description: 'Faculty Lounge - Staff Break Room' },
                    { number: '214', x: 700, y: 150, description: 'Department Head Office' },
                    { number: '206', x: 100, y: 350, description: 'Computer Lab 1 - Bioinformatics' },
                    { number: '207', x: 200, y: 350, description: 'Computer Lab 2 - Data Analysis' },
                    { number: '208', x: 300, y: 350, description: 'Library - Reference Materials' },
                    { number: '209', x: 400, y: 350, description: 'Study Room 1 - Group Study Area' },
                    { number: '210', x: 500, y: 350, description: 'Study Room 2 - Quiet Study Area' },
                    { number: '211', x: 600, y: 350, description: 'Research Lab 3 - Cell Biology' },
                    { number: '212', x: 700, y: 350, description: 'Research Lab 4 - Biochemistry' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'Ground Floor' },
                    { x: 700, y: 50, width: 60, height: 200, leadsTo: 'Second Floor' }
                ]
            }
        ]
    },
    'centre-of-biotechnology-bioinformatics': {
        floors: [
            {
                name: 'Ground Floor',
                rooms: [
                    { number: '101', x: 100, y: 150, description: 'Biotechnology Lab 1 - General Lab' },
                    { number: '102', x: 200, y: 150, description: 'Biotechnology Lab 2 - Advanced Lab' },
                    { number: '103', x: 300, y: 150, description: 'Research Lab - Bioinformatics' },
                    { number: '104', x: 400, y: 150, description: 'Staff Room - Faculty Office' },
                    { number: '105', x: 500, y: 150, description: 'Storage - Equipment and Supplies' },
                    { number: '113', x: 600, y: 150, description: 'Research Office 1 - Graduate Studies' },
                    { number: '114', x: 700, y: 150, description: 'Research Office 2 - Postgraduate Studies' },
                    { number: '106', x: 100, y: 350, description: 'Lecture Room 1 - Capacity: 40 students' },
                    { number: '107', x: 200, y: 350, description: 'Lecture Room 2 - Capacity: 40 students' },
                    { number: '108', x: 300, y: 350, description: 'Computer Lab 1 - Data Analysis' },
                    { number: '109', x: 400, y: 350, description: 'Computer Lab 2 - Programming' },
                    { number: '110', x: 500, y: 350, description: 'Admin Office - Department Administration' },
                    { number: '111', x: 600, y: 350, description: 'Equipment Room - Specialized Equipment' },
                    { number: '112', x: 700, y: 350, description: 'Student Lounge - Common Area' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'First Floor' }
                ]
            },
            {
                name: 'First Floor',
                rooms: [
                    { number: '201', x: 100, y: 150, description: 'Research Lab 1 - Genomics' },
                    { number: '202', x: 200, y: 150, description: 'Research Lab 2 - Proteomics' },
                    { number: '203', x: 300, y: 150, description: 'Graduate Studies - Research Office' },
                    { number: '204', x: 400, y: 150, description: 'Faculty Office - Professors Office' },
                    { number: '205', x: 500, y: 150, description: 'Meeting Room - Small Conference Space' },
                    { number: '213', x: 600, y: 150, description: 'Faculty Lounge - Staff Break Room' },
                    { number: '214', x: 700, y: 150, description: 'Department Head Office' },
                    { number: '206', x: 100, y: 350, description: 'Computer Lab 3 - Bioinformatics' },
                    { number: '207', x: 200, y: 350, description: 'Computer Lab 4 - Data Analysis' },
                    { number: '208', x: 300, y: 350, description: 'Library - Reference Materials' },
                    { number: '209', x: 400, y: 350, description: 'Study Room 1 - Group Study Area' },
                    { number: '210', x: 500, y: 350, description: 'Study Room 2 - Quiet Study Area' },
                    { number: '211', x: 600, y: 350, description: 'Research Lab 3 - Molecular Biology' },
                    { number: '212', x: 700, y: 350, description: 'Research Lab 4 - Cell Biology' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'Ground Floor' }
                ]
            }
        ]
    },
    'meteorology-department': {
        floors: [
            {
                name: 'Ground Floor',
                rooms: [
                    { number: '101', x: 100, y: 150, description: 'Meteorology Lab 1 - Weather Analysis' },
                    { number: '102', x: 200, y: 150, description: 'Meteorology Lab 2 - Climate Studies' },
                    { number: '103', x: 300, y: 150, description: 'Research Lab - Climate Modeling' },
                    { number: '104', x: 400, y: 150, description: 'Staff Room - Faculty Office' },
                    { number: '105', x: 500, y: 150, description: 'Storage - Equipment and Supplies' },
                    { number: '113', x: 600, y: 150, description: 'Research Office 1 - Graduate Studies' },
                    { number: '114', x: 700, y: 150, description: 'Research Office 2 - Postgraduate Studies' },
                    { number: '106', x: 100, y: 350, description: 'Lecture Room 1 - Capacity: 40 students' },
                    { number: '107', x: 200, y: 350, description: 'Lecture Room 2 - Capacity: 40 students' },
                    { number: '108', x: 300, y: 350, description: 'Computer Lab 1 - Data Analysis' },
                    { number: '109', x: 400, y: 350, description: 'Computer Lab 2 - Weather Simulation' },
                    { number: '110', x: 500, y: 350, description: 'Admin Office - Department Administration' },
                    { number: '111', x: 600, y: 350, description: 'Equipment Room - Specialized Equipment' },
                    { number: '112', x: 700, y: 350, description: 'Student Lounge - Common Area' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'First Floor' }
                ]
            },
            {
                name: 'First Floor',
                rooms: [
                    { number: '201', x: 100, y: 150, description: 'Research Lab 1 - Climate Data' },
                    { number: '202', x: 200, y: 150, description: 'Research Lab 2 - Weather Systems' },
                    { number: '203', x: 300, y: 150, description: 'Graduate Studies - Research Office' },
                    { number: '204', x: 400, y: 150, description: 'Faculty Office - Professors Office' },
                    { number: '205', x: 500, y: 150, description: 'Meeting Room - Small Conference Space' },
                    { number: '213', x: 600, y: 150, description: 'Faculty Lounge - Staff Break Room' },
                    { number: '214', x: 700, y: 150, description: 'Department Head Office' },
                    { number: '206', x: 100, y: 350, description: 'Computer Lab 3 - Climate Modeling' },
                    { number: '207', x: 200, y: 350, description: 'Computer Lab 4 - Data Analysis' },
                    { number: '208', x: 300, y: 350, description: 'Library - Reference Materials' },
                    { number: '209', x: 400, y: 350, description: 'Study Room 1 - Group Study Area' },
                    { number: '210', x: 500, y: 350, description: 'Study Room 2 - Quiet Study Area' },
                    { number: '211', x: 600, y: 350, description: 'Research Lab 3 - Atmospheric Studies' },
                    { number: '212', x: 700, y: 350, description: 'Research Lab 4 - Environmental Studies' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'Ground Floor' }
                ]
            }
        ]
    },
    'department-of-mathematics': {
        floors: [
            {
                name: 'Ground Floor',
                rooms: [
                    { number: '101', x: 100, y: 150, description: 'Math Lab 1 - Applied Mathematics' },
                    { number: '102', x: 200, y: 150, description: 'Math Lab 2 - Statistics' },
                    { number: '103', x: 300, y: 150, description: 'Research Lab - Mathematical Modeling' },
                    { number: '104', x: 400, y: 150, description: 'Staff Room - Faculty Office' },
                    { number: '105', x: 500, y: 150, description: 'Storage - Equipment and Supplies' },
                    { number: '113', x: 600, y: 150, description: 'Research Office 1 - Graduate Studies' },
                    { number: '114', x: 700, y: 150, description: 'Research Office 2 - Postgraduate Studies' },
                    { number: '106', x: 100, y: 350, description: 'Lecture Room 1 - Capacity: 50 students' },
                    { number: '107', x: 200, y: 350, description: 'Lecture Room 2 - Capacity: 50 students' },
                    { number: '108', x: 300, y: 350, description: 'Computer Lab 1 - Numerical Analysis' },
                    { number: '109', x: 400, y: 350, description: 'Computer Lab 2 - Data Analysis' },
                    { number: '110', x: 500, y: 350, description: 'Admin Office - Department Administration' },
                    { number: '111', x: 600, y: 350, description: 'Equipment Room - Specialized Equipment' },
                    { number: '112', x: 700, y: 350, description: 'Student Lounge - Common Area' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'First Floor' }
                ]
            },
            {
                name: 'First Floor',
                rooms: [
                    { number: '201', x: 100, y: 150, description: 'Research Lab 1 - Pure Mathematics' },
                    { number: '202', x: 200, y: 150, description: 'Research Lab 2 - Applied Statistics' },
                    { number: '203', x: 300, y: 150, description: 'Graduate Studies - Research Office' },
                    { number: '204', x: 400, y: 150, description: 'Faculty Office - Professors Office' },
                    { number: '205', x: 500, y: 150, description: 'Meeting Room - Small Conference Space' },
                    { number: '213', x: 600, y: 150, description: 'Faculty Lounge - Staff Break Room' },
                    { number: '214', x: 700, y: 150, description: 'Department Head Office' },
                    { number: '206', x: 100, y: 350, description: 'Computer Lab 3 - Mathematical Software' },
                    { number: '207', x: 200, y: 350, description: 'Computer Lab 4 - Statistical Analysis' },
                    { number: '208', x: 300, y: 350, description: 'Library - Reference Materials' },
                    { number: '209', x: 400, y: 350, description: 'Study Room 1 - Group Study Area' },
                    { number: '210', x: 500, y: 350, description: 'Study Room 2 - Quiet Study Area' },
                    { number: '211', x: 600, y: 350, description: 'Research Lab 3 - Operations Research' },
                    { number: '212', x: 700, y: 350, description: 'Research Lab 4 - Financial Mathematics' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'Ground Floor' }
                ]
            }
        ]
    },
    'physics-department': {
        floors: [
            {
                name: 'Ground Floor',
                rooms: [
                    { number: '101', x: 100, y: 150, description: 'Physics Lab 1 - General Physics' },
                    { number: '102', x: 200, y: 150, description: 'Physics Lab 2 - Mechanics' },
                    { number: '103', x: 300, y: 150, description: 'Research Lab - Quantum Physics' },
                    { number: '104', x: 400, y: 150, description: 'Staff Room - Faculty Office' },
                    { number: '105', x: 500, y: 150, description: 'Storage - Equipment and Supplies' },
                    { number: '113', x: 600, y: 150, description: 'Research Office 1 - Graduate Studies' },
                    { number: '114', x: 700, y: 150, description: 'Research Office 2 - Postgraduate Studies' },
                    { number: '106', x: 100, y: 350, description: 'Lecture Room 1 - Capacity: 50 students' },
                    { number: '107', x: 200, y: 350, description: 'Lecture Room 2 - Capacity: 50 students' },
                    { number: '108', x: 300, y: 350, description: 'Computer Lab 1 - Physics Simulation' },
                    { number: '109', x: 400, y: 350, description: 'Computer Lab 2 - Data Analysis' },
                    { number: '110', x: 500, y: 350, description: 'Admin Office - Department Administration' },
                    { number: '111', x: 600, y: 350, description: 'Equipment Room - Specialized Equipment' },
                    { number: '112', x: 700, y: 350, description: 'Student Lounge - Common Area' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'First Floor' }
                ]
            },
            {
                name: 'First Floor',
                rooms: [
                    { number: '201', x: 100, y: 150, description: 'Research Lab 1 - Electromagnetism' },
                    { number: '202', x: 200, y: 150, description: 'Research Lab 2 - Thermodynamics' },
                    { number: '203', x: 300, y: 150, description: 'Graduate Studies - Research Office' },
                    { number: '204', x: 400, y: 150, description: 'Faculty Office - Professors Office' },
                    { number: '205', x: 500, y: 150, description: 'Meeting Room - Small Conference Space' },
                    { number: '213', x: 600, y: 150, description: 'Faculty Lounge - Staff Break Room' },
                    { number: '214', x: 700, y: 150, description: 'Department Head Office' },
                    { number: '206', x: 100, y: 350, description: 'Computer Lab 3 - Astrophysics' },
                    { number: '207', x: 200, y: 350, description: 'Computer Lab 4 - Particle Physics' },
                    { number: '208', x: 300, y: 350, description: 'Library - Reference Materials' },
                    { number: '209', x: 400, y: 350, description: 'Study Room 1 - Group Study Area' },
                    { number: '210', x: 500, y: 350, description: 'Study Room 2 - Quiet Study Area' },
                    { number: '211', x: 600, y: 350, description: 'Research Lab 3 - Optics' },
                    { number: '212', x: 700, y: 350, description: 'Research Lab 4 - Nuclear Physics' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'Ground Floor' }
                ]
            }
        ]
    },
    'department-of-earth-and-climate-sciences': {
        floors: [
            {
                name: 'Ground Floor',
                rooms: [
                    { number: '101', x: 100, y: 150, description: 'Geology Lab 1 - Mineralogy' },
                    { number: '102', x: 200, y: 150, description: 'Geology Lab 2 - Petrology' },
                    { number: '103', x: 300, y: 150, description: 'Research Lab - Climate Studies' },
                    { number: '104', x: 400, y: 150, description: 'Staff Room - Faculty Office' },
                    { number: '105', x: 500, y: 150, description: 'Storage - Equipment and Supplies' },
                    { number: '113', x: 600, y: 150, description: 'Research Office 1 - Graduate Studies' },
                    { number: '114', x: 700, y: 150, description: 'Research Office 2 - Postgraduate Studies' },
                    { number: '106', x: 100, y: 350, description: 'Lecture Room 1 - Capacity: 50 students' },
                    { number: '107', x: 200, y: 350, description: 'Lecture Room 2 - Capacity: 50 students' },
                    { number: '108', x: 300, y: 350, description: 'Computer Lab 1 - GIS' },
                    { number: '109', x: 400, y: 350, description: 'Computer Lab 2 - Climate Modeling' },
                    { number: '110', x: 500, y: 350, description: 'Admin Office - Department Administration' },
                    { number: '111', x: 600, y: 350, description: 'Equipment Room - Specialized Equipment' },
                    { number: '112', x: 700, y: 350, description: 'Student Lounge - Common Area' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'First Floor' }
                ]
            },
            {
                name: 'First Floor',
                rooms: [
                    { number: '201', x: 100, y: 150, description: 'Research Lab 1 - Paleontology' },
                    { number: '202', x: 200, y: 150, description: 'Research Lab 2 - Geophysics' },
                    { number: '203', x: 300, y: 150, description: 'Graduate Studies - Research Office' },
                    { number: '204', x: 400, y: 150, description: 'Faculty Office - Professors Office' },
                    { number: '205', x: 500, y: 150, description: 'Meeting Room - Small Conference Space' },
                    { number: '213', x: 600, y: 150, description: 'Faculty Lounge - Staff Break Room' },
                    { number: '214', x: 700, y: 150, description: 'Department Head Office' },
                    { number: '206', x: 100, y: 350, description: 'Computer Lab 3 - Remote Sensing' },
                    { number: '207', x: 200, y: 350, description: 'Computer Lab 4 - Environmental Analysis' },
                    { number: '208', x: 300, y: 350, description: 'Library - Reference Materials' },
                    { number: '209', x: 400, y: 350, description: 'Study Room 1 - Group Study Area' },
                    { number: '210', x: 500, y: 350, description: 'Study Room 2 - Quiet Study Area' },
                    { number: '211', x: 600, y: 350, description: 'Research Lab 3 - Hydrology' },
                    { number: '212', x: 700, y: 350, description: 'Research Lab 4 - Oceanography' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'Ground Floor' }
                ]
            }
        ]
    },
    'school-of-physical-sciences': {
        floors: [
            {
                name: 'Ground Floor',
                rooms: [
                    { number: '101', x: 100, y: 150, description: 'Physics Lab 1 - General Physics' },
                    { number: '102', x: 200, y: 150, description: 'Chemistry Lab 1 - General Chemistry' },
                    { number: '103', x: 300, y: 150, description: 'Research Lab - Materials Science' },
                    { number: '104', x: 400, y: 150, description: 'Staff Room - Faculty Office' },
                    { number: '105', x: 500, y: 150, description: 'Storage - Equipment and Supplies' },
                    { number: '113', x: 600, y: 150, description: 'Research Office 1 - Graduate Studies' },
                    { number: '114', x: 700, y: 150, description: 'Research Office 2 - Postgraduate Studies' },
                    { number: '106', x: 100, y: 350, description: 'Lecture Room 1 - Capacity: 50 students' },
                    { number: '107', x: 200, y: 350, description: 'Lecture Room 2 - Capacity: 50 students' },
                    { number: '108', x: 300, y: 350, description: 'Computer Lab 1 - Scientific Computing' },
                    { number: '109', x: 400, y: 350, description: 'Computer Lab 2 - Data Analysis' },
                    { number: '110', x: 500, y: 350, description: 'Admin Office - Department Administration' },
                    { number: '111', x: 600, y: 350, description: 'Equipment Room - Specialized Equipment' },
                    { number: '112', x: 700, y: 350, description: 'Student Lounge - Common Area' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'First Floor' }
                ]
            },
            {
                name: 'First Floor',
                rooms: [
                    { number: '201', x: 100, y: 150, description: 'Research Lab 1 - Quantum Physics' },
                    { number: '202', x: 200, y: 150, description: 'Research Lab 2 - Organic Chemistry' },
                    { number: '203', x: 300, y: 150, description: 'Graduate Studies - Research Office' },
                    { number: '204', x: 400, y: 150, description: 'Faculty Office - Professors Office' },
                    { number: '205', x: 500, y: 150, description: 'Meeting Room - Small Conference Space' },
                    { number: '213', x: 600, y: 150, description: 'Faculty Lounge - Staff Break Room' },
                    { number: '214', x: 700, y: 150, description: 'Department Head Office' },
                    { number: '206', x: 100, y: 350, description: 'Computer Lab 3 - Molecular Modeling' },
                    { number: '207', x: 200, y: 350, description: 'Computer Lab 4 - Spectroscopy' },
                    { number: '208', x: 300, y: 350, description: 'Library - Reference Materials' },
                    { number: '209', x: 400, y: 350, description: 'Study Room 1 - Group Study Area' },
                    { number: '210', x: 500, y: 350, description: 'Study Room 2 - Quiet Study Area' },
                    { number: '211', x: 600, y: 350, description: 'Research Lab 3 - Nanotechnology' },
                    { number: '212', x: 700, y: 350, description: 'Research Lab 4 - Biophysics' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'Ground Floor' }
                ]
            }
        ]
    },
    'department-of-veterinary-anatomy-physiology': {
        floors: [
            {
                name: 'Ground Floor',
                rooms: [
                    { number: '101', x: 100, y: 150, description: 'Anatomy Lab 1 - Gross Anatomy' },
                    { number: '102', x: 200, y: 150, description: 'Anatomy Lab 2 - Microscopic Anatomy' },
                    { number: '103', x: 300, y: 150, description: 'Research Lab - Comparative Anatomy' },
                    { number: '104', x: 400, y: 150, description: 'Staff Room - Faculty Office' },
                    { number: '105', x: 500, y: 150, description: 'Storage - Equipment and Supplies' },
                    { number: '113', x: 600, y: 150, description: 'Research Office 1 - Graduate Studies' },
                    { number: '114', x: 700, y: 150, description: 'Research Office 2 - Postgraduate Studies' },
                    { number: '106', x: 100, y: 350, description: 'Lecture Room 1 - Capacity: 40 students' },
                    { number: '107', x: 200, y: 350, description: 'Lecture Room 2 - Capacity: 40 students' },
                    { number: '108', x: 300, y: 350, description: 'Computer Lab 1 - Digital Anatomy' },
                    { number: '109', x: 400, y: 350, description: 'Computer Lab 2 - 3D Modeling' },
                    { number: '110', x: 500, y: 350, description: 'Admin Office - Department Administration' },
                    { number: '111', x: 600, y: 350, description: 'Equipment Room - Specialized Equipment' },
                    { number: '112', x: 700, y: 350, description: 'Student Lounge - Common Area' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'First Floor' }
                ]
            },
            {
                name: 'First Floor',
                rooms: [
                    { number: '201', x: 100, y: 150, description: 'Research Lab 1 - Histology' },
                    { number: '202', x: 200, y: 150, description: 'Research Lab 2 - Embryology' },
                    { number: '203', x: 300, y: 150, description: 'Graduate Studies - Research Office' },
                    { number: '204', x: 400, y: 150, description: 'Faculty Office - Professors Office' },
                    { number: '205', x: 500, y: 150, description: 'Meeting Room - Small Conference Space' },
                    { number: '213', x: 600, y: 150, description: 'Faculty Lounge - Staff Break Room' },
                    { number: '214', x: 700, y: 150, description: 'Department Head Office' },
                    { number: '206', x: 100, y: 350, description: 'Computer Lab 3 - Virtual Anatomy' },
                    { number: '207', x: 200, y: 350, description: 'Computer Lab 4 - Imaging Analysis' },
                    { number: '208', x: 300, y: 350, description: 'Library - Reference Materials' },
                    { number: '209', x: 400, y: 350, description: 'Study Room 1 - Group Study Area' },
                    { number: '210', x: 500, y: 350, description: 'Study Room 2 - Quiet Study Area' },
                    { number: '211', x: 600, y: 350, description: 'Research Lab 3 - Neuroanatomy' },
                    { number: '212', x: 700, y: 350, description: 'Research Lab 4 - Comparative Physiology' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'Ground Floor' }
                ]
            }
        ]
    },
    'department-of-computing-and-informatics': {
        floors: [
            {
                name: 'Ground Floor',
                rooms: [
                    { number: '101', x: 100, y: 150, description: 'Computer Lab 1 - Programming' },
                    { number: '102', x: 200, y: 150, description: 'Computer Lab 2 - Database Systems' },
                    { number: '103', x: 300, y: 150, description: 'Research Lab - AI & Machine Learning' },
                    { number: '104', x: 400, y: 150, description: 'Staff Room - Faculty Office' },
                    { number: '105', x: 500, y: 150, description: 'Server Room - Network Infrastructure' },
                    { number: '113', x: 600, y: 150, description: 'Research Office 1 - Graduate Studies' },
                    { number: '114', x: 700, y: 150, description: 'Research Office 2 - Postgraduate Studies' },
                    { number: '106', x: 100, y: 350, description: 'Lecture Room 1 - Capacity: 50 students' },
                    { number: '107', x: 200, y: 350, description: 'Lecture Room 2 - Capacity: 50 students' },
                    { number: '108', x: 300, y: 350, description: 'Computer Lab 3 - Web Development' },
                    { number: '109', x: 400, y: 350, description: 'Computer Lab 4 - Software Engineering' },
                    { number: '110', x: 500, y: 350, description: 'Admin Office - Department Administration' },
                    { number: '111', x: 600, y: 350, description: 'Equipment Room - Hardware Lab' },
                    { number: '112', x: 700, y: 350, description: 'Student Lounge - Common Area' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'First Floor' }
                ]
            },
            {
                name: 'First Floor',
                rooms: [
                    { number: '201', x: 100, y: 150, description: 'Research Lab 1 - Cybersecurity' },
                    { number: '202', x: 200, y: 150, description: 'Research Lab 2 - Data Science' },
                    { number: '203', x: 300, y: 150, description: 'Graduate Studies - Research Office' },
                    { number: '204', x: 400, y: 150, description: 'Faculty Office - Professors Office' },
                    { number: '205', x: 500, y: 150, description: 'Meeting Room - Small Conference Space' },
                    { number: '213', x: 600, y: 150, description: 'Faculty Lounge - Staff Break Room' },
                    { number: '214', x: 700, y: 150, description: 'Department Head Office' },
                    { number: '206', x: 100, y: 350, description: 'Computer Lab 5 - Network Security' },
                    { number: '207', x: 200, y: 350, description: 'Computer Lab 6 - Cloud Computing' },
                    { number: '208', x: 300, y: 350, description: 'Library - Reference Materials' },
                    { number: '209', x: 400, y: 350, description: 'Study Room 1 - Group Study Area' },
                    { number: '210', x: 500, y: 350, description: 'Study Room 2 - Quiet Study Area' },
                    { number: '211', x: 600, y: 350, description: 'Research Lab 3 - IoT' },
                    { number: '212', x: 700, y: 350, description: 'Research Lab 4 - Mobile Computing' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'Ground Floor' }
                ]
            }
        ]
    },
    'uon-chemistry-department': {
        floors: [
            {
                name: 'Ground Floor',
                rooms: [
                    { number: '101', x: 100, y: 150, description: 'Chemistry Lab 1 - General Chemistry' },
                    { number: '102', x: 200, y: 150, description: 'Chemistry Lab 2 - Organic Chemistry' },
                    { number: '103', x: 300, y: 150, description: 'Research Lab - Analytical Chemistry' },
                    { number: '104', x: 400, y: 150, description: 'Staff Room - Faculty Office' },
                    { number: '105', x: 500, y: 150, description: 'Storage - Chemical Storage' },
                    { number: '113', x: 600, y: 150, description: 'Research Office 1 - Graduate Studies' },
                    { number: '114', x: 700, y: 150, description: 'Research Office 2 - Postgraduate Studies' },
                    { number: '106', x: 100, y: 350, description: 'Lecture Room 1 - Capacity: 50 students' },
                    { number: '107', x: 200, y: 350, description: 'Lecture Room 2 - Capacity: 50 students' },
                    { number: '108', x: 300, y: 350, description: 'Computer Lab 1 - Chemical Modeling' },
                    { number: '109', x: 400, y: 350, description: 'Computer Lab 2 - Data Analysis' },
                    { number: '110', x: 500, y: 350, description: 'Admin Office - Department Administration' },
                    { number: '111', x: 600, y: 350, description: 'Equipment Room - Specialized Equipment' },
                    { number: '112', x: 700, y: 350, description: 'Student Lounge - Common Area' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'First Floor' }
                ]
            },
            {
                name: 'First Floor',
                rooms: [
                    { number: '201', x: 100, y: 150, description: 'Research Lab 1 - Physical Chemistry' },
                    { number: '202', x: 200, y: 150, description: 'Research Lab 2 - Inorganic Chemistry' },
                    { number: '203', x: 300, y: 150, description: 'Graduate Studies - Research Office' },
                    { number: '204', x: 400, y: 150, description: 'Faculty Office - Professors Office' },
                    { number: '205', x: 500, y: 150, description: 'Meeting Room - Small Conference Space' },
                    { number: '213', x: 600, y: 150, description: 'Faculty Lounge - Staff Break Room' },
                    { number: '214', x: 700, y: 150, description: 'Department Head Office' },
                    { number: '206', x: 100, y: 350, description: 'Computer Lab 3 - Molecular Modeling' },
                    { number: '207', x: 200, y: 350, description: 'Computer Lab 4 - Spectroscopy' },
                    { number: '208', x: 300, y: 350, description: 'Library - Reference Materials' },
                    { number: '209', x: 400, y: 350, description: 'Study Room 1 - Group Study Area' },
                    { number: '210', x: 500, y: 350, description: 'Study Room 2 - Quiet Study Area' },
                    { number: '211', x: 600, y: 350, description: 'Research Lab 3 - Biochemistry' },
                    { number: '212', x: 700, y: 350, description: 'Research Lab 4 - Environmental Chemistry' }
                ],
                pathways: [
                    { type: 'horizontal', x: 50, y: 250, width: 700, height: 60 },
                    { type: 'vertical', x: 370, y: 50, width: 60, height: 200 }
                ],
                entrances: [
                    { x: 50, y: 250, width: 40, height: 40 }
                ],
                staircases: [
                    { x: 50, y: 50, width: 60, height: 200, leadsTo: 'Ground Floor' }
                ]
            }
        ]
    }
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
        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content';
        
        // Create image container with improved styling
        if (info.image) {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'popup-image-container';
            imageContainer.style.cssText = `
                margin: -10px -10px 10px -10px;
                position: relative;
                width: calc(100% + 20px);
                height: 300px;
                overflow: hidden;
                border-radius: 8px 8px 0 0;
                background: #f5f5f5;
            `;
            
            const img = document.createElement('img');
            img.src = info.image;
            img.alt = info.name;
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
                object-position: center;
                transition: transform 0.3s ease;
            `;
            
            // Add hover effect
            img.addEventListener('mouseover', () => {
                img.style.transform = 'scale(1.05)';
            });
            img.addEventListener('mouseout', () => {
                img.style.transform = 'scale(1)';
            });
            
            // Add loading state
            img.onload = () => {
                imageContainer.style.background = 'none';
            };
            img.onerror = () => {
                imageContainer.innerHTML = `
                    <div style="
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        color: #666;
                        font-size: 14px;
                        text-align: center;
                        padding: 20px;
                    ">
                        <i class="fas fa-image" style="font-size: 24px; margin-right: 10px;"></i>
                        Image not available
                    </div>
                `;
            };
            
            imageContainer.appendChild(img);
            popupContent.appendChild(imageContainer);
        }

        // Create content container with padding
        const contentContainer = document.createElement('div');
        contentContainer.style.cssText = `
            padding: 15px;
            background: white;
        `;

        // Create title with improved styling
        const title = document.createElement('h3');
        title.style.cssText = `
            margin: 0 0 15px 0;
            color: #1a237e;
            font-size: 18px;
            font-weight: 600;
            line-height: 1.3;
        `;
        title.textContent = info.name;
        contentContainer.appendChild(title);

        // Create department info with icon
        const department = document.createElement('div');
        department.style.cssText = `
            display: flex;
            align-items: center;
            margin: 10px 0;
            color: #333;
            font-size: 14px;
        `;
        department.innerHTML = `
            <i class="fas fa-building" style="color: #1a237e; margin-right: 8px; width: 16px;"></i>
            <span><strong>Department:</strong> ${info.department}</span>
        `;
        contentContainer.appendChild(department);

        // Create description with improved formatting
        const description = document.createElement('div');
        description.style.cssText = `
            margin: 15px 0;
            color: #444;
            font-size: 14px;
            line-height: 1.5;
        `;
        description.innerHTML = `
            <div style="display: flex; align-items: flex-start;">
                <i class="fas fa-info-circle" style="color: #1a237e; margin-right: 8px; margin-top: 3px; width: 16px;"></i>
                <div>
                    <strong style="display: block; margin-bottom: 5px;">Description:</strong>
                    ${info.description.replace(/\n/g, '<br>')}
                </div>
            </div>
        `;
        contentContainer.appendChild(description);

        // Create contact info with icon
        const contact = document.createElement('div');
        contact.style.cssText = `
            margin: 15px 0;
            color: #444;
            font-size: 14px;
        `;
        contact.innerHTML = `
            <div style="display: flex; align-items: flex-start;">
                <i class="fas fa-phone" style="color: #1a237e; margin-right: 8px; margin-top: 3px; width: 16px;"></i>
                <div>
                    <strong style="display: block; margin-bottom: 5px;">Contact:</strong>
                    ${info.contact.replace(/\n/g, '<br>')}
                </div>
            </div>
        `;
        contentContainer.appendChild(contact);

        // Create rooms info with icon if available
        if (info.rooms) {
            const rooms = document.createElement('div');
            rooms.style.cssText = `
                margin: 15px 0;
                color: #444;
                font-size: 14px;
            `;
            rooms.innerHTML = `
                <div style="display: flex; align-items: flex-start;">
                    <i class="fas fa-door-open" style="color: #1a237e; margin-right: 8px; margin-top: 3px; width: 16px;"></i>
                    <div>
                        <strong style="display: block; margin-bottom: 5px;">Rooms:</strong>
                        ${info.rooms.replace(/\n/g, '<br>')}
                    </div>
                </div>
            `;
            contentContainer.appendChild(rooms);
        }

        // Add content container to popup
        popupContent.appendChild(contentContainer);

        // Only create indoor navigation button for department locations
        if (location.category === 'departments') {
            const buttonContainer = document.createElement('div');
            buttonContainer.style.cssText = `
                margin-top: 15px;
                text-align: center;
                padding: 0 15px 15px;
            `;
            
            const indoorNavButton = document.createElement('button');
            indoorNavButton.className = 'indoor-nav-btn';
            indoorNavButton.textContent = 'View Indoor Navigation';
            indoorNavButton.style.cssText = `
                background-color: #4CAF50;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.3s ease;
                width: 100%;
            `;
            
            indoorNavButton.addEventListener('mouseover', () => {
                indoorNavButton.style.backgroundColor = '#45a049';
            });
            indoorNavButton.addEventListener('mouseout', () => {
                indoorNavButton.style.backgroundColor = '#4CAF50';
            });
            
            indoorNavButton.addEventListener('click', function(e) {
                e.stopPropagation();
                showIndoorNavigation(buildingId);
            });
            
            buttonContainer.appendChild(indoorNavButton);
            popupContent.appendChild(buttonContainer);
        }

        return popupContent;
    }
    
    // Fallback to basic information if detailed info is not available
    const basicContent = document.createElement('div');
    basicContent.className = 'popup-content';
    basicContent.style.cssText = `
        padding: 15px;
        background: white;
    `;
    
    const title = document.createElement('h3');
    title.style.cssText = `
        margin: 0 0 10px 0;
        color: #1a237e;
        font-size: 16px;
        font-weight: 600;
    `;
    title.textContent = location.name;
    basicContent.appendChild(title);
    
    const description = document.createElement('p');
    description.style.cssText = `
        margin: 0;
        color: #444;
        font-size: 14px;
        line-height: 1.5;
    `;
    description.textContent = location.description || 'No description available.';
    basicContent.appendChild(description);
    
    return basicContent;
}

// Function to show indoor navigation
function showIndoorNavigation(buildingId) {
    const indoorNavContainer = document.getElementById('indoor-navigation-container');
    if (!indoorNavContainer) {
        // Create indoor navigation container if it doesn't exist
        const container = document.createElement('div');
        container.id = 'indoor-navigation-container';
        container.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            padding: 15px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            z-index: 1000;
            display: none;
            max-height: 80vh;
            overflow-y: auto;
        `;
        document.body.appendChild(container);
    }

    // Get building info and floor plan data
    const building = buildingInfo[buildingId];
    const floorPlan = indoorMaps[buildingId];
    
    if (!building || !floorPlan) {
        alert('Indoor navigation is not available for this building yet.');
        return;
    }

    // Create indoor navigation content with two-column layout
    const indoorNavContent = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
            <h3 style="margin: 0;">${building.name} - Indoor Navigation</h3>
            <button id="close-indoor-nav" style="
                background: none;
                border: none;
                color: #666;
                cursor: pointer;
                font-size: 20px;
                padding: 5px;
            ">×</button>
        </div>
        <div style="display: flex; gap: 20px;">
            <!-- Left column - Floor plan -->
            <div style="flex: 1; min-width: 0;">
                <div class="floor-selector" style="margin-bottom: 15px;">
                    <select id="floor-select" style="
                        padding: 8px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        width: 100%;
                    ">
                        ${floorPlan.floors.map((floor, index) => `
                            <option value="${index}">${floor.name}</option>
                        `).join('')}
                    </select>
                </div>
                <div id="indoor-map-container" style="
                    height: 400px;
                    background: #f5f5f5;
                    border-radius: 4px;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">
                    <canvas id="floor-plan-canvas" style="
                        max-width: 100%;
                        max-height: 100%;
                        object-fit: contain;
                        display: block;
                    "></canvas>
                </div>
            </div>
            
            <!-- Right column - Room information -->
            <div style="flex: 1; min-width: 0;">
                <div style="margin-bottom: 15px;">
                    <h4>Room Search</h4>
                    <input type="text" id="room-search" placeholder="Search for a room..." style="
                        width: 100%;
                        padding: 8px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        margin-bottom: 10px;
                    ">
                </div>
                <div id="room-results" style="
                    max-height: 400px;
                    overflow-y: auto;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 10px;
                ">
                    <div style="color: #666; text-align: center; padding: 20px;">
                        Search for rooms to see results
                    </div>
                </div>
            </div>
        </div>
    `;

    // Update container content and show it
    indoorNavContainer.innerHTML = indoorNavContent;
    indoorNavContainer.style.display = 'block';

    // Add event listener for close button
    document.getElementById('close-indoor-nav').addEventListener('click', hideIndoorNavigation);

    // Initialize floor selection and canvas
    const floorSelect = document.getElementById('floor-select');
    const canvas = document.getElementById('floor-plan-canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Function to draw floor plan
    function drawFloorPlan(floor) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw background
        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw pathways
        floor.pathways.forEach(pathway => {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(pathway.x, pathway.y, pathway.width, pathway.height);
            ctx.font = '14px Arial';
            ctx.fillStyle = '#666666';
            ctx.textAlign = 'center';
            if (pathway.type === 'horizontal') {
                ctx.fillText('PATHWAY', pathway.x + pathway.width/2, pathway.y + pathway.height/2 + 5);
            } else {
                ctx.save();
                ctx.translate(pathway.x + pathway.width/2, pathway.y + pathway.height/2);
                ctx.rotate(Math.PI/2);
                ctx.fillText('PATHWAY', 0, 0);
                ctx.restore();
            }
        });

        // Draw entrances
        floor.entrances.forEach(entrance => {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(entrance.x, entrance.y, entrance.width, entrance.height);
            ctx.fillStyle = '#666666';
            ctx.font = '12px Arial';
            ctx.fillText('ENTRANCE', entrance.x + entrance.width/2, entrance.y + entrance.height + 15);
        });

        // Draw staircases
        floor.staircases.forEach(staircase => {
            ctx.fillStyle = '#e6f3ff';
            ctx.fillRect(staircase.x, staircase.y, staircase.width, staircase.height);
            ctx.strokeStyle = '#0066cc';
            ctx.lineWidth = 2;
            ctx.strokeRect(staircase.x, staircase.y, staircase.width, staircase.height);
            ctx.fillStyle = '#0066cc';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.save();
            ctx.translate(staircase.x + staircase.width/2, staircase.y + staircase.height/2);
            ctx.rotate(Math.PI/2);
            ctx.fillText(`STAIRCASE TO ${staircase.leadsTo}`, 0, 0);
            ctx.restore();
        });

        // Draw rooms
        const roomWidth = 150;
        const roomHeight = 100;

        // Upper section rooms (above pathway)
        const upperRooms = floor.rooms.filter(room => room.y < 250);
        // Lower section rooms (below pathway)
        const lowerRooms = floor.rooms.filter(room => room.y >= 250);

        // Draw all rooms
        [...upperRooms, ...lowerRooms].forEach((room, index) => {
            // Draw room rectangle
            ctx.fillStyle = '#e6f3ff';  // Light blue background
            ctx.fillRect(room.x, room.y, roomWidth, roomHeight);
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = 2;
            ctx.strokeRect(room.x, room.y, roomWidth, roomHeight);

            // Draw door
            const doorWidth = 20;
            const doorHeight = 5;
            ctx.fillStyle = '#8b4513';  // Brown color for door
            if (index < upperRooms.length) {
                // Doors for upper rooms
                if (index < 2) {
                    // Left section doors on right side
                    ctx.fillRect(room.x + roomWidth - doorWidth, room.y + roomHeight - 30, doorWidth, doorHeight);
                } else {
                    // Right section doors on left side
                    ctx.fillRect(room.x, room.y + roomHeight - 30, doorWidth, doorHeight);
                }
            } else {
                // Doors for lower rooms on top
                ctx.fillRect(room.x + roomWidth/2 - doorWidth/2, room.y, doorWidth, doorHeight);
            }

            // Add room number and description
            ctx.fillStyle = '#333333';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(room.number, room.x + roomWidth/2, room.y + 30);
            
            // Add room description (truncated)
            if (room.description) {
                const description = room.description.split(' - ')[0];
                ctx.font = '10px Arial';
                ctx.fillText(description, room.x + roomWidth/2, room.y + 50);
            }
        });

        // Draw legend
        ctx.fillStyle = '#333333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'left';
        ctx.fillText('Room Legend:', 10, 550);
        ctx.font = '12px Arial';
        ctx.fillText('• Brown rectangles represent doors', 10, 570);
        ctx.fillText('• Light blue areas represent rooms', 10, 590);
        ctx.fillText('• White areas represent pathways', 10, 610);
        ctx.fillText('• Blue rectangles represent staircases', 10, 630);
    }

    // Function to update floor plan
    function updateFloorPlan(floorIndex) {
        const floor = floorPlan.floors[floorIndex];
        drawFloorPlan(floor);
    }

    // Initialize with first floor
    updateFloorPlan(0);

    // Add event listener for floor selection
    floorSelect.addEventListener('change', (e) => {
        updateFloorPlan(parseInt(e.target.value));
    });

    // Add room search functionality
    const roomSearch = document.getElementById('room-search');
    const roomResults = document.getElementById('room-results');

    roomSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const currentFloor = floorPlan.floors[floorSelect.value];
        
        const results = currentFloor.rooms.filter(room => 
            room.number.toLowerCase().includes(searchTerm) || 
            room.description.toLowerCase().includes(searchTerm)
        );

        if (results.length === 0) {
            roomResults.innerHTML = '<div style="color: #666; text-align: center; padding: 20px;">No rooms found</div>';
        } else {
            roomResults.innerHTML = results.map(room => `
                <div style="
                    padding: 10px;
                    border-bottom: 1px solid #eee;
                    cursor: pointer;
                " onclick="highlightRoom(${room.x}, ${room.y})">
                    <strong>Room ${room.number}</strong><br>
                    ${room.description}
                </div>
            `).join('');
        }
    });
}

// Function to highlight a room on the floor plan
function highlightRoom(x, y) {
    const canvas = document.getElementById('floor-plan-canvas');
    const ctx = canvas.getContext('2d');
    
    // Draw highlight rectangle
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, 100, 80);
    
    // Remove highlight after 2 seconds
    setTimeout(() => {
        const floorSelect = document.getElementById('floor-select');
        const floorIndex = parseInt(floorSelect.value);
        const building = buildingInfo[buildingId];
        updateFloorPlan(floorIndex);
    }, 2000);
}

// Function to hide indoor navigation
function hideIndoorNavigation() {
    const indoorNavContainer = document.getElementById('indoor-navigation-container');
    if (indoorNavContainer) {
        indoorNavContainer.style.display = 'none';
    }
}

// Add CSS for indoor navigation
const indoorNavStyle = document.createElement('style');
indoorNavStyle.textContent = `
    .indoor-nav-btn:hover {
        background-color: #45a049 !important;
    }
    #indoor-navigation-container {
        transition: all 0.3s ease;
    }
    #room-results div:hover {
        background-color: #f5f5f5;
        cursor: pointer;
    }
    .room-marker:hover {
        transform: translate(-50%, -50%) scale(1.2) !important;
        z-index: 1;
    }
    .room-result:hover {
        background-color: #f5f5f5;
    }
`;
document.head.appendChild(indoorNavStyle);

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
            maxWidth: 500,  // Increased from 400
            minWidth: 400,  // Added minimum width
            className: 'custom-popup',
            maxHeight: 600  // Added maximum height
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

// GPS Tracking Variables
let userMarker = null;
let watchId = null;
let isTracking = false;
let positionHistory = []; // Store recent positions for averaging
const MAX_POSITION_HISTORY = 5; // Number of positions to average
const MIN_ACCURACY_THRESHOLD = 20; // Minimum accuracy in meters to consider position valid
const POSITION_UPDATE_INTERVAL = 1000; // Update interval in milliseconds
const INITIAL_TIMEOUT = 30000; // 30 seconds for initial fix
const WATCH_TIMEOUT = 15000; // 15 seconds for subsequent updates
let gpsTimeoutId = null; // For tracking timeout

// Function to show GPS status message
function showGPSStatus(message, type = 'info') {
    const gpsButton = document.getElementById('gpsTrackBtn');
    const statusDiv = document.createElement('div');
    statusDiv.className = `gps-status ${type}`;
    statusDiv.textContent = message;
    
    // Remove any existing status
    const existingStatus = document.querySelector('.gps-status');
    if (existingStatus) {
        existingStatus.remove();
    }
    
    document.body.appendChild(statusDiv);
    
    // Auto-remove after 5 seconds unless it's a loading message
    if (type !== 'loading') {
        setTimeout(() => statusDiv.remove(), 5000);
    }
    
    return statusDiv;
}

// Function to calculate average position from history
function calculateAveragePosition(positions) {
    if (positions.length === 0) return null;
    
    let sumLat = 0;
    let sumLng = 0;
    let totalWeight = 0;
    
    positions.forEach(pos => {
        const weight = 1 / (pos.accuracy || 1); // Weight by accuracy (more accurate positions have higher weight)
        sumLat += pos.latitude * weight;
        sumLng += pos.longitude * weight;
        totalWeight += weight;
    });
    
    return {
        latitude: sumLat / totalWeight,
        longitude: sumLng / totalWeight,
        accuracy: Math.min(...positions.map(p => p.accuracy)) // Use best accuracy
    };
}

// Function to update user location with improved accuracy handling
function updateUserLocation(position) {
    const { latitude, longitude, accuracy } = position.coords;
    
    // Add position to history
    positionHistory.push({
        latitude,
        longitude,
        accuracy,
        timestamp: Date.now()
    });
    
    // Keep only recent positions
    if (positionHistory.length > MAX_POSITION_HISTORY) {
        positionHistory.shift();
    }
    
    // Calculate average position
    const avgPosition = calculateAveragePosition(positionHistory);
    if (!avgPosition) return;
    
    const userLocation = [avgPosition.latitude, avgPosition.longitude];
    const currentAccuracy = avgPosition.accuracy;
    
    // Update accuracy indicator
    const gpsButton = document.getElementById('gpsTrackBtn');
    const accuracyStatus = document.createElement('div');
    accuracyStatus.className = 'accuracy-status';
    
    if (currentAccuracy > 100) {
        gpsButton.classList.add('warning');
        accuracyStatus.textContent = `Low accuracy: ${Math.round(currentAccuracy)}m`;
        accuracyStatus.style.color = '#ff4444';
    } else if (currentAccuracy > 50) {
        gpsButton.classList.add('caution');
        accuracyStatus.textContent = `Medium accuracy: ${Math.round(currentAccuracy)}m`;
        accuracyStatus.style.color = '#ffaa00';
    } else {
        gpsButton.classList.remove('warning', 'caution');
        accuracyStatus.textContent = `High accuracy: ${Math.round(currentAccuracy)}m`;
        accuracyStatus.style.color = '#44aa44';
    }
    
    // Update marker with improved styling
    if (!userMarker) {
        userMarker = L.marker(userLocation, {
            icon: L.divIcon({
                className: 'user-location-marker',
                html: `
                    <div class="user-location-icon">
                        <i class="fas fa-user"></i>
                        <div class="accuracy-circle" style="width: ${Math.min(currentAccuracy * 2, 100)}px; height: ${Math.min(currentAccuracy * 2, 100)}px;"></div>
                        <div class="accuracy-text">${Math.round(currentAccuracy)}m</div>
                    </div>
                `,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            })
        }).addTo(map);
    } else {
        // Smoothly update marker position
        const currentLatLng = userMarker.getLatLng();
        const newLatLng = L.latLng(userLocation);
        const distance = currentLatLng.distanceTo(newLatLng);
        
        // Only update if movement is significant or accuracy is good
        if (distance > currentAccuracy || currentAccuracy < MIN_ACCURACY_THRESHOLD) {
            userMarker.setLatLng(userLocation);
            const icon = userMarker.getIcon();
            icon.options.html = `
                <div class="user-location-icon">
                    <i class="fas fa-user"></i>
                    <div class="accuracy-circle" style="width: ${Math.min(currentAccuracy * 2, 100)}px; height: ${Math.min(currentAccuracy * 2, 100)}px;"></div>
                    <div class="accuracy-text">${Math.round(currentAccuracy)}m</div>
                </div>
            `;
            userMarker.setIcon(icon);
        }
    }
    
    // Center map if accuracy is good enough
    if (currentAccuracy < MIN_ACCURACY_THRESHOLD) {
        map.setView(userLocation, 19, {
            animate: true,
            duration: 1
        });
    }
}

// Function to start GPS tracking with improved settings
function startGPSTracking() {
    console.log('Starting GPS tracking with high accuracy settings...');
    if (!isTracking) {
        if (navigator.geolocation) {
            console.log('Geolocation API is available');
            const gpsButton = document.getElementById('gpsTrackBtn');
            if (!gpsButton) {
                console.error('GPS button not found in DOM');
                return;
            }
            console.log('GPS button found, adding loading state');
            gpsButton.classList.add('loading');
            gpsButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            gpsButton.title = 'Getting high accuracy location...';
            
            // Show initial status
            const statusDiv = showGPSStatus('Getting GPS signal... This may take a moment.', 'loading');
            
            // Clear position history
            positionHistory = [];
            
            // Set timeout for initial position
            gpsTimeoutId = setTimeout(() => {
                if (isTracking) return; // Don't show timeout if we got a position
                showGPSStatus('GPS signal taking longer than usual. Try moving to an open area.', 'warning');
                gpsButton.classList.remove('loading');
                gpsButton.innerHTML = '<i class="fas fa-location-arrow"></i>';
                gpsButton.title = 'GPS signal weak - Click to try again';
            }, INITIAL_TIMEOUT);
            
            // Get initial position with high accuracy settings
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    clearTimeout(gpsTimeoutId);
                    console.log('Initial high accuracy position received:', position);
                    statusDiv.remove();
                    updateUserLocation(position);
                    gpsButton.classList.remove('loading');
                    gpsButton.innerHTML = '<i class="fas fa-location-arrow"></i>';
                    
                    // Start watching position with improved settings
                    watchId = navigator.geolocation.watchPosition(
                        (position) => {
                            console.log('Position update received:', position);
                            updateUserLocation(position);
                        },
                        (error) => {
                            console.error('Watch position error:', error);
                            handleGPSError(error);
                        },
                        {
                            enableHighAccuracy: true, // Request highest accuracy
                            timeout: WATCH_TIMEOUT, // Longer timeout for subsequent updates
                            maximumAge: 5000, // Allow slightly older positions (5 seconds)
                            desiredAccuracy: 10 // Request 10m accuracy if possible
                        }
                    );
                    
                    isTracking = true;
                    gpsButton.classList.add('active');
                    gpsButton.title = 'GPS Tracking Active - High Accuracy Mode';
                },
                (error) => {
                    clearTimeout(gpsTimeoutId);
                    console.error('Initial position error:', error);
                    statusDiv.remove();
                    handleGPSError(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: INITIAL_TIMEOUT, // Longer timeout for initial fix
                    maximumAge: 0, // Don't use cached positions for initial fix
                    desiredAccuracy: 10
                }
            );
        } else {
            console.error('Geolocation is not supported');
            alert('Geolocation is not supported by your browser. Please try using a different browser or device.');
        }
    } else {
        console.log('GPS tracking already active');
    }
}

// Improved GPS error handling
function handleGPSError(error) {
    const gpsButton = document.getElementById('gpsTrackBtn');
    gpsButton.classList.remove('loading');
    gpsButton.classList.add('error');
    gpsButton.innerHTML = '<i class="fas fa-location-arrow"></i>';
    
    let errorMessage = 'Unable to get your location. ';
    let detailedMessage = '';
    let type = 'error';
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorMessage += 'Location access denied.';
            detailedMessage = 'Please enable location services in your browser settings and try again.';
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information unavailable.';
            detailedMessage = 'Try moving to an area with better GPS signal or wait a few moments before trying again.';
            type = 'warning';
            break;
        case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            detailedMessage = 'Please check your GPS signal and try again. Try moving to an open area.';
            type = 'warning';
            break;
        default:
            errorMessage += 'An unknown error occurred.';
            detailedMessage = 'Please try again or restart your device.';
    }
    
    console.error('GPS Error:', error);
    
    // Show more detailed error message
    showGPSStatus(`${errorMessage} ${detailedMessage}`, type);
    
    if (isTracking) {
        stopGPSTracking();
    }
    
    // Remove error class after 3 seconds
    setTimeout(() => {
        gpsButton.classList.remove('error');
    }, 3000);
}

// Function to stop GPS tracking
function stopGPSTracking() {
    console.log('Stopping GPS tracking...');
    if (isTracking && watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        isTracking = false;
        
        // Clear position history
        positionHistory = [];
        
        // Clear any existing GPS status messages
        const existingStatus = document.querySelector('.gps-status');
        if (existingStatus) {
            existingStatus.remove();
        }
        
        // Clear any accuracy status
        const accuracyStatus = document.querySelector('.accuracy-status');
        if (accuracyStatus) {
            accuracyStatus.remove();
        }
        
        // Reset GPS button state
        const gpsButton = document.getElementById('gpsTrackBtn');
        gpsButton.classList.remove('active', 'loading', 'warning', 'caution', 'error');
        gpsButton.innerHTML = '<i class="fas fa-location-arrow"></i>';
        gpsButton.title = 'Start GPS Tracking';
        
        // Remove the user marker
        if (userMarker) {
            map.removeLayer(userMarker);
            userMarker = null;
        }
        
        // Show status message
        showGPSStatus('GPS tracking stopped', 'info');
    }
}

// Add event listener for GPS tracking button with logging
document.getElementById('gpsTrackBtn').addEventListener('click', () => {
    console.log('GPS button clicked, current tracking state:', isTracking);
    
    if (!isTracking) {
        startGPSTracking();
    } else {
        stopGPSTracking();
    }
});

// Add CSS for user location marker
const style = document.createElement('style');
style.textContent = `
    .user-location-marker {
        background: transparent;
        border: none;
    }
    .user-location-icon {
        position: relative;
        background-color: #4CAF50;
        color: white;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
    }
    .user-location-icon i {
        font-size: 16px;
        z-index: 2;
    }
    .accuracy-circle {
        position: absolute;
        border: 2px solid #4CAF50;
        border-radius: 50%;
        background-color: rgba(76, 175, 80, 0.2);
        transform: translate(-50%, -50%);
        z-index: 1;
        transition: all 0.3s ease;
    }
    .accuracy-text {
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 2px 6px;
        border-radius: 10px;
        font-size: 10px;
        white-space: nowrap;
    }
    .map-control-button.active {
        background-color: #4CAF50 !important;
        color: white;
    }
    .map-control-button.loading {
        background-color: #FFA500 !important;
        color: white;
    }
    .map-control-button.error {
        background-color: #FF0000 !important;
        color: white;
    }
    .map-control-button.warning {
        background-color: #FFA500 !important;
        color: white;
    }
    .map-control-button[title] {
        position: relative;
    }
    .map-control-button[title]:hover::after {
        content: attr(title);
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        z-index: 1000;
    }
`;
document.head.appendChild(style);

// Routing Variables
let routingControl = null;
let currentRoute = null;

// Function to populate location dropdowns
function populateLocationDropdowns() {
    const fromSelect = document.getElementById('from-location');
    const toSelect = document.getElementById('to-location');
    
    // Clear existing options except the first one
    while (fromSelect.options.length > 1) fromSelect.remove(1);
    while (toSelect.options.length > 1) toSelect.remove(1);
    
    // Add all locations to both dropdowns
    locations.forEach(location => {
        const option = new Option(location.name, JSON.stringify(location.coordinates));
        fromSelect.add(option.cloneNode(true));
        toSelect.add(option);
    });
}

// Function to create route
function createRoute(fromCoords, toCoords, mode) {
    // Remove existing route if any
    if (routingControl) {
        map.removeControl(routingControl);
    }
    
    // Create new route
    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(fromCoords[0], fromCoords[1]),
            L.latLng(toCoords[0], toCoords[1])
        ],
        routeWhileDragging: true,
        showAlternatives: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        show: true,
        lineOptions: {
            styles: [
                {
                    color: '#3388ff',
                    opacity: 0.8,
                    weight: 5
                }
            ]
        },
        createMarker: function(i, waypoint, n) {
            return L.marker(waypoint.latLng, {
                icon: L.divIcon({
                    className: 'route-marker',
                    html: `<div class="route-marker-icon">${i === 0 ? 'A' : 'B'}</div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                })
            });
        }
    }).addTo(map);
    
    // Store current route
    currentRoute = {
        from: fromCoords,
        to: toCoords,
        mode: mode
    };
    
    // Add route instructions
    routingControl.on('routesfound', function(e) {
        const routes = e.routes;
        const instructions = document.getElementById('route-instructions');
        instructions.innerHTML = '';
        
        if (routes && routes[0]) {
            const route = routes[0];
            const steps = route.instructions;
            
            const instructionsList = document.createElement('ol');
            steps.forEach(step => {
                const li = document.createElement('li');
                li.innerHTML = step.text;
                instructionsList.appendChild(li);
            });
            
            instructions.appendChild(instructionsList);
            
            // Add summary
            const summary = document.createElement('div');
            summary.className = 'route-summary';
            summary.innerHTML = `
                <p><strong>Total Distance:</strong> ${(route.summary.totalDistance / 1000).toFixed(2)} km</p>
                <p><strong>Estimated Time:</strong> ${Math.round(route.summary.totalTime / 60)} minutes</p>
            `;
            instructions.insertBefore(summary, instructionsList);
        }
    });
}

// Function to clear route
function clearRoute() {
    if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
    }
    currentRoute = null;
    document.getElementById('route-instructions').innerHTML = '';
    document.getElementById('from-location').value = '';
    document.getElementById('to-location').value = '';
}

// Add event listeners for routing
document.getElementById('route-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const fromSelect = document.getElementById('from-location');
    const toSelect = document.getElementById('to-location');
    const modeSelect = document.getElementById('route-mode');
    
    const fromCoords = JSON.parse(fromSelect.value);
    const toCoords = JSON.parse(toSelect.value);
    const mode = modeSelect.value;
    
    if (fromCoords && toCoords) {
        createRoute(fromCoords, toCoords, mode);
    }
});

document.getElementById('clear-route').addEventListener('click', clearRoute);

// Add CSS for routing
const routingStyle = document.createElement('style');
routingStyle.textContent = `
    .route-marker {
        background: transparent;
        border: none;
    }
    .route-marker-icon {
        background-color: #3388ff;
        color: white;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
    }
    .route-instructions {
        margin-top: 20px;
        max-height: 300px;
        overflow-y: auto;
        padding: 10px;
        background: #f5f5f5;
        border-radius: 4px;
    }
    .route-summary {
        margin-bottom: 15px;
        padding: 10px;
        background: #e3f2fd;
        border-radius: 4px;
    }
    .route-instructions ol {
        padding-left: 20px;
    }
    .route-instructions li {
        margin: 5px 0;
        padding: 5px;
        border-bottom: 1px solid #ddd;
    }
    .location-select, .route-mode-select {
        width: 100%;
        padding: 8px;
        margin: 5px 0;
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    .clear-route-button {
        background-color: #f44336;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 10px;
    }
    .clear-route-button:hover {
        background-color: #d32f2f;
    }
`;
document.head.appendChild(routingStyle);

// Initialize location dropdowns
populateLocationDropdowns();

// Theme and User Preferences Management
