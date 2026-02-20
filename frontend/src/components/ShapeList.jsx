import React from 'react';

const ShapeList = ({
    shapes,
    onLoadShape,
    onDeleteShape,
    isLoading,
    onRefresh,
    activeId,
    currentPage,
    totalPages,
    totalElements,
    onPrevPage,
    onNextPage
}) => {
    return (
        <div className="card">
            <div className="card-title">
                <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Saved Shapes</h2>
                <button className="btn btn-secondary btn-small" onClick={onRefresh} disabled={isLoading}>
                    Refresh
                </button>
            </div>

            {shapes.length === 0 ? (
                <div className="empty-state">No shapes saved yet.</div>
            ) : (
                <ul className="shape-list">
                    {shapes.map(shape => (
                        <li key={shape.id} className={`shape-item ${activeId === shape.id ? 'active' : ''}`}>
                            <div className="shape-info">
                                <h4>{shape.name}</h4>
                                <p>{shape.type.toLowerCase()}</p>
                            </div>
                            <div className="shape-actions">
                                <button
                                    className="btn btn-action btn-small"
                                    onClick={() => onLoadShape(shape.id)}
                                    disabled={isLoading}
                                >
                                    Load
                                </button>
                                <button
                                    className="btn btn-danger btn-small"
                                    onClick={() => onDeleteShape(shape.id)}
                                    disabled={isLoading}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                        className="btn btn-secondary btn-small"
                        onClick={onPrevPage}
                        disabled={isLoading || currentPage === 0}
                    >
                        Previous
                    </button>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        Page {currentPage + 1} of {totalPages} ({totalElements} total)
                    </span>
                    <button
                        className="btn btn-secondary btn-small"
                        onClick={onNextPage}
                        disabled={isLoading || currentPage >= totalPages - 1}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShapeList;
