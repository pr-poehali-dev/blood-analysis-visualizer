import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

const mockBiomarkers: Biomarker[] = [
  { name: 'Гемоглобин', value: 145, unit: 'г/л', min: 130, max: 160, status: 'normal' },
  { name: 'Эритроциты', value: 4.8, unit: '×10¹²/л', min: 4.0, max: 5.5, status: 'normal' },
  { name: 'Лейкоциты', value: 8.2, unit: '×10⁹/л', min: 4.0, max: 9.0, status: 'normal' },
  { name: 'Тромбоциты', value: 310, unit: '×10⁹/л', min: 180, max: 320, status: 'normal' },
  { name: 'Глюкоза', value: 6.8, unit: 'ммоль/л', min: 3.3, max: 5.5, status: 'warning' },
  { name: 'Холестерин', value: 6.2, unit: 'ммоль/л', min: 3.0, max: 5.2, status: 'critical' },
  { name: 'АЛТ', value: 28, unit: 'Ед/л', min: 0, max: 40, status: 'normal' },
  { name: 'АСТ', value: 32, unit: 'Ед/л', min: 0, max: 40, status: 'normal' },
];

const mockHistory = [
  { date: '15 ноя 2024', status: 'normal', count: 24 },
  { date: '15 окт 2024', status: 'warning', count: 24 },
  { date: '15 сен 2024', status: 'normal', count: 24 },
  { date: '15 авг 2024', status: 'normal', count: 24 },
];

const Index = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [isDragging, setIsDragging] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'normal':
        return <Badge className="bg-success/10 text-success hover:bg-success/20">Норма</Badge>;
      case 'warning':
        return <Badge className="bg-warning/10 text-warning hover:bg-warning/20">Внимание</Badge>;
      case 'critical':
        return <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/20">Критично</Badge>;
      default:
        return null;
    }
  };

  const calculatePercentage = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon name="Activity" className="text-primary" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">BloodTrack</h1>
                <p className="text-xs text-muted-foreground">AI-анализ крови</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Settings" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              <span className="hidden sm:inline">Дашборд</span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="gap-2">
              <Icon name="Upload" size={16} />
              <span className="hidden sm:inline">Загрузка</span>
            </TabsTrigger>
            <TabsTrigger value="biomarkers" className="gap-2">
              <Icon name="FlaskConical" size={16} />
              <span className="hidden sm:inline">Биомаркеры</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Icon name="History" size={16} />
              <span className="hidden sm:inline">История</span>
            </TabsTrigger>
            <TabsTrigger value="help" className="gap-2">
              <Icon name="HelpCircle" size={16} />
              <span className="hidden sm:inline">Помощь</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
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
          </TabsContent>

          <TabsContent value="upload" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Загрузка анализов</CardTitle>
                <CardDescription>Загрузите PDF-файл с результатами анализов для автоматической обработки</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    'border-2 border-dashed rounded-xl p-12 text-center transition-all',
                    isDragging ? 'border-primary bg-primary/5 scale-105' : 'border-border hover:border-primary/50'
                  )}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name="Upload" className="text-primary" size={32} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Перетащите файлы сюда</h3>
                      <p className="text-sm text-muted-foreground">или нажмите для выбора</p>
                    </div>
                    <Button size="lg" className="mt-4">
                      <Icon name="FolderOpen" size={20} className="mr-2" />
                      Выбрать файлы
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      Поддерживаемые форматы: PDF, JPG, PNG (макс. 10 МБ)
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <h4 className="font-medium text-sm">Интеграция с лабораториями</h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Button variant="outline" className="justify-start">
                      <Icon name="Building2" size={18} className="mr-2" />
                      Инвитро
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Icon name="Building2" size={18} className="mr-2" />
                      Helix
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Icon name="Building2" size={18} className="mr-2" />
                      KDL
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Icon name="Building2" size={18} className="mr-2" />
                      Другая лаборатория
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="biomarkers" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Все биомаркеры</CardTitle>
                <CardDescription>Полный список показателей с референсными значениями</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBiomarkers.map((marker, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:shadow-md transition-all animate-slide-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon name="Activity" className="text-primary" size={20} />
                          </div>
                          <div>
                            <h4 className="font-semibold">{marker.name}</h4>
                            <p className="text-xs text-muted-foreground">
                              Норма: {marker.min}–{marker.max} {marker.unit}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {getStatusBadge(marker.status)}
                          <p className={cn('text-xl font-bold mt-1', getStatusColor(marker.status))}>
                            {marker.value}
                          </p>
                        </div>
                      </div>
                      <Progress value={calculatePercentage(marker.value, marker.min, marker.max)} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>История анализов</CardTitle>
                <CardDescription>Все ваши анализы и динамика изменений</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockHistory.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon name="FileText" className="text-primary" size={24} />
                        </div>
                        <div>
                          <h4 className="font-semibold">Общий анализ крови</h4>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{item.count} показателей</p>
                          {item.status === 'normal' && <Badge className="bg-success/10 text-success">Норма</Badge>}
                          {item.status === 'warning' && <Badge className="bg-warning/10 text-warning">Внимание</Badge>}
                        </div>
                        <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <Icon name="Download" size={16} className="mr-2" />
                  Экспорт всей истории (PDF)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="help" className="animate-fade-in">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Часто задаваемые вопросы</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Icon name="HelpCircle" className="text-primary" size={18} />
                      Как загрузить анализы?
                    </h4>
                    <p className="text-sm text-muted-foreground ml-7">
                      Перейдите на вкладку "Загрузка" и перетащите PDF-файл с результатами или выберите файл на компьютере. Система автоматически распознает показатели.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Icon name="HelpCircle" className="text-primary" size={18} />
                      Что означают цветовые индикаторы?
                    </h4>
                    <p className="text-sm text-muted-foreground ml-7">
                      Зелёный - показатель в норме, жёлтый - требует внимания, красный - критическое отклонение от нормы. Обратитесь к врачу при красных показателях.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Icon name="HelpCircle" className="text-primary" size={18} />
                      Как подключить интеграцию с лабораторией?
                    </h4>
                    <p className="text-sm text-muted-foreground ml-7">
                      На вкладке "Загрузка" выберите вашу лабораторию и следуйте инструкциям для автоматической синхронизации результатов анализов.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Icon name="HelpCircle" className="text-primary" size={18} />
                      Можно ли экспортировать данные?
                    </h4>
                    <p className="text-sm text-muted-foreground ml-7">
                      Да, на вкладке "История" доступен экспорт всех анализов в PDF формате. Также можно экспортировать отдельные отчёты.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Поддержка и контакты</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Mail" size={18} className="mr-2" />
                    support@bloodtrack.ru
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="MessageCircle" size={18} className="mr-2" />
                    Чат с поддержкой
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Icon name="Phone" size={18} className="mr-2" />
                    +7 (800) 123-45-67
                  </Button>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Языки интерфейса</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">🇷🇺 Русский</Button>
                      <Button variant="outline" size="sm">🇬🇧 English</Button>
                      <Button variant="outline" size="sm">🇩🇪 Deutsch</Button>
                      <Button variant="outline" size="sm">🇪🇸 Español</Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      ⚠️ Внимание: Данный сервис предоставляет информационную поддержку и не заменяет консультацию врача. При отклонениях показателей обратитесь к специалисту.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-16 py-6 bg-background/95">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 BloodTrack. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
