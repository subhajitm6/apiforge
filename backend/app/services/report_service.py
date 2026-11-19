import io
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from app.models.test_run import TestRun

class ReportService:
    def generate_pdf(self, run: TestRun) -> bytes:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=36, leftMargin=36, topMargin=36, bottomMargin=36)
        elements = []
        styles = getSampleStyleSheet()

        title_style = ParagraphStyle(
            name="TitleStyle",
            parent=styles["Heading1"],
            fontSize=20,
            textColor=colors.HexColor("#1e293b"),
            spaceAfter=14
        )
        body_style = styles["Normal"]

        elements.append(Paragraph(f"API Automation Test Report", title_style))
        elements.append(Paragraph(f"<b>Run ID:</b> #{run.id} | <b>File:</b> {run.file.name if run.file else 'N/A'}", body_style))
        elements.append(Paragraph(f"<b>Date:</b> {run.created_at.strftime('%Y-%m-%d %H:%M:%S UTC') if run.created_at else 'N/A'}", body_style))
        elements.append(Paragraph(f"<b>Total:</b> {run.total} | <b>Passed:</b> {run.passed} | <b>Failed:</b> {run.failed} | <b>Success Rate:</b> {run.success_rate}%", body_style))
        elements.append(Spacer(1, 15))

        table_data = [["Method", "Endpoint", "Status", "Duration", "Result"]]
        for res in run.results:
            method = res.api_test.method if res.api_test else "-"
            endpoint = res.api_test.endpoint if res.api_test else "-"
            status_text = str(res.actual_status) if res.actual_status else "Error"
            duration = f"{res.response_time} ms"
            outcome = "PASS" if res.result == "pass" else "FAIL"

            table_data.append([
                Paragraph(method, body_style),
                Paragraph(endpoint[:40], body_style),
                status_text,
                duration,
                outcome
            ])

        t = Table(table_data, colWidths=[60, 240, 60, 80, 60])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor("#f1f5f9")),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.HexColor("#0f172a")),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor("#cbd5e1")),
        ]))
        elements.append(t)

        doc.build(elements)
        buffer.seek(0)
        return buffer.getvalue()

report_service = ReportService()

