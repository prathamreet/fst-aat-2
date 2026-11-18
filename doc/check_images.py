import docx

doc = docx.Document('doc/report format aat1.docx')
for i, p in enumerate(doc.paragraphs):
    xml = p._p.xml
    if 'blip' in xml:
        print(f"P{i} contains image! Caption next: '{doc.paragraphs[i+1].text if i+1 < len(doc.paragraphs) else ''}'")
