import { type Locale } from "~/i18n/routing";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: Locale }>;
};

// Main page component that renders the agenda (Server Component)
export default async function AgendaPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations("Agenda");
  
  const agendaItems = [
    { id: 1, type: "registration", duration: "1h 30m" },
    { id: 2, type: "exhibition", duration: "30m" },
    { id: 3, type: "ceremony", duration: "50m" },
    { id: 4, type: "session", duration: "1h" },
    { id: 5, type: "break", duration: "30m" },
    { id: 6, type: "session", duration: "1h 25m" },
    { id: 7, type: "break", duration: "15m" },
    { id: 8, type: "session", duration: "1h" },
    { id: 9, type: "closing", duration: "15m" }
  ];

  const getItemTitle = (item: typeof agendaItems[0]) => {
    if (item.type === 'ceremony') return t("agendaItems.opening");
    if (item.type === 'session') {
      if (item.id === 4) return t("agendaItems.session1");
      if (item.id === 6) return t("agendaItems.session2");
      return t("agendaItems.session3");
    }
    if (item.type === 'break') {
      if (item.id === 5) return t("agendaItems.break1");
      return t("agendaItems.break2");
    }
    return t(`agendaItems.${item.type}` as any);
  };

  return (
    <main 
      className="relative min-h-screen bg-gradient-to-b from-background via-background/95 to-background overflow-hidden"
      style={{
        backgroundImage: "url('/pattern1.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-background/60 z-0"></div>
      
      {/* Main content container */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-screen py-16 px-4">
          {/* Hero section with the main title */}
          <div className="text-center mb-16 w-full">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              {locale === 'ar' ? (
                <>
                  <span className="text-white font-bold">ما بعد </span>
                  <span className="text-primary font-bold">اللحظة</span>
                </>
              ) : (
                <>
                  <span className="text-white font-bold">Beyond The </span>
                  <span className="text-primary font-bold">Moment</span>
                </>
              )}
            </h1>
            <h2 className="text-3xl md:text-4xl font-light text-muted-foreground mb-6">
              {t("heroSubtitle")}
            </h2>
          </div>

          {/* Main agenda timeline section */}
          <div className="w-full max-w-4xl">
            <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border shadow-2xl">
              {/* Agenda header with title and TEDx logo */}
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {t("title")}
                </h3>
                <div className="text-primary font-bold text-lg md:text-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                  TEDx
                </div>
              </div>

              {/* Timeline with agenda items */}
              <div className="relative">
                {/* Vertical timeline line with gradient */}
                <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/80 to-primary/60"></div>
                
                {/* List of agenda items */}
                <div className="space-y-4 md:space-y-6">
                  {agendaItems.map((item) => (
                    <div 
                      key={item.id}
                      className="group relative transition-all duration-300 hover:scale-102"
                    >
                      {/* Individual agenda item */}
                      <div className="flex items-start relative">
                        {/* Red X symbol marker if we can get the x symbol from them it will be better */}
                        <div className="flex-shrink-0 mr-4 md:mr-6 z-10 relative group-hover:scale-110 transition-all duration-300">
                          <span className="text-primary text-2xl md:text-3xl font-bold">×</span>
                        </div>
                        
                        {/* Content area for the agenda item */}
                        <div className="flex-1 group-hover:bg-white/5 p-3 md:p-4 rounded-lg transition-all duration-300">
                          {/* Item title with hover effect to lock nice  */}
                          <h4 className="text-base md:text-lg font-medium text-white dark:text-white text-gray-900 mb-2 group-hover:text-red-300 dark:group-hover:text-red-300 group-hover:text-primary transition-colors duration-300">
                            {getItemTitle(item)}
                          </h4>
                          
                          {/* Item metadata (duration and time slot) */}
                          <div className="flex items-center space-x-3 md:space-x-4 text-xs text-gray-400 dark:text-gray-400">
                            {/* Duration badge */}
                            <span className="bg-red-500/20 dark:bg-red-500/20 bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-300 px-2 py-1 rounded-full">
                              {item.duration}
                            </span>
                            {/* Time slot badge */}
                            <span className="bg-white/10 dark:bg-white/10 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white px-2 py-1 rounded-full">
                              {t(`timeSlots.slot${item.id}` as any)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 