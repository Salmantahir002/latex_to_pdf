# LaTeX to PDF Converter

A web application that converts LaTeX code to PDF directly in your browser, inspired by Overleaf.

## Features

- **Split-panel interface**: Edit LaTeX code on the left, preview PDF on the right
- **Real-time compilation**: Convert LaTeX to PDF with a single click
- **Auto-preview**: PDF updates automatically as you type (with debouncing)
- **Plain text to LaTeX converter**: Convert simple text to LaTeX format
- **File upload**: Upload existing .tex files to edit
- **Download functionality**: Download generated PDFs
- **A4 page format**: All PDFs are generated in A4 size with normal margins (1 inch)
- **Responsive design**: Works on desktop and mobile devices
- **Syntax-aware**: Pre-loaded with sample LaTeX code including math, tables, and formatting

## How to Use

### Basic LaTeX Editing
1. **Edit LaTeX Code**: Write or paste your LaTeX code in the left panel
2. **Upload Files**: Click "Upload .tex" to load existing LaTeX files
3. **Preview PDF**: 
   - With auto-preview ON: PDF updates automatically after you stop typing
   - With auto-preview OFF: Click "Preview PDF" to compile and view the PDF
4. **Download**: Click "Download PDF" to save the generated PDF

### Plain Text to LaTeX Conversion
1. Click "Text to LaTeX" button in the header
2. Paste your plain text in the converter area
3. The converter automatically detects:
   - Numbered lists (1., 2., 3., ...)
   - Bullet points (-, *, •)
   - Paragraphs and spacing
4. Click "Convert & Copy to LaTeX Editor" to generate LaTeX code
5. The converted code appears in the LaTeX editor and auto-generates PDF

#### Example Plain Text Conversion

**Input:**
```
My Document Title

This is the introduction paragraph with some important information.

Here are the main points:
- First important point
- Second important point  
- Third important point

Steps to follow:
1. First step description
2. Second step description
3. Third step description

This is the conclusion paragraph.
```

**Generated LaTeX:**
```latex
\documentclass[a4paper]{article}
\usepackage[a4paper, margin=1in]{geometry}
\usepackage{amsmath}

\begin{document}

\section{Document}

My Document Title

This is the introduction paragraph with some important information.

Here are the main points:
\begin{itemize}
\item First important point
\item Second important point
\item Third important point
\end{itemize}

Steps to follow:
\begin{enumerate}
\item First step description
\item Second step description
\item Third step description
\end{enumerate}

This is the conclusion paragraph.

\end{document}
```

## Sample LaTeX Code

The app comes pre-loaded with a comprehensive example including:
- A4 paper size with 1-inch margins
- Document structure and metadata
- Mathematical equations (inline and display)
- Lists and itemization
- Tables with formatting
- Various LaTeX environments

## Auto-Preview Feature

- **Debounced**: Updates 1.5 seconds after you stop typing to prevent excessive API calls
- **Toggle**: Can be turned on/off with the "Auto On/Off" button
- **Visual Feedback**: Shows status when enabled
- **Manual Override**: Always available to click "Preview PDF" manually

## Technical Implementation

### Frontend
- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components for UI elements
- **Lucide React** for icons
- **Debouncing** for performance optimization

### Backend
- **API Route** for LaTeX compilation
- **A4 Format**: All PDFs generated with A4 page size (595pt x 842pt)
- **Normal Margins**: 1-inch margins on all sides using geometry package
- **Fallback system** for PDF generation:
  1. Attempts to use local `pdflatex` installation
  2. Falls back to online LaTeX compilation service
  3. Final fallback to mock PDF generation

### PDF Generation

The application uses a tiered approach for PDF generation:

1. **Local LaTeX Compiler**: If `pdflatex` is available on the server
2. **Online Service**: Attempts to use external LaTeX compilation APIs
3. **Mock PDF**: Generates a basic PDF structure with the LaTeX code as text

All generated PDFs use A4 page size with proper margins regardless of the generation method.

## New Features Added

### 1. A4 Page Size with Normal Margins
- Updated default LaTeX template to use `\documentclass[a4paper]{article}`
- Added `\usepackage[a4paper, margin=1in]{geometry}` for proper margins
- Updated mock PDF generation to use A4 dimensions (595pt x 842pt)

### 2. Plain Text to LaTeX Converter
- Collapsible section in the header
- Automatic detection of lists and paragraphs
- One-click conversion and copy to LaTeX editor
- Smart formatting for numbered and bulleted lists

### 3. Auto-Preview Functionality
- Debounced preview (1.5 second delay)
- Toggle button to enable/disable
- Visual feedback when auto-preview is active
- Manual preview always available

## Limitations

- **No Local LaTeX**: In environments without `pdflatex`, the app uses fallback methods
- **Mock PDF**: The fallback PDF displays the LaTeX code as text rather than rendered content
- **No Packages**: Limited package support in fallback mode
- **File Size**: Large LaTeX files may be truncated in mock PDF mode

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run linter
npm run lint
```

## Future Enhancements

- [ ] LaTeX syntax highlighting in editor
- [ ] More sophisticated plain text conversion
- [ ] Package management and auto-completion
- [ ] Multiple document templates
- [ ] Collaboration features
- [ ] Version history
- [ ] Export to other formats (HTML, Word)
- [ ] Real-time collaboration
- [ ] Advanced math equation editor

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

Note: PDF preview requires a browser that supports iframe PDF rendering.