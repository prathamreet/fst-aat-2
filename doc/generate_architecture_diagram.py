"""
Architecture Workflow Diagram Generator for AAT-2 Academic Report
Outputs: doc/image/fig5_1.png
"""
import os
from PIL import Image, ImageDraw, ImageFont

def create_architecture_diagram():
    os.makedirs('doc/image', exist_ok=True)
    out_path = 'doc/image/fig5_1.png'
    
    # Canvas setup
    W, H = 1600, 960
    img = Image.new('RGB', (W, H), color='#ffffff')
    draw = ImageDraw.Draw(img)
    
    # Fonts
    font_title = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 32)
    font_sub = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 16)
    font_layer_hdr = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 18)
    font_box_title = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 16)
    font_box_desc = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 13)
    font_badge = ImageFont.truetype('C:/Windows/Fonts/consola.ttf', 12)
    font_arrow = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 14)
    
    # Outer Border / Canvas Header
    draw.rectangle([20, 20, W-20, H-20], outline='#e4e4e7', width=2)
    
    # Header Banner
    draw.rectangle([20, 20, W-20, 110], fill='#09090b')
    draw.text((50, 35), "AI RESUME ANALYZER & ATS SCORE MATCHER — SYSTEM ARCHITECTURE", fill='#ffffff', font=font_title)
    draw.text((50, 78), "Deterministic Multi-Layer Parser & Heuristic Scoring Pipeline with Zero-PII Client Isolation", fill='#a1a1aa', font=font_sub)
    draw.text((W - 320, 55), "AAT-2 SYSTEM WORKFLOW", fill='#38bdf8', font=font_badge)
    
    # 5 Horizontal Architecture Stages / Blocks
    stages = [
        {
            "num": "LAYER 01",
            "title": "Document Ingestion",
            "badge": "Client-Side",
            "badge_bg": "#f4f4f5",
            "badge_fg": "#18181b",
            "border": "#d4d4d8",
            "bg": "#fafafa",
            "items": [
                ("PDF.js Web Worker", "Extracts raw text stream via browser worker without cloud upload"),
                ("Text Normalizer", "Cleans whitespace, linefeeds & non-ASCII glyph artifacts"),
                ("Dual Ingestion Input", "Accepts PDF upload, pasted resume stream, and target JD")
            ]
        },
        {
            "num": "LAYER 02",
            "title": "Lexical & Entity Parser",
            "badge": "Deterministic NLP",
            "badge_bg": "#eff6ff",
            "badge_fg": "#1d4ed8",
            "border": "#bfdbfe",
            "bg": "#f8faff",
            "items": [
                ("Entity Regex Extractors", "Detects emails, phone numbers, GitHub & LinkedIn URLs"),
                ("Tenure & Degree Match", "Extracts career year ranges and academic graduation levels"),
                ("Impact Metric Detector", "Scans for action verbs and quantified impact metrics")
            ]
        },
        {
            "num": "LAYER 03",
            "title": "5-Tier Scoring Engine",
            "badge": "Mathematical Model",
            "badge_bg": "#f0fdf4",
            "badge_fg": "#15803d",
            "border": "#bbf7d0",
            "bg": "#f8fef9",
            "items": [
                ("Technical Skills (40%)", "Normalized taxonomy match against JD requirement tokens"),
                ("Experience & Edu (30%)", "Experience gap calculation (20%) + Degree tier rubric (10%)"),
                ("Structure & TF-IDF (30%)", "ATS standard headers (15%) + Cosine similarity vector (15%)")
            ]
        },
        {
            "num": "LAYER 04",
            "title": "Gemini AI Copilot",
            "badge": "Optional Cloud LLM",
            "badge_bg": "#faf5ff",
            "badge_fg": "#7e22ce",
            "border": "#e9d5ff",
            "bg": "#fcfaff",
            "items": [
                ("Executive Audit", "Recruiter critique analyzing role fit strengths & vulnerabilities"),
                ("Google XYZ Rewriter", "Transforms weak bullets into Accomplished [X] by [Y] doing [Z]"),
                ("Interview Simulator", "Generates role-specific behavioral and technical screen questions")
            ]
        },
        {
            "num": "LAYER 05",
            "title": "Presentation Layer",
            "badge": "React 19 + Tailwind",
            "badge_bg": "#fffbeb",
            "badge_fg": "#b45309",
            "border": "#fde68a",
            "bg": "#fffdf5",
            "items": [
                ("Score Gauge & Telemetry", "Tabular mono score breakdown with sub-metric health bars"),
                ("Interactive Matrix", "Searchable keyword chips and side-by-side text inspector"),
                ("Zero-PII Local Safety", "Operates completely in-browser; zero candidate telemetry logging")
            ]
        }
    ]
    
    col_w = 280
    gap = 25
    start_x = 55
    start_y = 150
    box_h = 580
    
    for i, st in enumerate(stages):
        x = start_x + i * (col_w + gap)
        y = start_y
        
        # Outer Card Box
        draw.rounded_rectangle([x, y, x + col_w, y + box_h], radius=10, fill=st["bg"], outline=st["border"], width=2)
        
        # Header inside Box
        draw.rectangle([x, y, x + col_w, y + 80], fill='#ffffff', outline=st["border"], width=1)
        draw.text((x + 16, y + 14), st["num"], fill='#71717a', font=font_badge)
        draw.text((x + 16, y + 36), st["title"], fill='#09090b', font=font_box_title)
        
        # Badge
        badge_w = 110
        draw.rounded_rectangle([x + col_w - badge_w - 12, y + 12, x + col_w - 12, y + 34], radius=5, fill=st["badge_bg"], outline=st["border"], width=1)
        draw.text((x + col_w - badge_w - 6, y + 16), st["badge"][:14], fill=st["badge_fg"], font=font_badge)
        
        # Inner Items
        item_y = y + 105
        for item_title, item_desc in st["items"]:
            # Subcard
            draw.rounded_rectangle([x + 12, item_y, x + col_w - 12, item_y + 135], radius=6, fill='#ffffff', outline='#e4e4e7', width=1)
            
            # Bullet marker
            draw.rectangle([x + 18, item_y + 14, x + 22, item_y + 28], fill=st["badge_fg"])
            draw.text((x + 30, item_y + 12), item_title, fill='#09090b', font=font_layer_hdr)
            
            # Multiline text wrapping
            words = item_desc.split(' ')
            lines = []
            curr = ""
            for w in words:
                if len(curr + " " + w) > 28:
                    lines.append(curr)
                    curr = w
                else:
                    curr = curr + " " + w if curr else w
            if curr:
                lines.append(curr)
                
            ly = item_y + 44
            for l in lines[:4]:
                draw.text((x + 20, ly), l, fill='#52525b', font=font_box_desc)
                ly += 20
                
            item_y += 150
            
        # Draw Arrow to next stage
        if i < len(stages) - 1:
            arrow_x = x + col_w + 3
            arrow_y = y + box_h // 2
            draw.line([(arrow_x, arrow_y), (arrow_x + gap - 8, arrow_y)], fill='#71717a', width=3)
            # Arrowhead
            draw.polygon([
                (arrow_x + gap - 4, arrow_y),
                (arrow_x + gap - 12, arrow_y - 6),
                (arrow_x + gap - 12, arrow_y + 6)
            ], fill='#71717a')
            
    # Bottom Summary Architecture Bar
    draw.rounded_rectangle([start_x, H - 190, W - start_x, H - 45], radius=8, fill='#f4f4f5', outline='#d4d4d8', width=1)
    draw.text((start_x + 25, H - 170), "PIPELINE GUARANTEES & OPERATIONAL CHARACTERISTICS", fill='#09090b', font=font_box_title)
    
    props = [
        ("Deterministic Heuristic", "Scores produce 100% reproducible results for identical inputs with zero stochastic drift."),
        ("100% Client-Side Privacy", "No resume text or PII is transmitted to remote databases; parsing runs in Web Workers."),
        ("Explainable Math Rubric", "Every point in the 0-100 score is broken down into 5 verifiable mathematical dimensions."),
        ("Fault-Tolerant AI Tier", "Full ATS matching operates offline; Gemini AI copilot adds value without being a hard dependency.")
    ]
    
    px = start_x + 25
    pw = (W - start_x * 2 - 50) // 4
    for ptitle, pdesc in props:
        draw.text((px, H - 140), f"• {ptitle}", fill='#18181b', font=font_layer_hdr)
        
        # Word wrap
        pwords = pdesc.split(' ')
        plines = []
        pcurr = ""
        for pwrd in pwords:
            if len(pcurr + " " + pwrd) > 34:
                plines.append(pcurr)
                pcurr = pwrd
            else:
                pcurr = pcurr + " " + pwrd if pcurr else pwrd
        if pcurr:
            plines.append(pcurr)
            
        ply = H - 115
        for pl in plines[:3]:
            draw.text((px + 12, ply), pl, fill='#52525b', font=font_box_desc)
            ply += 18
        px += pw + 10
        
    img.save(out_path, 'PNG', quality=95)
    print(f"Architecture diagram generated successfully at {out_path} ({os.path.getsize(out_path)} bytes)")

if __name__ == '__main__':
    create_architecture_diagram()
