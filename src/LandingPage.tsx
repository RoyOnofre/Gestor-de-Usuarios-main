import React from 'react';
import { motion } from 'motion/react';
import {
  Users,
  ShieldCheck,
  Database,
  Terminal,
  Lock,
  TrendingUp,
  ArrowRight,
  Menu,
  X,
  Code2,
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Code2 className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900">
                TechStore <span className="text-blue-600">Manager</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#inicio" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Inicio</a>
              <a href="#caracteristicas" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Características</a>
              <a href="#beneficios" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Beneficios</a>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex">
              <button
                onClick={onEnter}
                className="px-6 py-2.5 text-sm font-semibold rounded-xl text-blue-600 border border-blue-600 hover:bg-blue-50 transition-all active:scale-95"
              >
                Acceso
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-slate-900"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-4 shadow-xl">
            <a href="#inicio" className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Inicio</a>
            <a href="#caracteristicas" className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Características</a>
            <a href="#beneficios" className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Beneficios</a>
            <button
              onClick={onEnter}
              className="w-full mt-4 px-6 py-3 text-base font-semibold rounded-xl text-blue-600 border border-blue-600 hover:bg-blue-50 transition-all"
            >
              Acceso al Sistema
            </button>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl overflow-hidden -z-10 opacity-40 mix-blend-multiply pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 rounded-full bg-blue-400 blur-[128px]" />
            <div className="absolute top-[20%] right-[-5%] w-[30rem] h-[30rem] rounded-full bg-indigo-300 blur-[128px]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
                Optimiza la Gestión de tu Tienda Virtual con <span className="text-blue-600 bg-clip-text">Precisión de Ingeniería</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Una solución robusta desarrollada bajo estándares de Ingeniería de Software para el control total de usuarios y datos de tu e-commerce.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onEnter}
                  className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 transition-all active:scale-95 flex items-center justify-center gap-2 group"
                >
                  Comenzar Ahora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="text-sm text-slate-500 flex items-center gap-2 pt-2 sm:pt-0">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  Prototipo Inicial | Versión Segura
                </div>
              </div>
            </motion.div>

            {/* Visual Dashboard Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-20 relative mx-auto max-w-5xl"
            >
              <div className="bg-white rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200">
                {/* Window header */}
                <div className="h-12 bg-slate-50 border-b border-slate-200 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  </div>
                  <div className="mx-auto flex items-center gap-2 bg-white px-3 py-1 rounded-md border border-slate-200 text-xs text-slate-500 shadow-sm">
                    <Lock className="w-3 h-3" />
                    <span>admin-dashboard.tsx</span>
                  </div>
                </div>
                {/* Code Window / App Mockup */}
                <div className="flex flex-col md:flex-row h-[400px]">
                  {/* Sidebar */}
                  <div className="hidden md:flex flex-col w-64 border-r border-slate-200 bg-slate-50/50 p-4">
                    <div className="flex items-center gap-2 mb-8 mt-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Terminal className="w-4 h-4 text-white" /></div>
                      <span className="font-semibold text-slate-700 text-sm">TechStore Admin</span>
                    </div>
                    <div className="space-y-2">
                      <div className="px-3 py-2 bg-blue-50 text-blue-700 font-medium text-sm rounded-lg flex items-center gap-2"><Users className="w-4 h-4" /> Usuarios</div>
                      <div className="px-3 py-2 text-slate-600 font-medium text-sm rounded-lg flex items-center gap-2"><Database className="w-4 h-4" /> Base de Datos</div>
                      <div className="px-3 py-2 text-slate-600 font-medium text-sm rounded-lg flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Roles</div>
                    </div>
                  </div>
                  {/* Main Content Area */}
                  <div className="flex-1 p-6 lg:p-8 bg-white overflow-hidden flex flex-col relative text-left">
                    <h3 className="text-xl font-bold text-slate-800 mb-6">Gestión de Usuarios</h3>
                    {/* Fake table */}
                    <div className="flex-1 border border-slate-100 rounded-xl overflow-hidden shadow-sm">
                      <div className="bg-slate-50 h-10 border-b border-slate-100 flex items-center px-4 gap-4">
                        <div className="w-1/3 text-xs font-semibold text-slate-400 uppercase">Usuario</div>
                        <div className="w-1/3 text-xs font-semibold text-slate-400 uppercase">Rol</div>
                        <div className="w-1/3 text-xs font-semibold text-slate-400 uppercase">Estado</div>
                      </div>
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-14 border-b border-slate-50 flex items-center px-4 gap-4">
                          <div className="w-1/3 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">U{i}</div>
                            <div className="h-2 w-24 bg-slate-200 rounded-full"></div>
                          </div>
                          <div className="w-1/3">
                            <div className="h-5 w-16 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-md flex items-center justify-center">Admin</div>
                          </div>
                          <div className="w-1/3 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <div className="h-2 w-16 bg-slate-100 rounded-full"></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Floating TS code snippet */}
                    <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 w-72 bg-slate-900 rounded-xl p-4 shadow-2xl border border-slate-800 hidden sm:block transform rotate-1 hover:rotate-0 transition-transform">
                      <div className="flex items-center gap-2 mb-3">
                        <code className="text-blue-400 text-xs font-mono">users.controller.ts</code>
                      </div>
                      <pre className="text-slate-300 text-[10px] font-mono leading-relaxed overflow-hidden">
                        {`@Get('/users')
@UseGuards(JwtAuthGuard)
async getSystemUsers(): Promise<User[]> {
  const users = await this.db.find();
  return users.map(u => new UserDto(u));
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="caracteristicas" className="py-24 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-sm font-bold tracking-wider text-blue-600 uppercase mb-3">Características</h2>
              <h3 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Un núcleo diseñado para la excelencia</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">Gestión de Usuarios</h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Control centralizado y seguro de perfiles. Crea, edita y asigna roles con una interfaz intuitiva y potentes opciones de seguridad subyacentes.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-6">
                  <Terminal className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">Arquitectura Robusta</h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Implementación basada en TypeScript para máxima fiabilidad. Tipado estricto que previene errores y garantiza la consistencia del ecosistema.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg hover:border-blue-100 transition-all"
              >
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                  <Database className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">Base de Datos Integrada</h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Manejo eficiente de la persistencia de datos del sistema. Explorador directo de tablas y registros optimizado para operaciones rápidas.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="beneficios" className="py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

            {/* Benefit 1: Alternating (Image Left, Text Right) */}
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-3xl bg-slate-100 p-8 pt-12 aspect-[4/3] flex flex-col items-center justify-end overflow-hidden border border-slate-200 shadow-inner">
                  <div className="w-full max-w-sm bg-white rounded-t-xl shadow-xl border border-b-0 border-slate-200 p-6 flex-1">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                      <div className="h-4 w-24 bg-slate-200 rounded-full"></div>
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center"><TrendingUp className="w-3 h-3" /></div>
                    </div>
                    <div className="space-y-4">
                      <div className="h-6 w-full bg-slate-50 rounded-md"></div>
                      <div className="h-6 w-5/6 bg-slate-50 rounded-md"></div>
                      <div className="h-6 w-4/6 bg-slate-50 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><TrendingUp className="w-5 h-5" /></div>
                  <h3 className="text-2xl font-bold text-slate-900">Eficiencia Operativa</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Reduce el tiempo dedicado a la administración de cuentas y acceso en tu e-commerce. Nuestra interfaz minimalista y flujos optimizados te permiten enfocarte en lo que de verdad importa: hacer crecer tu tienda virtual.
                </p>
                <ul className="space-y-3">
                  {['Gestión en un solo clic', 'Búsqueda avanzada de perfiles', 'Dashboard analítico instantáneo'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Benefit 2: Alternating (Text Left, Image Right) */}
            <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
              <div className="w-full lg:w-1/2">
                <div className="relative rounded-3xl bg-slate-900 p-8 aspect-[4/3] flex items-center justify-center overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-emerald-500/30">
                      <ShieldCheck className="w-10 h-10 text-emerald-400" />
                    </div>
                    <div className="text-white font-mono text-sm max-w-[200px] break-all leading-relaxed opacity-80 decoration-emerald-500 underline decoration-wavy">
                      AAS-256 ENCRYPTED <br /> ZERO-TRUST AUTH
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center"><ShieldCheck className="w-5 h-5" /></div>
                  <h3 className="text-2xl font-bold text-slate-900">Seguridad de los Datos</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  La protección de la información de tus clientes es nuestra prioridad. Implementamos autenticación sólida y control de acceso basado en roles para evitar brechas de seguridad y fugas de datos.
                </p>
                <button
                  onClick={onEnter}
                  className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-2"
                >
                  Conocer sobre nuestra seguridad <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Call to Action Final */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto bg-slate-900 rounded-[2.5rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
            {/* abstract bg shapes for dark block */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl"></div>

            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 relative z-10">
              Transforma la gestión de tu sistema hoy
            </h2>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto relative z-10">
              Explora una experiencia de desarrollo limpia, estable y escalable. Da el primer paso hacia una infraestructura de usuarios moderna.
            </p>
            <button
              onClick={onEnter}
              className="relative z-10 px-8 py-4 bg-white text-slate-900 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all active:translate-y-0"
            >
              Probar Prototipo Inicial
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className="font-bold text-lg md:text-xl tracking-tight text-slate-900">
                TechStore Manager
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="font-medium text-sm text-slate-500 hover:text-blue-600 transition-colors">Términos</a>
              <a href="#" className="font-medium text-sm text-slate-500 hover:text-blue-600 transition-colors">Privacidad</a>
              <a href="#" className="font-medium text-sm text-slate-500 hover:text-blue-600 transition-colors">Soporte API</a>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-400 text-sm">
            <p>© {new Date().getFullYear()} Ingeniería de Software. Todos los derechos reservados.</p>
            <p className="mt-4 md:mt-0 font-medium text-slate-500 flex items-center gap-1 group">
              Desarrollado con ❤️ por <span className="text-blue-600 group-hover:underline cursor-pointer">Grupo 17</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
