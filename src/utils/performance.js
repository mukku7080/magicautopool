// Performance utility functions for development
export const measurePerformance = (name, fn) => {
    if (process.env.NODE_ENV !== 'development') return fn();

    const start = performance.now();
    const result = fn();
    const end = performance.now();

    console.log(`⚡ ${name}: ${(end - start).toFixed(2)}ms`);
    return result;
};

export const logRenderCount = (componentName) => {
    if (process.env.NODE_ENV !== 'development') return;

    const renderCount = React.useRef(0);
    renderCount.current += 1;

    console.log(`🔄 ${componentName} rendered ${renderCount.current} times`);
};