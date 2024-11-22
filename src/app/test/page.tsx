import React from "react";
import Templates from "@/templates/templates";

const App: React.FC = () => {
    const resumeData2 = {
        name: "Omkar",
        surname: "Apandkar",
        email: "john.doe@example.com",
        phone: "1234567890",
        area_objective: "To innovate and inspire.",
        address: "even Hills near me",
        landmark: "Near church", twitter_link: "www.google.com", pinterest_link: "omkar.com", linkedin_link: "ravan.com", position: "Front end developer", logo_text: "OM",

        map_experience: [
            { job_title: "Engineer", job_location: "XYZ Corp", job_period: "2020-2023", job_position: "Senior Developer", job_description: "Built innovative solutions." },
            { job_title: "Engineer", job_location: "XYZ Corp", job_period: "2020-2023", job_position: "Senior Developer", job_description: "Built innovative solutions." },
            { job_title: "Engineer", job_location: "XYZ Corp", job_period: "2020-2023", job_position: "Senior Developer", job_description: "Built innovative solutions." },
        ],
        map_education: [
            { edu_institute: "ABC University", edu_period: "2015-2019", edu_major: "Engineering", edu_description: "Graduated with honors." },
        ],
        map_skills: [
            { skill_head: "JavaScript" },
            { skill_head: "JavaScript" },
            { skill_head: "JavaScript" },
        ]
    };


    return (
        <div>
            {/* <Templates name="resume_templates_01" data={resumeData} /> */}
            <Templates name="mordern_template_01" data={resumeData2} />
        </div>
    );
};

export default App;
