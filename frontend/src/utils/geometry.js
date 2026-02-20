export const calculateArea = (type, dimensionData) => {
    try {
        const data = typeof dimensionData === 'string' ? JSON.parse(dimensionData) : dimensionData;
        if (!data) return 0;

        switch (type) {
            case 'RECTANGLE':
                return (data.width || 0) * (data.height || 0);
            case 'CIRCLE':
                return Math.PI * Math.pow(data.radius || 0, 2);
            case 'TRIANGLE':
                return 0.5 * (data.base || 0) * (data.height || 0);
            default:
                return 0;
        }
    } catch (e) {
        return 0;
    }
};

export const parseDimensionData = (dimensionData) => {
    try {
        return typeof dimensionData === 'string' ? JSON.parse(dimensionData) : dimensionData;
    } catch (e) {
        return {};
    }
};
