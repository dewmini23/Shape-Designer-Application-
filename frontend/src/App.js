import React, { useState, useEffect, useCallback } from 'react';
import './styles/app.css';
import ShapeEditor from './components/ShapeEditor';
import ShapeList from './components/ShapeList';
import { fetchShapesPaged, fetchShapeById, createShape, updateShape, deleteShape } from './api/shapesApi';
import { parseDimensionData } from './utils/geometry';

const DEFAULT_SHAPE = {
  name: '',
  type: 'RECTANGLE',
  dimensionData: { width: 100, height: 100 }
};

function App() {
  const [shapes, setShapes] = useState([]);
  const [formData, setFormData] = useState(DEFAULT_SHAPE);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);


  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);


  const [searchId, setSearchId] = useState('');

  const clearMessages = () => {
    setError(null);
    setSuccessMsg(null);
  };

  const loadShapes = useCallback(async (page = currentPage) => {
    setIsLoading(true);
    clearMessages();
    try {
      const data = await fetchShapesPaged(page, pageSize);
      setShapes(data.content);
      setCurrentPage(data.number);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      setError('Failed to load shapes from server. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pageSize]);

  useEffect(() => {
    loadShapes(currentPage);
  }, [loadShapes, currentPage]);

  const handleSaveNew = async () => {
    setIsLoading(true);
    clearMessages();
    try {
      await createShape({
        name: formData.name,
        type: formData.type,
        dimensionData: formData.dimensionData
      });
      setCurrentPage(0);
      await loadShapes(0);
      handleReset();
      setSuccessMsg('Shape successfully created!');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    setIsLoading(true);
    clearMessages();
    try {
      await updateShape(editingId, {
        name: formData.name,
        type: formData.type,
        dimensionData: formData.dimensionData
      });
      await loadShapes(currentPage);
      const updatedName = formData.name;
      handleReset();
      setSuccessMsg(`Shape '${updatedName}' successfully updated!`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this shape?')) return;
    setIsLoading(true);
    clearMessages();
    try {
      await deleteShape(id);
      if (isEditing && editingId === id) {
        handleReset();
      }
      if (shapes.length === 1 && currentPage > 0) {
        setCurrentPage(prev => prev - 1);
      } else {
        await loadShapes(currentPage);
      }
      setSuccessMsg('Shape successfully deleted.');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadShape = async (id) => {
    if (!id) return;
    setIsLoading(true);
    clearMessages();
    try {
      const shape = await fetchShapeById(id);
      setFormData({
        name: shape.name,
        type: shape.type,
        dimensionData: parseDimensionData(shape.dimensionData)
      });
      setIsEditing(true);
      setEditingId(shape.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setSearchId(''); 
    } catch (err) {
      setError(`Shape ID ${id} not found.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleLoadShape(searchId);
  };

  const handleReset = () => {
    setFormData(DEFAULT_SHAPE);
    setIsEditing(false);
    setEditingId(null);
    clearMessages();
  };

  return (
    <div className="app">
      <header className="app-header">
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>Shape Designer</h1>

          {/* Quick Search Bar */}
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '8px' }}>
            <input
              type="number"
              className="form-control"
              placeholder="Load Shape by ID..."
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={{ width: '180px', padding: '8px 12px', fontSize: '0.9rem' }}
            />
            <button
              type="submit"
              className="btn btn-action btn-small"
              disabled={isLoading || !searchId}
            >
              Search
            </button>
          </form>
        </div>
      </header>

      <div className="app-container">
        {error && <div className="error-message">{error}</div>}
        {successMsg && <div className="success-message">{successMsg}</div>}

        <div className="layout">
          <ShapeEditor
            formData={formData}
            setFormData={setFormData}
            onSave={handleSaveNew}
            onUpdate={handleUpdate}
            onReset={handleReset}
            isEditing={isEditing}
            isLoading={isLoading}
          />

          <ShapeList
            shapes={shapes}
            onLoadShape={handleLoadShape}
            onDeleteShape={handleDelete}
            isLoading={isLoading}
            onRefresh={() => loadShapes(currentPage)}
            activeId={editingId}
            currentPage={currentPage}
            totalPages={totalPages}
            totalElements={totalElements}
            onPrevPage={() => setCurrentPage(p => Math.max(0, p - 1))}
            onNextPage={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
