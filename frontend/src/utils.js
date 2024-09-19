export const getImageUrl = (path) => {
    return new URL(`/assets/${path}`, import.meta.url).href;
};

export const getCssVariableValue = (variableName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
};

// Function to get image URL based on the CSS variable value
export const getImageUrlFromCssVar = (variableName) => {
    const cssValue = getCssVariableValue(variableName);
    // Assuming the CSS variable value is just the image filename
    return getImageUrl(cssValue);
};