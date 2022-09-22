import React from 'react';
import { useGetProjectsQuery } from '../../features/projects/projectsApi';
import ProjectCard from './ProjectCard';
import ProjectCards from './ProjectCards';
import ProjectsHead from './ProjectsHead';
import ProjectStatus from './ProjectStatus';

const ProjectItems = () => {
    const { data: projects, isLoading, isError } = useGetProjectsQuery();

    const backlogProjects = projects?.filter(
        (project) => project.status === 'backlog'
    );
    const readyProjects = projects?.filter(
        (project) => project.status === 'ready'
    );
    const doingProjects = projects?.filter(
        (project) => project.status === 'doing'
    );

    return (
        <>
            <ProjectsHead />

            <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus
                        title="Backlog"
                        item={backlogProjects?.length || 0}
                        addBtn={true}
                    />

                    <ProjectCards>
                        {!isLoading &&
                        !isError &&
                        backlogProjects?.length > 0 && (
                            backlogProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        )}
                    </ProjectCards>
                </div>

                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus
                        title="Ready"
                        item={readyProjects?.length || 0}
                        addBtn={false}
                    />

                    <ProjectCards>
                        {!isLoading && !isError && readyProjects?.length > 0 ? (
                            readyProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        ) : (
                            <p className="text-sm px-2 mt-4">
                                No Project Founded!
                            </p>
                        )}
                    </ProjectCards>
                </div>

                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus title="Doing" item={doingProjects?.length || 0} addBtn={false} />

                    <ProjectCards>
                        {!isLoading && !isError && doingProjects?.length > 0 ? (
                            doingProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))
                        ) : (
                            <p className="text-sm px-2 mt-4">
                                No Project Founded!
                            </p>
                        )}
                    </ProjectCards>
                </div>

                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus title="Review" item={1} addBtn={false} />

                    <ProjectCards>{/* <ProjectCard /> */}</ProjectCards>
                </div>

                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus title="Blocked" item={1} addBtn={false} />

                    <ProjectCards>{/* <ProjectCard /> */}</ProjectCards>
                </div>

                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus title="Done" item={1} addBtn={false} />

                    <ProjectCards>{/* <ProjectCard /> */}</ProjectCards>
                </div>

                <div className="flex-shrink-0 w-6"></div>
            </div>
        </>
    );
};

export default ProjectItems;
