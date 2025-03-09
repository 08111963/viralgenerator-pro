
import { useWeeklyReports } from "@/hooks/useWeeklyReports";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChartBar, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";

export const WeeklyReports = () => {
  const { data: reports, isLoading } = useWeeklyReports();
  const { t } = useTranslation();

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!reports?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {t('dashboard.reports.title')}
          </CardTitle>
          <CardDescription>{t('dashboard.reports.noData')}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {t('dashboard.reports.title')}
        </CardTitle>
        <CardDescription>{t('dashboard.reports.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {reports.map((report) => (
            <div key={report.id} className="mb-6 border-b pb-6">
              <h3 className="text-sm font-medium mb-2">
                {new Date(report.week_start).toLocaleDateString()} - {new Date(report.week_end).toLocaleDateString()}
              </h3>
              
              <div className="grid gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <ChartBar className="h-4 w-4" />
                    {t('dashboard.reports.topHashtags')}
                  </h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('dashboard.reports.name')}</TableHead>
                        <TableHead>{t('dashboard.reports.volume')}</TableHead>
                        <TableHead>{t('dashboard.reports.change')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {report.trending_hashtags_summary.top_hashtags?.map((hashtag) => (
                        <TableRow key={hashtag.name}>
                          <TableCell>{hashtag.name}</TableCell>
                          <TableCell>{hashtag.volume}</TableCell>
                          <TableCell className={hashtag.change >= 0 ? "text-green-600" : "text-red-600"}>
                            {hashtag.change}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
