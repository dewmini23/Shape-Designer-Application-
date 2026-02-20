import React from 'react';
import ShapeCanvas from './ShapeCanvas';
import { calculateArea } from '../utils/geometry';

const ShapeEditor = ({
    formData,
    setFormData,
    onSave,
    onUpdate,
    onReset,
    isEditing,
    isLoading
}) => {

    const handleDimensionChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            dimensionData: {
                ...prev.dimensionData,
                [name]: value === '' ? '' : Number(value)
            }
        }));
    };

    const handleTypeChange = (e) => {
        const newType = e.target.value;
        let defaultDims = {};
        if (newType === 'RECTANGLE') defaultDims = { width: 100, height: 100 };
        else if (newType === 'CIRCLE') defaultDims = { radius: 50 };
        else if (newType === 'TRIANGLE') defaultDims = { base: 100, height: 80 };

        setFormData(prev => ({
            ...prev,
            type: newType,
            dimensionData: defaultDims
        }));
    };

    const isFormValid = () => {
        if (!formData.name.trim()) return false;
        const d = formData.dimensionData;
        if (formData.type === 'RECTANGLE') return d.width > 0 && d.height > 0;
        if (formData.type === 'CIRCLE') return d.radius > 0;
        if (formData.type === 'TRIANGLE') return d.base > 0 && d.height > 0;
        return false;
    };

    const area = calculateArea(formData.type, formData.dimensionData);

    return (
        <div className="card">
            <h2 className="card-title">{isEditing ? 'Edit Shape' : 'Design Shape'}</h2>

            <div className="dimension-grid">
                <div className="form-group">
                    <label>Shape Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter shape name"
                    />
                </div>

                <div className="form-group">
                    <label>Shape Type</label>
                    <select
                        className="form-control"
                        value={formData.type}
                        onChange={handleTypeChange}
                    >
                        <option value="RECTANGLE">Rectangle</option>
                        <option value="CIRCLE">Circle</option>
                        <option value="TRIANGLE">Triangle</option>
                    </select>
                </div>
            </div>

            {formData.type === 'RECTANGLE' && (
                <div className="dimension-grid">
                    <div className="form-group">
                        <label>Width</label>
                        <input type="number" name="width" className="form-control" value={formData.dimensionData.width} onChange={handleDimensionChange} min="1" />
                    </div>
                    <div className="form-group">
                        <label>Height</label>
                        <input type="number" name="height" className="form-control" value={formData.dimensionData.height} onChange={handleDimensionChange} min="1" />
                    </div>
                </div>
            )}

            {formData.type === 'CIRCLE' && (
                <div className="form-group">
                    <label>Radius</label>
                    <input type="number" name="radius" className="form-control" value={formData.dimensionData.radius} onChange={handleDimensionChange} min="1" />
                </div>
            )}

            {formData.type === 'TRIANGLE' && (
                <div className="dimension-grid">
                    <div className="form-group">
                        <label>Base</label>
                        <input type="number" name="base" className="form-control" value={formData.dimensionData.base} onChange={handleDimensionChange} min="1" />
                    </div>
                    <div className="form-group">
                        <label>Height</label>
                        <input type="number" name="height" className="form-control" value={formData.dimensionData.height} onChange={handleDimensionChange} min="1" />
                    </div>
                </div>
            )}

            <div className="canvas-container">
                <ShapeCanvas type={formData.type} dimensionData={formData.dimensionData} />
            </div>

            <div className="canvas-area-display">
                Calculated Area: {area.toFixed(2)}
            </div>

            <div className="actions">
                {isEditing ? (
                    <button className="btn btn-action" onClick={onUpdate} disabled={!isFormValid() || isLoading}>
                        {isLoading ? 'Updating...' : 'Update Shape'}
                    </button>
                ) : (
                    <button className="btn btn-primary" onClick={onSave} disabled={!isFormValid() || isLoading}>
                        {isLoading ? 'Saving...' : 'Save New Shape'}
                    </button>
                )}
                <button className="btn btn-secondary" onClick={onReset} disabled={isLoading}>
                    Reset
                </button>
            </div>
        </div>
    );
};

export default ShapeEditor;
