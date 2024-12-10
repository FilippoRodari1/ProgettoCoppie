from weasyprint import HTML
import os

def generate_pdf(data):
    # Crea il contenuto HTML per il CV
    html_content = f"""
    <html>
      <body>
        <h1>{data['name']}</h1>
        <p>Email: {data['email']}</p>
        <h2>Esperienze</h2>
        <p>{data['experience']}</p>
      </body>
    </html>
    """
    
    # Definisci un percorso per salvare il PDF
    pdf_dir = os.path.join(os.getcwd(), 'pdfs')  # Cartella 'pdfs' nella cartella corrente
    os.makedirs(pdf_dir, exist_ok=True)  # Crea la cartella se non esiste
    
    pdf_path = os.path.join(pdf_dir, f"{data['name']}_cv.pdf")  # Nome del file PDF personalizzato

    # Crea il PDF e salvalo nel percorso specificato
    HTML(string=html_content).write_pdf(pdf_path)
    
    return pdf_path
