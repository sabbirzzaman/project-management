import React from 'react';
import ProjectCard from './ProjectCard';
import ProjectCards from './ProjectCards';
import ProjectsHead from './ProjectsHead';
import ProjectStatus from './ProjectStatus';

const ProjectItems = () => {
    return (
        <>
            <ProjectsHead />

            <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus title="Backlog" item={1} addBtn={true} />

                    <ProjectCards>
                        <ProjectCard />
                    </ProjectCards>
                </div>

                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus title="Ready" item={1} addBtn={false} />

                    <ProjectCards>
                        <ProjectCard />
                    </ProjectCards>
                </div>

                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus title="Doing" item={1} addBtn={false} />

                    <ProjectCards>
                        <ProjectCard />
                    </ProjectCards>
                </div>

                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus title="Review" item={1} addBtn={false} />

                    <ProjectCards>
                        <ProjectCard />
                    </ProjectCards>
                </div>

                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus title="Blocked" item={1} addBtn={false} />

                    <ProjectCards>
                        <ProjectCard />
                    </ProjectCards>
                </div>

                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus title="Done" item={1} addBtn={false} />

                    <ProjectCards>
                        <ProjectCard />
                    </ProjectCards>
                </div>

                <div className="flex-shrink-0 w-6"></div>
            </div>
        </>
    );
};

export default ProjectItems;
