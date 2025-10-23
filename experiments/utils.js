const letterTemplates = {
    'A': [[-40, 100, 0, 0], [0, 0, 40, 100], [-20, 50, 20, 50]],
    'B': [[-40, 100, -40, 0], [-40, 0, 20, 0], [20, 0, 40, 20], [40, 20, 20, 50], [-40, 50, 20, 50], [20, 50, 40, 70], [40, 70, 20, 100], [20, 100, -40, 100]],
    'C': [[40, 20, 20, 0], [20, 0, -20, 0], [-20, 0, -40, 20], [-40, 20, -40, 80], [-40, 80, -20, 100], [-20, 100, 20, 100], [20, 100, 40, 80]],
    'D': [[-40, 0, -40, 100], [-40, 0, 0, 0], [0, 0, 40, 40], [40, 40, 40, 60], [40, 60, 0, 100], [0, 100, -40, 100]],
    'E': [[-40, 0, -40, 100], [-40, 0, 40, 0], [-40, 50, 20, 50], [-40, 100, 40, 100]],
    'F': [[-40, 0, -40, 100], [-40, 0, 40, 0], [-40, 50, 20, 50]],
    'G': [[40, 20, 20, 0], [20, 0, -20, 0], [-20, 0, -40, 20], [-40, 20, -40, 80], [-40, 80, -20, 100], [-20, 100, 20, 100], [20, 100, 40, 80], [40, 80, 40, 50], [40, 50, 0, 50]],
    'H': [[-40, 0, -40, 100], [40, 0, 40, 100], [-40, 50, 40, 50]],
    'I': [[0, 0, 0, 100], [-20, 0, 20, 0], [-20, 100, 20, 100]],
    'J': [[40, 0, 40, 80], [40, 80, 20, 100], [20, 100, -20, 100], [-20, 100, -40, 80]],
    'K': [[-40, 0, -40, 100], [-40, 50, 40, 0], [-40, 50, 40, 100]],
    'L': [[-40, 0, -40, 100], [-40, 100, 40, 100]],
    'M': [[-40, 100, -40, 0], [-40, 0, 0, 50], [0, 50, 40, 0], [40, 0, 40, 100]],
    'N': [[-40, 100, -40, 0], [-40, 0, 40, 100], [40, 100, 40, 0]],
    'O': [[20, 0, -20, 0], [-20, 0, -40, 20], [-40, 20, -40, 80], [-40, 80, -20, 100], [-20, 100, 20, 100], [20, 100, 40, 80], [40, 80, 40, 20], [40, 20, 20, 0]],
    'P': [[-40, 100, -40, 0], [-40, 0, 20, 0], [20, 0, 40, 20], [40, 20, 40, 30], [40, 30, 20, 50], [20, 50, -40, 50]],
    'Q': [[20, 0, -20, 0], [-20, 0, -40, 20], [-40, 20, -40, 80], [-40, 80, -20, 100], [-20, 100, 20, 100], [20, 100, 40, 80], [40, 80, 40, 20], [40, 20, 20, 0], [0, 60, 40, 100]],
    'R': [[-40, 100, -40, 0], [-40, 0, 20, 0], [20, 0, 40, 20], [40, 20, 40, 30], [40, 30, 20, 50], [20, 50, -40, 50], [-20, 50, 40, 100]],
    'S': [[40, 20, 20, 0], [20, 0, -20, 0], [-20, 0, -40, 20], [-40, 20, -20, 50], [-20, 50, 20, 50], [20, 50, 40, 80], [40, 80, 20, 100], [20, 100, -20, 100], [-20, 100, -40, 80]],
    'T': [[-40, 0, 40, 0], [0, 0, 0, 100]],
    'U': [[-40, 0, -40, 80], [-40, 80, -20, 100], [-20, 100, 20, 100], [20, 100, 40, 80], [40, 80, 40, 0]],
    'V': [[-40, 0, 0, 100], [0, 100, 40, 0]],
    'W': [[-40, 0, -20, 100], [-20, 100, 0, 30], [0, 30, 20, 100], [20, 100, 40, 0]],
    'X': [[-40, 0, 40, 100], [40, 0, -40, 100]],
    'Y': [[-40, 0, 0, 50], [40, 0, 0, 50], [0, 50, 0, 100]],
    'Z': [[-40, 0, 40, 0], [40, 0, -40, 100], [-40, 100, 40, 100]]
};
function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function calculateTextDimensions(text, letterSpacing) {
    const chars = text.split(' ');
    return chars.map(word => word.length * letterSpacing);
}

function splitIntoLines(text, maxWidth, letterSpacing) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = [];
    let currentWidth = 0;

    words.forEach(word => {
        const wordWidth = word.length * letterSpacing;
        
        if (currentWidth + wordWidth <= maxWidth) {
            currentLine.push(word);
            currentWidth += wordWidth + letterSpacing; // Add space between words
        } else {
            lines.push(currentLine.join(' '));
            currentLine = [word];
            currentWidth = wordWidth;
        }
    });

    if (currentLine.length > 0) {
        lines.push(currentLine.join(' '));
    }

    return lines;
}

function generateSquiggles(text) {
    const result = [];
    const baseLetterSpacing = 80; // Slightly reduced spacing
    const lineSpacing = 120; // Vertical space between lines
    
    // Calculate available width for text
    const availableWidth = width * 0.8; // Use 80% of canvas width
    
    // Split text into lines
    const lines = splitIntoLines(text, availableWidth, baseLetterSpacing);
    
    // Calculate total height needed
    const totalHeight = lines.length * lineSpacing;
    const startY = (height - totalHeight) / 2 + lineSpacing/2;

    // Generate squiggles for each line
    lines.forEach((line, lineIndex) => {
        const lineWidth = line.length * baseLetterSpacing;
        const startX = (width - lineWidth) / 2;
        const baseY = startY + (lineIndex * lineSpacing);

        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (!letterTemplates[char]) continue;

            const baseX = startX + (i * baseLetterSpacing);
            const template = letterTemplates[char];

            const startingPoints = template.map(line => ({
                start: {
                    x: baseX + random(-20, 20),
                    y: baseY + random(-20, 20)
                },
                end: {
                    x: baseX + random(-20, 20),
                    y: baseY + random(-20, 20)
                },
                targetStart: {
                    x: baseX + line[0],
                    y: baseY + line[1]
                },
                targetEnd: {
                    x: baseX + line[2],
                    y: baseY + line[3]
                }
            }));

            result.push({
                char,
                lines: startingPoints,
                delay: (lineIndex * line.length + i) * 3 // Sequential animation across lines
            });
        }
    });

    return result;
}