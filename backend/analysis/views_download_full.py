from rest_framework.views import APIView
from django.http import HttpResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

import pandas as pd
import io
import base64

from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table,
    TableStyle, Image, PageBreak
)
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors


@method_decorator(csrf_exempt, name="dispatch")
class DownloadFullView(APIView):

    def post(self, request):

        # --------------------------------
        # 1️⃣ READ AREAS PAYLOAD
        # --------------------------------
        areas = request.data.get("areas")

        if not areas or not isinstance(areas, list):
            return HttpResponse("No areas payload received", status=400)

        # --------------------------------
        # 2️⃣ PDF BUFFER
        # --------------------------------
        buffer = io.BytesIO()
        pdf = SimpleDocTemplate(
            buffer,
            pagesize=A4,
            leftMargin=20,
            rightMargin=20,
            topMargin=20,
            bottomMargin=20
        )

        styles = getSampleStyleSheet()
        story = []

        story.append(Paragraph("<b>Real Estate Multi-City Report</b>", styles["Title"]))
        story.append(Spacer(1, 20))

        # --------------------------------
        # 3️⃣ LOOP THROUGH ALL CITIES
        # --------------------------------
        for i, area in enumerate(areas):

            name = area.get("name", "Area")
            summary = area.get("summary", "")
            table = area.get("table", [])
            price_b64 = area.get("price_chart", "")
            demand_b64 = area.get("demand_chart", "")

            story.append(Paragraph(f"<b>{name}</b>", styles["Heading1"]))
            story.append(Spacer(1, 10))

            story.append(Paragraph(summary, styles["BodyText"]))
            story.append(Spacer(1, 15))

            # ------------------------------
            # Charts
            # ------------------------------
            def decode(b64):
                if not b64:
                    return None
                try:
                    return io.BytesIO(base64.b64decode(b64))
                except:
                    return None

            price_img = decode(price_b64)
            demand_img = decode(demand_b64)

            if price_img:
                story.append(Paragraph("<b>Price Trend</b>", styles["Heading2"]))
                story.append(Image(price_img, width=450, height=250))
                story.append(Spacer(1, 15))

            if demand_img:
                story.append(Paragraph("<b>Demand Trend</b>", styles["Heading2"]))
                story.append(Image(demand_img, width=450, height=250))
                story.append(Spacer(1, 20))

            # ------------------------------
            # Table
            # ------------------------------
            if table:
                df = pd.DataFrame(table)
                story.append(Paragraph("<b>Dataset</b>", styles["Heading2"]))

                data_table = [list(df.columns)] + df.astype(str).values.tolist()

                col_width = 530 / len(df.columns)
                tbl = Table(data_table, colWidths=[col_width] * len(df.columns))

                tbl.setStyle(TableStyle([
                    ("BACKGROUND", (0, 0), (-1, 0), colors.lightblue),
                    ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
                    ("FONTSIZE", (0, 0), (-1, -1), 6),
                    ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                ]))

                story.append(tbl)

            # New page between cities
            if i < len(areas) - 1:
                story.append(PageBreak())

        # --------------------------------
        # BUILD PDF
        # --------------------------------
        pdf.build(story)
        buffer.seek(0)

        return HttpResponse(buffer, content_type="application/pdf")
