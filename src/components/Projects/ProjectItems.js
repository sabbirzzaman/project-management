import React from 'react';
import { useDrop } from 'react-dnd';
import { BACKLOG, BLOCKED, DOING, DONE, READY, REVIEW } from '../../data/types';
import {
    useEditProjectMutation,
    useGetProjectsQuery,
} from '../../features/projects/projectsApi';
import ProjectCard from './ProjectCard';
import ProjectCards from './ProjectCards';
import ProjectsHead from './ProjectsHead';
import ProjectStatus from './ProjectStatus';

const ProjectItems = () => {
    const { data: projects } = useGetProjectsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const [editProject, { isSuccess }] = useEditProjectMutation();

    const filterByStatus = (status) => (project) => project.status === status;

    const [{ isOver: isBacklogOver }, moveFromBacklogRef] = useDrop({
        accept: [BACKLOG, READY, DOING, REVIEW, BLOCKED, DONE],
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
        drop: (item) => {
            const { id } = item || {};
            editProject({ id, data: { status: 'backlog' } });
        },
    });

    const [{ isOver: isReadyOver }, moveFromReadyRef] = useDrop({
        accept: [BACKLOG, READY, DOING, REVIEW, BLOCKED, DONE],
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
        drop: (item) => {
            const { id } = item || {};
            editProject({ id, data: { status: 'ready' } });
        },
    });

    const [{ isOver: isDoingOver }, moveFromDoingRef] = useDrop({
        accept: [BACKLOG, READY, DOING, REVIEW, BLOCKED, DONE],
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
        drop: (item) => {
            const { id } = item || {};
            editProject({ id, data: { status: 'doing' } });
        },
    });

    const [{ isOver: isReviewOver }, moveFromReviewRef] = useDrop({
        accept: [BACKLOG, READY, DOING, REVIEW, BLOCKED, DONE],
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
        drop: (item) => {
            const { id } = item || {};
            editProject({ id, data: { status: 'review' } });
        },
    });

    const [{ isOver: isBlockedOver }, moveFromBlockedRef] = useDrop({
        accept: [BACKLOG, READY, DOING, REVIEW, BLOCKED, DONE],
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
        drop: (item) => {
            const { id } = item || {};
            editProject({ id, data: { status: 'blocked' } });
        },
    });

    const [{ isOver: isDoneOver }, moveFromDoneRef] = useDrop({
        accept: [BACKLOG, READY, DOING, REVIEW, BLOCKED, DONE],
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
        drop: (item) => {
            const { id } = item || {};
            editProject({ id, data: { status: 'done' } });
        },
    });

    return (
        <>
            <ProjectsHead />

            <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus title="Backlog" item={projects?.filter(filterByStatus('backlog')).length} addBtn={true} />

                    <ProjectCards
                        isOver={isBacklogOver}
                        reference={moveFromBacklogRef}
                    >
                        {projects?.length > 0 &&
                            projects
                                .filter(filterByStatus('backlog'))
                                .map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        type={BACKLOG}
                                        index={project.id}
                                    />
                                ))}
                    </ProjectCards>
                </div>

                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus title="Ready" item={projects?.filter(filterByStatus('ready')).length} addBtn={false} />

                    <ProjectCards
                        isOver={isReadyOver}
                        reference={moveFromReadyRef}
                    >
                        {projects?.length > 0 &&
                            projects
                                .filter(filterByStatus('ready'))
                                .map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        type={READY}
                                        index={project.id}
                                    />
                                ))}
                    </ProjectCards>
                </div>

                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus title="Doing" item={projects?.filter(filterByStatus('doing')).length} addBtn={false} />

                    <ProjectCards
                        isOver={isDoingOver}
                        reference={moveFromDoingRef}
                    >
                        {projects?.length > 0 &&
                            projects
                                .filter(filterByStatus('doing'))
                                .map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        type={DOING}
                                        index={project.id}
                                    />
                                ))}
                    </ProjectCards>
                </div>

                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus
                        title="Review"
                        item={projects?.filter(filterByStatus('review')).length}
                        addBtn={false}
                    />

                    <ProjectCards
                        isOver={isReviewOver}
                        reference={moveFromReviewRef}
                    >
                        {projects?.length > 0 &&
                            projects
                                .filter(filterByStatus('review'))
                                .map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        type={REVIEW}
                                        index={project.id}
                                    />
                                ))}
                    </ProjectCards>
                </div>

                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus title="Blocked" item={projects?.filter(filterByStatus('blocked')).length} addBtn={false} />

                    <ProjectCards
                        isOver={isBlockedOver}
                        reference={moveFromBlockedRef}
                    >
                        {projects?.length > 0 &&
                            projects
                                .filter(filterByStatus('blocked'))
                                .map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        type={BLOCKED}
                                        index={project.id}
                                    />
                                ))}
                    </ProjectCards>
                </div>

                <div className="flex flex-col flex-shrink-0 w-72">
                    <ProjectStatus title="Done" item={projects?.filter(filterByStatus('done')).length} addBtn={false} />

                    <ProjectCards
                        isOver={isDoneOver}
                        reference={moveFromDoneRef}
                    >
                        {projects?.length > 0 &&
                            projects
                                .filter(filterByStatus('done'))
                                .map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        project={project}
                                        type={DONE}
                                        index={project.id}
                                    />
                                ))}
                    </ProjectCards>
                </div>

                <div className="flex-shrink-0 w-6"></div>
            </div>
        </>
    );
};

export default ProjectItems;
