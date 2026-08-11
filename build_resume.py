import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle, PageBreak, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY

def build_pdf():
    pdf_filename = r"public/resume.pdf"
    
    # Page setup - 0.5 in margins (36 pt)
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )
    
    styles = getSampleStyleSheet()
    
    # Custom colors matching original PDF theme
    HEADER_BLUE = colors.HexColor("#1C4D63")
    TEXT_DARK = colors.HexColor("#222222")
    TEXT_MUTED = colors.HexColor("#555555")
    LINK_BLUE = colors.HexColor("#1C4D63")
    LINE_COLOR = colors.HexColor("#1C4D63")
    
    # Custom Paragraph Styles
    style_name = ParagraphStyle(
        'MainName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=HEADER_BLUE,
        spaceAfter=4
    )
    
    style_subtitle = ParagraphStyle(
        'Subtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=TEXT_DARK,
        spaceAfter=6
    )
    
    style_contact = ParagraphStyle(
        'ContactInfo',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=TEXT_DARK,
        spaceAfter=4
    )
    
    style_links = ParagraphStyle(
        'ContactLinks',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=LINK_BLUE,
        spaceAfter=8
    )
    
    style_section_title = ParagraphStyle(
        'SectionTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=HEADER_BLUE,
        spaceBefore=10,
        spaceAfter=3,
        textTransform='uppercase'
    )
    
    style_body = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=TEXT_DARK,
        alignment=TA_JUSTIFY,
        spaceAfter=6
    )
    
    style_bullet = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=TEXT_DARK,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4
    )
    
    style_entry_title = ParagraphStyle(
        'EntryTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13.5,
        textColor=TEXT_DARK
    )
    
    style_entry_subtitle = ParagraphStyle(
        'EntrySubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=12,
        textColor=TEXT_MUTED,
        spaceAfter=3
    )

    story = []
    
    # 1. Header
    story.append(Paragraph("YUVAN AVINASH", style_name))
    story.append(Paragraph("Computer Science Engineer & Full-Stack Developer", style_subtitle))
    
    contact_text = (
        'Chennai, Tamil Nadu, India &nbsp;|&nbsp; +91 93634 84782 &nbsp;|&nbsp; '
        '<a href="mailto:yuvanavinash26@gmail.com"><font color="#1C4D63"><u>yuvanavinash26@gmail.com</u></font></a>'
    )
    story.append(Paragraph(contact_text, style_contact))
    
    links_text = (
        '<a href="https://yuvanavinash.vercel.app"><font color="#1C4D63"><u>Portfolio</u></font></a> &nbsp;|&nbsp; '
        '<a href="https://github.com/yuvanavinash"><font color="#1C4D63"><u>GitHub</u></font></a> &nbsp;|&nbsp; '
        '<a href="https://linkedin.com/in/yuvanavinash"><font color="#1C4D63"><u>LinkedIn</u></font></a>'
    )
    story.append(Paragraph(links_text, style_links))
    
    # Divider line
    story.append(HRFlowable(width="100%", thickness=1.5, color=LINE_COLOR, spaceBefore=2, spaceAfter=8))
    
    # 2. PROFILE SUMMARY
    story.append(Paragraph("PROFILE SUMMARY", style_section_title))
    story.append(HRFlowable(width="100%", thickness=0.75, color=LINE_COLOR, spaceBefore=1, spaceAfter=6))
    summary_text = (
        "Computer Science Engineering student (B.Tech, SRM IST Ramapuram) with a strong passion for full-stack "
        "development, automation, and AI-driven solutions. Experienced in building responsive web applications, "
        "contributing to open-source projects, and delivering hackathon products end-to-end — from UI/UX design to "
        "backend architecture. Long-term vision to build impactful technology products at scale."
    )
    story.append(Paragraph(summary_text, style_body))
    
    # 3. SKILLS & CAPABILITIES
    story.append(Paragraph("SKILLS & CAPABILITIES", style_section_title))
    story.append(HRFlowable(width="100%", thickness=0.75, color=LINE_COLOR, spaceBefore=1, spaceAfter=6))
    
    skills = [
        "<b>Frontend:</b> React, Next.js, Tailwind CSS, TypeScript, Framer Motion, Figma, Design Systems",
        "<b>Backend:</b> Node.js, Express, Python, REST APIs",
        "<b>Databases:</b> MongoDB, PostgreSQL, MySQL, Redis",
        "<b>IoT & Hardware:</b> Arduino, Raspberry Pi, Sensors",
        "<b>Core Strengths:</b> Python (90%), Automation (85%), JavaScript / React-Next.js (80%), Problem Solving (95%)"
    ]
    for sk in skills:
        story.append(Paragraph(f"● &nbsp; {sk}", style_bullet))
        
    # 4. EXPERIENCE & LEADERSHIP
    story.append(Spacer(1, 4))
    story.append(Paragraph("EXPERIENCE & LEADERSHIP", style_section_title))
    story.append(HRFlowable(width="100%", thickness=0.75, color=LINE_COLOR, spaceBefore=1, spaceAfter=6))
    
    # Exp 1
    t1_left = Paragraph("<b>Open Source Contributor</b> — <b>GirlScript Summer of Code</b>", style_entry_title)
    t1_right = Paragraph("<i>May 2026 – Present</i>", ParagraphStyle('RightText', parent=style_entry_subtitle, alignment=TA_RIGHT))
    table1 = Table([[t1_left, t1_right]], colWidths=[380, 160])
    table1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(table1)
    story.append(Paragraph("● &nbsp; Contributing to community-driven open-source projects, fixing issues, and refactoring UI components in global collaboration with developers worldwide.", style_bullet))
    story.append(Spacer(1, 4))
    
    # Exp 2
    t2_left = Paragraph("<b>Open Source Contributor</b> — <b>Social Summer of Code</b>", style_entry_title)
    t2_right = Paragraph("<i>May 2026 – Present</i>", ParagraphStyle('RightText2', parent=style_entry_subtitle, alignment=TA_RIGHT))
    table2 = Table([[t2_left, t2_right]], colWidths=[380, 160])
    table2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(table2)
    story.append(Paragraph("● &nbsp; Participating in collaborative software projects, building solutions that create measurable social impact through technology.", style_bullet))
    story.append(Spacer(1, 4))
    
    # Exp 3
    t3_left = Paragraph("<b>Development Domain Member</b> — <b>CodeKrafters, SRM Ramapuram</b>", style_entry_title)
    t3_right = Paragraph("<i>October 2025 – Present | Chennai</i>", ParagraphStyle('RightText3', parent=style_entry_subtitle, alignment=TA_RIGHT))
    table3 = Table([[t3_left, t3_right]], colWidths=[350, 190])
    table3.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(table3)
    story.append(Paragraph("● &nbsp; Working with student developers on web applications, technical workshops, hackathons, and software innovation initiatives.", style_bullet))
    story.append(Spacer(1, 4))

    # 5. PROJECT ARCHIVE
    story.append(Paragraph("PROJECT ARCHIVE", style_section_title))
    story.append(HRFlowable(width="100%", thickness=0.75, color=LINE_COLOR, spaceBefore=1, spaceAfter=6))
    
    projects = [
        "<b>CareSync AI</b> — AI-driven healthcare coordination platform demo built for a hackathon.",
        "<b>SafeCircle AI</b> — Guardian/SOS safety platform with a live dashboard and landing experience.",
        "<b>EduMind AI</b> — AI-assisted learning product taken from concept through launch.",
        "<b>EcoGrid</b> — Sustainability-focused prototype exploring smart-grid concepts.",
        "<b>DarkBid</b> — Real-time bidding engine built and stress-tested for a hackathon.",
        "<b>Studo</b> — Full-stack workspace/productivity tool for students."
    ]
    for proj in projects:
        story.append(Paragraph(f"● &nbsp; {proj}", style_bullet))

    # 6. EDUCATION
    story.append(Spacer(1, 4))
    story.append(Paragraph("EDUCATION", style_section_title))
    story.append(HRFlowable(width="100%", thickness=0.75, color=LINE_COLOR, spaceBefore=1, spaceAfter=6))
    
    # Edu 1
    e1_left = Paragraph("<b>B.Tech, Computer Science and Engineering</b> — <b>SRM Institute of Science and Technology</b>", style_entry_title)
    e1_right = Paragraph("<i>2025 – 2029 | Ramapuram, Chennai, India</i>", ParagraphStyle('RightTextE1', parent=style_entry_subtitle, alignment=TA_RIGHT))
    table_e1 = Table([[e1_left, e1_right]], colWidths=[340, 200])
    table_e1.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(table_e1)
    story.append(Paragraph("● &nbsp; Relevant interests: Software Engineering, Web Development, Artificial Intelligence, Automation, System Design.", style_bullet))
    story.append(Spacer(1, 4))

    # Edu 2
    e2_left = Paragraph("<b>Higher Secondary & Secondary Education</b> — <b>Sudharsanam Vidyaashram</b>", style_entry_title)
    e2_right = Paragraph("<i>2019 – 2025 | Chennai, India</i>", ParagraphStyle('RightTextE2', parent=style_entry_subtitle, alignment=TA_RIGHT))
    table_e2 = Table([[e2_left, e2_right]], colWidths=[360, 180])
    table_e2.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('TOPPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(table_e2)
    story.append(Paragraph("● &nbsp; Scored 95% in Class 10 Board Examinations; received Highest Academic Honors; active in technical and leadership activities.", style_bullet))
    story.append(Spacer(1, 4))

    # 7. CERTIFICATIONS
    story.append(Paragraph("CERTIFICATIONS", style_section_title))
    story.append(HRFlowable(width="100%", thickness=0.75, color=LINE_COLOR, spaceBefore=1, spaceAfter=6))
    
    certs = [
        "<b>Advanced Full-Stack Engineering</b> — Meta / Coursera (2026) — React, Next.js, Django, Database Optimization",
        "<b>Cloud Computing Architect</b> — AWS Academy (2025) — Cloud Architecture, EC2, S3, IAM Roles",
        "<b>Machine Learning Foundations</b> — Stanford / Coursera (2025) — Supervised Learning, Regressions, Cost Functions",
        "<b>Data Analytics Specialist</b> — Google Career Certificates (2025) — SQL, R Programming, Tableau Dashboards",
        "<b>Artificial Intelligence Fundamentals</b> — IBM / Cognitive Class (2024) — Python, Neural Networks, Deep Learning Models",
        "<b>IBM SkillsBuild Badges:</b> AI Fundamentals, AI Foundations, Craft Precise Prompts, Web Dev Fundamentals (Credly-verified)"
    ]
    for cert in certs:
        story.append(Paragraph(f"● &nbsp; {cert}", style_bullet))

    # 8. BEYOND CODING
    story.append(Spacer(1, 4))
    story.append(Paragraph("BEYOND CODING", style_section_title))
    story.append(HRFlowable(width="100%", thickness=0.75, color=LINE_COLOR, spaceBefore=1, spaceAfter=6))
    
    beyond = [
        "Exploring startup ideas and business frameworks",
        "Learning emerging automation tools & RPA nodes",
        "Participating in collaborative tech webinars",
        "Networking with developers, founders, and designers"
    ]
    for item in beyond:
        story.append(Paragraph(f"● &nbsp; {item}", style_bullet))

    doc.build(story)
    print("PDF generated successfully at:", pdf_filename)

if __name__ == '__main__':
    build_pdf()
