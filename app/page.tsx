import DonationCheckout from "./components/DonationCheckout";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-16">
        <div className="grid w-full gap-12 lg:grid-cols-2 lg:items-center">

          <section>
            <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-indigo-200">
              ❤️ Tu apoyo hace la diferencia
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              Apoya nuestro proyecto
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Cada donación nos ayuda a continuar desarrollando nuestro
              proyecto. Puedes contribuir con la cantidad que quieras.
            </p>

            <div className="mt-8 grid max-w-md grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold">$5</div>
                <div className="mt-1 text-slate-400">Pequeño apoyo</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold">$20</div>
                <div className="mt-1 text-slate-400">Gran ayuda</div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-2xl font-bold">$50</div>
                <div className="mt-1 text-slate-400">Muchísimas gracias</div>
              </div>
            </div>
          </section>

          <DonationCheckout />

        </div>
      </div>
    </main>
  );
}
