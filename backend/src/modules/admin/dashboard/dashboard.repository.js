import prisma from "../../../config/prisma.js";

class DashboardRepository {
    async getStatistics() {
        const now = new Date();
        const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        const [
            projects,
            news,
            tenders,
            openTenders,
            closedTenders,
            expiringThisWeek,
            careers,
            activeCareers,
            closedCareers,
            careersClosingSoon,
            investorDocuments,
            activeInvestors,
            annualReportsCount,
            quarterlyReportsCount,
            sustainability,
            leadership,
            operationalStations,
            media,
            messages
        ] = await Promise.all([
            prisma.projects.count(),
            prisma.news.count(),
            prisma.tenders.count(),
            prisma.tenders.count({ where: { is_active: true, closing_date: { gte: now } } }),
            prisma.tenders.count({ where: { OR: [{ is_active: false }, { closing_date: { lt: now } }] } }),
            prisma.tenders.count({ where: { is_active: true, closing_date: { gte: now, lte: nextWeek } } }),
            prisma.job_openings.count(),
            prisma.job_openings.count({ where: { is_active: true, application_deadline: { gte: now } } }),
            prisma.job_openings.count({ where: { OR: [{ is_active: false }, { application_deadline: { lt: now } }] } }),
            prisma.job_openings.count({ where: { is_active: true, application_deadline: { gte: now, lte: nextWeek } } }),
            prisma.investor_documents.count(),
            prisma.investor_documents.count({ where: { is_active: true } }),
            prisma.investor_documents.count({ where: { investor_document_types: { code: { contains: "annual", mode: "insensitive" } } } }),
            prisma.investor_documents.count({ where: { investor_document_types: { code: { contains: "quarter", mode: "insensitive" } } } }),
            prisma.sustainability.count(),
            prisma.leadership.count(),
            prisma.operational_power_stations.count(),
            prisma.media_files.count(),
            prisma.contact_messages.count()
        ]);

        return {
            projects,
            news,
            tenders,
            tendersSummary: {
                total: tenders,
                open: openTenders,
                closed: closedTenders,
                expiringThisWeek
            },
            careers,
            careersSummary: {
                total: careers,
                active: activeCareers,
                closed: closedCareers,
                closingSoon: careersClosingSoon
            },
            investorDocuments,
            investorsSummary: {
                total: investorDocuments,
                active: activeInvestors,
                annualReports: annualReportsCount,
                quarterlyReports: quarterlyReportsCount
            },
            sustainability,
            leadership,
            operationalStations,
            media,
            messages
        };
    }

    async getRecentActivity() {
        // Collect timestamps dynamically from tables to build a lightweight activity log
        const [projects, media, messages, tenders, careers, investors] = await Promise.all([
            prisma.projects.findMany({
                orderBy: { updated_at: "desc" },
                take: 3,
                select: { name: true, updated_at: true }
            }),
            prisma.media_files.findMany({
                orderBy: { created_at: "desc" },
                take: 3,
                select: { original_name: true, created_at: true }
            }),
            prisma.contact_messages.findMany({
                orderBy: { submitted_at: "desc" },
                take: 3,
                select: { subject: true, submitted_at: true }
            }),
            prisma.tenders.findMany({
                orderBy: { updated_at: "desc" },
                take: 3,
                select: { title: true, updated_at: true }
            }),
            prisma.job_openings.findMany({
                orderBy: { updated_at: "desc" },
                take: 3,
                select: { title: true, updated_at: true }
            }),
            prisma.investor_documents.findMany({
                orderBy: { updated_at: "desc" },
                take: 3,
                select: { title: true, updated_at: true }
            })
        ]);

        const activities = [];
        projects.forEach(p => {
            activities.push({
                text: `Project updated: "${p.name}"`,
                time: p.updated_at,
                type: "project"
            });
        });
        media.forEach(m => {
            activities.push({
                text: `Asset file uploaded: "${m.original_name}"`,
                time: m.created_at,
                type: "media"
            });
        });
        messages.forEach(msg => {
            activities.push({
                text: `Enquiry received: "${msg.subject}"`,
                time: msg.submitted_at,
                type: "message"
            });
        });
        tenders.forEach(t => {
            activities.push({
                text: `Tender notice updated: "${t.title}"`,
                time: t.updated_at,
                type: "tender"
            });
        });
        careers.forEach(c => {
            activities.push({
                text: `Recruitment opening updated: "${c.title}"`,
                time: c.updated_at,
                type: "career"
            });
        });
        investors.forEach(inv => {
            activities.push({
                text: `Investor document updated: "${inv.title}"`,
                time: inv.updated_at,
                type: "investor"
            });
        });

        // Sort by timestamp desc
        activities.sort((a, b) => new Date(b.time) - new Date(a.time));
        return activities.slice(0, 5);
    }
}

export default new DashboardRepository();