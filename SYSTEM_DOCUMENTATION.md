# CHAPTER 3: SYSTEM ANALYSIS AND DESIGN

## 3.1 SYSTEMS ANALYSIS AND DESIGN METHODOLOGY

The project follows the Scrum Framework, an agile methodology that promotes iterative development, collaboration, and flexibility. The key steps of the Scrum Framework applied in this project include:

- **Sprint Planning:** Defining the scope and goals for each development sprint.
- **Daily Stand-ups:** Regular team meetings to discuss progress and obstacles.
- **Sprint Reviews:** Demonstrating completed features and gathering feedback.
- **Sprint Retrospectives:** Reflecting on the sprint to improve processes.
- **Backlog Grooming:** Prioritizing and refining the list of project tasks.

This methodology ensures continuous delivery of functional components and adaptability to changing requirements.

## 3.2 SYSTEM ANALYSIS

### 3.2.1 Requirements Elicitation

The requirements were gathered through stakeholder interviews, user surveys, and analysis of existing campus navigation challenges. Key requirements include:

- Interactive map visualization of the Chiromo Campus.
- Categorized layers for different campus facilities.
- Search functionality for quick location lookup.
- Route directions with walking and driving modes.
- Indoor navigation with floor plans and room details.
- GPS tracking for user location.
- Responsive and accessible user interface.

## 3.3 SYSTEM DESIGN

### 3.3.1 Architectural Design

The system is designed as a client-side web application using a modular architecture:

- **Presentation Layer:** HTML, CSS, and JavaScript provide the user interface and map interaction.
- **Data Layer:** Location data and GeoJSON boundaries are stored in JavaScript modules.
- **Logic Layer:** Map initialization, layer management, routing, search, and indoor navigation logic are implemented in JavaScript.

![System Architecture Diagram](images/system_architecture_diagram.png)

### 3.3.2 Processes Design

The main processes include:

- Map initialization and base layer setup.
- Loading and rendering location markers by category.
- Handling user interactions such as layer toggling, search, and routing.
- Indoor navigation with floor plan rendering and room search.
- GPS tracking and user location updates.

### 3.3.3 Database Design

The system uses static data files (JavaScript modules and GeoJSON) to represent campus locations and boundaries. No dynamic database is used in this version.

### 3.3.4 Use Case Diagram

The primary use cases involve:

- Viewing the campus map.
- Searching for locations.
- Getting route directions.
- Viewing indoor navigation.
- Tracking user location.

![Use Case Diagram](images/use_case_diagram.png)

### 3.3.5 Application Design

The application is designed with a responsive layout featuring:

- A sidebar for navigation and controls.
- A main map area for interactive exploration.
- Modular JavaScript code for maintainability.
- Integration with external libraries (Leaflet.js, Leaflet Routing Machine).

### 3.3.6 Integration Design

The system integrates:

- Leaflet.js for map rendering.
- Leaflet Routing Machine for routing.
- Font Awesome for icons.
- External tile providers (OpenStreetMap, Google Satellite).

### 3.3.7 Technology Design

Technologies used:

- HTML5, CSS3, JavaScript (ES6 Modules)
- Leaflet.js and related plugins
- GeoJSON for spatial data
- Font Awesome for UI icons

# CHAPTER 4: SYSTEM IMPLEMENTATION

## 4.1 Introduction

This chapter details the implementation of the interactive campus map system, covering the development environment, modules, and key features.

## 4.2 Development Environment

- Code editor: Visual Studio Code
- Web browser: Google Chrome, Firefox
- Libraries: Leaflet.js, Leaflet Routing Machine, Font Awesome
- Version control: Git (optional)

## 4.3 System Modules Implementation

### 4.3.1 User Interface (UI) Development

- HTML structure with header, sidebar, and map container.
- CSS for layout, responsiveness, and styling.
- Sidebar with categorized checkboxes and search input.
- Map control buttons for zoom, fullscreen, print, share, and GPS tracking.

### 4.3.2 Backend Development

- The system is primarily client-side; no backend server is implemented.
- Static data files serve as the data source.

### 4.3.3 Database Implementation

- Location and boundary data are stored in JavaScript modules and GeoJSON files.
- Data is loaded and parsed directly in the frontend.

### 4.3.4 Navigation and Routing System

- Leaflet Routing Machine is used to calculate and display routes.
- Users can select start and end points and choose walking or driving mode.
- Route instructions and summaries are displayed.

### 4.3.5 Security Measures

- As a client-side application, security concerns are minimal.
- Data is static and does not involve user authentication or sensitive information.

## 4.4 Maintenance and Future Enhancements

- Modular codebase allows easy updates and feature additions.
- Future enhancements may include:
  - Real-time location updates.
  - Integration with campus event systems.
  - User authentication for personalized features.
  - Backend API for dynamic data management.

# CHAPTER 5: CONCLUSION AND RECOMMENDATION

## 5.1 Summary of Achievements

- Developed a fully functional interactive campus map.
- Implemented categorized location layers and search functionality.
- Integrated routing and indoor navigation features.
- Provided GPS tracking and user-friendly controls.

## 5.2 Conclusion

The project successfully delivers a comprehensive digital mapping solution for the University of Nairobi Chiromo Campus, enhancing navigation and accessibility for users.

## 5.3 Recommendations for Future Work

- Expand data coverage to include more campus facilities.
- Implement backend services for dynamic updates.
- Enhance indoor navigation with 3D visualization.
- Add mobile app versions for offline access.

---

Prepared by: [Your Name]  
Date: [Date]
