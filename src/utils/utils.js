//------ Functions ------//

// Capitalize first letter
function title(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Convert hex to rgba
function hexToRgba(hex, opacity) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  } else {
    throw new Error("Invalid hex color format");
  }
}

function lightenColor(color, amount) {
  // Convert hex to RGB values
  const rgb = color
    .slice(1)
    .match(/.{2}/g)
    .map((hex) => parseInt(hex, 16));

  // Calculate lightness adjustment based on amount (0 to 100)
  const lightness = Math.min(100, Math.max(0, amount)) / 100;

  // Increase each RGB value proportionally to lightness
  for (let i = 0; i < 3; i++) {
    const difference = 255 - rgb[i];
    rgb[i] = Math.round(rgb[i] + difference * lightness);
  }
  // Convert back to hex format
  const newColor = `#${rgb
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("")}`;
  return newColor;
}

export { title, hexToRgba, lightenColor };
