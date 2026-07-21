import Container from "../ui/Container";

export default function ProjectHero() {
    return (
        <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white">

            <Container>

                <div className="py-20 text-center">

                    <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-semibold text-blue-300">

                        NHPC PROJECTS

                    </span>

                    <h1 className="mt-6 text-5xl font-bold">

                        Building India's
                        Renewable Future

                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300">

                        Explore NHPC's portfolio of hydroelectric,
                        solar, wind and renewable energy projects
                        powering sustainable development across India.

                    </p>

                </div>

            </Container>

        </section>
    );
}