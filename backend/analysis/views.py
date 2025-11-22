from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.http import HttpResponse
import pandas as pd

from .serializers import AnalyzeRequestSerializer
from .utils import (
    load_data,
    extract_area_names_from_query,
    filter_by_locality,
    build_chart,
    generate_summary
)


# ---------------------------------------------------------
#   ANALYZE VIEW
# ---------------------------------------------------------
@method_decorator(csrf_exempt, name="dispatch")
class AnalyzeView(APIView):
    def post(self, request):
        serializer = AnalyzeRequestSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        query = serializer.validated_data["query"]
        df = load_data()

        # Extract areas from query
        areas = extract_area_names_from_query(query, df)

        if len(areas) == 0:
            return Response({"error": "No matching locality found."}, status=400)

        # If multiple areas → comparison mode
        if len(areas) > 1:
            results = {}

            for area in areas:
                part_df = filter_by_locality(df, area)

                results[area] = {
                    "summary": generate_summary(part_df, area),
                    "price_chart": build_chart(part_df, "flat_-_weighted_average_rate"),
                    "demand_chart": build_chart(part_df, "total_units"),
                    "table": part_df.to_dict(orient="records"),
                }

            return Response(results)

        # SINGLE AREA
        area = areas[0]
        part_df = filter_by_locality(df, area)

        return Response({
            "summary": generate_summary(part_df, area),
            "price_chart": build_chart(part_df, "flat_-_weighted_average_rate"),
            "demand_chart": build_chart(part_df, "total_units"),
            "table": part_df.to_dict(orient="records"),
        })


# ---------------------------------------------------------
#   DOWNLOAD VIEW (CSV / EXCEL EXPORT)
# ---------------------------------------------------------
@method_decorator(csrf_exempt, name="dispatch")
class DownloadView(APIView):
    def post(self, request):

        table = request.data.get("table")
        file_type = request.data.get("type", "csv")  # csv OR excel

        if not table:
            return Response({"error": "No table data provided"}, status=400)

        df = pd.DataFrame(table)

        # ---------------- CSV EXPORT ----------------
        if file_type == "csv":
            response = HttpResponse(content_type="text/csv")
            response["Content-Disposition"] = 'attachment; filename="analysis.csv"'
            df.to_csv(path_or_buf=response, index=False)
            return response

        # ---------------- EXCEL EXPORT ----------------
        if file_type == "excel":
            response = HttpResponse(
                content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            )
            response["Content-Disposition"] = 'attachment; filename="analysis.xlsx"'
            df.to_excel(response, index=False, engine="openpyxl")
            return response

        return Response({"error": "Invalid file type"}, status=400)
