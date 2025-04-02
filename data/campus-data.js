const campusData = {
    center: [-1.2725913419167534, 36.80674683855068], // New area center coordinates
    defaultZoom: 19,
    buildings: [
        // Academic Buildings
        {
            id: "biological-sciences",
            name: "School of Biological Sciences",
            category: "academic",
            coordinates: [-1.2742193110747744, 36.80488389938779]
        },
        {
            id: "biotechnology-center",
            name: "Centre of Biotechnology & Bioinformatics",
            category: "academic",
            coordinates: [-1.27437085874956, 36.80633538994383]
        },
        {
            id: "meteorology",
            name: "Meteorology Department",
            category: "academic",
            coordinates: [-1.274037485332282, 36.80747821926568]
        },
        {
            id: "wvlc",
            name: "WVLC",
            category: "academic",
            coordinates: [-1.2739959913706682, 36.80728600657474]
        },
        {
            id: "mathematics",
            name: "Department of Mathematics",
            category: "academic",
            coordinates: [-1.2740328626315027, 36.807285336022424]
        },
        {
            id: "physics",
            name: "Physics Department",
            category: "academic",
            coordinates: [-1.273981919976295, 36.80761669940304]
        },
        {
            id: "earth-climate-sciences",
            name: "Department of Earth and Climate Sciences",
            category: "academic",
            coordinates: [-1.2740042755212644, 36.80777859693993]
        },
        {
            id: "physical-sciences",
            name: "School Of Physical Sciences",
            category: "academic",
            coordinates: [-1.2739058672545602, 36.807836955089]
        },
        {
            id: "anthropology",
            name: "Institute Of Anthropology Gender & African Studies",
            category: "academic",
            coordinates: [-1.2735217153932856, 36.80826765546646]
        },
        {
            id: "chemistry",
            name: "UoN Chemistry Department",
            category: "academic",
            coordinates: [-1.2736138010404783, 36.80719448912616]
        },
        {
            id: "computing-informatics",
            name: "Department Of Computing And Informatics",
            category: "academic",
            coordinates: [-1.2732797570017065, 36.80722862391381]
        },
        {
            id: "veterinary-anatomy",
            name: "The Department of Veterinary Anatomy & Physiology",
            category: "academic",
            coordinates: [-1.2734035447434908, 36.80514817523126]
        },
        {
            id: "histology-lab",
            name: "Histology Lab",
            category: "academic",
            coordinates: [-1.273278607722852, 36.80526942012922]
        },
        {
            id: "science-labs",
            name: "Science and Physics Labs",
            category: "academic",
            coordinates: [-1.2725297090036365, 36.80728068220003]
        },
        {
            id: "anatomy-lab",
            name: "Human Anatomy Laboratory",
            category: "academic",
            coordinates: [-1.273546476986041, 36.80449513228859]
        },
        {
            id: "surgical-center",
            name: "Nairobi Surgical skills Center",
            category: "academic",
            coordinates: [-1.2733474112424892, 36.804555682840515]
        },
        // Administrative Buildings
        {
            id: "principal-office",
            name: "Principal CBPS, Office Registry",
            category: "administrative",
            coordinates: [-1.2735767397131057, 36.80622446707656]
        },
        {
            id: "procurement",
            name: "Procurement Offices",
            category: "administrative",
            coordinates: [-1.273390562295407, 36.8060789761208]
        },
        {
            id: "internal-auditor",
            name: "Internal Auditor",
            category: "administrative",
            coordinates: [-1.2737304483056333, 36.80560148491081]
        },
        {
            id: "college-registrar",
            name: "College Registrar",
            category: "administrative",
            coordinates: [-1.273715029414767, 36.80566506361562]
        },
        {
            id: "examination-centre",
            name: "Central Examination Centre",
            category: "academic",
            coordinates: [-1.2727476614174336, 36.80693329529327]
        },
        {
            id: "ict-centre",
            name: "Information Communication and Technology Centre",
            category: "academic",
            coordinates: [-1.273325227460182, 36.80710905886333]
        },
        // Amenities
        {
            id: "onuss-cyber",
            name: "ONUSS Cyber Cafe",
            category: "services",
            coordinates: [-1.2744735717086986, 36.80618853555939]
        },
        {
            id: "swa-cafe",
            name: "SWA Cafe",
            category: "services",
            coordinates: [-1.2743270249612806, 36.806811787429965]
        },
        {
            id: "noor-photocopy",
            name: "Noor Photocopy",
            category: "services",
            coordinates: [-1.2742785069077645, 36.8067142926863]
        },
        {
            id: "jirani-shop",
            name: "JIRANI SHOP",
            category: "services",
            coordinates: [-1.2742356021772423, 36.80661773316482]
        },
        {
            id: "connect-coffee",
            name: "Connect Coffee Roasters",
            category: "services",
            coordinates: [-1.2720615204130352, 36.80653911081883]
        },
        {
            id: "arziki-restaurant",
            name: "Arziki Restaurant",
            category: "services",
            coordinates: [-1.2738343582211586, 36.80458891316757]
        },
        {
            id: "campus-club",
            name: "Chiromo Campus Club",
            category: "services",
            coordinates: [-1.2725349370157766, 36.80538570864013]
        },
        // Residences
        {
            id: "qejani-residences",
            name: "Qejani Student Residences",
            category: "accommodation",
            coordinates: [-1.2728220743524865, 36.80446077625548]
        },
        {
            id: "qwetu-residences",
            name: "Qwetu Student Residences",
            category: "accommodation",
            coordinates: [-1.2725143667916434, 36.80413529863516]
        },
        {
            id: "hostel-block-c",
            name: "Chiromo Hostel Block C",
            category: "accommodation",
            coordinates: [-1.2720429531122341, 36.803963446100845]
        },
        {
            id: "hostel-block-a",
            name: "Chiromo Hostel Block A",
            category: "accommodation",
            coordinates: [-1.271928113397054, 36.80384449659013]
        },
        // Parking Areas
        {
            id: "main-parking",
            name: "Parking Lot",
            category: "parking",
            coordinates: [-1.274445080284061, 36.80566102265286]
        },
        {
            id: "staff-parking",
            name: "Staff Parking Lot",
            category: "parking",
            coordinates: [-1.2741581548943244, 36.80748492478801]
        },
        {
            id: "chemistry-parking",
            name: "Chemistry Department Parking",
            category: "parking",
            coordinates: [-1.273639275731239, 36.806726443655236]
        },
        {
            id: "general-parking",
            name: "Parking Space",
            category: "parking",
            coordinates: [-1.2728938057372063, 36.80682734804052]
        },
        {
            id: "cbps-parking",
            name: "College of Biological and Physical Sciences Parking Lot",
            category: "parking",
            coordinates: [-1.2729290010431216, 36.80585682897246]
        },
        {
            id: "chs-parking",
            name: "CHS Parking",
            category: "parking",
            coordinates: [-1.2736540242351453, 36.80584343050972]
        },
        {
            id: "hostel-parking",
            name: "Chiromo Hostels Parking Lot",
            category: "parking",
            coordinates: [-1.2717715780203087, 36.803717856931236]
        },
        // Lecture Theaters and Halls
        {
            id: "lecture-theaters",
            name: "PRG4+CQ8 Lecture Theaters SWS & LLT",
            category: "lecture-halls",
            coordinates: [-1.273938672007614, 36.80708036550365]
        },
        {
            id: "millennium-hall-1",
            name: "Millenium Hall 1",
            category: "lecture-halls",
            coordinates: [-1.2729943637536054, 36.807757437238905]
        },
        {
            id: "millennium-hall-2",
            name: "Millenium Hall 2",
            category: "lecture-halls",
            coordinates: [-1.2724343335600141, 36.807741366829504]
        },
        // Other Facilities
        {
            id: "zhongding-construction",
            name: "Zhongding International Construction",
            category: "other",
            coordinates: [-1.2744300142316924, 36.80680816999885]
        },
        {
            id: "niti-distribution",
            name: "Niti Distribution Ltd",
            category: "other",
            coordinates: [-1.2737571874450544, 36.8082886597206]
        },
        {
            id: "busta-refrigeration",
            name: "Busta Refrigeration",
            category: "other",
            coordinates: [-1.2739056390313528, 36.80857572208929]
        },
        {
            id: "phoebe-art",
            name: "Phoebe's Art Cave Gallery",
            category: "other",
            coordinates: [-1.2732923551224657, 36.807615779059155]
        },
        {
            id: "healthit-office",
            name: "HealthIT Corporate Office",
            category: "other",
            coordinates: [-1.2730745506078454, 36.807005723219405]
        },
        {
            id: "eco-smart",
            name: "Eco Smart Consultants",
            category: "other",
            coordinates: [-1.273531890676429, 36.806281372727085]
        },
        {
            id: "jevanjee-gardens",
            name: "Chiromo Campus Jevanjee Gardens",
            category: "recreation",
            coordinates: [-1.2737686603397513, 36.805176607568775]
        }
    ],
    categories: {
        academic: {
            color: "#00458E",
            icon: "building"
        },
        library: {
            color: "#0077BE",
            icon: "book"
        },
        amenities: {
            color: "#003366",
            icon: "utensils"
        },
        administrative: {
            color: "#003366",
            icon: "building"
        },
        services: {
            color: "#003366",
            icon: "utensils"
        },
        accommodation: {
            color: "#003366",
            icon: "building"
        },
        parking: {
            color: "#003366",
            icon: "car"
        },
        lectureHalls: {
            color: "#003366",
            icon: "film"
        },
        other: {
            color: "#003366",
            icon: "building"
        },
        recreation: {
            color: "#003366",
            icon: "tree"
        }
    },
    paths: []
};

export default campusData; 