import { Upload, FileText, AlertTriangle, CheckCircle, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const reports = [
  {
    id: 1,
    date: "2024年12月15日",
    hospital: "北京协和医院",
    type: "年度体检",
    status: "已分析",
    alerts: 2,
    normals: 18,
  },
  {
    id: 2,
    date: "2024年6月20日",
    hospital: "北京大学第一医院",
    type: "专项检查",
    status: "已分析",
    alerts: 1,
    normals: 12,
  },
  {
    id: 3,
    date: "2023年12月10日",
    hospital: "中日友好医院",
    type: "年度体检",
    status: "已分析",
    alerts: 0,
    normals: 20,
  },
];

const latestAlerts = [
  { indicator: "低密度脂蛋白", value: "3.8", unit: "mmol/L", reference: "< 3.4", level: "轻度偏高" },
  { indicator: "尿酸", value: "468", unit: "μmol/L", reference: "< 420", level: "偏高" },
];

export function ReportModule() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">体检报告</h1>
          <p className="text-sm text-muted-foreground mt-1">AI解读您的健康指标</p>
        </div>
        <Button className="gap-2 rounded-xl">
          <Upload className="w-4 h-4" />
          上传
        </Button>
      </div>

      {/* Upload Area */}
      <div className="health-card border-2 border-dashed border-health-report/30 bg-health-report-light/50 flex flex-col items-center justify-center py-8">
        <div className="w-14 h-14 rounded-2xl bg-health-report/15 flex items-center justify-center mb-3">
          <FileText className="w-7 h-7 text-health-report" />
        </div>
        <p className="text-sm font-medium text-foreground">上传体检报告</p>
        <p className="text-xs text-muted-foreground mt-1">支持 PDF、图片格式</p>
        <Button variant="outline" className="mt-4 rounded-xl text-health-report border-health-report/30 hover:bg-health-report/10">
          选择文件
        </Button>
      </div>

      {/* Latest Alerts */}
      {latestAlerts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <AlertTriangle className="w-4 h-4 text-health-glucose" />
            <h3 className="text-sm font-medium text-foreground">需关注指标</h3>
          </div>
          {latestAlerts.map((alert, index) => (
            <div key={index} className="health-card bg-health-glucose-light/50 border border-health-glucose/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{alert.indicator}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    参考范围: {alert.reference}
                  </p>
                </div>
                <div className="text-right">
                  <p className="stat-number text-lg font-semibold text-health-glucose">
                    {alert.value} <span className="text-xs font-normal">{alert.unit}</span>
                  </p>
                  <span className="text-[10px] bg-health-glucose/15 text-health-glucose px-2 py-0.5 rounded-full">
                    {alert.level}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Report History */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-foreground px-1">历史报告</h3>
        {reports.map((report) => (
          <button
            key={report.id}
            className="w-full health-card flex items-center gap-4 text-left"
          >
            <div className="w-12 h-12 rounded-xl bg-health-report/10 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-health-report" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{report.type}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{report.hospital}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{report.date}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-2">
                {report.alerts > 0 && (
                  <span className="flex items-center gap-0.5 text-[10px] text-health-glucose">
                    <AlertTriangle className="w-3 h-3" />
                    {report.alerts}
                  </span>
                )}
                <span className="flex items-center gap-0.5 text-[10px] text-health-ai">
                  <CheckCircle className="w-3 h-3" />
                  {report.normals}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
