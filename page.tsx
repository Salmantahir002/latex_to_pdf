'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Upload, Download, FileText, Eye, Type, Copy } from 'lucide-react'

export default function Home() {
  const [latexCode, setLatexCode] = useState(`\\documentclass[a4paper]{article}
\\usepackage[a4paper, margin=1in]{geometry}
\\usepackage{amsmath}
\\usepackage{graphicx}
\\title{LaTeX Document Example}
\\author{Your Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\section{Introduction}
This is a sample LaTeX document to demonstrate the LaTeX to PDF converter. The document is formatted for A4 paper size with normal margins (1 inch on all sides).

\\section{Mathematical Equations}
Here are some mathematical equations:

\\begin{equation}
E = mc^2
\\end{equation}

\\begin{align}
\\nabla \\times \\vec{E} &= -\\frac{\\partial \\vec{B}}{\\partial t} \\\\
\\nabla \\times \\vec{B} &= \\mu_0\\vec{J} + \\mu_0\\epsilon_0\\frac{\\partial \\vec{E}}{\\partial t}
\\end{align}

\\section{Lists}
\\begin{itemize}
\\item First item
\\item Second item
\\item Third item
\\end{itemize}

\\section{Tables}
\\begin{table}[h]
\\centering
\\begin{tabular}{|c|c|c|}
\\hline
\\textbf{Name} & \\textbf{Age} & \\textbf{City} \\\\
\\hline
Alice & 25 & New York \\\\
Bob & 30 & London \\\\
Charlie & 35 & Tokyo \\\\
\\hline
\\end{tabular}
\\caption{Sample Table}
\\end{table}

\\end{document}`)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [plainText, setPlainText] = useState('')
  const [showTextConverter, setShowTextConverter] = useState(false)
  const [autoPreview, setAutoPreview] = useState(true)

  // Debounced function to auto-preview PDF
  const debouncedConvert = useCallback(
    debounce((code: string) => {
      if (code.trim() && autoPreview) {
        convertToPdf(code)
      }
    }, 1500),
    [autoPreview]
  )

  // Auto-preview when latex code changes
  useEffect(() => {
    debouncedConvert(latexCode)
    return () => debouncedCancel()
  }, [latexCode, debouncedConvert])

  // Debounce utility
  function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  function debouncedCancel() {
    // This will be called when component unmounts or dependencies change
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === 'application/x-tex') {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setLatexCode(content)
      }
      reader.readAsText(file)
    }
  }

  const convertToPdf = async (code?: string) => {
    const codeToConvert = code || latexCode
    if (!codeToConvert.trim()) return

    setIsConverting(true)
    setError(null)
    
    try {
      const response = await fetch('/api/convert-latex', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latexCode: codeToConvert }),
      })

      if (!response.ok) {
        throw new Error('Conversion failed')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setPdfUrl(url)
    } catch (err) {
      setError('Failed to convert LaTeX to PDF. Please check your code for syntax errors.')
      console.error(err)
    } finally {
      setIsConverting(false)
    }
  }

  const convertPlainTextToLatex = () => {
    if (!plainText.trim()) return

    // Convert plain text to basic LaTeX format
    const convertedLatex = `\\documentclass[a4paper]{article}
\\usepackage[a4paper, margin=1in]{geometry}
\\usepackage{amsmath}

\\begin{document}

\\section{Document}

${plainText
  .split('\n\n')
  .map(paragraph => paragraph.trim())
  .filter(paragraph => paragraph.length > 0)
  .map(paragraph => {
    // Handle numbered lists
    if (paragraph.match(/^\d+\./)) {
      const items = paragraph.split('\n').filter(item => item.trim())
      const listItems = items.map(item => {
        const match = item.match(/^\d+\.\s*(.*)/)
        return match ? `\\item ${match[1]}` : `\\item ${item}`
      }).join('\n')
      return `\\begin{enumerate}\n${listItems}\n\\end{enumerate}`
    }
    // Handle bullet points
    else if (paragraph.match(/^[-*•]/)) {
      const items = paragraph.split('\n').filter(item => item.trim())
      const listItems = items.map(item => {
        const match = item.match(/^[-*•]\s*(.*)/)
        return match ? `\\item ${match[1]}` : `\\item ${item}`
      }).join('\n')
      return `\\begin{itemize}\n${listItems}\n\\end{itemize}`
    }
    // Regular paragraph
    else {
      return paragraph
    }
  })
  .join('\n\n')}

\\end{document}`

    setLatexCode(convertedLatex)
    setShowTextConverter(false)
  }

  const copyLatexToClipboard = () => {
    navigator.clipboard.writeText(latexCode)
    // You could add a toast notification here
  }

  const downloadPdf = () => {
    if (pdfUrl) {
      const a = document.createElement('a')
      a.href = pdfUrl
      a.download = 'document.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">LaTeX to PDF Converter</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTextConverter(!showTextConverter)}
                className="flex items-center gap-2"
              >
                <Type className="h-4 w-4" />
                {showTextConverter ? 'Hide' : 'Text to LaTeX'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAutoPreview(!autoPreview)}
                className={`flex items-center gap-2 ${autoPreview ? 'bg-primary text-primary-foreground' : ''}`}
              >
                <Eye className="h-4 w-4" />
                Auto {autoPreview ? 'On' : 'Off'}
              </Button>
              <Button
                onClick={() => convertToPdf()}
                disabled={isConverting || !latexCode.trim()}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                {isConverting ? 'Converting...' : 'Preview PDF'}
              </Button>
              {pdfUrl && (
                <Button
                  onClick={downloadPdf}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Text to LaTeX Converter Section */}
      {showTextConverter && (
        <div className="border-b bg-muted/50">
          <div className="container mx-auto px-4 py-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Plain Text to LaTeX Converter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={plainText}
                  onChange={(e) => setPlainText(e.target.value)}
                  placeholder="Paste your plain text here... It will be converted to LaTeX format automatically."
                  className="min-h-[120px]"
                />
                <div className="flex items-center gap-2">
                  <Button
                    onClick={convertPlainTextToLatex}
                    disabled={!plainText.trim()}
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Convert & Copy to LaTeX Editor
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setPlainText('')}
                    className="flex items-center gap-2"
                  >
                    Clear Text
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Features:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Automatically detects numbered lists (1., 2., 3., ...)</li>
                    <li>Converts bullet points (-, *, •) to LaTeX itemize</li>
                    <li>Formats paragraphs with proper spacing</li>
                    <li>Creates complete LaTeX document structure</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* LaTeX Editor Panel */}
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">LaTeX Code</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyLatexToClipboard}
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Upload .tex
                    </Button>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".tex"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
              {autoPreview && (
                <div className="text-xs text-muted-foreground">
                  Auto-preview is enabled. PDF will update automatically after you stop typing.
                </div>
              )}
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <Textarea
                value={latexCode}
                onChange={(e) => setLatexCode(e.target.value)}
                className="h-full resize-none border-0 rounded-none focus-visible:ring-0 font-mono text-sm"
                placeholder="Enter your LaTeX code here..."
              />
            </CardContent>
          </Card>

          <Separator orientation="vertical" className="hidden lg:block" />

          {/* PDF Preview Panel */}
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">PDF Preview (A4)</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              {pdfUrl ? (
                <iframe
                  src={pdfUrl}
                  className="w-full h-full border-0"
                  title="PDF Preview"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p>PDF preview will appear here</p>
                    {autoPreview ? (
                      <p className="text-sm mt-2">Start typing LaTeX code or click "Preview PDF"</p>
                    ) : (
                      <p className="text-sm mt-2">Click "Preview PDF" to see the rendered document</p>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}
      </main>
    </div>
  )
}