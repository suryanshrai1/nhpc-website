import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }) {

    if (!projects.length) {

        return (

            <p>No projects found.</p>

        );

    }

    return (

        <div className="grid lg:grid-cols-2 gap-8">

            {projects.map((project, index) => (

                <ProjectCard

                    key={project.id}

                    project={project}

                    layout={index === 0 ? "large" : "normal"}

                />

            ))}

        </div>

    );

}