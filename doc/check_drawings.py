import docx

doc = docx.Document('doc/report format aat1.docx')
for i, p in enumerate(doc.paragraphs):
    for r in p.runs:
        if 'drawing' in r._r.xml:
            print(f"P{i}: next_p='{doc.paragraphs[i+1].text if i+1 < len(doc.paragraphs) else ''}'")
