import { type Editor } from "@tiptap/react";

function printContent(editor: Editor) {
    const printFrame = document.createElement("iframe");
    printFrame.style.position = "absolute";
    printFrame.style.width = "0px";
    printFrame.style.height = "0px";
    printFrame.style.border = "none";
    printFrame.style.backgroundColor = "#000000"
    document.body.appendChild(printFrame);

    const printDocument = printFrame.contentDocument || printFrame.contentWindow?.document;
    if (!printDocument) return;

    printDocument.open();

    // FIXME: 'printDocument.write' is deprecated
    printDocument.write(`
            <html>
            <head>
                <title>Print</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    
                    /* Hide print headers & footers */
                    @page {
                        margin: 0; /* Removes default browser margins (including headers/footers) */
                    }
                    body { 
                        margin: 20px; /* Adds custom margin to avoid content touching the edge */
                    }
                </style>
            </head>
            <body>
                ${editor.getHTML()}
            </body>
            </html>
        `);
    printDocument.close();

    printFrame.contentWindow?.focus();
    printFrame.contentWindow?.print();

    // Cleanup after printing
    setTimeout(() => document.body.removeChild(printFrame), 1000);
}

export default printContent