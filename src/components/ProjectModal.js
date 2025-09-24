import React, { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`${project.title} details`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close project details">×</button>
        <h3>{project.title}</h3>
        {project.longDescription ? (
          <p>{project.longDescription}</p>
        ) : (
          <p>{project.description}</p>
        )}
        {project.tags && (
          <div className="tag-list">
            {project.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        )}
        <div className="modal-links">
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noopener noreferrer">View Repo</a>
          )}
        </div>
      </div>
    </div>
  );
}
