import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface Biomarker {
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  status: 'normal' | 'warning' | 'critical';
}

interface DashboardTabProps {
  mockBiomarkers: Biomarker[];
  getStatusColor: (status: string) => string;
  getStatusBadge: (status: string) => JSX.Element | null;
  calculatePercentage: (value: number, min: number, max: number) => number;
}

const DashboardTab = ({ mockBiomarkers, getStatusColor, getStatusBadge, calculatePercentage }: DashboardTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Всего анализов</CardTitle>
            <Icon name="FileText" className="text-muted-foreground" size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1">за последний год</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">В норме</CardTitle>
            <Icon name="CheckCircle2" className="text-success" size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">22</div>
            <p className="text-xs text-muted-foreground mt-1">показателя</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Требуют внимания</CardTitle>
            <Icon name="AlertTriangle" className="text-warning" size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">1</div>
            <p className="text-xs text-muted-foreground mt-1">показатель</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Критичные</CardTitle>
            <Icon name="AlertCircle" className="text-destructive" size={16} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">1</div>
            <p className="text-xs text-muted-foreground mt-1">показатель</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Последний анализ</CardTitle>
            <CardDescription>15 ноября 2024</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockBiomarkers.slice(0, 4).map((marker, index) => (
              <div key={index} className="space-y-2 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{marker.name}</span>
                    {getStatusBadge(marker.status)}
                  </div>
                  <span className={cn('font-semibold', getStatusColor(marker.status))}>
                    {marker.value} {marker.unit}
                  </span>
                </div>
                <div className="space-y-1">
                  <Progress value={calculatePercentage(marker.value, marker.min, marker.max)} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{marker.min}</span>
                    <span>{marker.max}</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              <Icon name="ExternalLink" size={16} className="mr-2" />
              Посмотреть все показатели
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Динамика показателей</CardTitle>
            <CardDescription>Тренды за последние 4 месяца</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Гемоглобин</span>
                  <span className="text-sm text-success flex items-center gap-1">
                    <Icon name="TrendingUp" size={14} />
                    +2.3%
                  </span>
                </div>
                <div className="h-16 bg-muted rounded-lg flex items-end gap-1 p-2">
                  {[138, 142, 143, 145].map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-primary rounded-sm transition-all hover:bg-primary/80"
                      style={{ height: `${(val / 160) * 100}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Глюкоза</span>
                  <span className="text-sm text-warning flex items-center gap-1">
                    <Icon name="TrendingUp" size={14} />
                    +18.5%
                  </span>
                </div>
                <div className="h-16 bg-muted rounded-lg flex items-end gap-1 p-2">
                  {[5.2, 5.5, 6.1, 6.8].map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-warning rounded-sm transition-all hover:bg-warning/80"
                      style={{ height: `${(val / 8) * 100}%` }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Холестерин</span>
                  <span className="text-sm text-destructive flex items-center gap-1">
                    <Icon name="TrendingUp" size={14} />
                    +24.8%
                  </span>
                </div>
                <div className="h-16 bg-muted rounded-lg flex items-end gap-1 p-2">
                  {[4.8, 5.2, 5.8, 6.2].map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-destructive rounded-sm transition-all hover:bg-destructive/80"
                      style={{ height: `${(val / 7) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Sparkles" className="text-primary" size={20} />
            AI-анализ и рекомендации
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="AlertCircle" className="text-destructive mt-0.5" size={20} />
              <div className="flex-1">
                <h4 className="font-semibold text-destructive mb-1">Повышенный холестерин</h4>
                <p className="text-sm text-muted-foreground">
                  Уровень холестерина (6.2 ммоль/л) превышает норму. Рекомендуется консультация с кардиологом и корректировка питания.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="AlertTriangle" className="text-warning mt-0.5" size={20} />
              <div className="flex-1">
                <h4 className="font-semibold text-warning mb-1">Глюкоза на верхней границе</h4>
                <p className="text-sm text-muted-foreground">
                  Глюкоза (6.8 ммоль/л) близка к преддиабетическому состоянию. Рекомендуется контроль углеводов и повторный анализ через 2 недели.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-start gap-3">
              <Icon name="CheckCircle2" className="text-success mt-0.5" size={20} />
              <div className="flex-1">
                <h4 className="font-semibold text-success mb-1">Положительная динамика</h4>
                <p className="text-sm text-muted-foreground">
                  Показатели гемоглобина, эритроцитов и печёночных ферментов в норме и показывают стабильную динамику.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardTab;
