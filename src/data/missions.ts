export type MissionStatus = 'preparing' | 'coming-soon' | 'demo';
export type MissionCategory = 'upcoming' | 'demonstration';
export type LocalizedText = { es: string; en: string };
export interface Mission {
  id: string;
  category: MissionCategory;
  status: MissionStatus;
  image: LocalizedText;
  url?: string;
  title: LocalizedText;
  description: LocalizedText;
  impact: LocalizedText;
  imageAlt: LocalizedText;
  notice?: 'demo-not-production';
}

export const missions: Mission[] = [
  {
    id: 'control-accesos', category: 'upcoming', status: 'preparing',
    image: { es: '/images/missions/control-accesos-es.webp', en: '/images/missions/control-accesos-en.webp' }, url: 'https://control-acceso-qr.com.mx/login',
    title: { es: 'Control de Accesos', en: 'Access Control' },
    description: { es: 'Acceso con QR, check-in clínico, recepción y pantallas de llamado para acompañar el recorrido de las personas desde su llegada.', en: 'QR access, clinical check-in, reception and call screens to support people’s journey from the moment they arrive.' },
    impact: { es: 'Menos fricción administrativa, mejor flujo de atención y privacidad.', en: 'Less administrative friction, a smoother care journey and privacy.' },
    imageAlt: { es: 'Ilustración de Control de Accesos: gato astronauta junto a un registro con QR y una pantalla de llamado en una recepción clínica.', en: 'Access Control illustration: an astronaut cat beside a QR check-in kiosk and a patient call screen at a clinic reception.' },
  },
  {
    id: 'consultorios-compartidos', category: 'upcoming', status: 'preparing',
    image: { es: '/images/missions/consultorios-compartidos-es.webp', en: '/images/missions/consultorios-compartidos-en.webp' }, url: 'https://tu-consultorio.com/login/?next=/',
    title: { es: 'Consultorios Compartidos', en: 'Shared Medical Offices' },
    description: { es: 'Gestión de espacios médicos compartidos: agenda, reservaciones, administración y seguimiento financiero en un mismo flujo de trabajo.', en: 'Shared medical space management: scheduling, reservations, administration and financial tracking in one workflow.' },
    impact: { es: 'Mejor aprovechamiento de los espacios y menos coordinación manual.', en: 'Better use of available spaces and less manual coordination.' },
    imageAlt: { es: 'Ilustración de Consultorios Compartidos: gato con bata médica y computadora frente a consultorios y una agenda de reservaciones.', en: 'Shared Medical Offices illustration: a cat in a medical coat using a laptop beside consulting rooms and a booking calendar.' },
  },
  {
    id: 'pagos-recurrentes', category: 'upcoming', status: 'coming-soon',
    image: { es: '/images/missions/pagos-recurrentes-es.webp', en: '/images/missions/pagos-recurrentes-en.webp' },
    title: { es: 'Pagos Recurrentes', en: 'Recurring Payments' },
    description: { es: 'Un calendario de compromisos para consultar el estado de los pagos y tener a la vista las obligaciones próximas.', en: 'A calendar of commitments to check payment status and keep upcoming obligations in view.' },
    impact: { es: 'Más visibilidad, menos omisiones y un seguimiento sencillo de los compromisos.', en: 'More visibility, fewer missed obligations and simpler follow-up.' },
    imageAlt: { es: 'Ilustración de Pagos Recurrentes: gato con computadora junto a un panel de próximos pagos, fechas y estados.', en: 'Recurring Payments illustration: a cat using a laptop beside a dashboard of upcoming payments, dates and statuses.' },
  },
  {
    id: 'bug-scrubs', category: 'demonstration', status: 'demo',
    image: { es: '/images/missions/bug-scrubs-es.webp', en: '/images/missions/bug-scrubs-en.webp' }, url: 'https://bugscrubs.astrogatolabs.com.mx/', notice: 'demo-not-production',
    title: { es: 'Bug Scrubs', en: 'Bug Scrubs' },
    description: { es: 'Análisis demostrativo de defectos conocidos en plataformas de redes y evaluación de riesgos para explorar información técnica con contexto.', en: 'A demonstration of known-defect analysis in network platforms and risk assessment, exploring technical information in context.' },
    impact: { es: 'Información compleja convertida en análisis accionable.', en: 'Complex information turned into actionable analysis.' },
    imageAlt: { es: 'Ilustración de Bug Scrubs: gato analista frente a pantallas con vulnerabilidades de red, severidades y gráficas de seguimiento.', en: 'Bug Scrubs illustration: a cat analyst beside screens showing network vulnerabilities, severity levels and tracking charts.' },
  },
  {
    id: 'narrador-futbol', category: 'demonstration', status: 'demo',
    image: { es: '/images/missions/narrador-futbol-es.webp', en: '/images/missions/narrador-futbol-en.webp' }, url: 'https://futbol.astrogatolabs.com.mx/',
    title: { es: 'Narrador AI de Fútbol', en: 'AI Football Narrator' },
    description: { es: 'Análisis de eventos de partidos con visualizaciones, hallazgos y relatos asistidos por IA para explorar el juego desde los datos.', en: 'Match event analysis with visualizations, insights and AI-assisted storytelling to explore the game through data.' },
    impact: { es: 'Datos crudos convertidos en información comprensible y atractiva.', en: 'Raw data turned into understandable, engaging information.' },
    imageAlt: { es: 'Ilustración de Narrador AI de Fútbol: gato comentarista y gato robot analizan un partido con estadísticas y visualizaciones de la cancha.', en: 'AI Football Narrator illustration: a cat commentator and a robot cat analyze a match with statistics and pitch visualizations.' },
  },
];
